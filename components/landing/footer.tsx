import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#300843] border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-[#ff3465] font-bold text-xl mb-4">DCCAK</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering Kenya's digital content creators through advocacy, training, and opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Our Agenda", "Membership", "Events", "Resources"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/80 hover:text-[#ff3465] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>info@dccak.ke</span>
              </li>
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-white/10 hover:bg-[#ff3465] text-white rounded-full transition-colors"
                  aria-label="Social media link"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/60 text-sm text-center">
            © {new Date().getFullYear()} Digital Content Creators Association of Kenya (DCCAK). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
