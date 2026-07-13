"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Building2,
  Gem,
  Globe,
  Coins,
  Search,
  Users,
  Shield,
  Zap,
  Quote,
  Send,
} from "lucide-react";
import {
  featuredAssets,
  testimonials,
  faqData,
  stats,
  assetCategories,
} from "@/lib/data";

// ─── Icon Map ────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Coins: <Coins className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Gem: <Gem className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
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
    <div className="bg-white/3 border border-white/5 overflow-hidden transition-all duration-300 rounded-2xl">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left text-white"
      >
        <span className="text-sm font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#FF6B00] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#C5C6C7] shrink-0" />
        )}
      </button>
      <div
        className={`transition-all duration-350 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="px-6 pb-5 text-sm text-[#C5C6C7] leading-relaxed font-light">
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
    <div className="min-h-screen bg-[#0B0C10] text-[#FFFFFF] relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1F2833]/40 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[140px]"></div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO (Precisely 65% height: 65vh)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden z-10 pt-20">
        
        {/* Floating Abstract Financial Particles Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#FF6B00] rounded-full blur-[2px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#FFA800] rounded-full blur-[3px] animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-500 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/40 rounded-full blur-[2px] animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF6B00]/40 rounded-full bg-[#FF6B00]/10 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse shadow-[0_0_10px_#FF6B00]" />
            <span className="text-xs font-semibold text-[#FF6B00] tracking-[0.15em] uppercase">
              Live Markets — 2,400+ Assets
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Precision Trading.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFA800]">
              Zero Noise.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#C5C6C7] max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Discover, analyze, and trade high-value assets across global
            markets. Real-time data, verified listings, and professional
            tools — built for serious traders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="relative group overflow-hidden rounded-xl p-[1px] block w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#FF6B00] opacity-80 group-hover:opacity-100 transition-opacity"></span>
              <div className="relative bg-[#0B0C10] px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                <span className="text-white text-xs font-semibold uppercase tracking-wider relative z-10 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Explore Markets
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white border border-white/10 hover:border-white/30 rounded-xl bg-white/3 hover:bg-white/8 transition-all uppercase tracking-wider"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: ASSET CATEGORIES
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
              Asset Classes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Trade Across Every Market
            </h2>
            <p className="text-[#C5C6C7] max-w-xl mx-auto font-light">
              From blue-chip equities to decentralized assets, NexTrade
              covers every major asset class with verified real-time data.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assetCategories.map((area, idx) => (
              <Link
                href={`/explore?category=${area.title.toLowerCase().replace(/ /g, "-")}`}
                key={idx}
                className="group p-6 bg-white/3 border border-white/5 hover:border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-4 rounded-xl"
                  style={{
                    backgroundColor: `${area.color}15`,
                    color: area.color,
                  }}
                >
                  {iconMap[area.icon]}
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-[#C5C6C7] leading-relaxed font-light">
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
      <section className="py-24 bg-white/2 border-t border-b border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Three Steps to Start Trading
            </h2>
            <p className="text-[#C5C6C7] max-w-xl mx-auto font-light">
              Get started in minutes with our streamlined onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Discover Assets",
                description:
                  "Browse 2,400+ verified assets across stocks, crypto, ETFs, forex, and commodities. Filter by category, exchange, and performance metrics.",
                icon: <Search className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Analyze & Compare",
                description:
                  "Access real-time market data, volume metrics, and performance charts. Compare assets side by side to make informed decisions.",
                icon: <BarChart3 className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Execute & Track",
                description:
                  "Add assets to your portfolio, set alerts, and track performance. Manage your entire portfolio from a single dashboard.",
                icon: <Zap className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center group bg-white/3 border border-white/5 p-6 rounded-2xl hover:border-[#FF6B00]/40 transition-colors backdrop-blur-md">
                <div className="w-14 h-14 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-6 group-hover:border-[#FF6B00] transition-colors duration-300 shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#C5C6C7] leading-relaxed max-w-xs mx-auto font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: TRENDING ASSETS (CARD GRID: Desktop 4 Columns)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
                Trending Assets
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                Top-Performing Listings
              </h2>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FFA800] font-semibold transition-colors group uppercase tracking-[0.15em]"
            >
              View All Assets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid — Strict 4 per row on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAssets.slice(0, 4).map((asset) => (
              <div
                key={asset._id}
                className="glass-panel group hover:border-[#FF6B00]/40 overflow-hidden flex flex-col h-[380px] rounded-3xl"
              >
                {/* Card Top — Asset Icon + Rating */}
                <div className="p-6 pb-0 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FF6B00] rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                      {asset.assetName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {asset.assetName}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
                        <span className="text-xs text-[#C5C6C7]">
                          {asset.rating} ({asset.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-white leading-snug mb-2 line-clamp-2 min-h-[3rem]">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-[#C5C6C7] leading-relaxed line-clamp-3 mb-4 font-light">
                    {asset.shortDescription}
                  </p>
                </div>

                {/* Card Meta */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between text-xs text-[#C5C6C7] mb-4">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#FF6B00]" />
                      {asset.exchange}
                    </span>
                    <span className="font-bold text-[#FF6B00] text-sm">
                      ${asset.pricePerUnit.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/services/${asset._id}`}
                    className="block w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-white border border-[#FF6B00]/40 rounded-xl bg-[#FF6B00]/10 hover:bg-[#FF6B00] transition-all"
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
      <section className="py-20 border-t border-b border-white/5 bg-white/2 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C5C6C7]">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#C5C6C7] font-semibold">
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
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
              Why NexTrade
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              The Platform Built for Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Verified Listings",
                description:
                  "Every asset undergoes a multi-step verification process including exchange validation and compliance checks.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Real-Time Data",
                description:
                  "Live market feeds from major exchanges. Price, volume, and performance updated in real-time.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Portfolio Analytics",
                description:
                  "Track performance, set alerts, and analyze trends across your entire portfolio from one dashboard.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Zero Commission",
                description:
                  "No trading fees on our platform. Access premium market data and tools with full transparency.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/3 border border-white/5 hover:border-[#FF6B00]/40 rounded-2xl hover:bg-white/5 transition-all group backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#FF6B00] mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-[0_0_10px_rgba(255,107,0,0.2)]">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#C5C6C7] leading-relaxed font-light">
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
      <section className="py-24 border-t border-white/5 bg-white/2 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              What Our Traders Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 bg-white/3 border border-white/5 rounded-2xl hover:border-white/10 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#FF6B00]/20 mb-4" />
                  <p className="text-sm text-[#C5C6C7] leading-relaxed mb-6 font-light">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(255,107,0,0.3)] shrink-0">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#C5C6C7] truncate font-light">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]"
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
      <section className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B00] font-semibold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
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
      <section className="py-24 border-t border-white/5 relative z-10 backdrop-blur-sm bg-white/2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 sm:p-16 bg-white/3 border border-white/5 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-[#C5C6C7] max-w-md mx-auto mb-8 font-light text-sm">
                Join thousands of traders who trust NexTrade for precision
                asset management. Subscribe for market insights and updates.
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
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#FF6B00] transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FFA800] hover:from-[#FFA800] hover:to-[#FF6B00] rounded-xl transition-all shrink-0 uppercase tracking-wider cursor-pointer"
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
