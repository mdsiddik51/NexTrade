import React from "react";
import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin, Send, Globe } from "lucide-react";

const footerLinks = {
  assets: [
    { label: "Stocks", href: "/explore?category=stocks" },
    { label: "Cryptocurrency", href: "/explore?category=crypto" },
    { label: "ETFs", href: "/explore?category=etf" },
    { label: "Commodities", href: "/explore?category=commodities" },
    { label: "Forex", href: "/explore?category=forex" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Markets", href: "/explore" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialChannels = [
  { icon: <Globe className="w-4 h-4" />, href: "#", label: "Web" },
  { icon: <Send className="w-4 h-4" />, href: "#", label: "Telegram" },
  { icon: <Mail className="w-4 h-4" />, href: "#", label: "Mail" },
  { icon: <TrendingUp className="w-4 h-4" />, href: "#", label: "Markets" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] border-t border-[#E2E8F0]">
      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#FF9500] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A]">
                Nex<span className="text-[#FF9500]">Trade</span>
              </span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-xs">
              Precision tools for modern asset management. Discover, analyze,
              and trade across global markets with verified data.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialChannels.map((chan, idx) => (
                <a
                  key={idx}
                  href={chan.href}
                  aria-label={chan.label}
                  className="w-9 h-9 bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#FF9500] hover:border-[#FF9500] transition-all"
                >
                  {chan.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Asset Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#FF9500] font-semibold mb-5">
              Asset Categories
            </h4>
            <ul className="space-y-3">
              {footerLinks.assets.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
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
                    className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
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
                <MapPin className="w-4 h-4 text-[#94A3B8] mt-0.5 shrink-0" />
                <span className="text-sm text-[#64748B]">
                  350 Market Street, Suite 800
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <a
                  href="tel:+14155551234"
                  className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  +1 (415) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <a
                  href="mailto:hello@nextrade.io"
                  className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  hello@nextrade.io
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} NexTrade. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <Link href="/privacy" className="hover:text-[#64748B] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#64748B] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
