"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  FolderOpen,
  MessageSquare,
  ArrowRight,
  PlusCircle,
  Clock,
  BarChart2,
  CheckCircle2,
  FileEdit,
  AlertCircle,
  Activity,
  Loader2,
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickActionCard {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
  accentBg: string;
}

type ActivityStatus = "Active" | "Draft" | "Pending Review";

interface ActivityItem {
  id: string;
  asset: string;
  category: string;
  price: string;
  status: ActivityStatus;
  updated: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const QUICK_ACTIONS: QuickActionCard[] = [
  {
    id: "list-asset",
    title: "List New Asset",
    description:
      "Publish a new asset, financial product, or listing to the NexTrade marketplace.",
    cta: "Create Listing",
    href: "/list-asset",
    icon: <TrendingUp className="w-7 h-7 text-[#FF9500]" />,
    accentBg: "bg-[#FFF7ED]",
  },
  {
    id: "my-portfolio",
    title: "My Portfolio",
    description:
      "Manage your active listings, track performance metrics, and edit or delete your existing assets.",
    cta: "Manage Assets",
    href: "/my-portfolio",
    icon: <FolderOpen className="w-7 h-7 text-[#FF9500]" />,
    accentBg: "bg-[#FFF7ED]",
  },
  {
    id: "contact-support",
    title: "Contact Support",
    description:
      "Need help or have questions about your listings? Get in touch with our dedicated support team 24/7.",
    cta: "Get Help",
    href: "/contact",
    icon: <MessageSquare className="w-7 h-7 text-[#FF9500]" />,
    accentBg: "bg-[#FFF7ED]",
  },
];

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "act-001",
    asset: "NVIDIA Corp (NVDA)",
    category: "Stocks",
    price: "$875.00",
    status: "Active",
    updated: "2 hours ago",
  },
  {
    id: "act-002",
    asset: "Bitcoin Spot ETF (IBIT)",
    category: "Crypto ETF",
    price: "$42,100.00",
    status: "Pending Review",
    updated: "1 day ago",
  },
  {
    id: "act-003",
    asset: "US Treasury Bond 10Y",
    category: "Bonds",
    price: "$98.75",
    status: "Draft",
    updated: "3 days ago",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ActivityStatus }) {
  const variants: Record<ActivityStatus, { label: string; className: string; icon: React.ReactNode }> = {
    Active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    Draft: {
      label: "Draft",
      className: "bg-slate-100 text-slate-600 border border-slate-200",
      icon: <FileEdit className="w-3 h-3" />,
    },
    "Pending Review": {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
      icon: <AlertCircle className="w-3 h-3" />,
    },
  };

  const { label, className, icon } = variants[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  delta,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  delta: string;
}) {
  return (
    <div className="bg-white border border-[#E2E8F0] p-5 flex items-start justify-between group hover:border-[#FF9500]/40 transition-all duration-200">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-[#0F172A] tracking-tight">{value}</p>
        <p className="text-xs text-emerald-600 mt-1 font-medium">{delta}</p>
      </div>
      <div className="w-10 h-10 bg-[#FFF7ED] flex items-center justify-center shrink-0">
        {icon}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [userAssets, setUserAssets] = React.useState<any[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = React.useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login?callbackUrl=/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user?.id) {
      const fetchUserAssets = async () => {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
          const res = await fetch(`${API_URL}/api/services/user/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setUserAssets(data);
          }
        } catch (err) {
          console.error("Failed to load dashboard activities:", err);
        } finally {
          setIsLoadingAssets(false);
        }
      };
      fetchUserAssets();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#FF9500] animate-spin" />
          <p className="text-sm text-[#64748B] font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate dynamic stats
  const totalListings = userAssets.length;
  const activeAssets = userAssets.filter(a => a.availability === "available").length;
  const pendingAssets = userAssets.filter(a => a.availability === "limited").length;

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Subtle dot-grid background ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* ─── Header ─── */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FF9500]">
                Dashboard
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Welcome back,{" "}
              <span className="text-[#FF9500]">{user.name.split(" ")[0]}</span>
            </h1>
            <p className="text-sm text-[#64748B] mt-1.5">
              Here's what's happening with your NexTrade portfolio.
            </p>
          </div>

          {/* User identity badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 border border-[#E2E8F0] bg-white shrink-0">
            <div className="w-9 h-9 bg-[#FF9500] flex items-center justify-center text-white text-sm font-bold">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0F172A] truncate">{user.name}</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#64748B]" />
                <p className="text-xs text-[#64748B] capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard
            label="Total Listings"
            value={isLoadingAssets ? "..." : String(totalListings)}
            icon={<BarChart2 className="w-5 h-5 text-[#FF9500]" />}
            delta="Live Listings Count"
          />
          <StatCard
            label="Active Assets"
            value={isLoadingAssets ? "..." : String(activeAssets)}
            icon={<Activity className="w-5 h-5 text-[#FF9500]" />}
            delta="Available for Trade"
          />
          <StatCard
            label="Pending / Limited"
            value={isLoadingAssets ? "..." : String(pendingAssets)}
            icon={<Clock className="w-5 h-5 text-[#FF9500]" />}
            delta="Limited Availability"
          />
          <StatCard
            label="Account Role"
            value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            icon={<User className="w-5 h-5 text-[#FF9500]" />}
            delta="Verified member"
          />
        </div>

        {/* ─── Quick Action Cards ─── */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_ACTIONS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group flex flex-col justify-between bg-white border border-[#E2E8F0] p-6 hover:border-[#FF9500] hover:shadow-[0_4px_24px_0_rgba(255,149,0,0.10)] transition-all duration-200 min-h-[220px]"
              >
                {/* Icon block */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-12 h-12 ${card.accentBg} border border-[#FF9500]/20 flex items-center justify-center shrink-0`}
                  >
                    {card.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#FF9500] group-hover:translate-x-1 transition-all duration-200" />
                </div>

                {/* Text block */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0F172A] mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF9500] group-hover:gap-2.5 transition-all duration-200">
                    {card.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Recent Activity Table ─── */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#64748B]">
              Recent Activity
            </h2>
            <Link
              href="/my-portfolio"
              className="text-xs font-semibold text-[#FF9500] hover:underline underline-offset-4 uppercase tracking-wider transition"
            >
              View All →
            </Link>
          </div>

          {isLoadingAssets ? (
            <div className="border border-[#E2E8F0] p-8 text-center text-sm text-[#64748B]">
              <Loader2 className="w-5 h-5 text-[#FF9500] animate-spin mx-auto mb-2" />
              Loading listings activity...
            </div>
          ) : userAssets.length === 0 ? (
            <div className="border border-[#E2E8F0] p-12 text-center text-sm text-[#64748B]">
              <p className="font-semibold text-[#0F172A] mb-1">No active listings found</p>
              <p className="mb-4">Create your first marketplace listing to start tracking performance.</p>
              <Link
                href="/list-asset"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF9500]"
              >
                Create Listing <PlusCircle className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block border border-[#E2E8F0] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                        Asset
                      </th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                        Category
                      </th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                        Price / Unit
                      </th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                        Status
                      </th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                        Last Updated
                      </th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {userAssets.slice(0, 5).map((item, idx) => (
                      <tr
                        key={item._id || item.id}
                        className={`border-b border-[#F1F5F9] hover:bg-[#FAFAFA] transition-colors ${
                          idx === userAssets.slice(0, 5).length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <span className="font-semibold text-[#0F172A] text-sm">
                            {item.assetName || item.title}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#64748B] text-xs font-medium uppercase tracking-wider">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#0F172A] font-mono text-sm font-semibold">
                            ${Number(item.pricePerUnit || 0).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusPill status={item.availability === "available" ? "Active" : item.availability === "limited" ? "Pending Review" : "Draft"} />
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#94A3B8] text-xs">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href="/my-portfolio"
                            className="text-xs font-semibold text-[#64748B] hover:text-[#FF9500] transition-colors uppercase tracking-wider"
                          >
                            Manage →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden space-y-3">
                {userAssets.slice(0, 5).map((item) => (
                  <div
                    key={item._id || item.id}
                    className="bg-white border border-[#E2E8F0] p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-[#0F172A] leading-tight">
                        {item.assetName || item.title}
                      </p>
                      <StatusPill status={item.availability === "available" ? "Active" : item.availability === "limited" ? "Pending Review" : "Draft"} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#64748B] uppercase tracking-wider">{item.category}</span>
                      <span className="text-sm font-mono font-semibold text-[#0F172A]">
                        ${Number(item.pricePerUnit || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9]">
                      <span className="text-xs text-[#94A3B8]">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}
                      </span>
                      <Link
                        href="/my-portfolio"
                        className="text-xs font-bold text-[#FF9500] uppercase tracking-wider"
                      >
                        Manage →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ─── Footer CTA strip ─── */}
        <div className="mt-16 border border-[#E2E8F0] bg-[#0F172A] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg tracking-tight">
              Ready to grow your portfolio?
            </p>
            <p className="text-[#94A3B8] text-sm mt-1">
              List a new financial asset and reach thousands of active NexTrade traders.
            </p>
          </div>
          <Link
            href="/list-asset"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#FF9500] hover:bg-[#E68600] text-white text-sm font-bold uppercase tracking-widest transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            List an Asset
          </Link>
        </div>
      </div>
    </div>
  );
}
