import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch user's platform connections
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const connections = await prisma.platformConnection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(connections);
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return NextResponse.json(
      { error: "Failed to fetch platforms" },
      { status: 500 }
    );
  }
}

// POST - Add new platform connection
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { platform, url } = body;

    if (!platform || !url) {
      return NextResponse.json(
        { error: "Platform and URL are required" },
        { status: 400 }
      );
    }

    // Validate platform
    if (!["TIKTOK", "INSTAGRAM"].includes(platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    // Fetch stats from SocialKit
    const stats = await fetchPlatformStats(platform, url);
    if (!stats.success) {
      return NextResponse.json(
        { error: "Failed to fetch platform stats" },
        { status: 400 }
      );
    }

    // Create or update platform connection
    const connection = await prisma.platformConnection.upsert({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
      update: {
        url: stats.data.profileUrl,
        username: stats.data.username,
        followers: stats.data.followers,
        avatar: stats.data.avatar,
        verified: stats.data.verified,
        lastFetchedAt: new Date(),
      },
      create: {
        userId,
        platform,
        url: stats.data.profileUrl,
        username: stats.data.username,
        followers: stats.data.followers,
        avatar: stats.data.avatar,
        verified: stats.data.verified,
      },
    });

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Error adding platform:", error);
    return NextResponse.json(
      { error: "Failed to add platform" },
      { status: 500 }
    );
  }
}

// DELETE - Remove platform connection
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Platform ID required" },
        { status: 400 }
      );
    }

    await prisma.platformConnection.delete({
      where: { id, userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting platform:", error);
    return NextResponse.json(
      { error: "Failed to delete platform" },
      { status: 500 }
    );
  }
}

// Helper function to fetch stats from SocialKit
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