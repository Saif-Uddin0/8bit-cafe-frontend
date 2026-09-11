"use client";

import Image from "next/image";
import { Clock, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import notify from "@/lib/notify";
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

  //Discount logic (exact backend field names)
  const hasDiscount = item.isDisCount === true && item.discountPrice > 0;
  const displayPrice = hasDiscount ? item.discountPrice : item.price;
  const discountPct = item.disCountParcentage ?? 0;

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(async () => {
      try {
        await addItemAsync(item.id, 1);
        notify.success(
          `${item.name} Add to cart successfully`
        );
      } catch {
        notify.error(
          "Couldn’t add item",
          `Failed to add ${item.name}. Please try again.`
        );
      }
    });
  };

  return (
    <div className="group relative w-full h-full">

      {/*  MOBILE — horizontal row card (image left | info right)  Hidden at sm and above */}
      <div
        onClick={() => router.push(`/foods/${item.id}`)}
        className="
          sm:hidden
          relative flex flex-row items-center gap-3
          w-full
          rounded-2xl
          border border-[#F862C9]/70
          bg-[#7E00FF22]
          p-3
          cursor-pointer
          active:scale-[0.98]
          transition-all duration-200
          hover:border-[#CD4ECD]
          hover:bg-[#7E00FF33]
          hover:shadow-[0_0_18px_rgba(108,4,215,0.3)]
          overflow-hidden
        "
      >
        {/* Subtle inner gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#CD4ECD]/6 via-transparent to-[#6C04D7]/6 pointer-events-none rounded-2xl" />

        {/* LEFT: rounded square image */}
        <div className="relative flex-shrink-0 w-[80px] h-[80px] rounded-xl overflow-hidden border border-[#6C04D7]/40 bg-[#0A0512] shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Discount badge on image */}
          {hasDiscount && (
            <div className="absolute top-1 left-1 z-10 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
              🔥{discountPct}%
            </div>
          )}
          {/* Unavailable overlay */}
          {item.status !== "AVAILABLE" && (
            <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
              <span className="text-white/70 text-[9px] font-bold tracking-wide">N/A</span>
            </div>
          )}
        </div>

        {/* RIGHT: all details stacked */}
        <div className="flex flex-col flex-1 min-w-0 gap-1.5">

          {/* Name */}
          <h4
            className="text-white text-[14px] font-normal leading-[1.2] line-clamp-2"
            style={{ fontFamily: "var(--font-jersey-20)" }}
          >
            {item.name}
          </h4>

          {/* Delivery meta row */}
          <div className="flex items-center gap-3 text-white/55 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-[#CD4ECD] flex-shrink-0" />
              {item.delivery_time}m
            </span>
            <span className="flex items-center gap-1">
              <Truck size={10} className="text-[#CD4ECD] flex-shrink-0" />
              ৳{item.delivery_fee} fee
            </span>
          </div>

          {/* Price + Add button */}
          <div className="flex items-center justify-between gap-2 mt-0.5">
            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[#FF5EA0] text-[16px] font-bold leading-none"
                style={{ fontFamily: "var(--font-jersey-20)" }}
              >
                ৳{displayPrice}
              </span>
              {hasDiscount && (
                <span className="text-white/35 text-[10px] line-through leading-none">
                  ৳{item.price}
                </span>
              )}
            </div>

            {/* Add-to-cart button */}
            <button
              type="button"
              onClick={handleOrder}
              className="
                flex items-center gap-1.5
                bg-[#F6F2ED] hover:bg-white
                px-3 py-1.5
                rounded-lg
                flex-shrink-0
                active:scale-[0.95]
                transition-all duration-150
                hover:shadow-[0_0_14px_rgba(205,78,205,0.5)]
              "
            >
              <ShoppingCart size={12} className="text-[#6C04D7]" />
              <span
                className="text-[12px] leading-none bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-jersey-20)" }}
              >
                Add
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP — original vertical portrait card (sm and above) */}
      <div
        onClick={() => router.push(`/foods/${item.id}`)}
        className="
          hidden sm:flex flex-col items-center
          w-full h-full
          rounded-[24px]
          border border-[#F862C9]/80
          bg-[#7E00FF33]
          px-5
          pt-10
          pb-5
          transition-all duration-300
          hover:border-[#6C04D7]
          hover:shadow-[0_0_32px_rgba(108,4,215,0.35)]
          hover:cursor-pointer
        "
      >
        {/* Discount badge (top-left) */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-1 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(248,98,201,0.5)] tracking-wide">
              🔥 {discountPct}% OFF
            </div>
          </div>
        )}

        {/* Unavailable badge */}
        {item.status !== "AVAILABLE" && (
          <div className="absolute top-3 right-3 z-20 bg-black/70 text-white/50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Unavailable
          </div>
        )}

        {/* Circular image */}
        <div
          className="
            relative
            w-[145px] h-[145px]
            lg:w-[160px] lg:h-[160px]
            rounded-full overflow-hidden flex-shrink-0
            border-[3px] border-[#6C04D7]/50
            group-hover:border-[#CD4ECD]
            shadow-[0_8px_32px_rgba(0,0,0,0.6)]
            transition-all duration-300
            mb-5 bg-[#0A0512]
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

        {/* Name */}
        <h4
          className="
            w-full min-h-[52px]
            flex items-center justify-center px-1
            text-[18px] lg:text-xl
            text-white text-center font-normal leading-[1.25]
            mb-3 line-clamp-2
          "
          style={{ fontFamily: "var(--font-jersey-20)" }}
        >
          {item.name}
        </h4>

        {/* Delivery info */}
        <div className="flex flex-col items-start gap-1.5 w-full mb-5 text-sm text-white/65">
          <div className="flex items-center gap-2 min-w-0">
            <Clock size={14} className="text-white flex-shrink-0" />
            <span className="truncate">{item.delivery_time} min</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Truck size={14} className="text-white flex-shrink-0" />
            <span className="truncate">Delivery {item.delivery_fee} Tk</span>
          </div>
        </div>

        {/* Price block */}
        <div className="min-h-[38px] flex items-center justify-center gap-2 w-full mb-5">
          <span
            className="text-[#FF5EA0] text-xl lg:text-2xl font-bold tracking-wide"
            style={{ fontFamily: "var(--font-jersey-20)" }}
          >
            ৳{displayPrice}
          </span>
          {hasDiscount ? (
            <span className="text-white/40 text-sm line-through">৳{item.price}</span>
          ) : (
            <span className="invisible text-sm">৳000</span>
          )}
        </div>

        {/* Order button */}
        <button
          type="button"
          onClick={handleOrder}
          className="
            w-full min-h-[42px]
            flex items-center justify-center gap-2
            bg-[#F6F2ED] px-4 py-2 rounded-sm
            hover:bg-white
            hover:shadow-[0_0_20px_rgba(205,78,205,0.45)]
            active:scale-[0.97]
            transition-all duration-200
          "
        >
          <ShoppingCart size={16} className="text-[#6C04D7] shrink-0" />
          <span
            className="bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD] bg-clip-text text-transparent text-[18px] tracking-wide leading-none"
            style={{ fontFamily: "var(--font-jersey-20)" }}
          >
            Order
          </span>
        </button>
      </div>
    </div>
  );
}
