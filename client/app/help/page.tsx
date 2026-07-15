"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Phone, Mail, ChevronDown, ChevronUp, ShieldCheck, Loader2 } from "lucide-react";

export default function HelpSupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${API_URL}/api/faq`);
        if (res.ok) {
          const data = await res.json();
          setFaqData(data || []);
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#FF9500] animate-spin" />
          <p className="text-sm text-[#64748B] font-medium">Loading help center…</p>
        </div>
      </div>
    );
  }

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
              <HelpCircle className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Help & Support</h1>
              <p className="text-sm text-[#64748B] mt-1">Get immediate answers to frequent platform questions.</p>
            </div>
          </div>
        </div>

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* FAQ Accordions (8/12) */}
          <div className="md:col-span-8 space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] mb-4">Frequently Asked Questions</h2>
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-[#E2E8F0] bg-white rounded-none">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm text-[#0F172A] font-medium hover:bg-[#F8F9FA] transition-colors rounded-none"
                >
                  <span>{faq.question}</span>
                  {openFAQ === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#FF9500]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </button>
                {openFAQ === idx && (
                  <p className="px-5 pb-4 pt-1 text-xs text-[#64748B] leading-relaxed border-t border-[#E2E8F0]">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quick Help Contacts (4/12) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-6 bg-white border border-[#E2E8F0]">
              <h3 className="text-xs font-bold text-[#FF9500] uppercase tracking-wider mb-4">Need More Help?</h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                Our support team is available Monday through Friday for platform and API assistance.
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:hello@nextrade.io"
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] hover:text-[#FF9500] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@nextrade.io
                </a>
                <a
                  href="tel:+14155551234"
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] hover:text-[#FF9500] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +1 (415) 555-1234
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#F8F9FA] border border-[#E2E8F0] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#FF9500] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-[#0F172A] mb-1">Encrypted Platform</h4>
                <p className="text-[10px] text-[#64748B] leading-relaxed">
                  All session keys and API calls are fully monitored and secured with TLS standards.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
