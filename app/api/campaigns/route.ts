// app/api/campaigns/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@/generated/prisma/client"

const prisma = new PrismaClient()

// GET all campaigns for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId,
        ...(status && { status: status as any }),
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    )
  }
}

// POST create a new campaign
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      campaignName,
      campaignTag,
      dueDate,
      budget,
      campaignType,
      creatorsNeeded,
      description,
      startDate,
      status,
    } = body

    // Validation
    if (!campaignName || !campaignTag || !dueDate || !budget || !campaignType || !creatorsNeeded) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const campaign = await prisma.campaign.create({
      data: {
        campaignName,
        campaignTag,
        dueDate: new Date(dueDate),
        budget: parseFloat(budget),
        campaignType,
        creatorsNeeded: parseInt(creatorsNeeded),
        description,
        startDate: startDate ? new Date(startDate) : null,
        status: status || "DRAFT",
        userId,
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    )
  }
}