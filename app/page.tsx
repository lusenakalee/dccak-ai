import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { MissionVisionSection } from "@/components/landing/mission-vision-section"
import { AgendaSection } from "@/components/landing/agenda-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { RegistrationCTA } from "@/components/landing/registration-cta"
import { GallerySection } from "@/components/landing/gallery-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <MissionVisionSection />
        <AgendaSection />
        <StatsSection />
        <FeatureSection />
        <RegistrationCTA />
        <GallerySection />
        <TestimonialsSection />
      </main>
    </div>
  )
}
