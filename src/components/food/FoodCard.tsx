"use client";

import Image from "next/image";
import { Clock, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { ApiFood } from "@/types/api";

interface FoodCardProps {
  item: ApiFood;
}

const PLACEHOLDER_IMAGE = "/order-btn-icon.png";

export default function FoodCard({ item }: FoodCardProps) {
  const { addItemAsync } = useCart();
  const { requireAuth } = useRequireAuth();
  const router = useRouter();

  const imageUrl = item.images?.[0]?.url ?? PLACEHOLDER_IMAGE;

  // ── Discount logic (exact backend field names) ──────────────────────────
  const hasDiscount = item.isDisCount === true && item.discountPrice > 0;
  const displayPrice = hasDiscount ? item.discountPrice : item.price;
  const discountPct = item.disCountParcentage ?? 0;

  const handleOrder = () => {
    requireAuth(async () => {
      try {
        await addItemAsync(item.id, 1);
        toast.success(`${item.name} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } catch {
        toast.error(`Failed to add ${item.name} to cart. Please try again.`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    });
  };

  return (
    <div className="group relative flex flex-col items-center w-full h-full">
      {/* Card wrapper */}
      <div
        onClick={() => router.push(`/foods/${item.id}`)}
        className="
    relative flex flex-col items-center w-full h-full
    rounded-[24px] border border-[#F862C9]/90
    bg-[#7E00FF33]
    pt-10 pb-5 px-5
    transition-all duration-300
    hover:border-[#6C04D7]
    hover:shadow-[0_0_32px_rgba(108,4,215,0.35)]
    hover:cursor-pointer
"
      >
        {/* ── Discount badge (top-left) ── */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-1 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(248,98,201,0.5)] tracking-wide">
              🔥 {discountPct}% OFF
            </div>
          </div>
        )}

        {/* UNAVAILABLE badge */}
        {item.status !== "AVAILABLE" && (
          <div className="absolute top-3 right-3 z-20 bg-black/70 text-white/50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Unavailable
          </div>
        )}

        {/* ── Circular image ── */}
        <div
          className="
            relative w-[160px] h-[160px] rounded-full overflow-hidden flex-shrink-0
            border-[3px] border-[#6C04D7]/50 group-hover:border-[#CD4ECD]
            shadow-[0_8px_32px_rgba(0,0,0,0.6)]
            transition-all duration-300 mb-5
            bg-[#0A0512]
          "
        >
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="160px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* ── Name ── */}
        <h4
          className="
    h-[56px]
    flex items-center justify-center
    text-base sm:text-lg
    text-white text-center
    font-bold leading-tight
    mb-3
    line-clamp-2
  "
          style={{ fontFamily: "var(--font-Roboto)" }}
        >
          {item.name}
        </h4>

        {/* ── Delivery info (no rating/reviews) ── */}
        <div className="flex flex-col items-start gap-1.5 w-full mb-5 text-sm text-white/60">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-white flex-shrink-0" />
            <span>{item.delivery_time} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck size={13} className="text-white flex-shrink-0" />
            <span>Delivery {item.delivery_fee} Tk</span>
          </div>
        </div>

        {/* ── Price block ── */}
        <div className="h-[40px] flex items-center justify-center gap-2 w-full mb-5">
          <span
            className="text-[#FF5EA0] text-xl sm:text-2xl font-bold tracking-wide"
            style={{ fontFamily: "var(--font-Roboto)" }}
          >
            ৳{displayPrice}
          </span>

          {hasDiscount ? (
            <span className="text-white/40 text-sm line-through">
              ৳{item.price}
            </span>
          ) : (
            <span className="invisible text-sm">
              ৳000
            </span>
          )}
        </div>

        {/* ── Order button ── */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOrder();
          }}
          className="
            w-full flex items-center justify-center gap-2
            bg-[#F6F2ED]
            py-2.5 px-4 rounded-md
            hover:bg-white hover:shadow-[0_0_20px_rgba(205,78,205,0.45)]
            active:scale-95 transition-all duration-200
          "
        >
          <ShoppingCart size={17} className="text-[#6C04D7]" />
          <span
            className="
              bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD]
              bg-clip-text text-transparent font-semibold
            "
            style={{ fontFamily: "var(--font-Jersey-20)" }}
          >
            Order
          </span>
        </button>
      </div>
    </div>
  );
}
