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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ─── Logo ─── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#FF9500] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0F172A]">
              Nex<span className="text-[#FF9500]">Trade</span>
            </span>
          </Link>

          {/* ─── Desktop Links ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#FF9500] border-b-2 border-[#FF9500]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Desktop Auth ─── */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-[#F1F5F9] animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#F8F9FA] transition-all group"
                >
                  <div className="w-8 h-8 bg-[#FF9500] flex items-center justify-center text-xs font-bold text-white">
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
                  <span className="text-sm text-[#0F172A] max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748B] transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E2E8F0] shadow-lg z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#E2E8F0]">
                        <p className="text-sm font-medium text-[#0F172A] truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
                  className="px-4 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors uppercase tracking-wide"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#FF9500] hover:bg-[#E68600] transition-all uppercase tracking-wide"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile Toggle ─── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#64748B] hover:text-[#0F172A] transition-colors"
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
        <div className="bg-white border-t border-[#E2E8F0] px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-[#FF9500] bg-[#FFF7ED]"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F9FA]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 mt-3 border-t border-[#E2E8F0]">
            {session?.user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 bg-[#FF9500] flex items-center justify-center text-xs font-bold text-white">
                    {getInitials(session.user.name)}
                  </div>
                  <div>
                    <p className="text-sm text-[#0F172A]">{session.user.name}</p>
                    <p className="text-xs text-[#64748B]">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="w-full text-center px-4 py-3 text-sm font-medium text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full text-center px-4 py-3 text-sm font-semibold text-white bg-[#FF9500]"
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
