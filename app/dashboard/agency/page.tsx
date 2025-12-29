import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { AgencyDashboard } from "@/components/dashboard-comps/agency-dashboard"

export default async function AgencyPage() {
  // const { has } = await auth()
  
  // // Check if user has agency role
  // const isAgency = has({ role: 'org:agency' })
  
  // if (!isAgency) {
  //   redirect('/unauthorized')
  // }

  return <AgencyDashboard />
}