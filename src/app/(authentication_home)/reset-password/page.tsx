"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(true);
    // Simulate API call and redirect
    setTimeout(() => {
      router.push("/login");
    }, 2000);
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
              Set a password
            </h1>
            <p
              className="text-white/80 leading-normal tracking-wide text-xs sm:text-sm"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Your previous password has been reseted. Please set a new password for your account.
            </p>
          </div>

          {/* Status Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-200 text-xs sm:text-sm">
              Password successfully reset! Redirecting to login...
            </div>
          )}

          {/* ── Form ── */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>

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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  disabled={success}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-12 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/40"
                />
                <button
                  type="button"
                  disabled={success}
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
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  disabled={success}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full bg-[#FFFFFF]/30 border border-purple-400/60 rounded-2xl text-white text-sm sm:text-base py-3.5 pl-11 pr-12 outline-none transition-all duration-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 placeholder:text-white/40"
                />
                <button
                  type="button"
                  disabled={success}
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

            {/* ── Done Button ── */}
            <button
              type="submit"
              disabled={success}
              className="w-full py-3.5 sm:py-4 mt-2 rounded-2xl text-white font-semibold text-sm sm:text-base tracking-wide cursor-pointer border-none transition-all duration-200 hover:brightness-110 active:scale-[0.985] disabled:opacity-50"
              style={{
                background: "linear-gradient(180deg, #6C04D7 0%, #CD4ECD 100%)",
                boxShadow: "0 6px 24px rgba(180,40,250,0.45)",
              }}
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
