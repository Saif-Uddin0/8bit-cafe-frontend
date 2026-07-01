import Image from "next/image";

interface ChooseCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnRight: boolean;
}

export default function ChooseCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imageOnRight,
}: ChooseCardProps) {
  const ImageSection = (
    <div className="relative z-20 flex-shrink-0 h-[190px] w-[190px] sm:h-[230px] sm:w-[230px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#CD4ECD]/20 blur-3xl scale-110" />

      {/* Decorative Ring */}
      <div
        className={`absolute inset-0 rounded-full border-[5px] border-transparent ${
          imageOnRight
            ? "border-t-[#F862C9] border-l-[#F862C9] rotate-[-22deg]"
            : "border-t-[#F862C9] border-l-[#F862C9] rotate-[158deg]"
        }`}
      />

      {/* Inner Ring */}
      <div className="absolute inset-[8px] rounded-full border-[3px] border-[#7B2CF8]" />

      {/* Image */}
      <div className="absolute inset-[14px] overflow-hidden rounded-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col items-center gap-6 lg:gap-0 ${
        imageOnRight
          ? "lg:flex-row lg:justify-start"
          : "lg:flex-row-reverse lg:justify-end"
      }`}
    >
      {ImageSection}

      {/* Chat Bubble Card */}
      <div
        className={`relative
          w-full
          max-w-[380px]
          lg:max-w-none
          lg:w-[520px]
          xl:w-[580px]
          rounded-[40px]
          px-7
          lg:px-12
          py-7
          lg:py-10
          ${
            imageOnRight
              ? "lg:ml-10 xl:ml-14"
              : "lg:mr-10 xl:mr-14"
          }`}
        style={{
          background: "#29116533",
          border: "1px solid #EF77A8",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 35px rgba(108,4,215,.18), inset 0 0 0 1px rgba(255,255,255,.03)",
        }}
      >
        {/* Chat Bubble Tail */}
        <div
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-7 h-7 rotate-45 ${
            imageOnRight
              ? "-left-[14px] border-l border-b"
              : "-right-[14px] border-r border-t"
          }`}
          style={{
            background: "#29116533",
            borderColor: "#EF77A8",
            backdropFilter: "blur(20px)",
          }}
        />

        {/* Accent */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-[5px] rounded-r-full bg-gradient-to-b from-[#F862C9] to-[#873CE2]" />

        <h3
          className="text-center text-[#EF77A8] text-2xl lg:text-[30px] font-semibold"
          style={{
            fontFamily: "var(--font-jersey-20)",
          }}
        >
          {title}
        </h3>

        <p className="mt-3 text-center text-white text-sm lg:text-lg leading-7">
          {description}
        </p>
      </div>
    </div>
  );
}