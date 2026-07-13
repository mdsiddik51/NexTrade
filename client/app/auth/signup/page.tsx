"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck, TrendingUp, Check } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await authClient.signUp.email({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      // @ts-ignore
      role: role,
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Account created successfully 🎉");
    router.push("/auth/login");
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-[#0F172A] selection:bg-[#FF9500] selection:text-white pt-16">
      
      {/* ─── LEFT PANEL (5/12 columns): Minimalist Editorial Panel ─── */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden border-r border-[#1E293B]">
        <div className="space-y-8 z-10 my-auto">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#FF9500] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              Nex<span className="text-[#FF9500]">Trade</span>
            </span>
          </Link>

          <h2 className="text-4xl font-light tracking-tight leading-tight pt-10">
            Join the network of <span className="text-[#FF9500] font-normal">Modern Markets</span>.
          </h2>

          <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
            Access verified listings, real-time asset data feeds, and advanced portfolio statistics under a clean Bauhaus workspace.
          </p>

          <div className="space-y-4 pt-6">
            {[
              "Dual workspaces for traders and analysts",
              "Encrypted JWT session keys and API calls",
              "Direct connection to global market indices",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                <div className="w-5 h-5 rounded-none bg-[#1E293B] flex items-center justify-center shrink-0 border border-white/10">
                  <Check className="w-3.5 h-3.5 text-[#FF9500]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-widest text-[#475569] border-t border-white/5 pt-4 z-10">
          &copy; 2026 NexTrade Technologies Inc.
        </div>
      </div>

      {/* ─── RIGHT PANEL (7/12 columns): Form Panel ─── */}
      <div className="lg:col-span-7 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#FF9500] font-semibold mb-2">
                  <span className="w-1.5 h-1.5 bg-[#FF9500]"></span>
                  Initialization Setup
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                  Create Account
                </h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Start your trading or analysis profile today.
                </p>
              </div>

              {/* Google Auth */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full py-3.5 px-4 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] transition flex items-center justify-center gap-3 text-sm font-medium text-[#0F172A] rounded-none cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8F0]"></div>
                </div>
                <span className="relative bg-white px-3 text-[10px] uppercase tracking-widest text-[#94A3B8]">
                  Or credentials
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleNextStep} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                    placeholder="Alexander Vance"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition rounded-none"
                    placeholder="vance@enterprise.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] pr-10 rounded-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] pr-10 rounded-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-8.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#FF9500] hover:bg-[#E68600] text-white text-xs font-semibold uppercase tracking-widest py-3.5 px-4 rounded-none transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Continue to Role Selection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium mb-1">
                  // Selection Vector
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                  Select Your Role
                </h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Configure your workspace access credentials.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Trader Option */}
                  <div
                    onClick={() => setRole("trader")}
                    className={`cursor-pointer p-5 border rounded-none transition-all flex flex-col justify-between h-40 bg-white ${
                      role === "trader"
                        ? "border-[#FF9500] ring-1 ring-[#FF9500]"
                        : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-none border ${
                          role === "trader"
                            ? "border-[#FF9500] text-[#FF9500]"
                            : "border-[#E2E8F0] text-[#94A3B8]"
                        }`}
                      >
                        01
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full border flex items-center justify-center ${role === "trader" ? "border-[#FF9500]" : "border-[#E2E8F0]"}`}
                      >
                        {role === "trader" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-1">
                        Trader / Investor
                      </h4>
                      <p className="text-[11px] text-[#64748B] leading-normal">
                        Explore global markets, watchlist core stocks, ETFs, forex pairs, and commodities.
                      </p>
                    </div>
                  </div>

                  {/* Analyst Option */}
                  <div
                    onClick={() => setRole("analyst")}
                    className={`cursor-pointer p-5 border rounded-none transition-all flex flex-col justify-between h-40 bg-white ${
                      role === "analyst"
                        ? "border-[#FF9500] ring-1 ring-[#FF9500]"
                        : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-none border ${
                          role === "analyst"
                            ? "border-[#FF9500] text-[#FF9500]"
                            : "border-[#E2E8F0] text-[#94A3B8]"
                        }`}
                      >
                        02
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full border flex items-center justify-center ${role === "analyst" ? "border-[#FF9500]" : "border-[#E2E8F0]"}`}
                      >
                        {role === "analyst" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-1">
                        Financial Analyst
                      </h4>
                      <p className="text-[11px] text-[#64748B] leading-normal">
                        Register new asset trackers, update pricing details, and publish insights.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] transition cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={!role}
                    className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded-none transition-all cursor-pointer ${
                      role
                        ? "bg-[#FF9500] hover:bg-[#E68600] text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Complete Registration
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="text-center pt-4 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Already have an account? {" "}
              <Link
                href="/auth/login"
                className="text-[#0F172A] hover:text-[#FF9500] underline underline-offset-4 transition"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
