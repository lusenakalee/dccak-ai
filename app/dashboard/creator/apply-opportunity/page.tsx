"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

function ApplyOpportunityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const campaignId = searchParams.get("campaignId")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!campaignId) {
      router.replace("/dashboard/creator")
    }
  }, [campaignId, router])

  const apply = async () => {
    if (!campaignId) return

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        `/api/opportunities/${campaignId}/apply`,
        { method: "POST" }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Application failed")
        return
      }

      setSuccess(true)
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Apply to Campaign</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {success ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="text-center font-medium">
                Application submitted successfully!
              </p>
              <Button onClick={() => router.push("/dashboard/creator")}>
                Back to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground">
                You are about to apply to this campaign. Brands will review your
                profile and contact you if shortlisted.
              </p>

              {error && (
                <p className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              <Button
                className="w-full"
                onClick={apply}
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Apply Now
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ApplyOpportunityPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-xl py-12">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    }>
      <ApplyOpportunityContent />
    </Suspense>
  )
}