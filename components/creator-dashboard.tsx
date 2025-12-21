"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Award,
  Youtube,
  Instagram,
  Radio,
  Briefcase,
  Gift,
  Target,
  BarChart3,
} from "lucide-react"

// Mock data
const platformLinks = [
  { name: "YouTube", url: "youtube.com/@creator", followers: "125K", icon: Youtube, color: "text-red-500" },
  { name: "Instagram", url: "instagram.com/creator", followers: "89K", icon: Instagram, color: "text-pink-500" },
  { name: "TikTok", url: "tiktok.com/@creator", followers: "210K", icon: Radio, color: "text-foreground" },
  { name: "Podcast", url: "podcast.fm/creator", followers: "45K", icon: Radio, color: "text-primary" },
]

const contentPortfolio = [
  { title: "Tech Review: Latest Gadgets", platform: "YouTube", views: "2.3M", engagement: "8.5%", date: "2024-01-15" },
  { title: "Behind the Scenes", platform: "Instagram", views: "450K", engagement: "12.3%", date: "2024-01-14" },
  { title: "Daily Vlog #247", platform: "TikTok", views: "1.8M", engagement: "15.7%", date: "2024-01-13" },
  {
    title: "Interview with Industry Leader",
    platform: "Podcast",
    views: "78K",
    engagement: "9.2%",
    date: "2024-01-12",
  },
]

const opportunities = [
  {
    type: "Brand Campaign",
    title: "Tech Brand Partnership Q1",
    budget: "$15,000",
    deadline: "2024-02-15",
    tags: ["Technology", "Review", "Sponsored"],
    icon: Briefcase,
  },
  {
    type: "Grant",
    title: "Creator Development Fund",
    budget: "$5,000",
    deadline: "2024-02-28",
    tags: ["Education", "Growth"],
    icon: Gift,
  },
  {
    type: "Event",
    title: "CreatorCon 2024 Speaker",
    budget: "Paid",
    deadline: "2024-03-10",
    tags: ["Speaking", "Networking"],
    icon: Users,
  },
]

const growthTimeline = [
  { month: "Jan", followers: 85000 },
  { month: "Feb", followers: 92000 },
  { month: "Mar", followers: 105000 },
  { month: "Apr", followers: 118000 },
  { month: "May", followers: 140000 },
  { month: "Jun", followers: 164000 },
]

const campaignHistory = [
  { name: "Summer Tech Series", revenue: "$12,500", completion: "2023-08", rating: 4.8 },
  { name: "Holiday Gift Guide", revenue: "$18,000", completion: "2023-12", rating: 4.9 },
  { name: "New Year Wellness", revenue: "$8,500", completion: "2024-01", rating: 4.7 },
]

export function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with Profile */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              JD
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-balance text-3xl font-bold tracking-tight">Jane Doe</h1>
                <Badge variant="outline" className="gap-1 border-primary bg-primary/10 text-primary">
                  <CheckCircle2 className="size-3" />
                  DCCAK Verified
                </Badge>
              </div>
              <p className="text-pretty text-muted-foreground">Professional Content Creator • Technology & Lifestyle</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-4" />
                  464K Total Followers
                </span>
                <span className="flex items-center gap-1">
                  <Award className="size-4" />
                  Reputation: 4.8
                </span>
              </div>
            </div>
          </div>

          {/* Membership Status */}
          <Card className="md:w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Membership Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge className="bg-primary text-primary-foreground">Professional</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Renewal</span>
                <span className="text-sm font-medium">Mar 15, 2024</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Days Remaining</span>
                  <span>52 days</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <Button className="w-full" size="sm">
                Manage Membership
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Links */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>Your verified social media accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {platformLinks.map((platform) => {
                const Icon = platform.icon
                return (
                  <div key={platform.name} className="flex items-center justify-between rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`size-5 ${platform.color}`} />
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-xs text-muted-foreground">{platform.followers}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ExternalLink className="size-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Content & Analytics */}
        <Tabs defaultValue="opportunities" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="content">Portfolio</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          {/* Opportunities Feed */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Opportunities</CardTitle>
                <CardDescription>Brand campaigns, grants, and events matched to your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunities.map((opp, index) => {
                  const Icon = opp.icon
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {opp.type}
                            </Badge>
                            <h3 className="font-semibold">{opp.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {opp.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-4" />
                              {opp.budget}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              Due {opp.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Portfolio */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Portfolio</CardTitle>
                <CardDescription>Your recent content across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentPortfolio.map((content, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border bg-card p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{content.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{content.platform}</span>
                          <span>•</span>
                          <span>{content.views} views</span>
                          <span>•</span>
                          <span className="text-primary">{content.engagement} engagement</span>
                          <span>•</span>
                          <span>{content.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Growth Timeline */}
          <TabsContent value="growth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Growth</CardTitle>
                <CardDescription>Your follower growth over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {growthTimeline.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-medium text-muted-foreground">{data.month}</span>
                      <div className="flex-1">
                        <Progress value={(data.followers / 200000) * 100} className="h-8" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-20 text-right text-sm font-medium">
                          {(data.followers / 1000).toFixed(0)}K
                        </span>
                        {index > 0 && <TrendingUp className="size-4 text-primary" />}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-5 text-primary" />
                      <span className="font-medium">Total Growth</span>
                    </div>
                    <span className="text-lg font-bold text-primary">+93% YTD</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign History */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Participation History</CardTitle>
                <CardDescription>Your completed brand partnerships and campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaignHistory.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border bg-card p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{campaign.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="size-3" />
                            {campaign.revenue}
                          </span>
                          <span>•</span>
                          <span>Completed {campaign.completion}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Award className="size-3 text-primary" />
                            {campaign.rating} rating
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reputation Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  Reputation Score
                </CardTitle>
                <CardDescription>Used for brand matching (visible to brands only)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-primary">4.8</span>
                    <div className="text-right">
                      <p className="text-sm font-medium">Excellent Standing</p>
                      <p className="text-xs text-muted-foreground">Top 10% of creators</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Campaign Completion</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Brand Satisfaction</span>
                      <span className="font-medium">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Content Quality</span>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
