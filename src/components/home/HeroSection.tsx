import Image from "next/image";
import Link from "next/link";
import { Gamepad2, Coffee } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* SVG Gradient definition for Lucide icons to use */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="btnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C04D7" />
            <stop offset="100%" stopColor="#CD4ECD" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Full-bleed Banner Background ── */}
      <div className="absolute inset-0 z-9">
        <Image
          src="/banner-2.png"
          alt="8bit Cafe Banner"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Subtle dark overlay so text is readable */}
        <div className="absolute inset-0 bg-[#1a0050]/25" />
      </div>

      {/* ── Hero Content Card ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div
          className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 text-center bg-[#6016B8]/20 backdrop-blur-md border border-white/10"
        >
          {/* ── Headline ── */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl leading-tight mb-4 tracking-wide"
            style={{
              fontFamily: "var(--font-jersey-20)",
              fontWeight: 400,
            }}
          >
            <span className="inline-block bg-[linear-gradient(180deg,#CC7FFF_0%,#F6F2ED_20%,#DC6AA5_45%,#DC6AA5_100%)] bg-clip-text text-transparent">
              LEVEL UP YOUR FUN AT
            </span>

            <br />

            <span className="inline-block bg-[linear-gradient(180deg,#F5FCED_0%,#33C2E2_100%)] bg-clip-text text-transparent">
              8BIT CAFE
            </span>
          </h1>

          {/* ── Sub-headline ── */}
          <p
            className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Play PS5, PS4 &amp; Pool Billiards while enjoying delicious fast food.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Book Gaming Session */}
            <Link
              href="/signup"
              className="btn-primary text-sm sm:text-base gap-2.5"
              style={{
                "--btn-height": "52px",
                "--btn-radius": "14px",
                "--btn-px": "32px",
              } as React.CSSProperties}
            >
              <Gamepad2 className="w-5 h-5 text-white" />
              <span>Book Gaming Session</span>
            </Link>

            {/* Order Food */}
            <Link
              href="#foods"
              className="btn-secondary text-sm sm:text-base gap-2.5"
              style={{
                "--btn-height": "52px",
                "--btn-radius": "14px",
                "--btn-px": "32px",
              } as React.CSSProperties}
            >
              <Coffee className="w-5 h-5" style={{ stroke: "url(#btnGrad)" }} />
              <span>Order Food</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}