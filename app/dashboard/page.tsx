import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Target } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight">DCCAK Creator Platform</h1>
          <p className="text-pretty text-muted-foreground">Where verified creators, agencies, and brands collaborate</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group transition-all hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="size-6 text-primary" />
              </div>
              <CardTitle>Creator Dashboard</CardTitle>
              <CardDescription>Manage your verified profile, portfolio, and discover opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/creator">
                <Button className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="size-6 text-primary" />
              </div>
              <CardTitle>Agency Dashboard</CardTitle>
              <CardDescription>Roster management, campaigns, and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/agency">
                <Button className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <CardTitle>Brand Dashboard</CardTitle>
              <CardDescription>Discover creators, launch campaigns, and track performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/brand">
                <Button className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
