// components/dashboard-comps/brand-details.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Eye,
  Loader2,
  Save,
  Send,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { format } from "date-fns"
import { toast } from "sonner"

function BrandDetailsContent() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const campaignId = searchParams.get("id")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignTag: "",
    description: "",
    campaignType: "",
    budget: "",
    creatorsNeeded: "",
    startDate: "",
    dueDate: "",
    impressions: 0,
    engagement: 0,
    progress: 0,
  })

  useEffect(() => {
    if (campaignId && isSignedIn) {
      fetchCampaignDetails()
    } else if (!campaignId) {
      setLoading(false)
    }
  }, [campaignId, isSignedIn])

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/campaigns/${campaignId}`)
      if (response.ok) {
        const campaign = await response.json()
        setFormData({
          campaignName: campaign.campaignName,
          campaignTag: campaign.campaignTag,
          description: campaign.description || "",
          campaignType: campaign.campaignType,
          budget: campaign.budget.toString(),
          creatorsNeeded: campaign.creatorsNeeded.toString(),
          startDate: campaign.startDate ? format(new Date(campaign.startDate), "yyyy-MM-dd") : "",
          dueDate: format(new Date(campaign.dueDate), "yyyy-MM-dd"),
          impressions: campaign.impressions || 0,
          engagement: campaign.engagement || 0,
          progress: campaign.progress || 0,
        })
        setIsActive(campaign.status === "ACTIVE")
      } else {
        toast("Failed to load campaign details")
        router.push("/dashboard/brand")
      }
    } catch (error) {
      console.error("Error fetching campaign:", error)
      toast.error("Failed to load campaign details")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (shouldActivate: boolean = false) => {
    try {
      setSaving(true)

      const status = shouldActivate ? "ACTIVE" : "DRAFT"

      const payload = {
        ...formData,
        budget: parseFloat(formData.budget),
        creatorsNeeded: parseInt(formData.creatorsNeeded),
        status,
      }

      const url = campaignId ? `/api/campaigns/${campaignId}` : "/api/campaigns"
      const method = campaignId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const campaign = await response.json()
        setIsActive(campaign.status === "ACTIVE")
       
        toast.success(
          shouldActivate
            ? "Campaign posted successfully and is now live!"
            : "Campaign saved as draft"
        )

        if (!campaignId) {
          router.push(`/dashboard/brand/details?id=${campaign.id}`)
        }
      } else {
        throw new Error("Failed to save campaign")
      }
    } catch (error) {
      console.error("Error saving campaign:", error)
      toast.error("Failed to save campaign. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleStatusToggle = async (checked: boolean) => {
    const newStatus = checked ? "ACTIVE" : "DRAFT"
   
    try {
      setSaving(true)
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget),
          creatorsNeeded: parseInt(formData.creatorsNeeded),
          status: newStatus,
        }),
      })

      if (response.ok) {
        setIsActive(checked)
        toast.success(
          checked
            ? "Campaign is now active and visible to creators"
            : "Campaign moved to draft"
        )
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update campaign status")
    } finally {
      setSaving(false)
    }
  }

  if (!isLoaded || loading) {
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/brand")}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {campaignId ? "Campaign Details" : "New Campaign"}
            </h1>
            <p className="text-muted-foreground">
              {campaignId ? "View and manage your campaign" : "Create a new campaign"}
            </p>
          </div>

          {campaignId && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="status-toggle" className="text-sm font-medium">
                  {isActive ? "Active" : "Draft"}
                </Label>
                <Switch
                  id="status-toggle"
                  checked={isActive}
                  onCheckedChange={handleStatusToggle}
                  disabled={saving}
                />
              </div>
              <Badge variant={isActive ? "default" : "secondary"} className="text-sm">
                {isActive ? "Live" : "Draft"}
              </Badge>
            </div>
          )}
        </div>

        {/* Campaign Stats - Only show for existing campaigns */}
        {campaignId && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="size-4 text-muted-foreground" />
                  Impressions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formData.impressions.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="size-4 text-muted-foreground" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formData.engagement}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="size-4 text-muted-foreground" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formData.progress}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  Applicants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Campaign Form */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
            <CardDescription>
              {campaignId ? "Update your campaign details" : "Fill in the campaign details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  name="campaignName"
                  placeholder="e.g., Summer Product Launch"
                  value={formData.campaignName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campaign Tag */}
              <div className="space-y-2">
                <Label htmlFor="campaignTag">Campaign Tag *</Label>
                <Input
                  id="campaignTag"
                  name="campaignTag"
                  placeholder="e.g., #SummerVibes2024"
                  value={formData.campaignTag}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campaign Type */}
              <div className="space-y-2">
                <Label htmlFor="campaignType">Campaign Type *</Label>
                <Select
                  value={formData.campaignType}
                  onValueChange={(value) => handleSelectChange("campaignType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Review">Product Review</SelectItem>
                    <SelectItem value="Brand Partnership">Brand Partnership</SelectItem>
                    <SelectItem value="Sponsored Content">Sponsored Content</SelectItem>
                    <SelectItem value="Event Coverage">Event Coverage</SelectItem>
                    <SelectItem value="Affiliate Marketing">Affiliate Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="15000"
                    className="pl-9"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Creators Needed */}
              <div className="space-y-2">
                <Label htmlFor="creatorsNeeded">Creators Needed *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="creatorsNeeded"
                    name="creatorsNeeded"
                    type="number"
                    placeholder="3"
                    className="pl-9"
                    value={formData.creatorsNeeded}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="pl-9"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="pl-9"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your campaign objectives, deliverables, and requirements..."
                className="min-h-32"
                value={formData.description}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                Provide clear details about what you expect from creators
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="sm:w-auto"
          >
            {saving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="sm:w-auto"
          >
            {saving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Send className="mr-2 size-4" />
            )}
            {isActive ? "Update & Keep Active" : "Post Campaign"}
          </Button>
        </div>

        {/* Help Text */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Campaign Status Guide</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Draft:</strong> Only visible to you. Use this to prepare your campaign before going live.</li>
                <li>• <strong>Active:</strong> Visible to all creators. They can view and apply to your campaign.</li>
                <li>• Toggle the switch above to instantly change between Draft and Active status.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function BrandDetails() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <BrandDetailsContent />
    </Suspense>
  )
}