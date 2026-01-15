"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Loader2,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Campaign } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImage } from "../ProfileImage";

// Platform Connection Type
interface PlatformConnection {
  id: string;
  platform: "TIKTOK" | "INSTAGRAM";
  url: string;
  username?: string;
  followers: number;
  avatar?: string;
  verified: boolean;
  lastFetchedAt: Date;
}

interface AppliedCampaign {
  applicationId: string;
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: string;
  campaign: Campaign;
}

const contentPortfolio = [
  {
    title: "Tech Review: Latest Gadgets",
    platform: "YouTube",
    views: "2.3M",
    engagement: "8.5%",
    date: "2024-01-15",
  },
  {
    title: "Behind the Scenes",
    platform: "Instagram",
    views: "450K",
    engagement: "12.3%",
    date: "2024-01-14",
  },
  {
    title: "Daily Vlog #247",
    platform: "TikTok",
    views: "1.8M",
    engagement: "15.7%",
    date: "2024-01-13",
  },
];

const growthTimeline = [
  { month: "Jan", followers: 85000 },
  { month: "Feb", followers: 92000 },
  { month: "Mar", followers: 105000 },
  { month: "Apr", followers: 118000 },
  { month: "May", followers: 140000 },
  { month: "Jun", followers: 164000 },
];



export function CreatorDashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [opportunities, setOpportunities] = useState<Campaign[]>([]);
  const [appliedCampaigns, setAppliedCampaigns] = useState<any[]>([]);
const [appliedLoading, setAppliedLoading] = useState(true);
  const [platforms, setPlatforms] = useState<PlatformConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [platformsLoading, setPlatformsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [platformUrl, setPlatformUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
  if (!isSignedIn) return;
  fetchActiveCampaigns();
  fetchPlatforms();
  fetchAppliedCampaigns();
}, [isSignedIn]);

