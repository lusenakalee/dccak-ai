"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 64000, suffix: "+", label: "Active Creators In Kenya" },
  { value: 42, suffix: "%", label: "Internet Penetration" },
  { value: 31, suffix: "%", label: "Sustainable creator income" },
  { value: 13, suffix: "M", label: "Projected National Reach" },
]

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(progress * end))

            if (progress === 1) {
              clearInterval(timer)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={countRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff3465]">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="bg-gradient-to-b from-[#626262] to-[#300843] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Shaping the Future of Kenya's Creative Economy
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="text-white text-lg mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
