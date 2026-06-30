"use client";

import Image from "next/image";
import { Gamepad2 } from "lucide-react";
import type { GameService } from "@/components/home/game-services/gameServicesData";

interface GameServiceCardProps {
  service: GameService;
  /** When true, card gets the "focused" look (taller, fully lit, coloured border) */
  isCenter?: boolean;
  onBook: (serviceId: number) => void;
}

/**
 * GameServiceCard — reusable card for the Our Game Services section.
 * Pass `isCenter` to apply the highlighted / focused visual treatment.
 */
export default function GameServiceCard({
  service,
  isCenter = false,
  onBook,
}: GameServiceCardProps) {
  return (
    <div
      className={`
        relative w-full rounded-[24px] overflow-hidden border
        transition-all duration-500 ease-out select-none

        /* Mobile baseline – always full-width inside its slide */
        h-[340px] sm:h-[370px]

        /* Focused (center) card */
        ${isCenter
          ? "lg:h-[460px] opacity-100 border-[#CD4ECD] shadow-[0_12px_48px_rgba(108,4,215,0.45)] scale-[1.0]"
          : "lg:h-[400px] opacity-50 border-white/8 shadow-[0_4px_20px_rgba(0,0,0,0.35)] scale-[0.97] blur-[0.3px]"}
      `}
    >
      {/* Background image + gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A061A] via-[#0A061A]/65 to-transparent" />
      </div>

      {/* Bottom-pinned content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col">
        <span className="text-[10px] sm:text-xs uppercase text-[#CD4ECD] font-bold tracking-wider mb-1">
          {service.category}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
          {service.name}
        </h3>

        <div className="space-y-0.5 mb-3 text-[12px] sm:text-sm text-white/60">
          <p>Duration: <span className="text-white/80">{service.duration}</span></p>
          <p className="text-[#F862C9] font-bold text-sm sm:text-base mt-1">{service.price} Tk</p>
        </div>

        <button
          type="button"
          onClick={() => onBook(service.id)}
          className="
            w-full flex items-center justify-center gap-1.5
            bg-[#F5ECFC] text-[#0A061A]
            text-[10px] sm:text-xs font-bold uppercase tracking-wider
            py-2 sm:py-2.5 px-3 rounded-xl
            hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]
            active:scale-95 transition-all duration-200
          "
        >
          <Gamepad2 size={13} />
          Book Gaming Session
        </button>
      </div>
    </div>
  );
}
