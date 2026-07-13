"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Globe,
  Clock,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Award,
  Users,
} from "lucide-react";
import { featuredAssets } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";

export default function AssetDetailsPage() {
  const params = useParams();
  const asset = featuredAssets.find((s) => s._id === params.id);

  if (!asset) {
    return (
      <div className="min-h-screen bg-white pt-32 text-center">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
          Asset Not Found
        </h1>
        <p className="text-[#64748B] mb-8">
          The asset listing you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FF9500] border border-[#FF9500]/20 rounded-none hover:bg-[#FFF7ED] transition-all uppercase tracking-[0.15em]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>
      </div>
    );
  }

  // Related assets (same category, different id)
  const relatedAssets = featuredAssets
    .filter((s) => s.category === asset.category && s._id !== asset._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Back Link ─── */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-8 transition-colors uppercase tracking-[0.15em] font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content (2/3) ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium text-[#FF9500] bg-[#FFF7ED] border border-[#FF9500]/20 rounded-none">
                  {CATEGORY_LABELS[asset.category] || asset.category}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-none border ${
                    asset.availability === "available"
                      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                      : "text-yellow-600 bg-yellow-50 border-yellow-200"
                  }`}
                >
                  {asset.availability === "available"
                    ? "Available"
                    : "Limited Availability"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">
                {asset.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FF9500] fill-[#FF9500]" />
                  {asset.rating} ({asset.reviewCount.toLocaleString()} evaluations)
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  {asset.exchange}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Vol (24h): {asset.volume24h > 0 ? `$${asset.volume24h.toLocaleString()}` : "N/A"}
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
                Asset Specifications & Overview
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed mb-6">
                {asset.fullDescription}
              </p>
              <div className="border-t border-[#E2E8F0] pt-6">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
                  What is monitored:
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Live price ticker feed integration",
                    "Historical volume charting datasets",
                    "Exchange orderbook depth metrics",
                    "Regulatory filing status monitoring",
                    "Quarterly earnings release notifications",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[#64748B]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#FF9500] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Information */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-none">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">
                Key Parameters
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: <DollarSign className="w-5 h-5" />,
                    label: "Unit Price",
                    value: `$${asset.pricePerUnit.toLocaleString()}`,
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5" />,
                    label: "Market Cap",
                    value: asset.marketCap > 0 ? `$${(asset.marketCap / 1e9).toFixed(1)}B` : "N/A",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "24h Volume",
                    value: asset.volume24h > 0 ? `$${(asset.volume24h / 1e6).toFixed(1)}M` : "N/A",
                  },
                  {
                    icon: <Star className="w-5 h-5" />,
                    label: "Rating",
                    value: `${asset.rating}/5`,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none text-center"
                  >
                    <div className="text-[#FF9500] flex justify-center mb-2">
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-[#0F172A]">{item.value}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E2E8F0] p-6 sticky top-24 rounded-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#FF9500] flex items-center justify-center text-lg font-bold text-white shrink-0">
                  {asset.assetName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A]">
                    {asset.assetName}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {CATEGORY_LABELS[asset.category] || asset.category} Asset
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Unit Price</span>
                  <span className="text-[#0F172A] font-semibold">
                    ${asset.pricePerUnit.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Exchange</span>
                  <span className="text-[#0F172A]">{asset.exchange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Market Cap</span>
                  <span className="text-[#0F172A]">
                    {asset.marketCap > 0 ? `$${asset.marketCap.toLocaleString()}` : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Availability</span>
                  <span
                    className={`font-medium ${asset.availability === "available" ? "text-emerald-600" : "text-yellow-600"}`}
                  >
                    {asset.availability === "available"
                      ? "Available"
                      : "Limited"}
                  </span>
                </div>
              </div>

              <button className="w-full py-3.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all mb-3 rounded-none uppercase tracking-[0.15em] cursor-pointer">
                Track Performance
              </button>
              <button className="w-full py-3 text-sm font-medium text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8F9FA] transition-all rounded-none cursor-pointer">
                Contact Analyst
              </button>
            </div>
          </div>
        </div>

        {/* Related Assets */}
        {relatedAssets.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#0F172A] mb-6">
              Related Assets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedAssets.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/services/${rel._id}`}
                  className="group p-5 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all rounded-none"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#FF9500] flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {rel.assetName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#0F172A]">
                        {rel.assetName}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />
                        <span className="text-xs text-[#64748B]">
                          {rel.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-[#0F172A] mb-1 group-hover:text-[#FF9500] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    ${rel.pricePerUnit.toLocaleString()} · {rel.exchange}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
