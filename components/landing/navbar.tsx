"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const navItems = [
  { label: "Who are we?", href: "#who-are-we" },
  { label: "9 Point Agenda", href: "#agenda" },
  { label: "Press Statement", href: "#press" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Become A Member", href: "#membership" },
  { label: "Opportunities", href: "#opportunities" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#300843] sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-white font-bold text-xl lg:text-2xl">
             <img
                src='/images/signal.png'
                alt="logo"
                className="w-16 h-16 rounded-full object-cover"
              />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-sm font-medium relative py-2 transition-colors hover:text-[#ff3465] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#ff3465] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {item.label}
              </Link>
            ))}
               <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-white py-3 text-sm font-medium border-b border-white/10 hover:text-[#ff3465] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
