import Image from "next/image";

export interface ReviewData {
  id: number;
  name: string;
  role: string;
  reviewText: string;
  rating: number;
  imageSrc: string;
  imageAlt: string;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < count ? "#FFC107" : "#4B3B62"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  review,
}: {
  review: ReviewData;
}) {
  return (
    <div
      className="relative flex-shrink-0 w-[285px] rounded-[20px] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#6B2E8F 0%,#5A257A 100%)",
      }}
    >
      {/* Image */}
      <div className="relative h-[205px] w-full">
        <Image
          src={review.imageSrc}
          alt={review.imageAlt}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#5A257A] via-transparent to-transparent" />

        <div className="absolute top-3 right-3 bg-[#C53EFF] text-white text-[11px] font-semibold px-3 py-1 rounded-md">
          Chill Zone
        </div>
      </div>

      {/* Floating Avatar */}
      <div className="absolute left-5 top-[165px] z-20">
        <div className="relative h-[64px] w-[64px] rounded-full overflow-hidden border-[4px] border-[#5A257A]">
          <Image
            src={review.imageSrc}
            alt={review.imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="pt-10 pb-5 px-5">
        <h3 className="text-white text-[18px] font-semibold">
          {review.name}
        </h3>

        <p className="text-white/70 text-[13px] mt-1">
          {review.role}
        </p>

        <StarRating count={review.rating} />

        <p className="mt-4 text-[15px] leading-6 text-white line-clamp-3">
          {review.reviewText}
        </p>
      </div>
    </div>
  );
}