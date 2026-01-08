import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/opportunities
 * Public creator-facing endpoint
 * Returns ACTIVE campaigns only
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Auth check (required)
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 2. Parse query params (optional filters)
    const { searchParams } = new URL(req.url)

    const tag = searchParams.get("tag")       // CampaignNiche
    const type = searchParams.get("type")     // CampaignType
    const minBudget = searchParams.get("minBudget")
    const dueBefore = searchParams.get("dueBefore")

    // 3. Build Prisma filters
    const where: any = {
      status: "ACTIVE",
    }

    if (tag) where.campaignTag = tag
    if (type) where.campaignType = type
    if (minBudget) where.budget = { gte: Number(minBudget) }
    if (dueBefore) where.dueDate = { lte: new Date(dueBefore) }

    // 4. Query database
    const opportunities = await prisma.campaign.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        campaignName: true,
        campaignTag: true,
        campaignType: true,
        description: true,
        budget: true,
        creatorsNeeded: true,
        dueDate: true,
        createdAt: true,
      },
    })

    // 5. Return opportunities
    return NextResponse.json(opportunities)
  } catch (error) {
    console.error("GET /api/opportunities error:", error)

    return NextResponse.json(
      { error: "Failed to load opportunities" },
      { status: 500 }
    )
  }
}
