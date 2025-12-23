import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const galleryImages = [
  "/images/african-content-creators-workshop-event.jpg",
  "/images/kenya-digital-creators-filming-production.jpg",
  "/images/african-youth-creating-social-media-content.jpg",
  "/images/content-creation-training-session-kenya.jpg",
  "/images/kenyan-creators-networking-event.jpg",
  "/images/digital-media-conference-africa.jpg",
]

export function GallerySection() {
  return (
    <section className="bg-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-4">Our Impact in Action</h2>
          <p className="text-white text-lg">See how DCCAK is transforming the creative landscape across Kenya</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={image || "/images/placeholder.svg"}
                alt={`DCCAK Event ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#ff3465]/0 group-hover:bg-[#ff3465]/20 transition-colors" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-[#ff3465] text-[#ff3465] hover:bg-[#ff3465] hover:text-white bg-transparent"
          >
            View All Photos <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  )
}
