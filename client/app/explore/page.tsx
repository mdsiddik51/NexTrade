"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Globe,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
} from "lucide-react";
import { featuredAssets } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Asset, AssetCategory } from "@/lib/types";

const ITEMS_PER_PAGE = 8;

const sortOptions = [
  { value: "rating-desc", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E2E8F0] overflow-hidden flex flex-col rounded-none">
      <div className="p-5 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-100 skeleton rounded-none" />
          <div className="flex-1">
            <div className="h-4 w-24 skeleton mb-1.5" />
            <div className="h-3 w-16 skeleton" />
          </div>
        </div>
        <div className="h-4 w-full skeleton mb-2" />
        <div className="h-3 w-3/4 skeleton mb-4" />
      </div>
      <div className="mt-auto p-5 pt-0">
        <div className="flex justify-between mb-4">
          <div className="h-3 w-20 skeleton" />
          <div className="h-3 w-16 skeleton" />
        </div>
        <div className="h-9 w-full skeleton" />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    AssetCategory | ""
  >("");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch assets from API on mount, fallback to static data
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${API_URL}/api/services?limit=100`);
        if (res.ok) {
          const json = await res.json();
          setAllAssets(json.data || []);
        } else {
          setAllAssets(featuredAssets);
        }
      } catch {
        // API unreachable — use static data as fallback
        setAllAssets(featuredAssets);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssets();
  }, []);

  // Filter + Sort + Paginate
  const filteredAssetsList = useMemo(() => {
    let result = [...allAssets];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.assetName.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.exchange.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((s) => s.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
    }

    return result;
  }, [allAssets, searchQuery, selectedCategory, minRating, sortBy]);

  const totalPages = Math.ceil(filteredAssetsList.length / ITEMS_PER_PAGE);
  const paginatedAssets = filteredAssetsList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinRating(0);
    setSortBy("rating-desc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || minRating > 0 || sortBy !== "rating-desc";

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
            Explore Global Markets
          </h1>
          <p className="text-[#64748B] max-w-lg">
            Browse our network of verified traditional and digital assets. Filter by class, rating, and exchange.
          </p>
        </div>

        {/* ─── Search + Filter Bar ─── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ticker, name, or exchange..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-none text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3.5 bg-[#F8F9FA] border border-[#E2E8F0] text-sm text-[#64748B] rounded-none cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as AssetCategory | "");
                setCurrentPage(1);
              }}
              className="px-4 py-3.5 bg-white border border-[#E2E8F0] text-sm text-[#64748B] focus:outline-none focus:border-[#FF9500] transition rounded-none cursor-pointer min-w-[160px]"
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-3.5 bg-white border border-[#E2E8F0] text-sm text-[#64748B] focus:outline-none focus:border-[#FF9500] transition rounded-none cursor-pointer min-w-[140px]"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.7}>4.7+ Stars</option>
              <option value={4.9}>4.9+ Stars</option>
            </select>

            {/* Sort */}
            <div className="flex items-center gap-2 px-4 py-3.5 bg-white border border-[#E2E8F0] rounded-none">
              <ArrowUpDown className="w-4 h-4 text-[#94A3B8]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-[#64748B] focus:outline-none appearance-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-[#94A3B8]">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF7ED] border border-[#FF9500]/20 text-xs text-[#FF9500] rounded-none">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF7ED] border border-[#FF9500]/20 text-xs text-[#FF9500] rounded-none">
                {CATEGORY_LABELS[selectedCategory]}
                <button onClick={() => setSelectedCategory("")} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-[#94A3B8] hover:text-[#0F172A] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ─── Results Count ─── */}
        <p className="text-sm text-[#64748B] mb-6">
          Showing {paginatedAssets.length} of {filteredAssetsList.length}{" "}
          assets
        </p>

        {/* ─── Cards Grid ─── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : paginatedAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedAssets.map((asset) => (
              <div
                key={asset._id}
                className="group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#CBD5E1] transition-all duration-300 flex flex-col rounded-none"
              >
                {/* Card Image */}
                {asset.imageUrl ? (
                  <div className="relative w-full h-40 bg-gray-100 overflow-hidden border-b border-[#E2E8F0]">
                    <img
                      src={asset.imageUrl}
                      alt={asset.assetName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null}
                <div className="p-5 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    {!asset.imageUrl && (
                      <div className="w-12 h-12 bg-[#FF9500] flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {asset.assetName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#0F172A] truncate">
                        {asset.assetName}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />
                        <span className="text-xs text-[#64748B]">
                          {asset.rating} ({asset.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-[#0F172A] leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4">
                    {asset.shortDescription}
                  </p>
                </div>

                <div className="mt-auto p-5 pt-0">
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-4">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {asset.exchange}
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      ${asset.pricePerUnit.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/services/${asset._id}`}
                    className="block w-full text-center py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF9500] border border-[#FF9500]/20 hover:bg-[#FFF7ED] transition-all rounded-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              No assets found
            </h3>
            <p className="text-sm text-[#64748B] mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 text-sm font-medium text-[#FF9500] border border-[#FF9500]/20 hover:bg-[#FFF7ED] transition-all rounded-none cursor-pointer uppercase tracking-[0.15em]"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 text-sm font-medium transition-all rounded-none cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#FF9500] text-white"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F9FA]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
