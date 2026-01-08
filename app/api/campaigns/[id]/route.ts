// app/api/campaigns/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

// GET a single campaign
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: campaignId } = await params
    console.log("Fetching campaign with ID:", campaignId)

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    if (campaign.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch campaign" },
      { status: 500 }
    )
  }
}

// UPDATE campaign
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: campaignId } = await params

    const existingCampaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    })

    if (!existingCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    if (existingCampaign.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()

    const updateData: any = {}
    if (body.campaignName !== undefined) updateData.campaignName = body.campaignName
    if (body.campaignTag !== undefined) updateData.campaignTag = body.campaignTag
    if (body.dueDate !== undefined) updateData.dueDate = new Date(body.dueDate)
    if (body.budget !== undefined) updateData.budget = parseFloat(body.budget)
    if (body.campaignType !== undefined) updateData.campaignType = body.campaignType
    if (body.creatorsNeeded !== undefined)
      updateData.creatorsNeeded = parseInt(body.creatorsNeeded)
    if (body.description !== undefined) updateData.description = body.description
    if (body.startDate !== undefined)
      updateData.startDate = body.startDate ? new Date(body.startDate) : null
    if (body.status !== undefined) updateData.status = body.status

    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: updateData,
    })

    return NextResponse.json(updatedCampaign)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    )
  }
}

// DELETE campaign
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: campaignId } = await params

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    if (campaign.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await prisma.campaign.delete({
      where: { id: campaignId },
    })

    return NextResponse.json({ message: "Campaign deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    )
  }
}
