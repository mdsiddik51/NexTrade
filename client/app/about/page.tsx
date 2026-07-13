"use client";

import React from "react";
import { Scale, Users, Award, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Hero / Header Section ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
            <span className="text-xs font-medium text-[#FF9500] tracking-wide">
              About LexVizo
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Architecting the Future of{" "}
            <span className="bg-gradient-to-r from-[#FF9500] to-[#FF6B00] bg-clip-text text-transparent">
              Legal Services
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            LexVizo is a premium full-stack ecosystem engineered to bridge the gap between elite legal practitioners and clients seeking unparalleled counsel.
          </p>
        </div>

        {/* ─── Story Section ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We believe finding premium legal assistance should be transparent, straightforward, and secure. LexVizo was founded to replace outdated legal matchmaker directories with a streamlined, encrypted platform where quality and verified credentials stand first.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Whether you are a startup needing corporate restructuring advisory or an individual navigating family law, LexVizo equips you with verified experts, direct booking mechanics, and complete control over your legal process.
            </p>
          </div>
          <div className="p-8 bg-white/[0.02] border border-white/[0.04] rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9500]/[0.05] rounded-full blur-2xl" />
            <Scale className="w-10 h-10 text-[#FF9500] mb-6" />
            <h3 className="text-lg font-bold text-white mb-2">The LexVizo Standards</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every professional practicing on our platform undergoes a multi-layer bar verification protocol, maintaining an average experience of 12+ years across global and domestic jurisdictions.
            </p>
          </div>
        </div>

        {/* ─── Pillars Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#FF9500]" />,
              title: "Ironclad Security",
              description: "All case communications, consultation scheduling, and documents are backed by modern encryption protocols.",
            },
            {
              icon: <Users className="w-6 h-6 text-[#FF9500]" />,
              title: "Elite Network",
              description: "We host only certified attorneys with verified credentials, high ratings, and specialized backgrounds.",
            },
            {
              icon: <Award className="w-6 h-6 text-[#FF9500]" />,
              title: "Transparent Values",
              description: "No hidden matchmaker fees or retainers. Hourly rates are clearly stated up front.",
            },
          ].map((pillar, idx) => (
            <div key={idx} className="p-6 bg-white/[0.01] border border-white/[0.03] rounded-2xl text-center hover:border-white/[0.08] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF9500]/5 flex items-center justify-center mx-auto mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Call to Action Section ─── */}
        <div className="p-10 bg-gradient-to-br from-[#FF9500]/[0.06] to-[#FF6B00]/[0.02] border border-[#FF9500]/10 rounded-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Connect with a Legal Expert Today
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm">
            Browse our list of legal professionals and select the one matching your industry or case specifics.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore"
              className="group flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl transition-all hover:shadow-lg hover:shadow-[#FF9500]/25"
            >
              Explore Attorneys
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
