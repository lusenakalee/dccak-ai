// app/api/campaigns/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@/generated/prisma/client"

const prisma = new PrismaClient()

// GET a single campaign
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json(
      { error: "Failed to fetch campaign" },
      { status: 500 }
    )
  }
}

// PATCH update a campaign
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    
    // Check if campaign belongs to user
    const existingCampaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!existingCampaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}
    
    if (body.campaignName) updateData.campaignName = body.campaignName
    if (body.campaignTag) updateData.campaignTag = body.campaignTag
    if (body.dueDate) updateData.dueDate = new Date(body.dueDate)
    if (body.budget !== undefined) updateData.budget = parseFloat(body.budget)
    if (body.campaignType) updateData.campaignType = body.campaignType
    if (body.creatorsNeeded !== undefined) updateData.creatorsNeeded = parseInt(body.creatorsNeeded)
    if (body.description !== undefined) updateData.description = body.description
    if (body.startDate) updateData.startDate = new Date(body.startDate)
    if (body.status) updateData.status = body.status
    if (body.impressions !== undefined) updateData.impressions = parseInt(body.impressions)
    if (body.engagement !== undefined) updateData.engagement = parseFloat(body.engagement)
    if (body.progress !== undefined) updateData.progress = parseInt(body.progress)

    const campaign = await prisma.campaign.update({
      where: {
        id: params.id,
      },
      data: updateData,
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error updating campaign:", error)
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    )
  }
}

// DELETE a campaign
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if campaign belongs to user
    const existingCampaign = await prisma.campaign.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!existingCampaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      )
    }

    await prisma.campaign.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    )
  }
}