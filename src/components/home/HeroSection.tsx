import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ---- Background layers ---- */}
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Central radial purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(124,58,237,0.22) 0%, rgba(108,40,217,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Top-right corner glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-left corner glow */}
      <div
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ---- Main content ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Tag */}
            <div className="inline-flex justify-center lg:justify-start mb-6">
              <span className="section-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
                Now Open — All Stations Available
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span className="text-white">Welcome to</span>
              <br />
              <span className="gradient-text">8bit Café</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-text-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Experience next-level gaming with high-performance PCs, epic tournaments,
              and a thriving community of passionate gamers. Your adventure starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                Explore Now
              </Link>

              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-text-secondary border border-border hover:border-primary hover:text-white transition-all duration-300 group"
              >
                Learn More
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "500+", label: "Active Members" },
                { value: "50+", label: "Gaming PCs" },
                { value: "200+", label: "Tournaments" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero visual card */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Outer glow ring */}
            <div
              className="absolute w-80 h-80 rounded-full animate-float-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
              }}
            />

            {/* Central glowing card */}
            <div className="relative z-10 glass-card rounded-3xl p-8 w-80">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="section-tag text-xs">Live Gaming</span>
                <span className="flex items-center gap-1.5 text-success text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  48 Online
                </span>
              </div>

              {/* Game cards preview */}
              <div className="space-y-3 mb-6">
                {[
                  { name: "Valorant", players: "12 playing", color: "#FF4655" },
                  { name: "League of Legends", players: "8 playing", color: "#C89B3C" },
                  { name: "CS2", players: "10 playing", color: "#F0A500" },
                ].map((game) => (
                  <div
                    key={game.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-light border border-border hover:border-border-bright transition-all duration-200"
                  >
                    {/* Game color dot */}
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${game.color}22`, border: `1px solid ${game.color}44` }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: game.color }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{game.name}</div>
                      <div className="text-text-muted text-xs">{game.players}</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
                  </div>
                ))}
              </div>

              {/* Book station button */}
              <Link
                href="/signup"
                className="btn-primary w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white block"
              >
                Book a Station
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#games"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-primary-light transition-colors group"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-6 h-9 rounded-full border-2 border-border flex items-start justify-center p-1 group-hover:border-primary transition-colors">
              <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
