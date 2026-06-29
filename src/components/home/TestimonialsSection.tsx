"use client";

import { useState } from "react";

// Review data
const reviews = [
  {
    id: 1,
    name: "Alex Rahman",
    username: "@alexgamer",
    avatar: "AR",
    avatarColor: "#7C3AED",
    rating: 5,
    date: "June 2026",
    review:
      "Absolutely love this place! The PCs are lightning fast, the ambiance is incredible, and the staff genuinely care about the gaming experience. The tournaments are well-organized and the community is super welcoming.",
    game: "Valorant Player",
  },
  {
    id: 2,
    name: "Priya Sharma",
    username: "@priya_plays",
    avatar: "PS",
    avatarColor: "#EC4899",
    rating: 5,
    date: "May 2026",
    review:
      "Best gaming café in the city, hands down. The coffee is fantastic, the internet is blazing fast, and I've made so many friends through the community events. 8bit Café changed how I think about gaming spaces!",
    game: "League of Legends Player",
  },
  {
    id: 3,
    name: "James Liu",
    username: "@jimmygamer99",
    avatar: "JL",
    avatarColor: "#22C55E",
    rating: 5,
    date: "June 2026",
    review:
      "Competed in my first tournament here and it was an unforgettable experience. The setup, the crowd, the energy — nothing else compares. Already registered for the next Valorant cup. See you on the leaderboard!",
    game: "Tournament Competitor",
  },
  {
    id: 4,
    name: "Sarah Tanaka",
    username: "@sarahplays",
    avatar: "ST",
    avatarColor: "#F59E0B",
    rating: 4,
    date: "April 2026",
    review:
      "Great atmosphere and super comfy chairs (finally!). The gaming peripherals are all top notch. Minor complaint — it can get a bit crowded on weekends. But that just shows how popular and awesome this place is!",
    game: "CS2 Player",
  },
  {
    id: 5,
    name: "Marcus O.",
    username: "@marcobit",
    avatar: "MO",
    avatarColor: "#38BDF8",
    rating: 5,
    date: "May 2026",
    review:
      "The coaching sessions here are a game-changer. Went from Silver to Gold in a month following their structured training. The coaches are ex-pros and really know their stuff. Highly recommend!",
    game: "Apex Legends Player",
  },
];

// --- Star row ---
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth={2}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIndex((i) => (i + 1) % reviews.length);

  const activeReview = reviews[activeIndex];

  return (
    <section id="reviews" className="py-20 lg:py-28 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">Testimonials</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            What Gamers <span className="gradient-text">Say</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            Don&apos;t take our word for it — hear from the players who call 8bit Café their home.
          </p>
        </div>

        {/* Carousel — featured large review */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="glass-card glow-border rounded-3xl p-8 sm:p-10 relative">
            {/* Large quote mark */}
            <div
              className="absolute top-6 right-8 text-8xl font-black leading-none select-none pointer-events-none"
              style={{ color: "rgba(124,58,237,0.15)", fontFamily: "Georgia, serif" }}
            >
              &quot;
            </div>

            {/* Stars */}
            <div className="mb-4">
              <Stars count={activeReview.rating} />
            </div>

            {/* Review text */}
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6 relative z-10">
              &ldquo;{activeReview.review}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ backgroundColor: activeReview.avatarColor }}
              >
                {activeReview.avatar}
              </div>
              <div>
                <div className="text-white font-bold">{activeReview.name}</div>
                <div className="text-text-muted text-sm">{activeReview.game}</div>
              </div>
              <div className="ml-auto text-text-muted text-xs">{activeReview.date}</div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-white text-text-muted flex items-center justify-center transition-all duration-200"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-border-bright"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-white text-text-muted flex items-center justify-center transition-all duration-200"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mini review cards — other reviews (desktop only) */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {reviews
            .filter((_, i) => i !== activeIndex)
            .slice(0, 3)
            .map((review) => (
              <div
                key={review.id}
                className="glass-card rounded-2xl p-5 cursor-pointer hover:border-primary/40 transition-all duration-300"
                onClick={() => setActiveIndex(reviews.indexOf(review))}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{review.name}</div>
                    <Stars count={review.rating} />
                  </div>
                </div>
                <p className="text-text-muted text-xs leading-relaxed line-clamp-3">
                  &ldquo;{review.review}&rdquo;
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
