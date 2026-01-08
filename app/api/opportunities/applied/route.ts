import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/opportunities/applied
 * Returns all campaigns the current user has applied to
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
    const status = searchParams.get("status") // Filter by application status (PENDING, APPROVED, REJECTED)

    // 3. Build filters for applications
    const applicationWhere: any = {
      creatorId: userId,
    }

    if (status) {
      applicationWhere.status = status
    }

    // 4. Query all applications by this user with campaign details
    const applications = await prisma.campaignApplication.findMany({
      where: applicationWhere,
      orderBy: {
        appliedAt: "desc",
      },
      include: {
        campaign: {
          select: {
            id: true,
            campaignName: true,
            campaignTag: true,
            campaignType: true,
            description: true,
            budget: true,
            creatorsNeeded: true,
            dueDate: true,
            status: true,
            createdAt: true,
          },
        },
      },
    })

    // 5. Transform the response to a more user-friendly format
    const appliedOpportunities = applications.map((app) => ({
      applicationId: app.id,
      applicationStatus: app.status,
      appliedAt: app.appliedAt,
      campaign: app.campaign,
    }))

    return NextResponse.json(appliedOpportunities)
  } catch (error) {
    console.error("GET /api/opportunities/applied error:", error)

    return NextResponse.json(
      { error: "Failed to load applied opportunities" },
      { status: 500 }
    )
  }
}