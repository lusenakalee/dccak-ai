import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: campaignId } = await params

    // 1. Ensure campaign exists & is ACTIVE
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
        status: "ACTIVE",
      },
    })

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not available" },
        { status: 404 }
      )
    }

    // 2. Prevent duplicate application
    const existingApplication =
      await prisma.campaignApplication.findUnique({
        where: {
          campaignId_creatorId: {
            campaignId,
            creatorId: userId,
          },
        },
      })

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this campaign" },
        { status: 409 }
      )
    }

    // 3. Create application
    const application = await prisma.campaignApplication.create({
      data: {
        campaignId,
        creatorId: userId,
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error("Apply error:", error)

    return NextResponse.json(
      { error: "Failed to apply to campaign" },
      { status: 500 }
    )
  }
}
