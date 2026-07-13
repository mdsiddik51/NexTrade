"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, TrendingUp } from "lucide-react";
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
              Enter the <br/>
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Next Dimension
              </span>
            </h2>
            <p className="mt-4 text-[#94a3b8] font-light leading-relaxed max-w-md text-lg">
              Experience the weightless future of asset management and intelligent trading.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {[
              "Zero-gravity unified dashboard",
              "Quantum-encrypted market data",
              "Algorithmic precision insights",
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
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.05)_inset] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>

            <div className="relative z-10">
            {step === 1 && (
                <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-medium tracking-wide text-white">
                    Initialize Protocol
                    </h2>
                    <p className="text-sm text-[#94a3b8] mt-1 font-light">
                    Create your secure NexTrade identity.
                    </p>
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
                    Continue with Google
                </button>

                <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                    </div>
                    <span className="relative bg-[#0b101e] px-4 text-[10px] uppercase tracking-widest text-[#64748b] rounded-full">
                    Or secure credentials
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleNextStep} className="space-y-4">
                    <div>
                    <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        placeholder="Full Name"
                    />
                    </div>

                    <div>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        placeholder="Email Address"
                    />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 pr-10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        placeholder="Password"
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

                    <div className="relative">
                        <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-transparent px-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-white/20 focus:bg-white/10 pr-10 transition-all rounded-xl focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        placeholder="Confirm"
                        />
                        <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-[#64748b] hover:text-white transition-colors"
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
                    className="w-full mt-4 relative group overflow-hidden rounded-xl p-[1px]"
                    >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#FF9500] via-[#ffaa33] to-[#FF9500] opacity-80 group-hover:opacity-100 transition-opacity"></span>
                    <div className="relative bg-gradient-to-r from-[#FF9500] to-[#e68600] px-4 py-3.5 rounded-xl flex items-center justify-center gap-2 overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                        <span className="text-white text-xs font-semibold uppercase tracking-widest relative z-10">
                        Establish Connection
                        </span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform relative z-10" />
                    </div>
                    </button>
                </form>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-medium tracking-wide text-white">
                    Select Designation
                    </h2>
                    <p className="text-sm text-[#94a3b8] mt-1 font-light">
                    Configure your operational scope.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4">
                    
                    {/* Trader Option */}
                    <div
                        onClick={() => setRole("trader")}
                        className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/5 backdrop-blur-md ${
                        role === "trader"
                            ? "border border-[#FF9500] shadow-[0_0_20px_rgba(255,149,0,0.15)] bg-white/10"
                            : "border border-white/10 hover:border-white/30"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${role === "trader" ? "bg-[#FF9500]/20 text-[#FF9500]" : "bg-white/5 text-white/50"}`}>
                            <TrendingUp className="w-4 h-4" />
                            </div>
                            <h4 className="text-sm font-medium text-white tracking-wide">
                            Trader / Investor
                            </h4>
                        </div>
                        <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "trader" ? "border-[#FF9500]" : "border-white/20"}`}
                        >
                            {role === "trader" && (
                            <div className="w-2 h-2 rounded-full bg-[#FF9500] shadow-[0_0_5px_#FF9500]" />
                            )}
                        </div>
                        </div>
                        <p className="text-xs text-[#94a3b8] font-light leading-relaxed pl-11">
                        Access real-time feeds, monitor portfolios, and execute strategic movements across global markets.
                        </p>
                    </div>

                    {/* Analyst Option */}
                    <div
                        onClick={() => setRole("analyst")}
                        className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 relative overflow-hidden bg-white/5 backdrop-blur-md ${
                        role === "analyst"
                            ? "border border-[#FF9500] shadow-[0_0_20px_rgba(255,149,0,0.15)] bg-white/10"
                            : "border border-white/10 hover:border-white/30"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${role === "analyst" ? "bg-[#FF9500]/20 text-[#FF9500]" : "bg-white/5 text-white/50"}`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            </div>
                            <h4 className="text-sm font-medium text-white tracking-wide">
                            Financial Analyst
                            </h4>
                        </div>
                        <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "analyst" ? "border-[#FF9500]" : "border-white/20"}`}
                        >
                            {role === "analyst" && (
                            <div className="w-2 h-2 rounded-full bg-[#FF9500] shadow-[0_0_5px_#FF9500]" />
                            )}
                        </div>
                        </div>
                        <p className="text-xs text-[#94a3b8] font-light leading-relaxed pl-11">
                        Publish asset data, provide market insights, and manage structural definitions for assets.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs uppercase tracking-widest text-[#94a3b8] hover:text-white transition-colors"
                    >
                        Return
                    </button>

                    <button
                        type="submit"
                        disabled={!role}
                        className={`relative group overflow-hidden rounded-xl p-[1px] transition-all ${!role && 'opacity-50 cursor-not-allowed grayscale'}`}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#FF9500] to-[#ffaa33] opacity-80"></span>
                        <div className="relative bg-gradient-to-r from-[#FF9500] to-[#e68600] px-6 py-3 rounded-xl flex items-center justify-center gap-2 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                        <span className="text-white text-xs font-semibold uppercase tracking-widest relative z-10">
                            Confirm Link
                        </span>
                        </div>
                    </button>
                    </div>
                </form>
                </div>
            )}

            <div className="text-center pt-8 mt-4 border-t border-white/10">
                <p className="text-xs text-[#64748b] font-light">
                Session exists? {" "}
                <Link
                    href="/auth/login"
                    className="text-white hover:text-[#FF9500] transition-colors"
                >
                    Authenticate
                </Link>
                </p>
            </div>
            </div>
        </div>

      </div>
    </div>
  );
}

