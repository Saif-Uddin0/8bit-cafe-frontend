import Image from "next/image";

interface ChooseCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnRight: boolean;
  index: number;
}

export default function ChooseCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imageOnRight,
}: ChooseCardProps) {
  return (
    <div
      className={`relative flex items-center ${
        imageOnRight ? "justify-start" : "justify-end"
      }`}
    >
      {/* LEFT IMAGE */}
      {imageOnRight && (
        <div className="relative z-20 h-[170px] w-[170px] sm:h-[190px] sm:w-[190px] lg:h-[220px] lg:w-[220px] flex-shrink-0">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-[#CD4ECD]/20 blur-3xl scale-110" />

          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-[#F862C9] border-l-[#F862C9] rotate-[-22deg]" />

          {/* Main Ring */}
          <div className="absolute inset-[6px] rounded-full border-[3px] border-[#7B2CF8]" />

          {/* Image */}
          <div className="absolute inset-[12px] overflow-hidden rounded-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* CARD */}
      <div
        className={`
          relative
          z-10
          w-[290px]
          sm:w-[340px]
          lg:w-[380px]
          min-h-[105px]
          lg:min-h-[125px]
          rounded-full
          px-8
          lg:px-10
          py-5
          lg:py-7
          backdrop-blur-xl
          ${
            imageOnRight
              ? "-ml-12 lg:-ml-16"
              : "-mr-12 lg:-mr-16"
          }
        `}
        style={{
          background:
            "linear-gradient(180deg,#18122C 0%,#110A20 100%)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow:
            "0 0 35px rgba(108,4,215,.20), inset 0 1px rgba(255,255,255,.05)",
        }}
      >
        {/* Accent */}
        <span
          className="absolute left-0 top-1/2 h-12 w-1.5 -translate-y-1/2 rounded-r-full"
          style={{
            background:
              "linear-gradient(180deg,#F862C9,#873CE2)",
          }}
        />

        <h3
          className="text-white text-lg lg:text-[24px] font-bold leading-tight"
          style={{
            fontFamily: "var(--font-orbitron)",
          }}
        >
          {title}
        </h3>

        <p className="mt-2 text-[13px] lg:text-[15px] leading-6 text-white/70">
          {description}
        </p>
      </div>

      {/* RIGHT IMAGE */}
      {!imageOnRight && (
        <div className="relative z-20 h-[170px] w-[170px] sm:h-[190px] sm:w-[190px] lg:h-[220px] lg:w-[220px] flex-shrink-0">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-[#CD4ECD]/20 blur-3xl scale-110" />

          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-[#F862C9] border-l-[#F862C9] rotate-[158deg]" />

          {/* Main Ring */}
          <div className="absolute inset-[6px] rounded-full border-[3px] border-[#7B2CF8]" />

          {/* Image */}
          <div className="absolute inset-[12px] overflow-hidden rounded-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}