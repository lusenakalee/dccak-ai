import { CreatorDashboard } from "@/components/dashboard-comps/creator-dashboard"
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function CreatorPage() {
  const { has } = await auth()
  
  // Check if user has creator role
  const isCreator = has({ role: 'org:creator' })
  
  if (!isCreator) {
    redirect('/unauthorized')
  }

  return <CreatorDashboard />
}
