"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending contact message
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent! Our support team will contact you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#FF9500] mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF9500]" />
            <span className="text-xs font-medium text-[#FF9500] tracking-[0.15em] uppercase">
              Support Center
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
            Connect with NexTrade
          </h1>
          <p className="text-sm text-[#64748B] max-w-lg mx-auto">
            Have questions about asset validation, listing configurations, or api data access? We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── Contact Information (5/12) ─── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-[#E2E8F0]">
              <h2 className="text-base font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#FF9500]" />
                Communication Channels
              </h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center text-[#FF9500] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:hello@nextrade.io"
                      className="text-sm text-[#0F172A] hover:text-[#FF9500] transition-colors"
                    >
                      hello@nextrade.io
                    </a>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Average response time: &lt; 2 hours</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center text-[#FF9500] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Voice Support
                    </h3>
                    <a
                      href="tel:+14155551234"
                      className="text-sm text-[#0F172A] hover:text-[#FF9500] transition-colors"
                    >
                      +1 (415) 555-1234
                    </a>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Mon - Fri, 9:00 AM - 6:00 PM PST</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF7ED] border border-[#FF9500]/20 flex items-center justify-center text-[#FF9500] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Global HQ
                    </h3>
                    <p className="text-sm text-[#0F172A]">
                      350 Market Street, Suite 800
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ─── Contact Form (7/12) ─── */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-6 sm:p-8">
            <h2 className="text-base font-bold text-[#0F172A] mb-6">
              Send Support Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Alexander Vance"
                    className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="vance@enterprise.com"
                    className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Asset listing validation inquiry"
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                  Message Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="State the specifics of your request or issue..."
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition resize-none rounded-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-[0.15em] rounded-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting Ticket...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Ticket
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
