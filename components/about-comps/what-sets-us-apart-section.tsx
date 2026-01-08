export function WhatSetsUsApartSection() {
  const differentiators = [
    {
      title: "Legal Recognition",
      description:
        "DCCAK is the first legally registered association of its kind in Africa, giving us the legitimacy to advocate for creators' rights and engage policymakers on matters affecting the digital economy.",
    },
    {
      title: "Professional Mandate",
      description:
        "We go beyond visibility and virality. Our focus is on building systems of legal protection, structured monetization, formal education, and ethical standards that transform content creation into a respected profession.",
    },
    {
      title: "Inclusivity & Equity",
      description:
        "DCCAK is open to all creators, regardless of platform size, background, location, or genre. From rural counties to urban centers, we ensure that women, youth, and marginalized voices have equitable access to opportunity.",
    },
    {
      title: "Strategic Leadership",
      description:
        "Our leadership is composed of some of Kenya's most accomplished digital creators and media professionals—including Chairman Bob Ndolo, Secretary General Terence Creative, Director Trevor, and Board Member Lucia Musau—backed by experts in law, policy, media, and development.",
    },
    {
      title: "National Footprint",
      description:
        "With upcoming regional engagements across all 47 counties, DCCAK is building a truly grassroots-to-national framework that reflects the diverse landscape of Kenyan creators.",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-[#1a0424] to-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-12 text-center">
          What Sets Us Apart
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="bg-[#300843]/50 backdrop-blur p-8 rounded-lg border border-[#ff3465]/20 hover:border-[#ff3465]/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-[#ff3465] mb-4">{item.title}</h3>
              <p className="text-white text-base leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
