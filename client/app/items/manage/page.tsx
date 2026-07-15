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
// Static featuredAssets fallback removed to maintain dynamic data constraints
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
            setAssets([]);
          }
        } catch (err) {
          console.error("Failed to load user assets:", err);
          setAssets([]);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF9500] animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">
                My Portfolio
              </h1>
              <p className="text-sm text-[#64748B]">
                View and manage your listed financial assets.
              </p>
            </div>
          </div>

          <Link
            href="/items/add"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all uppercase tracking-[0.15em] rounded-none cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            List New Asset
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none skeleton"
              />
            ))}
          </div>
        ) : assets.length === 0 ? (
          <div className="text-center py-20 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none">
            <Settings className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              No assets listed yet
            </h3>
            <p className="text-sm text-[#64748B] mb-6">
              Start by listing your first digital or traditional asset.
            </p>
            <Link
              href="/items/add"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all rounded-none uppercase tracking-[0.15em]"
            >
              <Plus className="w-4 h-4" />
              List Asset
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none text-center">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {assets.length}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">Total Assets Listed</p>
              </div>
              <div className="p-4 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none text-center">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {assets.filter((s) => s.availability === "available").length}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">Active Listings</p>
              </div>
              <div className="p-4 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none text-center hidden sm:block">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {(
                    assets.reduce((acc, s) => acc + s.rating, 0) /
                    assets.length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">Average Rating</p>
              </div>
            </div>

            {/* Table / List */}
            <div className="bg-white border border-[#E2E8F0] rounded-none overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#F8F9FA] border-b border-[#E2E8F0] text-xs uppercase tracking-wider text-[#64748B] font-semibold">
                <div className="col-span-4">Asset</div>
                <div className="col-span-2">Class</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2">Rating</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8F9FA] transition-colors items-center"
                >
                  {/* Asset Info */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center text-xs font-bold text-[#FF9500] shrink-0 overflow-hidden">
                      {asset.logoUrl ? (
                        <img
                          src={asset.logoUrl}
                          alt={asset.assetName || "Asset"}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : asset.assetName ? (
                        asset.assetName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      ) : (
                        "AS"
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-[#0F172A] truncate">
                        {asset.title}
                      </h4>
                      <p className="text-xs text-[#64748B] flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {asset.exchange}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <span className="px-2.5 py-1 text-xs font-medium text-[#FF9500] bg-[#FFF7ED] border border-[#FF9500]/20 rounded-none">
                      {CATEGORY_LABELS[asset.category] || asset.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2">
                    <span className="text-sm font-semibold text-[#0F172A]">
                      ${asset.pricePerUnit.toLocaleString()}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="md:col-span-2 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#FF9500] fill-[#FF9500]" />
                    <span className="text-sm text-[#0F172A]">{asset.rating}</span>
                    <span className="text-xs text-[#64748B]">
                      ({asset.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/services/${asset._id}`}
                      className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F9FA] transition-all rounded-none"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteModal(asset._id)}
                      className="p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all rounded-none cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteModal(null)}
          />
          <div className="relative w-full max-w-md bg-white border border-[#E2E8F0] p-6 rounded-none">
            <button
              onClick={() => setDeleteModal(null)}
              className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">
                Remove Listing
              </h3>
            </div>

            <p className="text-sm text-[#64748B] mb-6">
              Are you sure you want to delete this listing from your portfolio? This action cannot
              be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 text-sm font-medium text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8F9FA] transition-all rounded-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all rounded-none cursor-pointer"
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
