export function VisionMissionSection() {
  return (
    <section className="bg-gradient-to-b from-[#300843] to-[#1a0424] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Vision */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-6">Our Vision</h2>
            <p className="text-white text-base md:text-lg leading-relaxed">
              "To build a sustainable, ethical, and inclusive creative economy in Kenya where digital content creators
              are respected as professionals, protected by policy, empowered by knowledge, and central to national
              development."
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-6">Our Mission</h2>
            <p className="text-white text-base md:text-lg leading-relaxed">
              To organize, empower, and advocate for Kenya's digital creators through structured programs in training,
              legal protection, partnerships, and policy engagement—ensuring that content creation becomes a respected,
              secure, and sustainable profession.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
