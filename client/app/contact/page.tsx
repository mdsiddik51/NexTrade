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
    <div className="min-h-screen bg-[#0A0B0D] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
            <span className="text-xs font-medium text-[#FF9500] tracking-wide">
              Support Center
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Connect with LexVizo
          </h1>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Have questions about attorney verification, platform billing, or corporate enterprise partnerships? We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── Contact Information (5/12) ─── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#FF9500]" />
                Direct Communication Channels
              </h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#FF9500] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:support@lexvizo.com"
                      className="text-sm text-white hover:text-[#FF9500] transition-colors"
                    >
                      support@lexvizo.com
                    </a>
                    <p className="text-xs text-gray-600 mt-0.5">Average response time: &lt; 2 hours</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#FF9500] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Voice Helpline
                    </h3>
                    <a
                      href="tel:+12125551234"
                      className="text-sm text-white hover:text-[#FF9500] transition-colors"
                    >
                      +1 (212) 555-1234
                    </a>
                    <p className="text-xs text-gray-600 mt-0.5">Mon - Fri, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#FF9500] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Global Headquarters
                    </h3>
                    <p className="text-sm text-white">
                      1200 Justice Avenue, Suite 400
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ─── Contact Form (7/12) ─── */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sm:p-8">
            <h2 className="text-base font-bold text-white mb-6">
              Send Support Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Alexander Vance"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="vance@enterprise.com"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Attorney bar registration inquiry"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Message Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="State the specifics of your request or issue..."
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF9500]/50 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-xl hover:shadow-lg hover:shadow-[#FF9500]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
