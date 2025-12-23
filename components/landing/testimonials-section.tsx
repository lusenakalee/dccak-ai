"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Amina Hassan",
    role: "Content Creator & Influencer",
    content:
      "Joining DCCAK has been transformative for my career. The training programs and networking opportunities have opened doors I never thought possible. I now understand my rights and value as a creator.",
    avatar: "/images/african-woman-content-creator-smiling.jpg",
  },
  {
    name: "David Mwangi",
    role: "YouTube Creator",
    content:
      "The monetization toolkit provided by DCCAK helped me diversify my income streams. I'm no longer solely dependent on ad revenue, and my creative business is now sustainable.",
    avatar: "/images/african-man-youtuber-portrait.jpg",
  },
  {
    name: "Grace Ochieng",
    role: "Digital Storyteller",
    content:
      "DCCAK's advocacy work is changing the game for all of us. It's empowering to have an organization that truly understands our challenges and fights for our interests at the national level.",
    avatar: "/images/african-woman-filmmaker-professional.jpg",
  },
  {
    name: "James Kipchoge",
    role: "Podcast Host",
    content:
      "The community DCCAK has built is incredible. Being connected with fellow creators across all 47 counties has enriched my content and expanded my audience significantly.",
    avatar: "/images/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-gradient-to-b from-[#300843] to-[#626262] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3465] mb-4">Creator Success Stories</h2>
          <p className="text-white text-lg">Hear from members who are thriving with DCCAK</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-white/5 border-white/10 p-8 lg:p-12">
            <Quote className="text-[#ff3465] mb-6" size={48} />

            <p className="text-white text-lg lg:text-xl leading-relaxed mb-8 min-h-[120px]">
              "{testimonials[currentIndex].content}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-[#ff3465] font-bold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-white/70">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-[#ff3465]" : "w-2 bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
