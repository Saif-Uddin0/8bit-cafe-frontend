"use client";

import Image from "next/image";
import { Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ApiGame } from "@/types/api";

interface GameServiceCardProps {
  service: ApiGame;
  /** When true, card gets the "focused" look (taller, fully lit, coloured border) */
  isCenter?: boolean;
  onBook: (serviceId: string) => void;
}

const PLACEHOLDER_IMAGE = "/banner-2.png";

/**
 * GameServiceCard — reusable card for the Our Game Services section.
 * Pass `isCenter` to apply the highlighted / focused visual treatment.
 */
export default function GameServiceCard({
  service,
  isCenter = false,
  onBook,
}: GameServiceCardProps) {
  const router = useRouter();

  const imageUrl = service.images?.[0]?.url ?? PLACEHOLDER_IMAGE;

  // ── Discount calculations (matching FoodCard.tsx logic) ──
  const hasDiscount = service.isDiscount === true && typeof service.disCountParcenTage === "number" && (service.disCountParcenTage ?? 0) > 0;
  const discountPct = service.disCountParcenTage ?? 0;
  const discountPrice30 = hasDiscount ? service.price30Min - (service.price30Min * discountPct / 100) : service.price30Min;
  const discountPrice60 = hasDiscount ? service.price60Min - (service.price60Min * discountPct / 100) : service.price60Min;

  return (
    <div
      onClick={() => router.push(`/games/${service.id}`)}
      className={`
        relative w-full rounded-[24px] overflow-hidden border cursor-pointer
        transition-all duration-500 ease-out select-none
 
        /* Mobile baseline – always full-width inside its slide */
        h-[370px] sm:h-[400px]
 
        /* Focused (center) card */
        ${isCenter
          ? "lg:h-[460px] opacity-100 border-[#CD4ECD] shadow-[0_12px_48px_rgba(108,4,215,0.45)] scale-[1.0]"
          : "lg:h-[400px] opacity-50 border-white/8 shadow-[0_4px_20px_rgba(0,0,0,0.35)] scale-[0.97] blur-[0.3px]"}
      `}
    >
      {/* ── Discount badge (top-left) ── */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(248,98,201,0.5)] tracking-wide">
            🔥 {discountPct}% OFF
          </div>
        </div>
      )}

      {/* Background image + gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
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
          {service.category?.name ?? "Gaming"}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
          {service.name}
        </h3>
 
        <div className="space-y-0.5 mb-3 text-[12px] sm:text-sm text-white/60">
          <p>Duration: <span className="text-white/80">30 / 60 Min</span></p>
          {/* 30 min price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/40 uppercase font-bold">30m</span>
            <span className="text-[#F862C9] font-bold text-sm sm:text-base">
              ৳{discountPrice30.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-white/35 text-xs line-through">৳{service.price30Min}</span>
            )}
          </div>
          {/* 60 min price */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 uppercase font-bold">60m</span>
            <span className="text-[#F862C9] font-bold text-sm sm:text-base">
              ৳{discountPrice60.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-white/35 text-xs line-through">৳{service.price60Min}</span>
            )}
          </div>
        </div>
 
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBook(service.id);
          }}
          className="
            w-full flex items-center justify-center gap-1.5
            bg-[#F5ECFC] text-[#0A061A]
            text-[10px] sm:text-xs font-bold uppercase tracking-wider
            py-3 sm:py-2.5 px-3 rounded-xl
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

