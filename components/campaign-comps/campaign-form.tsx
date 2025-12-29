// components/campaign-form.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CampaignFormProps {
  trigger?: React.ReactNode
  onSuccess?: () => void
}

const NICHES = [
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "BEAUTY", label: "Beauty" },
  { value: "GAMING", label: "Gaming" },
  { value: "LIFESTYLE", label: "Lifestyle" },
  { value: "FASHION", label: "Fashion" },
  { value: "FOOD", label: "Food" },
  { value: "FITNESS", label: "Fitness" },
  { value: "TRAVEL", label: "Travel" },
  { value: "EDUCATION", label: "Education" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
]

const CAMPAIGN_TYPES = [
  { value: "BRAND_CAMPAIGN", label: "Brand Campaign" },
  { value: "GRANT", label: "Grant" },
  { value: "EVENT", label: "Event" },
]

export function CampaignForm({ trigger, onSuccess }: CampaignFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignTag: "",
    dueDate: undefined as Date | undefined,
    startDate: undefined as Date | undefined,
    budget: "",
    campaignType: "",
    creatorsNeeded: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.campaignName || !formData.campaignTag || !formData.dueDate || 
        !formData.budget || !formData.campaignType || !formData.creatorsNeeded) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dueDate: formData.dueDate?.toISOString(),
          startDate: formData.startDate?.toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create campaign")
      }

      const campaign = await response.json()
      
      toast.success("Campaign created successfully!")
      setOpen(false)
      setFormData({
        campaignName: "",
        campaignTag: "",
        dueDate: undefined,
        startDate: undefined,
        budget: "",
        campaignType: "",
        creatorsNeeded: "",
        description: "",
      })
      
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Create Campaign</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Campaign Brief</DialogTitle>
          <DialogDescription>
            Start a new creator partnership campaign
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaignName">
              Campaign Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="campaignName"
              placeholder="Q2 Product Launch"
              value={formData.campaignName}
              onChange={(e) =>
                setFormData({ ...formData, campaignName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campaignTag">
                Target Niche <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.campaignTag}
                onValueChange={(value) =>
                  setFormData({ ...formData, campaignTag: value })
                }
                required
              >
                <SelectTrigger id="campaignTag">
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHES.map((niche) => (
                    <SelectItem key={niche.value} value={niche.value}>
                      {niche.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignType">
                Campaign Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.campaignType}
                onValueChange={(value) =>
                  setFormData({ ...formData, campaignType: value })
                }
                required
              >
                <SelectTrigger id="campaignType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget">
                Budget ($) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="50000"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creatorsNeeded">
                Number of Creators <span className="text-destructive">*</span>
              </Label>
              <Input
                id="creatorsNeeded"
                type="number"
                placeholder="3"
                value={formData.creatorsNeeded}
                onChange={(e) =>
                  setFormData({ ...formData, creatorsNeeded: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, startDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>
                Due Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? (
                      format(formData.dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, dueDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign objectives and requirements..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}