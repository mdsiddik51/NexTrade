"use client";

import React from "react";
import Link from "next/link";
import { Scale, ArrowRight, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center px-4 selection:bg-[#FF9500] selection:text-black">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF9500]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md border border-white/[0.04] rounded-2xl bg-[#0C0D0F] p-8 lg:p-10 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#FF9500]/10 flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-[#FF9500]" />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-white mb-2">404</h1>
        <h2 className="text-lg font-semibold text-white mb-4">Portal Page Not Found</h2>
        
        <p className="text-xs text-gray-500 leading-relaxed mb-8 max-w-xs mx-auto">
          The identity vector or route you attempted to access does not exist on our active node structure. Check the address and try again.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#FF9500] to-[#FF6B00] text-black text-xs font-semibold uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF9500]/20"
          >
            Return to Core Node
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/explore"
            className="w-full py-3 px-4 border border-white/[0.06] hover:bg-white/[0.03] text-xs font-medium text-gray-300 rounded-xl transition"
          >
            Explore Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
