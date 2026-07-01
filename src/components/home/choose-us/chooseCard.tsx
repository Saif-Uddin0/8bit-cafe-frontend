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
      className={`flex items-center gap-0 w-full ${
        imageOnRight ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Text pill */}
      <div
        className={`flex-1 flex ${
          imageOnRight ? "justify-start pr-6" : "justify-end pl-6"
        }`}
      >
        <div
          className="relative px-6 py-4 rounded-full max-w-[260px]"
          style={{
            background: "rgba(14, 10, 36, 0.75)",
            border: "1px solid rgba(108,4,215,0.30)",
            boxShadow: "0 0 24px rgba(108,4,215,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Left accent bar */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
            style={{ background: "linear-gradient(180deg,#6C04D7,#CD4ECD)" }}
          />
          <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-1">
            {title}
          </h3>
          <p className="text-text-muted text-xs leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Circle image */}
      <div className="flex-shrink-0 relative" style={{ width: 160, height: 160 }}>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 32px rgba(108,4,215,0.55), 0 0 64px rgba(108,4,215,0.20)",
            border: "2px solid rgba(108,4,215,0.5)",
            borderRadius: "50%",
          }}
        />
        <div
          className="w-full h-full rounded-full overflow-hidden relative"
          style={{ border: "3px solid rgba(108,4,215,0.4)" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
