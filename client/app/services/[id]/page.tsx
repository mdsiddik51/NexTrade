"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Award,
  Users,
} from "lucide-react";
import { featuredServices } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";

export default function ServiceDetailsPage() {
  const params = useParams();
  const service = featuredServices.find((s) => s._id === params.id);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] pt-32 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          Service Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The service you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FF9500] border border-[#FF9500]/20 rounded-xl hover:bg-[#FF9500]/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  // Related services (same category, different id)
  const relatedServices = featuredServices
    .filter((s) => s.category === service.category && s._id !== service._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Back Link ─── */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content (2/3) ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium text-[#FF9500] bg-[#FF9500]/10 border border-[#FF9500]/20 rounded-full">
                  {CATEGORY_LABELS[service.category]}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    service.availability === "available"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                  }`}
                >
                  {service.availability === "available"
                    ? "Available"
                    : "Currently Busy"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FF9500] fill-[#FF9500]" />
                  {service.rating} ({service.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {service.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {service.casesHandled} cases handled
                </span>
              </div>
            </div>

            {/* ─── Description Section ─── */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                Description & Overview
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {service.fullDescription}
              </p>
              <div className="border-t border-white/[0.04] pt-6">
                <h3 className="text-sm font-semibold text-white mb-3">
                  What is included:
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Initial case assessment and strategy consultation",
                    "Comprehensive legal research and documentation",
                    "Court representation and advocacy",
                    "Regular progress updates and communication",
                    "Post-resolution follow-up and advisory",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ─── Key Information ─── */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">
                Key Information
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: <DollarSign className="w-5 h-5" />,
                    label: "Hourly Rate",
                    value: `$${service.pricePerHour}`,
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "Experience",
                    value: `${service.yearsExperience} Years`,
                  },
                  {
                    icon: <Briefcase className="w-5 h-5" />,
                    label: "Cases",
                    value: `${service.casesHandled}+`,
                  },
                  {
                    icon: <Star className="w-5 h-5" />,
                    label: "Rating",
                    value: `${service.rating}/5`,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center"
                  >
                    <div className="text-[#FF9500] flex justify-center mb-2">
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Reviews Section ─── */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">
                Client Reviews
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Alexandra K.",
                    date: "2 weeks ago",
                    rating: 5,
                    comment:
                      "Exceptional legal counsel. Thorough preparation and outstanding courtroom presence. Highly recommend for any complex legal matter.",
                  },
                  {
                    name: "Thomas R.",
                    date: "1 month ago",
                    rating: 5,
                    comment:
                      "Professional, responsive, and knowledgeable. Made a stressful process manageable. The transparent pricing was greatly appreciated.",
                  },
                  {
                    name: "Priya S.",
                    date: "2 months ago",
                    rating: 4,
                    comment:
                      "Very competent legal representation. Communication was excellent throughout the process. Would definitely use their services again.",
                  },
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className={`pb-6 ${idx < 2 ? "border-b border-white/[0.04]" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {review.name}
                          </p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-[#FF9500] fill-[#FF9500]"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Sidebar (1/3) ─── */}
          <div className="space-y-6">
            {/* Lawyer Card */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-lg font-bold text-black">
                  {service.lawyerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {service.lawyerName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {CATEGORY_LABELS[service.category]} Specialist
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Hourly Rate</span>
                  <span className="text-white font-semibold">
                    ${service.pricePerHour}/hr
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="text-white">
                    {service.yearsExperience} years
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location</span>
                  <span className="text-white">{service.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <span
                    className={`font-medium ${service.availability === "available" ? "text-emerald-400" : "text-yellow-400"}`}
                  >
                    {service.availability === "available"
                      ? "Available"
                      : "Busy"}
                  </span>
                </div>
              </div>

              <button className="w-full py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-lg hover:shadow-[#FF9500]/20 transition-all mb-3">
                Book Consultation
              </button>
              <button className="w-full py-3 text-sm font-medium text-gray-300 border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* ─── Related Services ─── */}
        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedServices.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/services/${rel._id}`}
                  className="group p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl hover:border-white/[0.08] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-xs font-bold text-black">
                      {rel.lawyerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {rel.lawyerName}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />
                        <span className="text-xs text-gray-400">
                          {rel.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1 group-hover:text-[#FF9500] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    ${rel.pricePerHour}/hr · {rel.location}
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
