"use client";

import Image from "next/image";
import { Star, Clock, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import type { FoodItem } from "./foodsData";

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();

  const handleOrder = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(`🍕 ${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  return (
    <div className="group relative flex flex-col items-center w-full h-full">
      {/* Card */}
      <div
        className="
          relative flex flex-col items-center w-full h-full
          rounded-[24px] border border-[#6C04D7]/40
          bg-[#12091F]
          pt-10 pb-5 px-5
          transition-all duration-300
          hover:border-[#6C04D7] hover:shadow-[0_0_32px_rgba(108,4,215,0.35)]
        "
      >
        {/* Circular image — lifted above card */}
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
            src={item.image}
            alt={item.name}
            fill
            sizes="160px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Name */}
        <h4
          className="text-base sm:text-lg text-white text-center font-bold mb-3 leading-tight"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {item.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Star size={13} className="text-[#CD4ECD] fill-[#CD4ECD]" />
          <span className="text-xs text-[#CD4ECD] font-semibold">
            {item.rating}({item.reviewsCount})
          </span>
        </div>

        {/* Delivery info rows */}
        <div className="flex flex-col items-start gap-1.5 w-full mb-5 text-[11px] sm:text-xs text-white/50">
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-white/35 flex-shrink-0" />
            <span>{item.deliveryTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck size={11} className="text-white/35 flex-shrink-0" />
            <span>Delivery charge {item.deliveryFee} Tk</span>
          </div>
        </div>

        {/* Price */}
        <div
          className="text-[#EF3D86] text-xl sm:text-2xl font-bold mb-4 tracking-wide"
          style={{ fontFamily: "var(--font-jersey-20)" }}
        >
          ${item.price}.00
        </div>

        {/* Order button */}
        <button
          type="button"
          onClick={handleOrder}
          className="
            w-full flex items-center justify-center gap-2
            bg-white/95 text-[#12091F]
            text-xs sm:text-sm font-bold uppercase tracking-widest
            py-2.5 px-4 rounded-xl
            hover:bg-white hover:shadow-[0_0_20px_rgba(205,78,205,0.45)]
            active:scale-95 transition-all duration-200
          "
        >
          <ShoppingCart size={14} strokeWidth={2.5} />
          <span>Order</span>
        </button>
      </div>
    </div>
  );
}
