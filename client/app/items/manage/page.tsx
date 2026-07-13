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
  MapPin,
  Plus,
  AlertTriangle,
  X,
} from "lucide-react";
import { featuredServices } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Service } from "@/lib/types";

export default function ManageServicesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to manage services");
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  // Load services (using static data as fallback)
  useEffect(() => {
    if (session?.user) {
      const fetchServices = async () => {
        try {
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
          const res = await fetch(
            `${API_URL}/api/services/user/${session.user.id}`
          );
          if (res.ok) {
            const data = await res.json();
            setServices(data);
          } else {
            // Fallback to static data for demo
            setServices(featuredServices.slice(0, 4));
          }
        } catch {
          // Fallback to static data for demo
          setServices(featuredServices.slice(0, 4));
        } finally {
          setIsLoading(false);
        }
      };
      fetchServices();
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

    setServices((prev) => prev.filter((s) => s._id !== id));
    setDeleteModal(null);
    toast.success("Service removed successfully");
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Manage Services
              </h1>
              <p className="text-sm text-gray-400">
                View and manage your listed legal services.
              </p>
            </div>
          </div>

          <Link
            href="/items/add"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-lg hover:shadow-[#FF9500]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white/[0.02] border border-white/[0.04] rounded-2xl skeleton"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
            <Settings className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No services listed yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Start by adding your first legal service.
            </p>
            <Link
              href="/items/add"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
                <p className="text-2xl font-bold text-white">
                  {services.length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Total Services</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
                <p className="text-2xl font-bold text-white">
                  {services.filter((s) => s.availability === "available").length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Active</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center hidden sm:block">
                <p className="text-2xl font-bold text-white">
                  {(
                    services.reduce((acc, s) => acc + s.rating, 0) /
                    services.length
                  ).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Avg Rating</p>
              </div>
            </div>

            {/* Table / List */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/[0.04] text-xs uppercase tracking-wider text-gray-500">
                <div className="col-span-4">Service</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Rating</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {services.map((service) => (
                <div
                  key={service._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.01] transition-colors items-center"
                >
                  {/* Service Info */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-xs font-bold text-black shrink-0">
                      {service.lawyerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {service.location}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <span className="px-2.5 py-1 text-xs font-medium text-[#FF9500] bg-[#FF9500]/10 rounded-full">
                      {CATEGORY_LABELS[service.category]}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2">
                    <span className="text-sm font-semibold text-white">
                      ${service.pricePerHour}/hr
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="md:col-span-2 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#FF9500] fill-[#FF9500]" />
                    <span className="text-sm text-white">{service.rating}</span>
                    <span className="text-xs text-gray-500">
                      ({service.reviewCount})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/services/${service._id}`}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteModal(service._id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
          />
          <div className="relative w-full max-w-md bg-[#111215] border border-white/[0.06] rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setDeleteModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Delete Service
              </h3>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this service? This action cannot
              be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-300 border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all"
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
