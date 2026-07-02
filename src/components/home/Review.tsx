"use client";

import ReviewCard, { ReviewData } from "./review/reviewCard";

const reviewList: ReviewData[] = [
  {
    id: 1,
    name: "Milton Zahino",
    role: "Behavioral Science",
    reviewText:
      "We Move at a fast pace. I'm always working On Something I am excited about!",
    rating: 5,
    imageSrc: "/promotion-img.png",
    imageAlt: "Milton Zahino",
  },
  {
    id: 2,
    name: "Alex Rahman",
    role: "Software Engineer",
    reviewText:
      "Great ambience, top-tier setup, and the food options are absolutely amazing!",
    rating: 5,
    imageSrc: "/street_fighter.png",
    imageAlt: "Alex Rahman",
  },
  {
    id: 3,
    name: "Sarah Tanaka",
    role: "Content Creator",
    reviewText:
      "Best place to stream and meet new gaming partners. Loving the lounge and coffee!",
    rating: 5,
    imageSrc: "/vr_racing.png",
    imageAlt: "Sarah Tanaka",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Competitive Gamer",
    reviewText:
      "Outstanding tournament organization and premium equipment. Simply the best.",
    rating: 5,
    imageSrc: "/esports_pc.png",
    imageAlt: "David Kim",
  },
];

const reviews = [...reviewList, ...reviewList];

export default function Review() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-20 lg:py-28 bg-[#090414]"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C04D7]/10 blur-[180px]" />
      </div>

      <div className="relative">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2
            className="
              inline-block
              text-4xl
              sm:text-5xl
              lg:text-6xl
              bg-gradient-to-l
              from-[#6C04D7]
              to-[#CD4ECD]
              bg-clip-text
              text-transparent
            "
            style={{
              fontFamily: "var(--font-jersey-20)",
            }}
          >
            Review's
          </h2>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div className="marquee flex gap-8 w-max">
            {reviews.map((review, index) => (
              <ReviewCard
                key={`${review.id}-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}