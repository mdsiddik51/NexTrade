"use client";

import React from "react";
import { Scale, ShieldCheck, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Back Link ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* ─── Header ─── */}
        <div className="border-b border-white/[0.04] pb-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
              <p className="text-sm text-gray-400 mt-1">Last updated: July 13, 2026</p>
            </div>
          </div>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          
          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF9500]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and creating an account on the LexVizo platform, you explicitly agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, access to the portal is denied.
            </p>
          </section>

          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF9500]" />
              2. Practitioner Admittance and Listings
            </h2>
            <p className="mb-4">
              Attorneys choosing to register as a &ldquo;Legal Architect&rdquo; on the platform must be licensed practitioners in active good standing with their state bar. 
            </p>
            <p>
              Any listing found to contain misleading claims, fake experience credentials, or active bar suspensions will be immediately terminated without prior notification.
            </p>
          </section>

          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              3. Platform Liability Disclaimer
            </h2>
            <p>
              LexVizo serves strictly as a matchmaking communication portal. We facilitate search, verification, and consultation scheduling, but do not provide legal representation. No attorney-client relationship is formed directly with the platform itself.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
