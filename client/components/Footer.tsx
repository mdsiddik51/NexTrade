import React from "react";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Corporate Law", href: "/explore?category=corporate" },
    { label: "Criminal Defense", href: "/explore?category=criminal" },
    { label: "Family Law", href: "/explore?category=family" },
    { label: "Intellectual Property", href: "/explore?category=intellectual-property" },
    { label: "Immigration Law", href: "/explore?category=immigration" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Explore Lawyers", href: "/explore" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#07080A] border-t border-white/[0.04]">
      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center">
                <Scale className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Lex<span className="text-[#FF9500]">Vizo</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Connecting clients with elite legal professionals. Secure, transparent, and efficient legal services at your fingertips.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {["X", "Li", "Fb", "Ig"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-bold text-gray-500 hover:text-[#FF9500] hover:border-[#FF9500]/30 transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#FF9500] font-semibold mb-5">
              Legal Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#FF9500] font-semibold mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#FF9500] font-semibold mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">
                  1200 Justice Avenue, Suite 400
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-600 shrink-0" />
                <a
                  href="tel:+12125551234"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  +1 (212) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-600 shrink-0" />
                <a
                  href="mailto:contact@lexvizo.com"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  contact@lexvizo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} LexVizo. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
