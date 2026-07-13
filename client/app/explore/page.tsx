"use client";

import React, { useState, useMemo } from "react";
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
import type { AssetCategory } from "@/lib/types";

const ITEMS_PER_PAGE = 8;

const sortOptions = [
  { value: "rating-desc", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function SkeletonCard() {
  return (
    <div className="glass-panel overflow-hidden flex flex-col h-[380px] rounded-3xl skeleton" />
  );
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    AssetCategory | ""
  >("");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter + Sort + Paginate
  const filteredAssetsList = useMemo(() => {
    let result = [...featuredAssets];

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
  }, [searchQuery, selectedCategory, minRating, sortBy]);

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
    <div className="min-h-screen bg-[#0B0C10] text-[#FFFFFF] pt-32 pb-16 relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1F2833]/30 rounded-full blur-[160px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        {/* ─── Header ─── */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Explore Global Markets
          </h1>
          <p className="text-[#C5C6C7] max-w-lg font-light text-sm">
            Browse our network of verified traditional and digital assets. Filter by class, rating, and exchange.
          </p>
        </div>

        {/* ─── Search + Filter Bar ─── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5C6C7]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ticker, name, or exchange..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#FF6B00] transition"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 text-sm text-white rounded-xl cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" />
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
              className="px-4 py-3.5 bg-[#0B0C10] border border-white/10 text-sm text-[#C5C6C7] focus:outline-none focus:border-[#FF6B00] transition rounded-xl cursor-pointer min-w-[160px]"
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
              className="px-4 py-3.5 bg-[#0B0C10] border border-white/10 text-sm text-[#C5C6C7] focus:outline-none focus:border-[#FF6B00] transition rounded-xl cursor-pointer min-w-[140px]"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.7}>4.7+ Stars</option>
              <option value={4.9}>4.9+ Stars</option>
            </select>

            {/* Sort */}
            <div className="flex items-center gap-2 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl">
              <ArrowUpDown className="w-4 h-4 text-[#FF6B00]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-[#C5C6C7] focus:outline-none appearance-none cursor-pointer"
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
            <span className="text-xs text-[#C5C6C7]">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-xs text-[#FF6B00] rounded-lg">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-xs text-[#FF6B00] rounded-lg">
                {CATEGORY_LABELS[selectedCategory]}
                <button onClick={() => setSelectedCategory("")} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-[#C5C6C7] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ─── Results Count ─── */}
        <p className="text-sm text-[#C5C6C7] mb-6">
          Showing {paginatedAssets.length} of {filteredAssetsList.length}{" "}
          assets
        </p>

        {/* ─── Cards Grid ─── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : paginatedAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedAssets.map((asset) => (
              <div
                key={asset._id}
                className="glass-panel group hover:border-[#FF6B00]/40 overflow-hidden flex flex-col h-[380px] rounded-3xl"
              >
                <div className="p-6 pb-0 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FF6B00] rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                      {asset.assetName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {asset.assetName}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
                        <span className="text-xs text-[#C5C6C7]">
                          {asset.rating} ({asset.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-white leading-snug mb-2 line-clamp-2 min-h-[3rem]">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-[#C5C6C7] leading-relaxed line-clamp-3 mb-4 font-light">
                    {asset.shortDescription}
                  </p>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between text-xs text-[#C5C6C7] mb-4">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-[#FF6B00]" />
                      {asset.exchange}
                    </span>
                    <span className="font-bold text-[#FF6B00] text-sm">
                      ${asset.pricePerUnit.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/services/${asset._id}`}
                    className="block w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-white border border-[#FF6B00]/40 rounded-xl bg-[#FF6B00]/10 hover:bg-[#FF6B00] transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/3 border border-white/5 rounded-3xl">
            <Search className="w-12 h-12 text-[#C5C6C7] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No assets found
            </h3>
            <p className="text-sm text-[#C5C6C7] mb-6 font-light">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FF6B00] border border-[#FF6B00]/40 rounded-xl bg-[#FF6B00]/10 hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
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
              className="p-2.5 border border-white/10 text-[#C5C6C7] hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-xl cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 text-sm font-semibold transition-all rounded-xl cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#FF6B00] text-white"
                    : "text-[#C5C6C7] hover:text-white hover:bg-white/5"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 border border-white/10 text-[#C5C6C7] hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-xl cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
