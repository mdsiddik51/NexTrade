"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldAlert, Key } from "lucide-react";
import { Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Login = () => {
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
    <div className="min-h-screen bg-white text-[#0F172A] font-sans flex flex-col justify-between selection:bg-[#FF9500] selection:text-white pt-24">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border border-[#E2E8F0] bg-white p-8 lg:p-10 rounded-none">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#FF9500] font-semibold mb-2">
              <span className="w-1.5 h-1.5 bg-[#FF9500]"></span>
              Secure Network Portal
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] rounded-none">
              LogIn to NexTrade
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Enter your credentials to access your account securely.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-none flex items-center gap-2 text-xs text-red-600">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Demo Login Options */}
          <div className="mb-6 p-4 bg-[#F8F9FA] border border-[#E2E8F0] rounded-none">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold mb-3 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-[#FF9500]" />
              Quick Demo Access
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => autofillDemo("trader")}
                className="py-2 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-xs font-semibold text-[#FF9500] transition rounded-none cursor-pointer"
              >
                Demo Trader
              </button>
              <button
                type="button"
                onClick={() => autofillDemo("analyst")}
                className="py-2 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-xs font-semibold text-[#FF9500] transition rounded-none cursor-pointer"
              >
                Demo Analyst
              </button>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3 px-4 border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] transition flex items-center justify-center gap-3 text-sm font-medium text-[#0F172A] rounded-none cursor-pointer"
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

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-widest text-[#94A3B8]">
              Or email credentials
            </span>
          </div>

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
                className="w-full bg-white border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF9500] transition pr-10 rounded-none"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-[#FF9500] hover:bg-[#E68600] text-white text-xs font-semibold uppercase tracking-widest py-3.5 px-4 rounded-none transition flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Processing Authorization..." : "Verify Identity"}
              {!isLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Don't have an account? {"   "}
              <Link
                href="/auth/signup"
                className="text-[#0F172A] hover:text-[#FF9500] underline underline-offset-4 transition"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="px-6 lg:px-16 py-6 border-t border-[#E2E8F0] text-center flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#F8F9FA]">
        <div className="text-[10px] uppercase tracking-wider text-[#64748B]">
          &copy; 2026 NexTrade Systems Node.
        </div>
      </footer>
    </div>
  );
};

export default Login;