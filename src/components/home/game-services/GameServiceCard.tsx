"use client";

import Image from "next/image";
import { Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ApiGame } from "@/types/api";

interface GameServiceCardProps {
  service: ApiGame;
  /** When true, card gets the "focused" look (taller, fully lit, coloured border) */
  isCenter?: boolean;
  onBook: (service: ApiGame) => void;
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
      style={{ fontFamily: "var(--font-jersey-20)" }}
      className={`
        relative w-full rounded-[12px] overflow-hidden border cursor-pointer
        transition-all duration-500 ease-out select-none
 
        /* Mobile baseline – always full-width inside its slide */
        h-[380px] sm:h-[400px]
 
        /* Focused (center) card vs Inactive card styling */
        ${isCenter
          ? "lg:h-[460px] opacity-100 border-[#CD4ECD] shadow-[0_0_24px_rgba(205,78,205,0.3)] scale-[1.0]"
          : "lg:h-[400px] opacity-[0.93] border-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.35)] scale-[0.97]"}
      `}
    >
      {/* ── Discount badge (top-left) ── */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black/80 text-sm font-medium px-2.5 py-1 rounded-full">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>

      {/* Bottom-pinned content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col bg-gradient-to-b from-[#271152]/80 to-[#9C3C9C]/60 backdrop-blur-[4px] border-t border-white/10  px-4 pt-2 pb-4 sm:p-5">
          <div className="mb-1.5">
          <span
            className="
              text-[13px]
              uppercase
              tracking-[0.16em]
              text-[#CD4ECD]
              font-semibold
            "
          >
            {service.category?.name ?? "Gaming"}
          </span>
        </div>
        {/* Game name */}
        <h3
          title={service.name}
          className="
            text-[18px]
            sm:text-[20px]
            leading-tight
            text-white
            font-normal
            mb-2
            line-clamp-2
          "
        >
          {service.name}
        </h3>

        {/* Prices side-by-side */}
        <div className="flex items-center gap-6 mb-4">
          {/* 30 min price */}
          <div className="flex flex-col">
            <span className="text-[12px] sm:text-sm text-white  font-normal tracking-wide mb-0.5">30 Minute</span>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-normal text-base sm:text-2xl leading-none">
                {discountPrice30.toFixed(0)} Tk
              </span>
              {hasDiscount && (
                <span className="text-white/50 text-[12px] sm:text-xs line-through ml-1">
                  {service.price30Min}
                </span>
              )}
            </div>
          </div>

          {/* 60 min price */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs text-white font-normal tracking-wide mb-0.5">60 Minute</span>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-normal text-base sm:text-2xl leading-none">
                ৳{discountPrice60.toFixed(0)} Tk
              </span>
              {hasDiscount && (
                <span className="text-white/50 text-[12px] sm:text-xs line-through ml-1">
                  ৳{service.price60Min}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Book button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBook(service);
          }}
          className="
            mx-auto
            w-[92%]
            min-h-[42px]
            flex items-center justify-center
            gap-2
            rounded-[11px]
            bg-[#FDF7FD]
            px-4
            py-2

            transition-all duration-200

            hover:bg-white
            hover:shadow-[0_0_18px_rgba(253,247,253,0.35)]
            active:scale-[0.98]
          "
        >
          <Gamepad2
            size={18}
            strokeWidth={2}
            className="text-[#6C04D7] shrink-0"
          />

          <span
            className="
              bg-gradient-to-r
              from-[#6C04D7]
              to-[#CD4ECD]
              bg-clip-text
              text-transparent

              text-[16px]
              sm:text-[18px]
              font-normal
              uppercase
              tracking-wide
              leading-none
            "
          >
            Book Gaming Session
          </span>
        </button>
      </div>
    </div>
  );
}

