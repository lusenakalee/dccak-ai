import { BrandDashboard } from "@/components/dashboard-comps/brand-dashboard"
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function BrandPage() {
  // const { has } = await auth()
  
  // // Check if user has brand role
  // const isBrand = has({ role: 'org:brand' })
  
  // if (!isBrand) {
  //   redirect('/unauthorized')
  // }

  return <BrandDashboard />
}
