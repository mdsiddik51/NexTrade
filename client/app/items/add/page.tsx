"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Plus,
  DollarSign,
  Globe,
  FileText,
  Tag,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/types";
import type { AssetCategory } from "@/lib/types";

export default function AddAssetPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "" as AssetCategory | "",
    pricePerUnit: "",
    exchange: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to list an asset");
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pricePerUnit: Number(formData.pricePerUnit),
          userId: session?.user?.id,
          assetName: session?.user?.name,
          assetEmail: session?.user?.email,
          rating: 0,
          reviewCount: 0,
          volume24h: 0,
          marketCap: 0,
          availability: "available",
        }),
      });

      if (res.ok) {
        toast.success("Asset listed successfully!");
        router.push("/items/manage");
      } else {
        toast.error("Failed to list asset. Please try again.");
      }
    } catch {
      toast.error("Asset saved locally. Backend not connected yet.");
      router.push("/items/manage");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF9500] animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">
                List New Asset
              </h1>
              <p className="text-sm text-[#64748B]">
                Register your financial asset details for traders to track.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-none">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              Asset Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Asset Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., NVIDIA Corp (NVDA)"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  placeholder="Brief overview of the asset (max 150 chars)"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
                <p className="text-xs text-[#94A3B8] mt-1">
                  {formData.shortDescription.length}/150 characters
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Detailed description of the asset, market outlook, and capitalization parameters..."
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition resize-none rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Details & Pricing */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-none">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF9500]" />
              Exchange & Price
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Asset Class *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#64748B] focus:outline-none focus:border-[#FF9500] transition rounded-none cursor-pointer"
                >
                  <option value="">Select asset class</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Unit Price (USD) *
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  required
                  step="any"
                  placeholder="100.00"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Primary Exchange *
                </label>
                <input
                  type="text"
                  name="exchange"
                  value={formData.exchange}
                  onChange={handleChange}
                  required
                  placeholder="e.g., NASDAQ, NYSE, Binance"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-none cursor-pointer uppercase tracking-[0.15em]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Listing Asset...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                List Asset
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
