"use client";

import ReviewCard, { ReviewData } from "./review/reviewCard";

const reviewList: ReviewData[] = [
  {
    id: 1,
    name: "Milton Zahino",
    role: "Behavioral Science",
    reviewText: "We Move at a fast pace. I'm always working On Something I am excited about!",
    rating: 5,
    imageSrc: "/promotion-img.png", // using an existing image from public folder as placeholder
    imageAlt: "Review image 1",
  },
  {
    id: 2,
    name: "Alex Rahman",
    role: "Software Engineer",
    reviewText: "Great ambience, top-tier setup, and the food options are absolutely amazing!",
    rating: 5,
    imageSrc: "/street_fighter.png",
    imageAlt: "Review image 2",
  },
  {
    id: 3,
    name: "Sarah Tanaka",
    role: "Content Creator",
    reviewText: "Best place to stream and meet new gaming partners. Loving the lounge and coffee!",
    rating: 5,
    imageSrc: "/vr_racing.png",
    imageAlt: "Review image 3",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Competitive Gamer",
    reviewText: "Outstanding tournament organization and premium equipment. Simply the best.",
    rating: 5,
    imageSrc: "/esports_pc.png",
    imageAlt: "Review image 4",
  },
];

// Duplicate the reviews list to create an infinite loop effect
const doubleReviews = [...reviewList, ...reviewList, ...reviewList];

export default function Review() {
  return (
    <section id="reviews-section" className="py-16 relative overflow-hidden bg-[#080818]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(108,4,215,0.05) 0%, transparent 70%)"
      }} />

      <div className="relative w-full mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
            <span className="text-[#CD4ECD]">Review&apos;s</span>
          </h2>
        </div>

        {/* Scrolling Carousel Container */}
        <div className="relative w-full overflow-hidden flex select-none">
          {/* Scroll Track */}
          <div className="flex gap-4 animate-marquee py-4 whitespace-nowrap">
            {doubleReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Styled animation for smooth marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-240px * 4 - 16px * 4));
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
