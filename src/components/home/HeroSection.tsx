import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
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
          className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 text-center bg-[#6016B8]/20 backdrop-blur-md border border-white/10
  "
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(to bottom, #6C04D7 0%, #CD4ECD 100%)",
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-105 active:scale-[0.98] bg-white"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(135deg, #6C04D7 0%, #CD4ECD 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              {/* Fork icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#foodGrad)"
                strokeWidth={1.8}
              >
                <defs>
                  <linearGradient id="foodGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6C04D7" />
                    <stop offset="100%" stopColor="#CD4ECD" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 2v20" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
              </svg>
              <span
                style={{
                  background: "linear-gradient(135deg, #6C04D7 0%, #CD4ECD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Order Food
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}