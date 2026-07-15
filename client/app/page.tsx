"use client";

import React, { useState, useEffect } from "react";
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// All data dynamically loaded from MongoDB - no static fallbacks
import type { Asset } from "@/lib/types";

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
    <div className="border border-[#E2E8F0] overflow-hidden transition-colors hover:border-[#CBD5E1]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-[#0F172A] pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#FF9500] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="px-6 pb-5 text-sm text-[#64748B] leading-relaxed">
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

  const [featuredAssets, setFeaturedAssets] = useState<Asset[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [assetCategories, setAssetCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

        const [assetsRes, testimonialsRes, faqRes, statsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/services?limit=4`),
          fetch(`${API_URL}/api/testimonials`),
          fetch(`${API_URL}/api/faq`),
          fetch(`${API_URL}/api/stats`),
          fetch(`${API_URL}/api/categories`),
        ]);

        if (assetsRes.ok) {
          const json = await assetsRes.json();
          setFeaturedAssets(json.data || []);
        } else {
          setFeaturedAssets([]);
        }

        if (testimonialsRes.ok) {
          const json = await testimonialsRes.json();
          setTestimonials(json || []);
        } else {
          setTestimonials([]);
        }

        if (faqRes.ok) {
          const json = await faqRes.json();
          setFaqData(json || []);
        } else {
          setFaqData([]);
        }

        if (statsRes.ok) {
          const json = await statsRes.json();
          setStats(json || []);
        } else {
          setStats([]);
        }

        if (categoriesRes.ok) {
          const json = await categoriesRes.json();
          setAssetCategories(json || []);
        } else {
          setAssetCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch landing page data:", error);
        setFeaturedAssets([]);
        setTestimonials([]);
        setFaqData([]);
        setStats([]);
        setAssetCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(#E2E8F0_1px,transparent_1px),linear-gradient(90deg,#E2E8F0_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF9500] mb-8">
            <span className="w-1.5 h-1.5 bg-[#FF9500] animate-pulse" />
            <span className="text-xs font-medium text-[#FF9500] tracking-[0.15em] uppercase">
              Live Markets — 2,400+ Assets
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Precision Trading.{" "}
            <span className="text-[#FF9500]">
              Zero Noise.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover, analyze, and trade high-value assets across global
            markets. Real-time data, verified listings, and professional
            tools — built for serious traders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="group flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all duration-300 uppercase tracking-[0.15em]"
            >
              <Search className="w-4 h-4" />
              Explore Markets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8F9FA] hover:border-[#CBD5E1] transition-all uppercase tracking-[0.15em]"
            >
              How It Works
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-[#94A3B8] uppercase tracking-[0.15em]">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#FF9500]" />
              Verified Listings
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#FF9500]" />
              Real-Time Data
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#FF9500]" />
              Bank-Level Security
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: ASSET CATEGORIES
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              Asset Classes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3 mb-4">
              Trade Across Every Market
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              From blue-chip equities to decentralized assets, NexTrade
              covers every major asset class with verified real-time data.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetCategories.map((area, idx) => (
              <Link
                href={`/explore?category=${area.title.toLowerCase().replace(/ /g, "-")}`}
                key={idx}
                className="group p-6 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8F9FA] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${area.color}15`,
                    color: area.color,
                  }}
                >
                  {iconMap[area.icon]}
                </div>
                <h3 className="text-base font-semibold text-[#0F172A] mb-2 group-hover:text-[#FF9500] transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
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
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3 mb-4">
              Three Steps to Start Trading
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Get started in minutes with our streamlined onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-[#E2E8F0]" />

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
              <div key={idx} className="relative text-center group">
                <div className="w-14 h-14 mx-auto bg-white border border-[#E2E8F0] flex items-center justify-center text-[#FF9500] mb-6 group-hover:border-[#FF9500] transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-[#FF9500] uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-semibold text-[#0F172A] mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: TRENDING ASSETS (CARD GRID)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
                Trending Assets
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3">
                Top-Performing Listings
              </h2>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-[#FF9500] hover:text-[#E68600] font-medium transition-colors group uppercase tracking-[0.15em]"
            >
              View All Assets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid — 4 per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredAssets.slice(0, 4).map((asset) => (
              <div
                key={asset._id}
                className="group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-300 flex flex-col"
              >
                {/* Card Top — Asset Image or Icon + Rating */}
                {(asset.imageUrl || (asset.images && asset.images.length > 0)) ? (
                  <div className="relative w-full h-40 bg-gray-100 overflow-hidden border-b border-[#E2E8F0]">
                    <img
                      src={asset.imageUrl || asset.images?.[0]}
                      alt={asset.assetName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null}
                <div className="p-5 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center text-sm font-bold text-[#FF9500] shrink-0 overflow-hidden">
                      {asset.logoUrl ? (
                        <img
                          src={asset.logoUrl}
                          alt={asset.assetName}
                          className="w-full h-full object-contain p-1.5"
                        />
                      ) : (
                        asset.assetName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#0F172A] truncate">
                        {asset.assetName}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />
                        <span className="text-xs text-[#64748B]">
                          {asset.rating} ({asset.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-[#0F172A] leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 mb-4">
                    {asset.shortDescription}
                  </p>
                </div>

                {/* Card Meta */}
                <div className="mt-auto p-5 pt-0">
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-4">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {asset.exchange}
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      ${asset.pricePerUnit.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/services/${asset._id}`}
                    className="block w-full text-center py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF9500] border border-[#FF9500]/20 hover:bg-[#FFF7ED] transition-all"
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
      <section className="py-20 border-t border-b border-[#E2E8F0] bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Stat numbers */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
                  NexTrade Statistics
                </span>
                <h2 className="text-3xl font-bold text-[#0F172A] mt-2 leading-tight">
                  High-Performance Market Infrastructure
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="border-l-2 border-[#FF9500] pl-4">
                    <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#94A3B8] font-semibold mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive chart */}
            <div className="lg:col-span-2 bg-white border border-[#E2E8F0] p-6 rounded-none h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A] mb-1">
                  NexTrade Monthly Trading Volume (USD)
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Volume monitored across verified traditional & digital markets.
                </p>
              </div>
              <div className="flex-1 w-full mt-4 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jan", volume: 1.2 },
                      { month: "Feb", volume: 1.8 },
                      { month: "Mar", volume: 2.1 },
                      { month: "Apr", volume: 2.9 },
                      { month: "May", volume: 3.4 },
                      { month: "Jun", volume: 4.8 },
                    ]}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF9500" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#FF9500" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `$${val}B`}
                      tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0F172A",
                        border: "none",
                        borderRadius: "0px",
                        color: "#fff",
                        fontSize: "11px",
                        fontFamily: "monospace",
                      }}
                      labelStyle={{ color: "#94A3B8", fontWeight: "bold" }}
                      formatter={(value: any) => [`$${value} Billion`, "Volume"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#FF9500"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVolume)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
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
              Why NexTrade
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3 mb-4">
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
                className="p-6 bg-white border border-[#E2E8F0] hover:border-[#FF9500]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#FFF7ED] flex items-center justify-center text-[#FF9500] mb-4 group-hover:bg-[#FF9500] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-[#0F172A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
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
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3 mb-4">
              What Our Traders Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial._id || testimonial.id || idx}
                className="p-6 bg-white border border-[#E2E8F0]"
              >
                <Quote className="w-8 h-8 text-[#FF9500]/30 mb-4" />
                <p className="text-sm text-[#334155] leading-relaxed mb-6">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <div className="w-10 h-10 bg-[#FF9500] flex items-center justify-center text-xs font-bold text-white">
                    {testimonial.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#94A3B8]">{testimonial.role}</p>
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
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF9500] font-semibold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3 mb-4">
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
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 sm:p-16 bg-[#F8F9FA] border border-[#E2E8F0] relative overflow-hidden">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-[#64748B] max-w-md mx-auto mb-8">
                Join thousands of traders who trust NexTrade for precision
                asset management. Subscribe for market insights and platform updates.
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
                  className="w-full px-5 py-3.5 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all shrink-0 uppercase tracking-[0.15em]"
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
