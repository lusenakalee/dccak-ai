import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find all platforms older than 48 hours
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const connectionsToRefresh = await prisma.platformConnection.findMany({
      where: {
        lastFetchedAt: {
          lt: twoDaysAgo,
        },
      },
    });

    console.log(`Refreshing ${connectionsToRefresh.length} platform connections`);

    for (const connection of connectionsToRefresh) {
      try {
        const stats = await fetchPlatformStats(
          connection.platform,
          connection.url
        );
        
        if (stats.success) {
          await prisma.platformConnection.update({
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
    }

    return NextResponse.json({
      success: true,
      refreshed: connectionsToRefresh.length,
    });
  } catch (error) {
    console.error("Cron job error:", error);
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