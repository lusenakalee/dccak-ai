export function FeatureSection() {
  return (
    <section className="bg-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="/images/african-person-speaking-at-conference-microphone-p.jpg"
              alt="DCCAK Representative Speaking"
              className="w-full h-full object-contain"
              style={{
                filter: "brightness(1.1) contrast(1.2)",
                mixBlendMode: "lighten",
              }}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Amplifying Creator Voices Through Advocacy
            </h2>
            <p className="text-white text-lg leading-relaxed">
              DCCAK stands at the forefront of policy discussions, ensuring that the interests of digital content
              creators are represented in national conversations about intellectual property, digital rights, and
              creative economy development.
            </p>
            <p className="text-white text-lg leading-relaxed">
              We engage with government bodies, private sector partners, and international organizations to create an
              enabling environment for creators to thrive and succeed in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
