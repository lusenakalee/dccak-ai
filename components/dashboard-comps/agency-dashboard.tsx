"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs"
import {
  AlertCircle,
  Award,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  Send,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"

// Mock data
const rosterCreators = [
  {
    name: "Jane Doe",
    niche: "Technology",
    followers: "464K",
    engagement: "11.2%",
    status: "active",
    campaigns: 3,
    revenue: "$35,500",
    verified: true,
  },
  {
    name: "John Smith",
    niche: "Fitness",
    followers: "280K",
    engagement: "9.8%",
    status: "active",
    campaigns: 2,
    revenue: "$22,000",
    verified: true,
  },
  {
    name: "Sarah Lee",
    niche: "Beauty",
    followers: "512K",
    engagement: "13.5%",
    status: "active",
    campaigns: 4,
    revenue: "$48,200",
    verified: true,
  },
  {
    name: "Mike Chen",
    niche: "Gaming",
    followers: "890K",
    engagement: "15.1%",
    status: "inactive",
    campaigns: 1,
    revenue: "$18,000",
    verified: true,
  },
]

const campaignInvitations = [
  {
    brand: "{user.firstName}",
    title: "Q1 Product Launch Campaign",
    budget: "$45,000",
    creators: 3,
    deadline: "2024-02-20",
    status: "pending",
    tags: ["Technology", "Review"],
  },
  {
    brand: "FitLife",
    title: "Summer Wellness Series",
    budget: "$30,000",
    creators: 2,
    deadline: "2024-03-01",
    status: "in-review",
    tags: ["Fitness", "Lifestyle"],
  },
  {
    brand: "BeautyBox",
    title: "Spring Collection Showcase",
    budget: "$38,000",
    creators: 2,
    deadline: "2024-02-25",
    status: "accepted",
    tags: ["Beauty", "Fashion"],
  },
]

const revenueData = [
  { month: "Jan", revenue: 85000 },
  { month: "Feb", revenue: 92000 },
  { month: "Mar", revenue: 105000 },
  { month: "Apr", revenue: 98000 },
  { month: "May", revenue: 115000 },
  { month: "Jun", revenue: 123500 },
]

const complianceChecklist = [
  { item: "Ethical representation agreement signed", status: "complete", date: "2024-01-01" },
  { item: "Revenue sharing terms documented", status: "complete", date: "2024-01-01" },
  { item: "Q1 contract reviews", status: "complete", date: "2024-01-15" },
  { item: "Creator welfare check-ins", status: "pending", date: "2024-02-01" },
  { item: "FTC compliance training", status: "complete", date: "2023-12-15" },
  { item: "Data protection certification", status: "pending", date: "2024-02-15" },
]

export function AgencyDashboard() {
    const { isSignedIn, user, isLoaded } = useUser()

  // Use `isLoaded` to check if Clerk is loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Use `isSignedIn` to protect the content
  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }







  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const avgRevenue = totalRevenue / revenueData.length
  const activeCreators = rosterCreators.filter((c) => c.status === "active").length
  const totalFollowers = rosterCreators.reduce((sum, creator) => {
    const followers = Number.parseFloat(creator.followers.replace("K", "")) * 1000
    return sum + followers
  }, 0)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-balance text-3xl font-bold tracking-tight">{user.firstName}</h1>
              <Badge variant="outline" className="gap-1 border-primary bg-primary/10 text-primary">
                <CheckCircle2 className="size-3" />
                Verified Agency
              </Badge>
            </div>
            <p className="text-pretty text-muted-foreground">Managing premium creator partnerships since 2022</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="size-4" />
              Reports
            </Button>
            <Button>
              <UserPlus className="size-4" />
              Add Creator
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCreators}</div>
              <p className="text-xs text-muted-foreground">{rosterCreators.length} total roster</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalFollowers / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Combined followers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">YTD Revenue</CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">${(avgRevenue / 1000).toFixed(0)}K avg/month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Briefcase className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaignInvitations.filter((c) => c.status !== "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">{campaignInvitations.length} total invitations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roster" className="space-y-4">
<TabsList className="grid w-full grid-cols-3 gap-2 lg:w-auto lg:inline-flex">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Roster Management */}
          <TabsContent value="roster" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Creator Roster</CardTitle>
                <CardDescription>Manage your creators and track their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rosterCreators.map((creator, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                          {creator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{creator.name}</h3>
                            {creator.verified && <CheckCircle2 className="size-4 text-primary" />}
                            <Badge variant={creator.status === "active" ? "default" : "secondary"} className="text-xs">
                              {creator.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>{creator.niche}</span>
                            <span>•</span>
                            <span>{creator.followers} followers</span>
                            <span>•</span>
                            <span className="text-primary">{creator.engagement} engagement</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="text-muted-foreground">{creator.campaigns} active campaigns</span>
                            <span>•</span>
                            <span className="font-medium text-primary">{creator.revenue} YTD</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Invitations */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Invitations</CardTitle>
                <CardDescription>Manage brand partnerships for your creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaignInvitations.map((campaign, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            campaign.status === "accepted"
                              ? "default"
                              : campaign.status === "in-review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <h3 className="font-semibold">{campaign.brand}</h3>
                      </div>
                      <p className="text-sm">{campaign.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="size-4" />
                          {campaign.budget}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="size-4" />
                          {campaign.creators} creators
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          Due {campaign.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {campaign.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                          <Button size="sm">Review</Button>
                        </>
                      )}
                      {campaign.status === "in-review" && <Button size="sm">Continue Review</Button>}
                      {campaign.status === "accepted" && (
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue & Analytics */}
          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Track earnings and contract performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-medium text-muted-foreground">{data.month}</span>
                      <div className="flex-1">
                        <Progress value={(data.revenue / 150000) * 100} className="h-8" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-right text-sm font-medium">
                          ${(data.revenue / 1000).toFixed(0)}K
                        </span>
                        {index > 0 && data.revenue > revenueData[index - 1].revenue && (
                          <TrendingUp className="size-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-5 text-primary" />
                      <span className="font-medium">Total Revenue (YTD)</span>
                    </div>
                    <span className="text-lg font-bold text-primary">${(totalRevenue / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Anonymized breakdown by creator tier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mega Influencers (500K+)</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Macro Influencers (100K-500K)</span>
                  <span className="font-medium">35%</span>
                </div>
                <Progress value={35} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Micro Influencers (10K-100K)</span>
                  <span className="font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Checklist */}
          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Checklist</CardTitle>
                <CardDescription>Ensure ethical representation and regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceChecklist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border bg-card p-4">
                      <div className="flex items-center gap-3">
                        {item.status === "complete" ? (
                          <CheckCircle2 className="size-5 text-primary" />
                        ) : (
                          <AlertCircle className="size-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.status === "complete" ? "Completed" : "Due"} {item.date}
                          </p>
                        </div>
                      </div>
                      {item.status === "pending" && (
                        <Button variant="outline" size="sm">
                          Complete
                        </Button>
                      )}
                      {item.status === "complete" && (
                        <Badge variant="secondary">
                          <CheckCircle2 className="size-3" />
                          Done
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="size-5 text-primary" />
                  Ethical Standards Badge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your agency maintains high ethical standards with transparent revenue sharing, creator welfare
                  programs, and FTC compliance training. This positioning attracts quality creators and premium brand
                  partnerships while filtering out exploitative practices.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
