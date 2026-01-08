import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find platforms that need refresh (older than 48 hours)
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const connectionsToRefresh = await prisma.platformConnection.findMany({
      where: {
        userId,
        lastFetchedAt: {
          lt: twoDaysAgo,
        },
      },
    });

    const refreshPromises = connectionsToRefresh.map(async (connection) => {
      try {
        const stats = await fetchPlatformStats(
          connection.platform,
          connection.url
        );
        
        if (stats.success) {
          return prisma.platformConnection.update({
            where: { id: connection.id },
            data: {
              followers: stats.data.followers,
              username: stats.data.username,
              avatar: stats.data.avatar,
              verified: stats.data.verified,
              lastFetchedAt: new Date(),
            },
          });
        }
      } catch (error) {
        console.error(`Failed to refresh ${connection.platform}:`, error);
      }
    });

    await Promise.all(refreshPromises);

    // Return updated connections
    const updatedConnections = await prisma.platformConnection.findMany({
      where: { userId },
    });

    return NextResponse.json(updatedConnections);
  } catch (error) {
    console.error("Error refreshing platforms:", error);
    return NextResponse.json(
      { error: "Failed to refresh platforms" },
      { status: 500 }
    );
  }
}

async function fetchPlatformStats(platform: string, url: string) {
  const accessKey = process.env.SOCIAL_KIT_ACCESS_KEY;
  const encodedUrl = encodeURIComponent(url);
  
  const endpoint =
    platform === "TIKTOK"
      ? `https://api.socialkit.dev/tiktok/channel-stats?access_key=${accessKey}&url=${encodedUrl}`
      : `https://api.socialkit.dev/instagram/channel-stats?access_key=${accessKey}&url=${encodedUrl}`;

  const response = await fetch(endpoint);
  return await response.json();
}