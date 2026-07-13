"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Settings,
  Eye,
  Trash2,
  Loader2,
  Star,
  Globe,
  Plus,
  AlertTriangle,
  X,
} from "lucide-react";
import { featuredAssets } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Asset } from "@/lib/types";

export default function ManageAssetsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to manage assets");
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  // Load assets
  useEffect(() => {
    if (session?.user) {
      const fetchAssets = async () => {
        try {
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
          const res = await fetch(
            `${API_URL}/api/services/user/${session.user.id}`
          );
          if (res.ok) {
            const data = await res.json();
            setAssets(data);
          } else {
            // Fallback to static data for demo
            setAssets(featuredAssets.slice(0, 4));
          }
        } catch {
          // Fallback to static data for demo
          setAssets(featuredAssets.slice(0, 4));
        } finally {
          setIsLoading(false);
        }
      };
      fetchAssets();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      await fetch(`${API_URL}/api/services/${id}`, { method: "DELETE" });
    } catch {
      // Proceed with local deletion even if API is down
    }

    setAssets((prev) => prev.filter((s) => s._id !== id));
    setDeleteModal(null);
    toast.success("Asset removed successfully");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF6B00] animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-32 pb-16 relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1F2833]/30 rounded-full blur-[160px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Settings className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                My Portfolio
              </h1>
              <p className="text-sm text-[#C5C6C7] font-light">
                View and manage your listed financial assets.
              </p>
            </div>
          </div>

          <Link
            href="/items/add"
            className="relative group overflow-hidden rounded-xl p-[1px] block"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#FF6B00] opacity-80 group-hover:opacity-100 transition-opacity"></span>
            <div className="relative bg-[#0B0C10] px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider relative z-10 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                List New Asset
              </span>
            </div>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white/5 border border-white/10 rounded-2xl skeleton"
              />
            ))}
          </div>
        ) : assets.length === 0 ? (
          <div className="text-center py-20 bg-white/3 border border-white/5 rounded-3xl backdrop-blur-md">
            <Settings className="w-12 h-12 text-[#C5C6C7] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No assets listed yet
            </h3>
            <p className="text-sm text-[#C5C6C7] mb-6 font-light">
              Start by listing your first digital or traditional asset.
            </p>
            <Link
              href="/items/add"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] to-[#FFA800] rounded-xl hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              List Asset
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center backdrop-blur-md">
                <p className="text-2xl font-bold text-white">
                  {assets.length}
                </p>
                <p className="text-xs text-[#C5C6C7] mt-0.5 font-light">Total Assets Listed</p>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center backdrop-blur-md">
                <p className="text-2xl font-bold text-white">
                  {assets.filter((s) => s.availability === "available").length}
                </p>
                <p className="text-xs text-[#C5C6C7] mt-0.5 font-light">Active Listings</p>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center backdrop-blur-md hidden sm:block">
                <p className="text-2xl font-bold text-white">
                  {(
                    assets.reduce((acc, s) => acc + s.rating, 0) /
                    assets.length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-[#C5C6C7] mt-0.5 font-light">Average Rating</p>
              </div>
            </div>

            {/* Table / List using Glassmorphic List Ribbons */}
            <div className="space-y-4">
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  className="glass-panel hover:border-white/20 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl"
                >
                  {/* Asset Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-[#FF6B00] rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                      {asset.assetName
                        ? asset.assetName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "AS"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-semibold text-white truncate">
                        {asset.title}
                      </h4>
                      <p className="text-xs text-[#C5C6C7] flex items-center gap-1.5 mt-0.5 font-light">
                        <Globe className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {asset.exchange}
                      </p>
                    </div>
                  </div>

                  {/* Right side parameters */}
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    
                    {/* Category */}
                    <div className="px-3 py-1 text-xs font-semibold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/25 rounded-lg">
                      {CATEGORY_LABELS[asset.category] || asset.category}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs text-[#C5C6C7] font-light">Unit Price</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        ${asset.pricePerUnit.toLocaleString()}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                      <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                      <span className="text-sm font-medium text-white">{asset.rating}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-6 h-10">
                      <Link
                        href={`/services/${asset._id}`}
                        className="p-2 text-[#C5C6C7] hover:text-green-400 hover:bg-green-500/10 transition-all rounded-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteModal(asset._id)}
                        className="p-2 text-[#C5C6C7] hover:text-red-400 hover:bg-red-500/10 transition-all rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ─── Delete Confirmation Modal ─── */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
          />
          <div className="relative w-full max-w-md bg-[#0B0C10]/95 border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 backdrop-blur-xl">
            <button
              onClick={() => setDeleteModal(null)}
              className="absolute top-4 right-4 text-[#C5C6C7] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Remove Listing
              </h3>
            </div>

            <p className="text-sm text-[#C5C6C7] mb-6 font-light leading-relaxed">
              Are you sure you want to delete this listing from your portfolio? This action cannot
              be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C5C6C7] border border-white/10 hover:bg-white/5 transition-all rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-500 hover:bg-red-600 transition-all rounded-xl cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
