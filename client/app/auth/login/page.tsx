"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldAlert, Key, TrendingUp } from "lucide-react";
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
        setError(authError.message || "Invalid authorization credentials.");
        return;
      }

      toast.success("Welcome to NexTrade 🎉");
      setTimeout(() => {
        window.location.href = "/";
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
        callbackURL: "/", 
      });
    } catch (err) {
      toast.error("Social authentication failed.");
    }
  };

  const autofillDemo = (role: "trader" | "analyst") => {
    if (role === "trader") {
      setFormData({
        email: "trader@nextrade.io",
        password: "DemoTraderPassword123!",
      });
      toast.success("Autofilled Demo Trader credentials");
    } else {
      setFormData({
        email: "analyst@nextrade.io",
        password: "DemoAnalystPassword123!",
      });
      toast.success("Autofilled Demo Analyst credentials");
    }
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await authClient.getSession();
        if (!data?.user) return;
        router.replace("/");
      } catch (err) {
        console.error("Session verification failed", err);
      }
    }
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617] text-white p-4 selection:bg-[#FF9500] selection:text-white pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        
        {/* Branding & Features */}
        <div className="flex flex-col justify-center space-y-12 pr-0 md:pr-12">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#FF9500] to-[#ffaa33] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,149,0,0.4)]">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Nex<span className="text-[#FF9500]">Trade</span>
            </span>
          </Link>

          <div>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight text-white/90">
              Welcome back to <br/>
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                The Network Hub
              </span>
            </h2>
            <p className="mt-4 text-[#94a3b8] font-light leading-relaxed max-w-md text-lg">
              Manage assets, evaluate real-time parameters, and launch intelligent analytical models.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {[
              "Aggregated feeds from top global exchanges",
              "Zero commission listing and tracking utilities",
              "Bauhaus design paradigm for clutter-free analysis",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-4 text-sm text-[#cbd5e1] font-light">
                <div className="relative flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-[#FF9500] shadow-[0_0_8px_#FF9500]"></div>
                </div>
                <span className="tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Glass Form Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.05)_inset] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div>
              <h2 className="text-2xl font-medium tracking-wide text-white">
                Secure Authentication
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1 font-light">
                Enter credentials to establish a session.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-red-950/40 border border-red-500/30 text-xs text-red-400 flex items-center gap-2 rounded-xl">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Demo Access */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] font-medium uppercase tracking-wider">
                <Key className="w-3.5 h-3.5 text-[#FF9500]" />
                Quick Demo Access
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => autofillDemo("trader")}
                  className="py-2 px-3 border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#FF9500] transition rounded-lg cursor-pointer"
                >
                  Demo Trader
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemo("analyst")}
                  className="py-2 px-3 border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#FF9500] transition rounded-lg cursor-pointer"
                >
                  Demo Analyst
                </button>
              </div>
            </div>

            {/* Google Auth */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 text-sm font-medium text-white rounded-xl backdrop-blur-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-[#0b101e] px-4 text-[10px] uppercase tracking-widest text-[#64748b] rounded-full">
                Or email credentials
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  placeholder="Identity Vector (Email)"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 pr-10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  placeholder="Secret Key (Password)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#64748b] hover:text-white transition-colors"
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
                className="w-full mt-4 relative group overflow-hidden rounded-xl p-[1px] block text-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF9500] via-[#ffaa33] to-[#FF9500] opacity-80 group-hover:opacity-100 transition-opacity"></span>
                <div className="relative bg-gradient-to-r from-[#FF9500] to-[#e68600] px-4 py-3.5 rounded-xl flex items-center justify-center gap-2 overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                  <span className="text-white text-xs font-semibold uppercase tracking-widest relative z-10">
                    {isLoading ? "Processing Authorization..." : "Verify Identity"}
                  </span>
                  {!isLoading && (
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform relative z-10" />
                  )}
                </div>
              </button>
            </form>

            <div className="text-center pt-8 mt-4 border-t border-white/10">
              <p className="text-xs text-[#64748b] font-light">
                New identity query? {" "}
                <Link
                  href="/auth/signup"
                  className="text-white hover:text-[#FF9500] transition-colors"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}