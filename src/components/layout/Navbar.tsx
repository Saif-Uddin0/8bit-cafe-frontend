"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, MapPin } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#foods", label: "Foods" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Outer wrapper: flex fixed row, centered */
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-20 ">

      {/* ── Floating Nav Card ── */}
      <div
        className="w-full max-w-[1200px] relative"
        style={{
          height: "88px",
          borderRadius: "20px",
          background: "rgba(41, 17, 101, 0.4)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(108,4,215,0.15)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Inner flex row */}
        <div className="flex items-center justify-between h-full px-5 sm:px-7">

          {/* ── Logo ── */}
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

          {/* ── Desktop Nav Links (centered absolutely) ── */}
          <ul className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) =>
              link.active ? (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-5 py-2 text-sm font-bold block"
                    style={{
                      color: "#EF3D86",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-5 py-2 text-sm font-medium block transition-all duration-200"
                    style={{ color: "rgba(255,255,255,1)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background =
                        "linear-gradient(135deg, #6C04D7 0%, #CD4ECD 100%)";
                      el.style.WebkitBackgroundClip = "text";
                      el.style.WebkitTextFillColor = "transparent";
                      el.style.backgroundClip = "text";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "none";
                      el.style.WebkitBackgroundClip = "unset";
                      el.style.WebkitTextFillColor = "rgba(255,255,255,0.80)";
                      el.style.backgroundClip = "unset";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* ── Desktop Right: Icons + Sign In ── */}
          <div className="hidden lg:flex items-center gap-5">

            {/* Cart */}
            <button
              type="button"
              aria-label="Cart"
              className="transition-colors duration-200 text-white hover:text-[#CD4ECD]"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />
            </button>

            {/* Location */}
            <button
              type="button"
              aria-label="Location"
              className="transition-colors duration-200 text-white hover:text-[#CD4ECD]"
            >
              <MapPin size={22} strokeWidth={1.8} />
            </button>

            {/* Sign In */}
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
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 hover:border-purple-400/60 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
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
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    link.active
                      ? {
                        color: "#EF3D86",
                      }
                      : { color: "rgba(255,255,255,0.8)" }
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="btn-secondary w-full text-center py-3 text-sm"
            style={{ borderRadius: "14px" }}
          >
            <span>Sign In</span>
          </Link>
        </div>
      )}
    </header>
  );
}
