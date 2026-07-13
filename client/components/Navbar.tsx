"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, Scale, LogOut, User, ChevronDown } from "lucide-react";

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
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const authLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/items/add", label: "Add Service" },
    { href: "/items/manage", label: "My Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A0B0D]/90 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ─── Logo ─── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center shadow-lg shadow-[#FF9500]/20 group-hover:shadow-[#FF9500]/40 transition-shadow">
              <Scale className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Lex<span className="text-[#FF9500]">Vizo</span>
            </span>
          </Link>

          {/* ─── Desktop Links ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#FF9500] bg-[#FF9500]/10"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Desktop Auth ─── */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-gray-800/50 rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-xs font-bold text-black">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(session.user.name)
                    )}
                  </div>
                  <span className="text-sm text-gray-300 max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#111215] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/[0.04]">
                        <p className="text-sm font-medium text-white truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
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
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-lg hover:shadow-lg hover:shadow-[#FF9500]/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile Toggle ─── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0A0B0D]/98 backdrop-blur-xl border-t border-white/[0.04] px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#FF9500] bg-[#FF9500]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 mt-3 border-t border-white/[0.04]">
            {session?.user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center text-xs font-bold text-black">
                    {getInitials(session.user.name)}
                  </div>
                  <div>
                    <p className="text-sm text-white">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="w-full text-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white border border-white/[0.06] rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full text-center px-4 py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
