"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, TrendingUp, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Markets" },
    { href: "/about", label: "About" },
  ];

  const authLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Markets" },
    { href: "/items/add", label: "List Asset" },
    { href: "/items/manage", label: "My Portfolio" },
    { href: "/about", label: "About" },
  ];

  const links = session?.user ? authLinks : publicLinks;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav
        className={`w-full max-w-7xl mx-auto transition-all duration-300 rounded-2xl border border-white/10 backdrop-blur-xl ${
          isScrolled
            ? "bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "bg-white/5"
        }`}
      >
        <div className="px-6 h-16 lg:h-20 flex items-center justify-between">
          {/* ─── Logo ─── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#FF6B00] to-[#FFA800] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Nex<span className="text-[#FF6B00]">Trade</span>
            </span>
          </Link>

          {/* ─── Desktop Links ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-250 ${
                  pathname === link.href
                    ? "text-[#FF6B00] border-b-2 border-[#FF6B00]"
                    : "text-[#C5C6C7] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Desktop Auth ─── */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-white/5 animate-pulse rounded-xl" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-white/5 rounded-xl transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-xs font-bold text-white overflow-hidden shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(session.user.name)
                    )}
                  </div>
                  <span className="text-sm text-white max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5C6C7] transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#0B0C10]/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-[#C5C6C7] truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-xs font-semibold text-[#C5C6C7] hover:text-white transition-colors uppercase tracking-wider"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="relative group overflow-hidden rounded-xl p-[1px] block"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#FF6B00] opacity-80 group-hover:opacity-100 transition-opacity"></span>
                  <div className="relative bg-gradient-to-r from-[#FF6B00] to-[#FFA800] px-5 py-2.5 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                    <span className="text-white text-xs font-semibold uppercase tracking-wider relative z-10">
                      Get Started
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile Toggle ─── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#C5C6C7] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ─── Mobile Menu ─── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-[500px] opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-1 bg-black/80 rounded-b-2xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors ${
                  pathname === link.href
                    ? "text-[#FF6B00] bg-white/5"
                    : "text-[#C5C6C7] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-white/10">
              {session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                      {getInitials(session.user.name)}
                    </div>
                    <div>
                      <p className="text-sm text-white">{session.user.name}</p>
                      <p className="text-xs text-[#C5C6C7]">{session.user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth/login"
                    className="w-full text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#C5C6C7] hover:text-white border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="w-full text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] to-[#FFA800] rounded-xl transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
