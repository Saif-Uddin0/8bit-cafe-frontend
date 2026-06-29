"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.trim()) {
      // For demo / layout walkthrough, push to the verification page
      router.push("/verify-code");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070616] px-4 py-8 sm:px-6">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/Signin.png"
          alt="Background"
          priority
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* ── Dark vignette overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(7,6,22,0.15) 0%, rgba(7,6,22,0.55) 100%)",
        }}
      />

      {/* ── Card ── */}
      <div className="relative w-full max-w-3xl mx-auto" style={{ zIndex: 10 }}>
        <div
          className="w-full rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
          style={{
            background: "#0000008F",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: "clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)",
          }}
        >
          {/* ── Logo ── */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="100px"
                className="object-cover p-1"
              />
            </div>
          </div>

          {/* ── Back to Login Link ── */}
          <div className="mb-3 text-left">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/60 hover:text-white transition-colors no-underline font-medium"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to login
            </Link>
          </div>

          {/* ── Heading & Subheading ── */}
          <div className="mb-6 text-left">
            <h1
              className="text-white mb-2 leading-tight tracking-wide"
              style={{
                fontFamily: "var(--font-jersey-20)",
                fontSize: "clamp(26px, 5vw, 38px)",
                fontWeight: 400,
              }}
            >
              Forgot your password?
            </h1>
            <p
              className="text-white/80 leading-normal tracking-wide text-xs sm:text-sm"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Don&apos;t worry, happens to all of us. Enter your email below to recover your password
            </p>
          </div>

          {/* ── Form ── */}
          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit}>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
              >
                Work email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none flex items-center">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter work email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/40"
                />
              </div>
            </div>

            {/* ── Continue Button ── */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 mt-2 rounded-2xl text-white font-semibold text-sm sm:text-base tracking-wide cursor-pointer border-none transition-all duration-200 hover:brightness-110 active:scale-[0.985]"
              style={{
                background: "linear-gradient(180deg, #6C04D7 0%, #CD4ECD 100%)",
                boxShadow: "0 6px 24px rgba(180,40,250,0.45)",
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
