"use client";

import React from "react";
import { TrendingUp, Users, Award, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Hero / Header Section ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#FF9500] mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF9500]" />
            <span className="text-xs font-medium text-[#FF9500] tracking-[0.15em] uppercase">
              About NexTrade
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-6">
            Architecting the Future of{" "}
            <span className="text-[#FF9500]">
              Asset Management
            </span>
          </h1>
          <p className="text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            NexTrade is a premium market monitoring and asset management marketplace built to bridge the gap between verified listings and modern traders.
          </p>
        </div>

        {/* ─── Story Section ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Our Mission</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              We believe finding quality financial market information should be transparent, straightforward, and secure. NexTrade was founded to replace cluttered and noisy investment boards with a clean, grid-aligned platform where validated assets and verified pricing stand first.
            </p>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Whether you are an individual trader charting stocks and crypto or a fund manager analyzing ETF structures, NexTrade equips you with clean charts, low latency listings, and comprehensive performance metrics.
            </p>
          </div>
          <div className="p-8 bg-[#F8F9FA] border border-[#E2E8F0] relative overflow-hidden">
            <TrendingUp className="w-10 h-10 text-[#FF9500] mb-6" />
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">The NexTrade Standard</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every asset listed on our marketplace undergoes validation checks against major exchanges and public markets, maintaining absolute uptime and feed integrity.
            </p>
          </div>
        </div>

        {/* ─── Pillars Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#FF9500]" />,
              title: "Verified Data",
              description: "All market data feed updates, volume counts, and asset specifications are cross-checked with primary exchanges.",
            },
            {
              icon: <Users className="w-6 h-6 text-[#FF9500]" />,
              title: "Active Portfolio",
              description: "Monitor, watchlist, and list new assets dynamically with customized indicators and metrics.",
            },
            {
              icon: <Award className="w-6 h-6 text-[#FF9500]" />,
              title: "Bauhaus Layout",
              description: "Zero distractions, zero rounded buttons, and zero noise. An clean aesthetic built strictly for raw analytics.",
            },
          ].map((pillar, idx) => (
            <div key={idx} className="p-6 bg-white border border-[#E2E8F0] text-center hover:border-[#CBD5E1] transition-all">
              <div className="w-12 h-12 bg-[#FFF7ED] flex items-center justify-center mx-auto mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-semibold text-[#0F172A] mb-2">{pillar.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Call to Action Section ─── */}
        <div className="p-10 bg-[#F8F9FA] border border-[#E2E8F0] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">
            Start Exploring Global Markets Today
          </h2>
          <p className="text-[#64748B] max-w-md mx-auto mb-8 text-sm">
            Browse our list of verified financial assets and select the ones matching your investment target.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore"
              className="group flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all uppercase tracking-[0.15em]"
            >
              Explore Markets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
