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
      className={`flex items-center ${
        imageOnRight ? "justify-start" : "justify-end"
      }`}
    >
      {/* LEFT IMAGE */}
      {imageOnRight && (
        <div className="relative z-20 flex-shrink-0 h-[190px] w-[190px] lg:h-[290px] lg:w-[290px] xl:h-[320px] xl:w-[320px]">
          <div className="absolute inset-0 rounded-full bg-[#CD4ECD]/20 blur-3xl scale-110" />

          <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-[#F862C9] border-l-[#F862C9] rotate-[-22deg]" />

          <div className="absolute inset-[8px] rounded-full border-[3px] border-[#7B2CF8]" />

          <div className="absolute inset-[14px] overflow-hidden rounded-full">
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
          w-[300px]
          sm:w-[360px]
          lg:w-[460px]
          rounded-full
          px-8
          lg:px-12
          py-5
          lg:py-8
          ${
            imageOnRight
              ? "ml-5 lg:ml-10"
              : "mr-5 lg:mr-10"
          }
        `}
        style={{
          background: "linear-gradient(180deg,#18122C 0%,#10081D 100%)",
          border: "1.5px solid rgba(255,255,255,.10)",
          boxShadow:
            "0 0 35px rgba(108,4,215,.18), inset 0 0 0 1px rgba(255,255,255,.03)",
        }}
      >
        {/* Accent */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-[5px] rounded-r-full bg-gradient-to-b from-[#F862C9] to-[#873CE2]" />

        <h3
          className="text-white text-lg lg:text-[28px] font-bold leading-tight"
          style={{
            fontFamily: "var(--font-orbitron)",
          }}
        >
          {title}
        </h3>

        <p className="mt-3 text-[13px] lg:text-[16px] leading-7 text-white/70">
          {description}
        </p>
      </div>

      {/* RIGHT IMAGE */}
      {!imageOnRight && (
        <div className="relative z-20 flex-shrink-0 h-[190px] w-[190px] lg:h-[290px] lg:w-[290px] xl:h-[320px] xl:w-[320px]">
          <div className="absolute inset-0 rounded-full bg-[#CD4ECD]/20 blur-3xl scale-110" />

          <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-[#F862C9] border-l-[#F862C9] rotate-[158deg]" />

          <div className="absolute inset-[8px] rounded-full border-[3px] border-[#7B2CF8]" />

          <div className="absolute inset-[14px] overflow-hidden rounded-full">
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