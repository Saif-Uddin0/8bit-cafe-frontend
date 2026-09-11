"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

const LOCATION_URL = "https://maps.app.goo.gl/MgfpztgG6WTqMhz28";
const FACEBOOK_URL =
  "https://www.facebook.com/share/1FNMhczLoF/?mibextid=wwXIfr";
const INSTAGRAM_URL =
  "https://www.instagram.com/8bi.tcafe?stkn=MWs3Nno2OXJnOWgzZA==";

const PHONE = "01608-955624";
const MESSENGER_HANDLE = "8Bit Cafe";

const footerLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/foods", label: "Food" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative text-white font-sans overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #6C04D7 0%, #8D18D9 35%, #B936D2 70%, #CD4ECD 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">
          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo */}
              <div
                className="relative overflow-hidden shrink-0"
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 8px 24px rgba(108,4,215,0.25)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="8bit Cafe Logo"
                  fill
                  sizes="68px"
                  className="object-cover p-1"
                />
              </div>

              <div>
                <h3
                  style={{ fontFamily: "var(--font-jersey-20)" }}
                  className="text-[22px] text-white tracking-wide leading-tight"
                >
                  8Bit Cafe
                </h3>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-[260px]">
              Your go-to gaming lounge and cafe where pixels meet great food.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-sm font-bold mb-5 tracking-widest text-white uppercase">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("/#")) {
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          const sectionId = link.href.replace("/#", "");
                          const el = document.getElementById(sectionId);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                          window.history.pushState(null, "", link.href);
                        }
                      }
                    }}
                    className="text-white/85 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-sm font-bold mb-5 tracking-widest text-white uppercase">
              Contact
            </h4>

            <ul className="space-y-4 text-sm">
              {/* Phone */}
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-200 group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <Phone size={14} />
                  </span>

                  {PHONE}
                </a>
              </li>


              {/* Location */}
              <li>
                <a
                  href={LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/90 hover:text-white transition-colors duration-200 group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <MapPin size={14} />
                  </span>

                  <span className="leading-snug">
                    Level 4, MEF Center, SSK Road
                    <br />
                    (Opposite to Mejban Dine), 3900
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Follow Us ── */}
          <div>
            <h4 className="text-sm font-bold mb-5 tracking-widest text-white uppercase">
              Follow Us
            </h4>

            {/* Facebook + Instagram same line */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #1877F2, #0a5dc9)",
                    boxShadow: "0 4px 12px rgba(24,119,242,0.3)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.093 24 18.1 24 12.073z" />
                  </svg>
                </span>
              </a>

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    boxShadow: "0 4px 12px rgba(220,39,67,0.3)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="white"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{
          borderColor: "rgba(255,255,255,0.30)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-center">
          <p className="text-white/90 text-sm tracking-wide text-center">
            © {new Date().getFullYear()} 8Bit Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
