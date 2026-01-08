import { AboutHeroSection } from '@/components/about-comps/about-hero-section'
import { IdentitySection } from '@/components/about-comps/identity-section'
import { VisionMissionSection } from '@/components/about-comps/vision-mission-section'
import { WhatSetsUsApartSection } from '@/components/about-comps/what-sets-us-apart-section'
import { WhoAreWeSection } from '@/components/about-comps/who-are-we-section'
import React from 'react'

export default function page() {
  return (
     <main>
        <AboutHeroSection />
        <WhoAreWeSection />
        <WhatSetsUsApartSection />
        <VisionMissionSection />
        <IdentitySection />
      </main>
  )
}
