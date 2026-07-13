"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Corporate Mergers: Legal Compliance Checklist",
    excerpt: "Navigate the complex landscape of corporate mergers and acquisitions with our comprehensive compliance guide for 2026.",
    author: "Sarah Mitchell, Esq.",
    date: "July 10, 2026",
    readTime: "6 min read",
    category: "Corporate",
  },
  {
    id: 2,
    title: "Five Common Intellectual Property Mistakes Startups Make",
    excerpt: "Protect your proprietary technology and trademark assets from day one. Avoid these critical licensing and registration pitfalls.",
    author: "David Park, Esq.",
    date: "July 5, 2026",
    readTime: "8 min read",
    category: "Intellectual Property",
  },
  {
    id: 3,
    title: "Protecting Employee Rights in Remote Work Agreements",
    excerpt: "An in-depth review of geographic tax jurisdictions, overtime regulations, and compliance standards for distributed workforces.",
    author: "Katherine Lee, Esq.",
    date: "June 28, 2026",
    readTime: "5 min read",
    category: "Employment Law",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Back Link ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* ─── Header ─── */}
        <div className="border-b border-white/[0.04] pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Legal Insights & Blog</h1>
              <p className="text-sm text-gray-400 mt-1">Articles and reports by bar-verified attorneys.</p>
            </div>
          </div>
        </div>

        {/* ─── Blog Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#FF9500] font-semibold mb-4">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1 text-gray-500 font-normal">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#FF9500] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-white/[0.04] pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-300">
                    {post.author[0]}
                  </div>
                  <span className="text-[11px] text-gray-400">{post.author}</span>
                </div>
                <span className="text-xs text-[#FF9500] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
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
