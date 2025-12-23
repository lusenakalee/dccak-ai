import { Card } from "@/components/ui/card"
import { Target, Eye } from "lucide-react"

export function MissionVisionSection() {
  return (
    <section className="bg-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#ff3465] rounded-lg">
                <Target className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-[#ff3465] text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-white leading-relaxed">
                  To unite, empower, and professionalize Kenya's digital content creators by providing advocacy,
                  resources, training, and opportunities that enable sustainable creative careers and amplify our
                  collective voice.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#ff3465] rounded-lg">
                <Eye className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-[#ff3465] text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-white leading-relaxed">
                  A thriving ecosystem where Kenyan digital content creators are recognized, respected, and rewarded for
                  their contribution to culture, economy, and society—shaping narratives that inspire both locally and
                  globally.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
