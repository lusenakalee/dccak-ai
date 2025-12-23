import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const topAgendas = [
  {
    title: "National Creators Database",
    goal: "10,000 creators onboarded from all 47 counties.",
    impact: "Access to training, legal protection and recognition",
    image: "/images/diverse-database-network-african-creators.jpg",
  },
  {
    title: "National Training Program",
    goal: "12 county-based sessions, 6 national webinars, 1,000+ creators trained.",
    impact: "Creators who know their rights, their value, and their market.",
    image: "/images/african-people-learning-training-workshop.jpg",
  },
  {
    title: "Strategic Development Partnerships",
    goal: "5 formal MOUs with development partners.",
    impact: "Funded, values-driven campaigns for social impact.",
    image: "/images/business-partnership-handshake-collaboration.jpg",
  },
  {
    title: "Creator Monetization Toolkit",
    goal: "5,000+ creators equipped and trained to use it.",
    impact: "Less platform dependency, more creator ownership.",
    image: "/images/digital-tools-monetization-revenue-growth.jpg",
  },
]

export function AgendaSection() {
  return (
    <section className="bg-gradient-to-b from-[#300843] to-[#626262] py-16 lg:py-24" id="agenda">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-4">Our 9 Point Agenda</h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            A comprehensive strategy to transform Kenya's digital content creation landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {topAgendas.map((agenda, index) => (
            <div key={index} className="relative h-[350px] rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={agenda.image || "/placeholder.svg"}
                alt={agenda.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#300843] via-[#300843]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-[#ff3465] text-xl font-bold mb-2">{agenda.title}</h3>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Goal:</span> {agenda.goal}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Impact:</span> {agenda.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-[#ff3465] hover:bg-[#ff3465]/90 text-white">
            See All 9 Agendas <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  )
}
