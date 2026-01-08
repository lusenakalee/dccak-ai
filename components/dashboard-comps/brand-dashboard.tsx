// components/brand-dashboard.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import {
    Award,
    BarChart3,
    Calendar,
    CheckCircle2,
    DollarSign,
    Eye,
    FileText,
    Heart,
    Loader2,
    MessageCircle,
    Plus,
    Search,
    Share2,
    Target,
    TrendingUp,
    Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import { CampaignForm } from "../campaign-comps/campaign-form"
import { format } from "date-fns"

// Mock data for creators (until you build creator functionality)
const creators = [
  {
    id: 1,
    name: "Jane Doe",
    avatar: "JD",
    niche: "Technology",
    region: "North America",
    followers: "464K",
    engagement: "11.2%",
    avgViews: "285K",
    rating: 4.8,
    verified: true,
    priceRange: "$5,000-$15,000",
  },
  {
    id: 2,
    name: "Sarah Lee",
    avatar: "SL",
    niche: "Beauty",
    region: "North America",
    followers: "512K",
    engagement: "13.5%",
    avgViews: "320K",
    rating: 4.9,
    verified: true,
    priceRange: "$8,000-$20,000",
  },
  {
    id: 3,
    name: "Mike Chen",
    avatar: "MC",
    niche: "Gaming",
    region: "Asia Pacific",
    followers: "890K",
    engagement: "15.1%",
    avgViews: "520K",
    rating: 4.7,
    verified: true,
    priceRange: "$12,000-$30,000",
  },
  {
    id: 4,
    name: "Alex Rivera",
    avatar: "AR",
    niche: "Lifestyle",
    region: "Europe",
    followers: "325K",
    engagement: "10.8%",
    avgViews: "180K",
    rating: 4.6,
    verified: true,
    priceRange: "$4,000-$10,000",
  },
]

const historicalCampaigns = [
  {
    name: "Holiday Gift Guide 2023",
    creator: "Jane Doe",
    completed: "2023-12-20",
    budget: "$12,000",
    impressions: "3.2M",
    engagement: "14.5%",
    conversions: "8,400",
    roi: "385%",
  },
  {
    name: "New Year Wellness",
    creator: "Alex Rivera",
    completed: "2024-01-10",
    budget: "$8,000",
    impressions: "1.8M",
    engagement: "11.8%",
    conversions: "4,200",
    roi: "290%",
  },
  {
    name: "Tech Review Series",
    creator: "Jane Doe",
    completed: "2023-11-15",
    budget: "$15,000",
    impressions: "4.5M",
    engagement: "12.3%",
    conversions: "12,800",
    roi: "420%",
  },
]

export function BrandDashboard() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [followerRange, setFollowerRange] = useState([0, 1000000])
  const router = useRouter()


  // Fetch campaigns from API
  useEffect(() => {
    if (isSignedIn) {
      fetchCampaigns()
    }
  }, [isSignedIn])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/campaigns")
      if (response.ok) {
        const data = await response.json()
        setCampaigns(data)
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sign in to view this page</h2>
        </div>
      </div>
    )
  }

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesNiche = selectedNiche === "all" || creator.niche === selectedNiche
    const matchesRegion = selectedRegion === "all" || creator.region === selectedRegion
    return matchesSearch && matchesNiche && matchesRegion
  })

  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE")
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0)
  const avgEngagement = campaigns.length > 0
    ? (campaigns.reduce((sum, c) => sum + (c.engagement || 0), 0) / campaigns.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-balance text-3xl font-bold tracking-tight">
              {user.firstName}'s Dashboard
            </h1>
            <p className="text-pretty text-muted-foreground">
              Premium technology brand • DCCAK Partner Network
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="size-4" />
              Reports
            </Button>
            <CampaignForm
              trigger={
                <Button>
                  <Plus className="size-4" />
                  New Campaign
                </Button>
              }
              onSuccess={fetchCampaigns}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Target className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCampaigns.length}</div>
              <p className="text-xs text-muted-foreground">{campaigns.length} total campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalImpressions > 0 ? `${(totalImpressions / 1000000).toFixed(1)}M` : "0"}
              </div>
              <p className="text-xs text-muted-foreground">Campaign impressions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <BarChart3 className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">Across all campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">365%</div>
              <p className="text-xs text-muted-foreground">Average return</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-4">
<TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="discovery">Creator Discovery</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Campaigns */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Campaigns</CardTitle>
                <CardDescription>Monitor your ongoing creator partnerships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>No campaigns yet. Create your first campaign to get started!</p>
                  </div>
                ) : (
                  campaigns.map((campaign) => (
                    <div key={campaign.id} className="space-y-3 rounded-lg border bg-card p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{campaign.campaignName}</h3>
                            <Badge variant={campaign.status === "ACTIVE" ? "default" : "secondary"}>
                              {campaign.status.toLowerCase()}
                            </Badge>
                            <Badge variant="outline">{campaign.campaignTag}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="size-4" />
                              {campaign.creatorsNeeded} creators needed
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-4" />
                              ${campaign.budget.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              Due: {format(new Date(campaign.dueDate), "MMM dd, yyyy")}
                            </span>
                          </div>
                          {campaign.description && (
                            <p className="text-sm text-muted-foreground">{campaign.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-muted-foreground">
                              <Eye className="inline size-4" /> {campaign.impressions.toLocaleString()} impressions
                            </span>
                            <span className="text-primary">
                              <TrendingUp className="inline size-4" /> {campaign.engagement}% engagement
                            </span>
                          </div>
                        </div>
                        <Button 
        variant="outline" 
        size="sm"
        onClick={() => router.push(`/dashboard/brand/details?id=${campaign.id}`)}
      >
        View Details
      </Button>
                      </div>
                      {campaign.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Campaign Progress</span>
                            <span className="font-medium">{campaign.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creator Discovery */}
          <TabsContent value="discovery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discover Creators</CardTitle>
                <CardDescription>Find verified creators filtered by niche, audience size, and region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search & Filters */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Niche" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Niches</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Beauty">Beauty</SelectItem>
                          <SelectItem value="Gaming">Gaming</SelectItem>
                          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Follower Range: {(followerRange[0] / 1000).toFixed(0)}K - {(followerRange[1] / 1000).toFixed(0)}K
                    </Label>
                    <Slider
                      value={followerRange}
                      onValueChange={setFollowerRange}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Creator Results */}
                <div className="space-y-3">
                  {filteredCreators.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
                          {creator.avatar}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{creator.name}</h3>
                            {creator.verified && <CheckCircle2 className="size-4 text-primary" />}
                            <Badge variant="outline">{creator.niche}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="size-4" />
                              {creator.followers}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="size-4" />
                              {creator.avgViews} avg views
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <TrendingUp className="size-4" />
                              {creator.engagement} engagement
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="size-4 text-primary" />
                              {creator.rating}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <Badge variant="secondary">{creator.region}</Badge>
                            <span className="text-muted-foreground">{creator.priceRange}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Campaign Performance</CardTitle>
                <CardDescription>Analyze past campaigns powered by Determ + platform data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalCampaigns.map((campaign, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <Badge variant="outline">{campaign.creator}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>Completed {campaign.completed}</span>
                          <span>•</span>
                          <span>{campaign.budget}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                          <div>
                            <p className="text-muted-foreground">Impressions</p>
                            <p className="font-medium">{campaign.impressions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Engagement</p>
                            <p className="font-medium text-primary">{campaign.engagement}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Conversions</p>
                            <p className="font-medium">{campaign.conversions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ROI</p>
                            <p className="font-medium text-primary">{campaign.roi}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="size-4" />
                        Report
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Breakdown</CardTitle>
                  <CardDescription>Average metrics across all campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="size-4 text-muted-foreground" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <span className="font-medium">45.2K avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="size-4 text-muted-foreground" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="font-medium">3.8K avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="size-4 text-muted-foreground" />
                      <span className="text-sm">Shares</span>
                    </div>
                    <span className="font-medium">2.1K avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="size-4 text-muted-foreground" />
                      <span className="text-sm">Click-through Rate</span>
                    </div>
                    <span className="font-medium text-primary">8.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Niches</CardTitle>
                  <CardDescription>Best ROI by creator category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Technology</span>
                      <span className="font-medium text-primary">402% avg ROI</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[90%] bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Beauty</span>
                      <span className="font-medium text-primary">365% avg ROI</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[75%] bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Gaming</span>
                      <span className="font-medium text-primary">298% avg ROI</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[60%] bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lifestyle</span>
                      <span className="font-medium text-primary">285% avg ROI</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[55%] bg-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}