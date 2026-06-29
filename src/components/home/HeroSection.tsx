import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Full-bleed Banner Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          alt="8bit Cafe Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark overlay so text is readable */}
        <div className="absolute inset-0 bg-[#1a0050]/50" />
      </div>

      {/* ── Hero Content Card ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div
          className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 text-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* ── Headline ── */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 tracking-wide"
            style={{
              fontFamily: "var(--font-jersey-20)",
              fontWeight: 400,
              color: "#c026d3",
              textShadow:
                "0 0 40px rgba(192,38,211,0.6), 0 0 80px rgba(192,38,211,0.3)",
            }}
          >
            LEVEL UP YOUR FUN AT 8BIT CAFE
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #6C04D7 0%, #CD4ECD 100%)",
                boxShadow: "0 6px 24px rgba(180,40,250,0.4)",
              }}
            >
              {/* Gamepad icon */}
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12H10M8 10V14M15 12H15.01M17 11H17.01M7.2 8H16.8C18.8 8 19.8 8 20.55 8.44C21.18 8.82 21.64 9.4 21.87 10.08C22.13 10.85 21.89 11.82 21.42 13.77L21 15.5C20.6 17.12 20.4 17.94 19.9 18.54C19.46 19.07 18.89 19.47 18.25 19.7C17.52 19.96 16.68 19.9 15 19.78L14 19.7C12.9 19.62 12.35 19.58 11.82 19.63C11.36 19.67 10.91 19.78 10.48 19.95C9.99 20.14 9.55 20.45 8.67 21.05L8.3 21.3C7.53 21.82 7.15 22.08 6.81 22.08C6.51 22.08 6.23 21.95 6.04 21.72C5.81 21.45 5.76 21.01 5.66 20.13L5.5 18.72C5.36 17.56 5.29 16.97 5.12 16.45C4.97 15.99 4.76 15.55 4.5 15.15C4.2 14.69 3.79 14.3 2.96 13.51L2.7 13.26C2.27 12.84 2.06 12.63 1.97 12.44C1.88 12.24 1.88 12.02 1.97 11.82C2.06 11.62 2.27 11.41 2.7 10.98L2.96 10.74C3.79 9.95 4.2 9.55 4.5 9.1C4.76 8.7 4.97 8.26 5.12 7.8C5.29 7.27 5.36 6.69 5.5 5.53L5.66 4.12C5.76 3.24 5.81 2.8 6.04 2.53C6.23 2.3 6.51 2.17 6.81 2.17"
                />
              </svg>
              Book Gaming Session
            </Link>

            {/* Order Food */}
            <Link
              href="#foods"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/15 active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Food icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
              Order Food
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}