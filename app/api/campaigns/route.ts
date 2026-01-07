// app/api/campaigns/route.ts
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

// GET all campaigns for the authenticated user
export async function GET(req: NextRequest) {
  console.log("=== GET /api/campaigns START ===")
  try {
    console.log("1. Attempting authentication...")
    const { userId } = await auth()
    console.log("2. Auth result - userId:", userId)
   
    if (!userId) {
      console.log("3. Authentication failed - no userId")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    console.log("4. Query params - status:", status)

    console.log("5. Querying database...")
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId,
        ...(status && { status: status as any }),
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    console.log("6. Campaigns fetched successfully, count:", campaigns.length)

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("=== GET ERROR ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : error)
    console.error("Full error:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
   
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    )
  } finally {
    console.log("=== GET /api/campaigns END ===\n")
  }
}

// POST create a new campaign
export async function POST(req: NextRequest) {
  console.log("=== POST /api/campaigns START ===")
  try {
    console.log("1. Attempting authentication...")
    const { userId } = await auth()
    console.log("2. Auth result - userId:", userId)
   
    if (!userId) {
      console.log("3. Authentication failed - no userId")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("4. Parsing request body...")
    const body = await req.json()
    console.log("5. Request body received:", JSON.stringify(body, null, 2))
   
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

    console.log("6. Extracted fields:", {
      campaignName,
      campaignTag,
      dueDate,
      budget,
      campaignType,
      creatorsNeeded,
      hasDescription: !!description,
      startDate,
      status
    })

    // Validation
    if (!campaignName || !campaignTag || !dueDate || !budget || !campaignType || !creatorsNeeded) {
      console.log("7. Validation failed - missing required fields")
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("8. Validation passed, preparing data for database...")
    const campaignData = {
      campaignName,
      campaignTag,
      dueDate: new Date(dueDate),
      budget: parseFloat(budget),
      campaignType,
      creatorsNeeded: parseInt(creatorsNeeded),
      description: description || "",
      startDate: startDate ? new Date(startDate) : null,
      status: status || "DRAFT",
      userId,
    }

    console.log("10. Creating campaign in database...")
    const campaign = await prisma.campaign.create({
      data: campaignData,
    })
    console.log("11. Campaign created successfully with ID:", campaign.id)

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("=== POST ERROR ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : error)
    console.error("Full error:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
   
    if (error && typeof error === 'object' && 'code' in error) {
      console.error("Prisma error code:", (error as any).code)
      console.error("Prisma error meta:", (error as any).meta)
    }
   
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    )
  } finally {
    console.log("=== POST /api/campaigns END ===\n")
  }
}