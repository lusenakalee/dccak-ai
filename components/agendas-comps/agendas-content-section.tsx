const agendas = [
  {
    number: 1,
    title: "National Creators Database",
    quote: '"If we cannot count the creators, we cannot empower them."',
    description:
      "We're building Kenya's first centralized registry of digital content creators—verified, categorized, and visible. This digital backbone ensures creators are recognized, discoverable, and included in policy, partnerships, and programming.",
    goal: "10,000 creators onboarded from all 47 counties by year's end.",
    impact: "Access to training, legal protection, gigs, grants, and recognition.",
  },
  {
    number: 2,
    title: "National Creators Training Program",
    quote: '"Passion is the start—professionalism is the path."',
    description:
      "DCCAK is rolling out a nationwide training initiative to arm creators with the skills they need to thrive—covering content monetization, intellectual property, platform strategy, digital ethics, and creative entrepreneurship.",
    goal: "12 county-based sessions, 6 national webinars, 1,000+ creators trained.",
    impact: "Creators who know their rights, their value, and their market.",
  },
  {
    number: 3,
    title: "Strategic Development Partnerships",
    quote: '"When creators meet causes, society transforms."',
    description:
      "We are forging deep alliances with NGOs, development agencies, and public interest organizations to position creators as agents of change. Whether it's climate action, civic education, or health awareness—our storytellers are on the frontlines.",
    goal: "5 formal MOUs with development partners.",
    impact: "Funded, values-driven campaigns for social impact.",
  },
  {
    number: 4,
    title: "Creator Monetization Toolkit",
    quote: '"More than likes—let\'s build livelihoods."',
    description:
      "The Toolkit is a hands-on, plain-language guide for making money in content creation: from affiliate marketing to brand deals, from fan monetization to IP licensing. No more guesswork—just a clear path to profit.",
    goal: "5,000+ creators equipped and trained to use it.",
    impact: "Less platform dependency, more creator ownership.",
  },
  {
    number: 5,
    title: "Legal Aid & Arbitration Desk",
    quote: '"In a digital world, your content is your capital—protect it."',
    description:
      "DCCAK is establishing Kenya's first legal safety net for creators—offering pro bono consultations, dispute resolution, IP protection, and contract vetting. We are turning legal vulnerability into legal empowerment.",
    goal: "300+ legal cases handled, 5 legal clinics hosted in 12 months.",
    impact: "A protected, confident creator workforce.",
  },
  {
    number: 6,
    title: "Kenya's First National Creators Summit",
    quote: '"From isolation to influence—let\'s meet, learn, and lead."',
    description:
      "This groundbreaking national event will bring together creators, brands, platforms, policymakers, and media to chart the future of the creative economy. It's more than a summit—it's a signal that creators matter.",
    goal: "500+ in-person delegates, 2,000 virtual participants.",
    impact: "Cross-sector collaboration, policy influence, and visibility.",
  },
  {
    number: 7,
    title: "DCCAK Verified Certification Program",
    quote: '"A badge of ethics. A seal of excellence."',
    description:
      "We're launching a national verification badge for creators who commit to professionalism, originality, and ethical conduct. This will help brands, fans, and platforms identify trusted creators—and reward them accordingly.",
    goal: "500 verified creators in Year 1.",
    impact: "Better brand deals, stronger audiences, and industry respect.",
  },
  {
    number: 8,
    title: "Kenya's First Creators Economic Impact Report",
    quote: "\"We've made an impact. Now, let's measure it.\"",
    description:
      "We're compiling hard data on the value creators bring to Kenya—jobs created, income generated, reach achieved, and sectors influenced. This report will inform policy, investment, and perception.",
    goal: "Q4 release, 5+ media and policy citations.",
    impact: "Data-driven decision-making for the sector.",
  },
  {
    number: 9,
    title: "The Inaugural DCCAK Digital Creators Awards",
    quote: '"Because excellence deserves applause."',
    description:
      "Our flagship event to celebrate Kenya's most impactful, innovative, and inspiring creators. Think Oscars meets Africa's Got Talent—by and for the digital generation. Creators will be honored, not exploited.",
    goal: "15 award categories, 100+ nominees, 1,000+ attendees.",
    impact: "Raised standards, inspired creators, public recognition.",
  },
]

export function AgendasContentSection() {
  return (
    <section className="bg-gradient-to-b from-[#300843] via-[#1a0424] to-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Opening Content */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 space-y-6">
          <p className="text-white text-lg leading-relaxed">
            At DCCAK, we are not just responding to the challenges content creators face—we are redesigning the
            ecosystem they operate in. Our 9-Point Agenda is a bold, strategic blueprint to professionalize, protect,
            and propel Kenya's digital creatives into a new era of dignity, opportunity, and impact.
          </p>
          <p className="text-white text-lg leading-relaxed">This agenda is more than policy—it is a promise.</p>
          <p className="text-white/80 italic text-lg leading-relaxed">
            A promise to elevate content creation from a fragmented hustle into a force for national development.
          </p>
        </div>

        {/* Agenda Items Grid */}
        <div className="grid gap-8 mb-16 lg:mb-20">
          {agendas.map((agenda) => (
            <div
              key={agenda.number}
              className="bg-white/5 border border-white/10 rounded-lg p-8 lg:p-10 hover:border-[#ff3465]/30 transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff3465] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{agenda.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-[#ff3465]">{agenda.title}</h3>
                  <p className="text-white italic text-lg">{agenda.quote}</p>
                  <p className="text-white/90 leading-relaxed">{agenda.description}</p>
                  <div className="pt-4 space-y-3 border-t border-white/10">
                    <div>
                      <p className="text-white font-semibold mb-1">Goal:</p>
                      <p className="text-white/80">{agenda.goal}</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Impact:</p>
                      <p className="text-white/80">{agenda.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Towards Tomorrow Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#ff3465]/10 to-[#ff3465]/5 border border-[#ff3465]/30 rounded-lg p-10 lg:p-12">
          <h3 className="text-3xl font-bold text-[#ff3465] mb-6">Towards Tomorrow</h3>
          <div className="space-y-6 text-white">
            <p className="text-lg leading-relaxed">
              This agenda is not a wish list—it's a working plan. A blueprint grounded in the needs of creators, and
              powered by their potential. At DCCAK, we are organizing a movement, not a moment.
            </p>
            <p className="text-lg leading-relaxed">
              Because when we invest in creators, we're investing in Kenya's cultural capital, digital democracy, and
              future economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
