"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Building2,
  Shield,
  Heart,
  Lightbulb,
  Home,
  Globe,
  Briefcase,
  Award,
  Users,
  TrendingUp,
  Quote,
  Send,
} from "lucide-react";
import {
  featuredServices,
  testimonials,
  faqData,
  stats,
  practiceAreas,
} from "@/lib/data";

// ─── Icon Map ────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

// ─── FAQ Item Component ──────────────────────────────────────────
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-white/[0.04] rounded-xl overflow-hidden transition-colors hover:border-white/[0.08]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#FF9500] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// ─── LANDING PAGE ───────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F3F4F6]">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF9500]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF6B00]/[0.03] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] animate-pulse" />
            <span className="text-xs font-medium text-[#FF9500] tracking-wide">
              Trusted by 12,000+ clients nationwide
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Where Justice Meets{" "}
            <span className="bg-gradient-to-r from-[#FF9500] via-[#FFB347] to-[#FF6B00] bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with elite legal professionals across every practice area.
            Transparent pricing, verified credentials, and secure
            consultations — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="group flex items-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-2xl hover:shadow-[#FF9500]/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              Find Your Lawyer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-gray-300 border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
            >
              Learn How It Works
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-600 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Bar-Verified Attorneys
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Secure Consultations
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Transparent Pricing
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: PRACTICE AREAS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              Practice Areas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Expertise Across Every Domain
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From corporate boardrooms to courtroom trials, our network covers
              every area of legal practice.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceAreas.map((area, idx) => (
              <Link
                href={`/explore?category=${area.title.toLowerCase().replace(/ /g, "-")}`}
                key={idx}
                className="group p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${area.color}15`,
                    color: area.color,
                  }}
                >
                  {iconMap[area.icon]}
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#FF9500] transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {area.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: HOW IT WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#FF9500]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Three Steps to Legal Resolution
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Getting professional legal help has never been simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#FF9500]/30 to-transparent" />

            {[
              {
                step: "01",
                title: "Search & Discover",
                description:
                  "Browse our verified network of attorneys. Filter by practice area, location, rating, and budget to find the perfect match.",
                icon: <Search className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Consult Securely",
                description:
                  "Schedule a consultation directly through the platform. All communications are encrypted and confidential.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Resolve & Succeed",
                description:
                  "Work with your chosen attorney to resolve your legal matter. Track progress and manage your case effortlessly.",
                icon: <Award className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FF9500]/10 border border-[#FF9500]/20 flex items-center justify-center text-[#FF9500] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-[#FF9500] uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: FEATURED ATTORNEYS (CARD GRID)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
                Featured Attorneys
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                Top-Rated Legal Experts
              </h2>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-[#FF9500] hover:text-[#FFB347] font-medium transition-colors group"
            >
              View All Attorneys
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid — 4 per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.slice(0, 4).map((service) => (
              <div
                key={service._id}
                className="group bg-white/[0.02] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300 flex flex-col"
              >
                {/* Card Top — Avatar + Rating */}
                <div className="p-5 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-sm font-bold text-black shrink-0">
                      {service.lawyerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {service.lawyerName}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />
                        <span className="text-xs text-gray-400">
                          {service.rating} ({service.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-white leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                    {service.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Card Meta */}
                <div className="mt-auto p-5 pt-0">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {service.location}
                    </span>
                    <span className="font-semibold text-white">
                      ${service.pricePerHour}/hr
                    </span>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
                    className="block w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FF9500] border border-[#FF9500]/20 rounded-xl hover:bg-[#FF9500]/10 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: STATISTICS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-b border-white/[0.04] bg-gradient-to-r from-[#FF9500]/[0.03] via-transparent to-[#FF6B00]/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: WHY CHOOSE US
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              Why LexVizo
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              The Legal Platform You Can Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Verified Professionals",
                description:
                  "Every attorney on our platform is bar-verified and background-checked for your peace of mind.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Transparent Pricing",
                description:
                  "Clear hourly rates with no hidden fees. Know exactly what you are paying before you commit.",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Case Management",
                description:
                  "Track your legal matters, communicate securely, and manage documents all in one place.",
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Proven Results",
                description:
                  "Our attorneys have collectively resolved over 12,000 cases with a 98% client satisfaction rate.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl hover:border-[#FF9500]/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-[#FF9500] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl"
              >
                <Quote className="w-8 h-8 text-[#FF9500]/30 mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9500]/80 to-[#FF6B00] flex items-center justify-center text-xs font-bold text-black">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-[#FF9500] fill-[#FF9500]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === idx}
                onToggle={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: NEWSLETTER / CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 sm:p-16 bg-gradient-to-br from-[#FF9500]/[0.08] to-[#FF6B00]/[0.04] border border-[#FF9500]/10 rounded-3xl relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9500]/[0.06] rounded-full blur-[80px]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Join thousands of clients who have found their trusted legal
                partner through LexVizo. Subscribe for updates and legal insights.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF9500]/50 transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-lg hover:shadow-[#FF9500]/20 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
