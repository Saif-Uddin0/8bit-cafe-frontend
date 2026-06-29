"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, FormEvent, KeyboardEvent, ClipboardEvent } from "react";

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number): void => {
    // Only accept numeric input
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to the next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Move to the previous field and clear it
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      } else {
        // Clear current field
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      // Navigate to reset password page
      router.push("/reset-password");
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
              Verify code
            </h1>
            <p
              className="text-white/80 leading-normal tracking-wide text-xs sm:text-sm"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              An authentication code has been sent to your email.
            </p>
          </div>

          {/* ── Form ── */}
          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit}>

            <div className="flex gap-2 sm:gap-4 my-2 w-full">
              {code.map((digit, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] p-[1.5px]"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={idx === 0 ? handlePaste : undefined}
                    className="w-full h-12 sm:h-14 rounded-2xl bg-[#090313] text-center text-xl sm:text-2xl font-bold text-white outline-none transition-all duration-200 focus:ring-2 focus:ring-pink-400/20"
                    style={{
                      fontFamily: "var(--font-jersey-20)",
                      fontWeight: 400,
                    }}
                    required
                  />
                </div>
              ))}
            </div>
            {/* Resend Link */}
            <div className="text-left text-xs sm:text-sm text-white/80">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                className="bg-transparent border-none p-0 text-fuchsia-400 font-semibold hover:text-fuchsia-300 transition-colors cursor-pointer text-xs sm:text-sm inline"
                onClick={() => alert("Verification code resent!")}
              >
                Resend
              </button>
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
