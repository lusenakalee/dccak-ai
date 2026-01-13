import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, UserPlus } from "lucide-react"

export function RegistrationCTA() {
  return (
    <section className="bg-linear-to-br from-[#300843] to-[#626262] py-16 lg:py-24" id="membership">
      <div className="container mx-auto px-4">
        <Card className="bg-white/5 border-[#ff3465] border-2 p-8 lg:p-12 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-[#ff3465] rounded-full mb-4">
              <UserPlus className="text-white" size={48} />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465]">Join DCCAK Today</h2>

            <p className="text-white text-lg leading-relaxed max-w-2xl mx-auto">
              Become part of Kenya's largest network of digital content creators. Access exclusive training, legal
              support, partnerships, and opportunities to grow your creative career.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto my-8">
              {[
                "Access to training programs",
                "Legal protection and advocacy",
                "Monetization toolkit",
                "Networking opportunities",
                "Industry partnerships",
                "Creator database listing",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle className="text-[#ff3465] shrink-0" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[#ff3465] hover:bg-[#ff3465]/90 text-white text-lg px-8">
              Register Now
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
