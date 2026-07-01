import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      className="relative text-white font-sans overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #6C04D7 0%, #CD4ECD 100%)"
      }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
          
          {/* Logo container */}
          <div className="flex justify-start">
            <div
              className="relative overflow-hidden"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="80px"
                className="object-cover p-1"
              />
            </div>
          </div>

          {/* Academy Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wide text-white">Academy</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-white/80 hover:text-white hover:underline transition-all text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/80 hover:text-white hover:underline transition-all text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#food" className="text-white/80 hover:text-white hover:underline transition-all text-sm">
                  Food
                </Link>
              </li>
            </ul>
          </div>

          {/* Students Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wide text-white">Students</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/portal" className="text-white/80 hover:text-white hover:underline transition-all text-sm">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wide text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2.5">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27 1.11z" />
                </svg>
                <span>602-703-2146</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Comstep28@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>11845 Cypress Creek Pkwy, Suite 290 Houston, Texas 77068.</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs font-bold text-white/90">Follow Us On :</span>
              {/* Instagram */}
              <a href="#" className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary hover:scale-105 transition-transform" aria-label="Instagram">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary hover:scale-105 transition-transform" aria-label="TikTok">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1-.09-.17-.22-.3-.3v5.99c.02 2.3-.92 4.65-2.73 6.06-1.9 1.56-4.63 2.05-6.91 1.34-2.31-.69-4.24-2.61-4.88-4.93-.75-2.61-.17-5.61 1.56-7.66 1.62-1.95 4.21-2.91 6.74-2.51v4.07c-1.39-.42-2.99-.07-3.98.94-.96.96-1.28 2.47-.84 3.76.4 1.25 1.65 2.18 2.97 2.21 1.41.06 2.82-.87 3.19-2.23.11-.47.13-.96.12-1.44V.02z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary hover:scale-105 transition-transform" aria-label="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 text-center">
          <p className="text-white/90 text-sm tracking-wide">
            ©2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
