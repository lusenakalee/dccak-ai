import { AgendasHeroSection } from "@/components/agendas-comps/agendas-hero-section"
import { AgendasContentSection } from "@/components/agendas-comps/agendas-content-section"

export const metadata = {
  title: "9-Point Agenda | DCCAK",
  description: "DCCAK's 9-Point Agenda - Our Roadmap to a Creator-First Future",
}

export default function AgendasPage() {
  return (
    <main>
      <AgendasHeroSection />
      <AgendasContentSection />
    </main>
  )
}
