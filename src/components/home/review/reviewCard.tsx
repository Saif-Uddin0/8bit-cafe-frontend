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

interface StarRatingProps {
  count: number;
  size?: number;
  className?: string;
}

function StarRating({
  count,
  size = 16,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < count ? "#FFC107" : "#6A488C"}
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
      className="
      w-[320px]
      sm:w-[360px]
      md:w-[420px]
      lg:w-[500px]
      xl:w-[550px]
      shrink-0
      "
    >
      <div
        className="
        relative
        overflow-visible
        rounded-[28px]
        bg-gradient-to-b
        from-[#6C04D7]/50
        to-[#CD4ECD]/50
        p-5
        sm:p-6
        lg:p-8
        min-h-[230px]
        sm:min-h-[250px]
        lg:min-h-[290px]
        "
      >
        {/* Floating Image */}

        <div
          className="
          absolute
          top-[-110px]
          right-2

          sm:top-[-130px]

          md:top-[-150px]

          lg:-top-[180px]
          lg:-right-3

          xl:-top-[200px]
          xl:-right-5

          z-30
          "
        >
          <div
            className="
            relative
            w-[180px]
            h-[180px]

            sm:w-[220px]
            sm:h-[220px]

            md:w-[260px]
            md:h-[260px]

            lg:w-[320px]
            lg:h-[320px]

            xl:w-[350px]
            xl:h-[350px]

            overflow-hidden
            rounded-[30px]
            shadow-[0_30px_60px_rgba(0,0,0,.45)]
            "
          >
            <Image
              src={review.imageSrc}
              alt={review.imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Reviewer */}

        <div
          className="
          relative

          w-[190px]
          h-[125px]

          sm:w-[210px]
          sm:h-[140px]

          md:w-[230px]
          md:h-[150px]

          lg:w-[250px]
          lg:h-[165px]

          xl:w-[260px]
          xl:h-[170px]

          -translate-x-4
          -translate-y-5

          lg:-translate-x-7
          lg:-translate-y-7
          "
        >
          <Image
            src="/Icon.png"
            alt=""
            fill
            className="object-cover"
          />

          <div className="relative z-10 p-4 lg:p-5">

            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">
              {review.name}
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-white">
              {review.role}
            </p>

            <StarRating
              count={review.rating}
              size={18}
              className="mt-2"
            />

          </div>
        </div>

        {/* Review */}

        <p
          className="
          text-sm
          sm:text-[12px]
          lg:text-[17px]

          leading-6
          sm:leading-7
          lg:leading-8

          text-white

          line-clamp-4
          lg:line-clamp-none
          "
        >
          {review.reviewText}
        </p>

      </div>
    </div>
  );
}