"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The AI Hardware Boom: Evaluating NVIDIA's Competitive Moat",
    excerpt: "An in-depth analysis of high-performance GPU manufacturing pipelines, software lock-in, and competitor capital expenditure models.",
    author: "Sarah Mitchell",
    date: "July 10, 2026",
    readTime: "6 min read",
    category: "Stocks",
  },
  {
    id: 2,
    title: "Understanding Bitcoin Halving and Its Macro Implications",
    excerpt: "Evaluate historic liquidity cycles, miner fee dynamics, and the impact of institutional ETF inflows on supply elasticity.",
    author: "David Park",
    date: "July 5, 2026",
    readTime: "8 min read",
    category: "Crypto",
  },
  {
    id: 3,
    title: "Fixed Income Tactics in a High-Rate Environment",
    excerpt: "How to position government treasury bonds and high-yield corporate debt baskets for portfolio protection.",
    author: "Katherine Lee",
    date: "June 28, 2026",
    readTime: "5 min read",
    category: "Bonds",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Back Link ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-8 transition-colors uppercase tracking-[0.15em] font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* ─── Header ─── */}
        <div className="border-b border-[#E2E8F0] pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Market Insights & Reports</h1>
              <p className="text-sm text-[#64748B] mt-1">Articles and analytical reports by verified analysts.</p>
            </div>
          </div>
        </div>

        {/* ─── Blog Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-[#E2E8F0] p-6 hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#FF9500] font-semibold mb-4 uppercase tracking-[0.1em]">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1 text-[#64748B] font-normal">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-3 group-hover:text-[#FF9500] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-[#E2E8F0] pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#FF9500] flex items-center justify-center text-[10px] font-bold text-white">
                    {post.author[0]}
                  </div>
                  <span className="text-[11px] text-[#64748B]">{post.author}</span>
                </div>
                <span className="text-xs text-[#FF9500] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium uppercase tracking-[0.1em]">
                  Read
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
