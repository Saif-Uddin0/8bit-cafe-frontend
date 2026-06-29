"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// --- Navigation Links ---
const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#games", label: "Games" },
  { href: "#tournaments", label: "Tournaments" },
  { href: "#leaderboard", label: "Leaderboard" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add background blur when scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo icon — pixel-art-style controller */}
            <div className="relative w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(124,58,237,0.5)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-light"
              >
                <path
                  d="M6 12H10M8 10V14M15 12H15.01M17 11H17.01M7.2 8H16.8C18.8 8 19.8 8 20.55 8.44C21.18 8.82 21.64 9.4 21.87 10.08C22.13 10.85 21.89 11.82 21.42 13.77L21 15.5C20.6 17.12 20.4 17.94 19.9 18.54C19.46 19.07 18.89 19.47 18.25 19.7C17.52 19.96 16.68 19.9 15 19.78L14 19.7C12.9 19.62 12.35 19.58 11.82 19.63C11.36 19.67 10.91 19.78 10.48 19.95C9.99 20.14 9.55 20.45 8.67 21.05L8.3 21.3C7.53 21.82 7.15 22.08 6.81 22.08C6.51 22.08 6.23 21.95 6.04 21.72C5.81 21.45 5.76 21.01 5.66 20.13L5.5 18.72C5.36 17.56 5.29 16.97 5.12 16.45C4.97 15.99 4.76 15.55 4.5 15.15C4.2 14.69 3.79 14.3 2.96 13.51L2.7 13.26C2.27 12.84 2.06 12.63 1.97 12.44C1.88 12.24 1.88 12.02 1.97 11.82C2.06 11.62 2.27 11.41 2.7 10.98L2.96 10.74C3.79 9.95 4.2 9.55 4.5 9.1C4.76 8.7 4.97 8.26 5.12 7.8C5.29 7.27 5.36 6.69 5.5 5.53L5.66 4.12C5.76 3.24 5.81 2.8 6.04 2.53C6.23 2.3 6.51 2.17 6.81 2.17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="font-display text-xl font-bold tracking-wider"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span className="text-white">8bit</span>
              <span className="text-primary-light"> café</span>
            </span>
          </Link>

          {/* ---- Desktop Nav Links ---- */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted hover:text-white text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-light transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* ---- Desktop CTA Buttons ---- */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-semibold text-text-secondary border border-border rounded-full hover:border-primary hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-primary px-5 py-2 text-sm font-semibold text-white rounded-full"
            >
              Sign Up
            </Link>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border hover:border-primary transition-colors"
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

        {/* ---- Mobile Menu Dropdown ---- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card rounded-2xl mb-4 p-4 border border-border">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-text-muted hover:text-white hover:bg-surface-light rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-5 py-2.5 text-sm font-semibold text-text-secondary border border-border rounded-full hover:border-primary hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
