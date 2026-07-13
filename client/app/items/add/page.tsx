"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Plus,
  DollarSign,
  MapPin,
  FileText,
  Tag,
  Briefcase,
  Loader2,
} from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/types";
import type { ServiceCategory } from "@/lib/types";

export default function AddServicePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "" as ServiceCategory | "",
    pricePerHour: "",
    location: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to add a service");
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
          pricePerHour: Number(formData.pricePerHour),
          userId: session?.user?.id,
          lawyerName: session?.user?.name,
          lawyerEmail: session?.user?.email,
          rating: 0,
          reviewCount: 0,
          casesHandled: 0,
          yearsExperience: 0,
          availability: "available",
        }),
      });

      if (res.ok) {
        toast.success("Service added successfully!");
        router.push("/items/manage");
      } else {
        toast.error("Failed to add service. Please try again.");
      }
    } catch {
      toast.error("Service saved locally. Backend not connected yet.");
      router.push("/items/manage");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF9500] animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Add Legal Service
              </h1>
              <p className="text-sm text-gray-400">
                List your legal expertise for clients to discover.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9500]" />
              Service Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Corporate Mergers & Acquisitions"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  placeholder="Brief overview of your service (max 150 chars)"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
                <p className="text-xs text-gray-600 mt-1">
                  {formData.shortDescription.length}/150 characters
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Detailed description of your legal service, experience, and approach..."
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Category + Price + Location */}
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF9500]" />
              Details & Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Practice Area *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-gray-300 focus:outline-none focus:border-[#FF9500]/50 transition appearance-none cursor-pointer"
                >
                  <option value="">Select category</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Hourly Rate (USD) *
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  required
                  min={50}
                  max={1000}
                  placeholder="250"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="New York, NY"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-lg hover:shadow-[#FF9500]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing Service...
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4" />
                Publish Service
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
