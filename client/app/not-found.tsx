"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 selection:bg-[#FF9500] selection:text-white">
      <div className="relative w-full max-w-md border border-[#E2E8F0] bg-white p-8 lg:p-10 text-center rounded-none">
        <div className="w-16 h-16 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-[#FF9500]" />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-[#0F172A] mb-2">404</h1>
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Market Page Not Found</h2>
        
        <p className="text-xs text-[#64748B] leading-relaxed mb-8 max-w-xs mx-auto">
          The identity vector or market route you attempted to access does not exist on our active node structure. Check the address and try again.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-4 bg-[#FF9500] hover:bg-[#E68600] text-white text-xs font-semibold uppercase tracking-widest transition flex items-center justify-center gap-2 rounded-none cursor-pointer"
          >
            Return to Core Node
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/explore"
            className="w-full py-3 px-4 border border-[#E2E8F0] hover:bg-[#F8F9FA] text-xs font-medium text-[#64748B] transition rounded-none"
          >
            Explore Markets
          </Link>
        </div>
      </div>
    </div>
  );
}
