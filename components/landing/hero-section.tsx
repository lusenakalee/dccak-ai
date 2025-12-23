import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-[#300843] relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff3465] leading-tight">
              Empowering Kenya's Digital Content Creators
            </h1>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              The Digital Content Creators Association of Kenya (DCCAK) is a national umbrella organization dedicated to
              advocating for, organizing, and professionalizing the work of digital content creators across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#ff3465] hover:bg-[#ff3465]/90 text-white">
                Join DCCAK Today <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="/images/diverse-african-content-creators-filming-and-creat.jpg"
              alt="Digital Content Creators"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
