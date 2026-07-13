"use client";

import React from "react";
import { Shield, Eye, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Privacy Policy</h1>
              <p className="text-sm text-[#64748B] mt-1">Last updated: July 13, 2026</p>
            </div>
          </div>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="space-y-8 text-sm text-[#0F172A] leading-relaxed">
          
          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FF9500]" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              NexTrade collects various categories of personal information to provide secure and transparent asset listing services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#64748B]">
              <li><strong>Identity Info:</strong> Full name, professional credentials (for analysts), and profile photos.</li>
              <li><strong>Contact Info:</strong> Email address and associated account details.</li>
              <li><strong>Market Listings:</strong> Asset specifications, market data parameters, exchange affiliations, and pricing feeds.</li>
            </ul>
          </section>

          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#FF9500]" />
              2. How We Use and Protect Data
            </h2>
            <p className="mb-4">
              We leverage your data to establish secure connections, prevent fraudulent registration, verify analyst submissions, and optimize user experience. 
            </p>
            <p>
              Your security is our benchmark. All data transmitted through our portal is protected using industry-standard TLS encryption and SSL transport layer security protocols.
            </p>
          </section>

          <section className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              3. Data Retention and Sharing
            </h2>
            <p className="mb-4">
              NexTrade will never sell, lease, or distribute your private portfolio or contact credentials to unauthorized third parties. We store information only for as long as your account remains active or as required by governing financial compliance standards.
            </p>
            <p>
              Under certain state and country regulations, users have the right to request deletion of their personal identity records from our networks at any time.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
