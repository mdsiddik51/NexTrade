"use client";

import React from "react";
import { Shield, Eye, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="text-sm text-gray-400 mt-1">Last updated: July 13, 2026</p>
            </div>
          </div>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          
          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FF9500]" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              LexVizo collects various categories of personal information to provide secure and transparent matchmaker legal services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Identity Info:</strong> Full name, professional credentials (for lawyers), bar registration numbers, and profile photos.</li>
              <li><strong>Contact Info:</strong> Email address, phone number, and mailing address.</li>
              <li><strong>Secure Communication:</strong> Consultation scheduling data, case summaries uploaded during consultations, and direct messaging logs.</li>
            </ul>
          </section>

          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#FF9500]" />
              2. How We Use and Protect Data
            </h2>
            <p className="mb-4">
              We leverage your data to establish secure connections, prevent fraudulent registration, verify bar admittance status, and optimize user experience. 
            </p>
            <p>
              Your security is our benchmark. All data transmitted through our portal is protected using enterprise-grade JWT encryption and SSL transport layer security protocols.
            </p>
          </section>

          <section className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              3. Data Retention and Sharing
            </h2>
            <p className="mb-4">
              LexVizo will never sell, lease, or distribute your private legal case files or contact credentials to unauthorized third parties. We store information only for as long as your account remains active or as required by governing legal compliance standards.
            </p>
            <p>
              Under certain state regulations, clients have the right to request deletion of their personal identity records from our networks at any time.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
