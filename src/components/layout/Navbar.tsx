"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#foods", label: "Foods" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0820]/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_16px_rgba(124,58,237,0.35)]">
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="56px"
                className="object-cover p-0.5"
              />
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    link.active
                      ? "text-fuchsia-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart Icon */}
            <button
              type="button"
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Cart"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>

            {/* Location Icon */}
            <button
              type="button"
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Location"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </button>

            {/* Sign In Button */}
            <Link
              href="/login"
              className="px-6 py-2 rounded-full text-sm font-semibold bg-white text-[#1a0a3a] hover:bg-white/90 transition-all duration-200 shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
            >
              Sign In
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 hover:border-purple-400/60 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* ── Mobile Dropdown ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0820]/95 backdrop-blur-xl rounded-2xl mb-4 p-4 border border-purple-500/20">
            <ul className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      link.active
                        ? "text-fuchsia-400 bg-fuchsia-500/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[#1a0a3a] hover:bg-white/90 transition-all"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