const fetchAppliedCampaigns = async () => {
  try {
    setAppliedLoading(true);
    const res = await fetch("/api/opportunities/applied");
    if (!res.ok) return;
    const data: AppliedCampaign[] = await res.json();
    setAppliedCampaigns(data);
  } catch (err) {
    console.error("Failed to load applied campaigns:", err);
  } finally {
    setAppliedLoading(false);
  }
};

  const fetchActiveCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/opportunities");
      if (!res.ok) return;
      const data: Campaign[] = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error("Failed to load opportunities:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlatforms = async () => {
    try {
      setPlatformsLoading(true);
      const res = await fetch("/api/platforms");
      if (!res.ok) return;
      const data: PlatformConnection[] = await res.json();
      setPlatforms(data);
    } catch (err) {
      console.error("Failed to load platforms:", err);
    } finally {
      setPlatformsLoading(false);
    }
  };

  const handleAddPlatform = async () => {
    if (!selectedPlatform || !platformUrl) return;

    try {
      setAdding(true);
      const res = await fetch("/api/platforms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          url: platformUrl,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to add platform");
        return;
      }

      await fetchPlatforms();
      setModalOpen(false);
      setSelectedPlatform("");
      setPlatformUrl("");
    } catch (err) {
      console.error("Error adding platform:", err);
      alert("Failed to add platform");
    } finally {
      setAdding(false);
    }
  };

  const handleDeletePlatform = async (id: string) => {
    if (!confirm("Remove this platform connection?")) return;

    try {
      const res = await fetch(`/api/platforms?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      await fetchPlatforms();
    } catch (err) {
      console.error("Error deleting platform:", err);
      alert("Failed to remove platform");
    }
  };

  const handleRefreshPlatforms = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/platforms/refresh", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to refresh");

      const data = await res.json();
      setPlatforms(data);
    } catch (err) {
      console.error("Error refreshing platforms:", err);
      alert("Failed to refresh platforms");
    } finally {
      setRefreshing(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "TIKTOK":
        return <Radio className="size-5 text-foreground" />;
      case "INSTAGRAM":
        return <Instagram className="size-5 text-pink-500" />;
      default:
        return null;
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getTotalFollowers = () => {
    return platforms.reduce((sum, p) => sum + p.followers, 0);
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">Sign in to view this page</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with Profile */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              {user.firstName?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-balance text-3xl font-bold tracking-tight">
                  {user.firstName}!
                </h1>
                <Badge
                  variant="outline"
                  className="gap-1 border-primary bg-primary/10 text-primary"
                >
                  <CheckCircle2 className="size-3" />
                  DCCAK Verified
                </Badge>
              </div>
              <p className="text-pretty text-muted-foreground">
                Professional Content Creator • Technology & Lifestyle
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-4" />
                  {formatFollowers(getTotalFollowers())} Total Followers
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
                <Badge className="bg-primary text-primary-foreground">
                  Professional
                </Badge>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Connected Platforms</CardTitle>
                <CardDescription>
                  Your verified social media accounts
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshPlatforms}
                  disabled={refreshing || platformsLoading}
                >
                  <RefreshCw
                    className={`size-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="size-4 mr-2" />
                      Add Platform
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Platform Connection</DialogTitle>
                      <DialogDescription>
                        Connect your TikTok or Instagram account to display
                        live stats
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select
                          value={selectedPlatform}
                          onValueChange={setSelectedPlatform}
                        >
                          <SelectTrigger id="platform">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TIKTOK">TikTok</SelectItem>
                            <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">Profile URL</Label>
                        <Input
                          id="url"
                          placeholder="https://tiktok.com/@username"
                          value={platformUrl}
                          onChange={(e) => setPlatformUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddPlatform}
                        disabled={adding || !selectedPlatform || !platformUrl}
                      >
                        {adding && (
                          <Loader2 className="size-4 mr-2 animate-spin" />
                        )}
                        Add Platform
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {platformsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : platforms.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No platforms connected. Click "Add Platform" to get started.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between rounded-lg border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(platform.platform)}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {platform.platform === "TIKTOK"
                              ? "TikTok"
                              : "Instagram"}
                          </p>
                          {platform.verified && (
                            <CheckCircle2 className="size-3 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatFollowers(platform.followers)} followers
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => window.open(platform.url, "_blank")}
                      >
                        <ExternalLink className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => handleDeletePlatform(platform.id)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for Content & Analytics */}
        <Tabs defaultValue="opportunities" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-2 lg:w-auto lg:inline-flex">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="content">Portfolio</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          {/* Opportunities Feed */}
          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaign Opportunities</CardTitle>
                <CardDescription>
                  Brands currently looking for creators
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : opportunities.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    No active opportunities right now.
                  </div>
                ) : (
                  opportunities.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Briefcase className="size-5 text-primary" />
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold">
                            {campaign.campaignName}
                          </h3>

                          {campaign.description && (
                            <p className="text-sm text-muted-foreground">
                              {campaign.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-4" />$
                              {campaign.budget.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="size-4" />
                              {campaign.creatorsNeeded} creators
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              Due{" "}
                              {format(
                                new Date(campaign.dueDate),
                                "MMM dd, yyyy"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/creator/apply-opportunity?campaignId=${campaign.id}`
                            )
                          }
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Portfolio */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Portfolio</CardTitle>
                <CardDescription>
                  Your recent content across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentPortfolio.map((content, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border bg-card p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{content.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{content.platform}</span>
                          <span>•</span>
                          <span>{content.views} views</span>
                          <span>•</span>
                          <span className="text-primary">
                            {content.engagement} engagement
                          </span>
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
                <CardDescription>
                  Your follower growth over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {growthTimeline.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-medium text-muted-foreground">
                        {data.month}
                      </span>
                      <div className="flex-1">
                        <Progress
                          value={(data.followers / 200000) * 100}
                          className="h-8"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-20 text-right text-sm font-medium">
                          {(data.followers / 1000).toFixed(0)}K
                        </span>
                        {index > 0 && (
                          <TrendingUp className="size-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-5 text-primary" />
                      <span className="font-medium">Total Growth</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      +93% YTD
                    </span>
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
                <CardDescription>
                  Your applied brand partnerships and campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
  {appliedLoading ? (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : appliedCampaigns.length === 0 ? (
    <div className="py-8 text-center text-muted-foreground">
      You haven't applied to any campaigns yet.
    </div>
  ) : (
    <div className="space-y-3">
      {appliedCampaigns.map((application) => (
        <div
          key={application.applicationId}
          className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{application.campaign.campaignName}</p>
              <Badge 
                variant={
                  application.applicationStatus === "APPROVED" 
                    ? "default" 
                    : application.applicationStatus === "PENDING"
                    ? "secondary"
                    : "destructive"
                }
              >
                {application.applicationStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <DollarSign className="size-3" />
                ${application.campaign.budget.toLocaleString()}
              </span>
              <span>•</span>
              <span>Applied {format(new Date(application.appliedAt), "MMM dd, yyyy")}</span>
              <span>•</span>
              <span className="capitalize">{application.campaign.campaignTag.toLowerCase()}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      ))}
    </div>
  )}
</CardContent>
            </Card>

            {/* Reputation Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  Reputation Score
                </CardTitle>
                <CardDescription>
                  Used for brand matching (visible to brands only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-primary">4.8</span>
                    <div className="text-right">
                      <p className="text-sm font-medium">Excellent Standing</p>
                      <p className="text-xs text-muted-foreground">
                        Top 10% of creators
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Campaign Completion
                      </span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Brand Satisfaction
                      </span>
                      <span className="font-medium">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Content Quality
                      </span>
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
  );
}