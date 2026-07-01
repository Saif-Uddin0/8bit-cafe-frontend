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
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#F59E0B" : "rgba(245,158,11,0.2)"}
          stroke={i < count ? "#F59E0B" : "rgba(245,158,11,0.3)"}
          strokeWidth={2}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div
      className="flex-shrink-0 w-[220px] sm:w-[240px] rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(160deg, rgba(22,10,56,0.95) 0%, rgba(14,8,36,0.98) 100%)",
        border: "1px solid rgba(108,4,215,0.30)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Card image */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <Image
          src={review.imageSrc}
          alt={review.imageAlt}
          fill
          sizes="240px"
          className="object-cover"
        />
        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(14,8,36,0.95) 100%)",
          }}
        />
        {/* "Chill Zone" badge overlay */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide"
          style={{
            background: "linear-gradient(135deg,#6C04D7,#CD4ECD)",
            color: "#fff",
          }}
        >
          Chill Zone
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3">
        <p className="text-white font-bold text-sm leading-tight">{review.name}</p>
        <p className="text-text-muted text-[11px] mb-1.5">{review.role}</p>
        <StarRating count={review.rating} />
        <p className="text-text-muted text-[11px] leading-relaxed mt-2 line-clamp-3">
          {review.reviewText}
        </p>
      </div>
    </div>
  );
}
