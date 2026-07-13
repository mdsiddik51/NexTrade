"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Phone, Mail, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { faqData } from "@/lib/data";

export default function HelpSupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
              <HelpCircle className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Help & Support</h1>
              <p className="text-sm text-gray-400 mt-1">Get immediate answers to frequent platform questions.</p>
            </div>
          </div>
        </div>

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* FAQ Accordions (8/12) */}
          <div className="md:col-span-8 space-y-3">
            <h2 className="text-base font-bold text-white mb-4">Frequently Asked Questions</h2>
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-white/[0.04] rounded-xl overflow-hidden bg-white/[0.01]">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm text-white font-medium hover:bg-white/[0.02] transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFAQ === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#FF9500]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {openFAQ === idx && (
                  <p className="px-5 pb-4 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/[0.02]">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quick Help Contacts (4/12) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <h3 className="text-xs font-bold text-[#FF9500] uppercase tracking-wider mb-4">Need More Help?</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Our operations team is available Monday through Friday for phone and email support.
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:support@lexvizo.com"
                  className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-[#FF9500] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@lexvizo.com
                </a>
                <a
                  href="tel:+12125551234"
                  className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-[#FF9500] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +1 (212) 555-1234
                </a>
              </div>
            </div>

            <div className="p-6 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-white mb-1">Secure Platform</h4>
                <p className="text-[10px] text-gray-600 leading-relaxed">
                  All support interactions are recorded securely in compliance with bar policy standards.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
