"use client";

import React from "react";
import { TrendingUp, ShieldCheck, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Back Link ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-8 transition-colors uppercase tracking-[0.15em] font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* ─── Header ─── */}
        <div className="border-b border-[#E2E8F0] pb-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Terms of Service</h1>
              <p className="text-sm text-[#64748B] mt-1">Last updated: July 13, 2026</p>
            </div>
          </div>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="space-y-8 text-sm text-[#0F172A] leading-relaxed">
          
          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF9500]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and creating an account on the NexTrade platform, you explicitly agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, access to the portal is denied.
            </p>
          </section>

          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF9500]" />
              2. Analyst Admittance and Listings
            </h2>
            <p className="mb-4">
              Analysts choosing to register and list assets on the platform must provide accurate data in good faith.
            </p>
            <p>
              Any listing found to contain misleading claims, fake asset specifications, or incorrect pricing indicators will be immediately terminated without prior notification.
            </p>
          </section>

          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              3. Platform Liability Disclaimer
            </h2>
            <p>
              NexTrade serves strictly as an informational asset marketplace and portfolio tracking communication portal. We facilitate search, verification, and monitoring, but do not provide financial advice or direct trading execution. No broker-client relationship is formed directly with the platform itself.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
