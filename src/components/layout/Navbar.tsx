"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, MapPin, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/foods", label: "Food" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();

  const { state: { items }, toggleCart, totalQuantity } = useCart();
  const { user, avatar, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const onScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/foods") {
      return pathname === "/foods" || pathname === "/foods/";
    }
    return false;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-20">
      {/* Floating Nav Card */}
      <div
        className="w-full max-w-[1500px] relative transition-all duration-300"
        style={{
          height: "88px",
          borderRadius: "20px",
          background: scrolled ? "rgba(22, 10, 54, 0.9)" : "rgba(41, 17, 101, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.55), 0 2px 12px rgba(108,4,215,0.25)"
            : "0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(108,4,215,0.15)",
        }}
      >
        <div className="flex items-center justify-between h-full px-5 sm:px-7">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "14px",
              }}
            >
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="70px"
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links (centered absolutely) */}
          <ul className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-5 py-2 text-sm font-semibold transition-all duration-200"
                    style={{
                      color: active ? "#EF3D86" : "rgba(255,255,255,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#CD4ECD";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right: Icons + Sign In */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => toggleCart(true)}
              aria-label="Open Cart"
              className="relative transition-colors duration-200 text-white hover:text-[#CD4ECD] p-2"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />
              {mounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF3D86] text-[10px] font-bold text-white shadow-lg animate-pulse-glow">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Location */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=8Bit+Cafe+Feni"
              target="_blank"
              rel="noopener noreferrer"
              title="View on Google Maps"
            >
              <MapPin
                className="text-3xl text-white hover:text-[#7C3AED] transition cursor-pointer"
              />
            </a>

            {/* Sign In */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-500/50">
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-white/80 hover:text-[#EF3D86] transition-colors cursor-pointer bg-transparent border-none"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-secondary text-sm"
                style={
                  {
                    "--btn-height": "42px",
                    "--btn-radius": "10px",
                    "--btn-px": "40px",
                    "--btn-py": "26px",
                    "--btn-mx": "0px",
                    "--btn-my": "0px",
                  } as React.CSSProperties
                }
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Actions: Cart + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Cart Button */}
            <button
              type="button"
              onClick={() => toggleCart(true)}
              aria-label="Open Cart"
              className="relative p-2 text-white transition-colors duration-200 hover:text-[#CD4ECD]"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />
              {mounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF3D86] text-[9px] font-bold text-white shadow-lg">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Location */}
            <a
              href="https://maps.app.goo.gl/MgfpztgG6WTqMhz28"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Store Location"
              title="View Store Location"
              className="p-2 text-white transition-colors duration-200 hover:text-[#CD4ECD]"
            >
              <MapPin size={22} strokeWidth={1.8} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 transition-colors hover:border-[#CD4ECD]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="absolute top-[96px] left-4 right-4 p-5"
          style={{
            borderRadius: "18px",
            background: "rgba(41, 17, 101, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          }}
        >
          <ul className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      color: active ? "#EF3D86" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {user ? (
            <div className="flex items-center justify-between px-4 py-3 bg-[#181426]/60 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/50">
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-white/90 max-w-[150px] truncate">
                  {user?.name || user?.username || "Gamer"}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-xs font-semibold text-[#EF3D86] hover:text-[#CD4ECD] transition-colors cursor-pointer bg-transparent border-none"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full text-center py-3 text-sm"
              style={{ borderRadius: "14px" }}
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
