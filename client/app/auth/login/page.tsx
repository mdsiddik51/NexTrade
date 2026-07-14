"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldAlert, Key, TrendingUp, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCallbackUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("callbackUrl") || "/";
    }
    return "/";
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: formData.email, 
        password: formData.password, 
        rememberMe: true,
      });

      if (authError) {
        toast.error(authError.message || "Something went wrong");
        return;
      }

      toast.success("Welcome to NexTrade 🎉");
      setTimeout(() => {
        window.location.href = getCallbackUrl();
      }, 1000);

    } catch (err) {
      setError("Invalid authorization credentials. Access Denied.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: getCallbackUrl(), 
      });
    } catch (err) {
      toast.error("Social authentication failed.");
    }
  };

  const handleDemoLogin = async (role: "trader" | "analyst") => {
    setIsLoading(true);
    setError("");
    const email = role === "trader" ? "trader@nextrade.io" : "analyst@nextrade.io";
    const password = role === "trader" ? "DemoTraderPassword123!" : "DemoAnalystPassword123!";

    setFormData({ email, password });

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (authError) {
        toast.error(authError.message || "Something went wrong");
        return;
      }

      toast.success(`Welcome to NexTrade (Demo ${role === 'trader' ? 'Trader' : 'Analyst'}) 🎉`);
      setTimeout(() => {
        window.location.href = getCallbackUrl();
      }, 1000);
    } catch (err) {
      setError("Invalid authorization credentials. Access Denied.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await authClient.getSession();
        if (!data?.user) return;
        router.replace(getCallbackUrl());
      } catch (err) {
        console.error("Session verification failed", err);
      }
    }
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white text-[#0F172A] selection:bg-[#FF9500] selection:text-white pt-16">
      
      {/* ─── LEFT PANEL (5/12 columns): Minimalist Editorial Panel ─── */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden border-r border-[#1E293B]">
        {/* Editorial Content */}
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
            Real-time market analytics, <span className="text-[#FF9500] font-normal">simplified</span>.
          </h2>

          <div className="space-y-4 pt-6">
            {[
              "Aggregated feeds from top global exchanges",
              "Zero commission listing and tracking utilities",
              "Bauhaus design paradigm for clutter-free analysis",
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

        {/* Footer info inside Left Panel */}
        <div className="text-[10px] uppercase tracking-widest text-[#475569] border-t border-white/5 pt-4 z-10">
          &copy; 2026 NexTrade Technologies Inc.
        </div>
      </div>

      {/* ─── RIGHT PANEL (7/12 columns): Form Panel ─── */}
      <div className="lg:col-span-7 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#FF9500] font-semibold mb-2">
              <span className="w-1.5 h-1.5 bg-[#FF9500]"></span>
              Secure Network Portal
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              LogIn to NexTrade
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Enter your credentials to access your account securely.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2 rounded-none">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Access */}
          <div className="p-5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-[#FF9500]" />
              Quick Demo Access
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("trader")}
                className="py-2 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-xs font-semibold text-[#FF9500] transition rounded-none cursor-pointer"
              >
                Demo Trader
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("analyst")}
                className="py-2 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-xs font-semibold text-[#FF9500] transition rounded-none cursor-pointer"
              >
                Demo Analyst
              </button>
            </div>
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
            Authenticate via Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-widest text-[#94A3B8]">
              Or email credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#64748B] mb-1.5">
                Identity Vector (Email)
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

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#64748B]">
                  Secret Key (Password)
                </label>
                <a
                  href="#forgot"
                  className="text-[11px] text-[#64748B] hover:text-[#FF9500] transition"
                >
                  Recovery?
                </a>
              </div>
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
                className="absolute right-3 top-8.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer animate-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF9500] hover:bg-[#E68600] text-white text-xs font-semibold uppercase tracking-widest py-3.5 px-4 rounded-none transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Processing Authorization..." : "Verify Identity"}
              {!isLoading && (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Don't have an account? {" "}
              <Link
                href="/auth/signup"
                className="text-[#0F172A] hover:text-[#FF9500] underline underline-offset-4 transition"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}