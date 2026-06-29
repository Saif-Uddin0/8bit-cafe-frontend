"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070616] px-4 py-8 sm:px-6">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/Signin.png"
          alt="Signup Background"
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

      {/* ── Signup Card ── */}
      <div className="relative w-full max-w-4xl mx-auto" style={{ zIndex: 10 }}>
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
          <div className="flex justify-center mb-2">
            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="(max-width: 640px) 80px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                className="object-cover p-1"
              />
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="mb-5 text-left">
            <h1
              className="text-white mb-1 leading-none tracking-wide"
              style={{
                fontFamily: "var(--font-jersey-20)",
                fontSize: "clamp(26px, 5vw, 40px)",
                fontWeight: 400,
              }}
            >
              Sign Up
            </h1>
            <p
              className="text-white leading-snug tracking-wide"
              style={{
                fontFamily: "var(--font-jersey-20)",
                fontSize: "clamp(13px, 2.5vw, 18px)",
              }}
            >
              Let&apos;s get you all set up so you can access your personal account.
            </p>
          </div>

          {/* ── Form ── */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>

            {/* Row 1: First name + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
                >
                  First name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 px-4 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
                >
                  Last name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 px-4 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                />
              </div>
            </div>

            {/* Row 2: Work email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Work Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
                >
                  Work email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none flex items-center">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter work email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
                >
                  Phone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none flex items-center">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter Phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none flex items-center">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-12 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer flex items-center p-0 bg-transparent border-none"
                >
                  {showPassword ? (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide"
              >
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none flex items-center">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-12 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer flex items-center p-0 bg-transparent border-none"
                >
                  {showConfirmPassword ? (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ── Terms Checkbox ── */}
            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 shrink-0 rounded border border-purple-400/60 bg-white/10 accent-fuchsia-500 cursor-pointer"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-xs sm:text-sm text-white leading-snug cursor-pointer"
              >
                I agree to all the{" "}
                <Link
                  href="/terms"
                  className="text-fuchsia-400 font-semibold hover:text-fuchsia-300 transition-colors no-underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-fuchsia-400 font-semibold hover:text-fuchsia-300 transition-colors no-underline"
                >
                  Privacy Policies
                </Link>
              </label>
            </div>

            {/* ── Sign Up Button ── */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 mt-1 rounded-2xl text-white font-semibold text-sm sm:text-base tracking-wide cursor-pointer border-none transition-all duration-200 hover:brightness-110 active:scale-[0.985]"
              style={{
                background: "linear-gradient(180deg, #6C04D7 0%, #CD4ECD 100%)",
                boxShadow: "0 6px 24px rgba(180,40,250,0.45)",
              }}
            >
              Sign Up
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-purple-400/25" />
            <span className="px-4 text-xs text-white font-medium tracking-widest whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-purple-400/25" />
          </div>

          {/* ── Social Buttons ── */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-2xl bg-[#181426]/60 border border-white text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:border-white/40 hover:bg-[#1c1636]/85 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-8 py-3 sm:py-3.5 rounded-2xl bg-[#181426]/60 border border-white text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:border-white/40 hover:bg-[#1c1636]/85 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.12.01.24.02.36.02.95 0 2.05-.54 2.46-1.35" />
              </svg>
              Apple
            </button>
          </div>

          {/* ── Sign In Link ── */}
          <p className="text-center text-xs sm:text-sm text-white mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-fuchsia-400 font-semibold hover:text-fuchsia-300 transition-colors no-underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
