"use client";

import Image from "next/image";
import { Star, Clock, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import type { FoodItem } from "./foodsData";
import { useRouter } from "next/navigation";






interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleOrder = (
    // e.stopPropagation()
  ) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  return (
    <div className="group relative flex flex-col items-center w-full h-full">
      {/* Card */}
      <div
      onClick={() => router.push(`/foods/${item.id}`)}
        className="
          relative flex flex-col items-center w-full h-full
          rounded-[24px] border border-[#F862C9]/90
          bg-[#7E00FF33]
          pt-10 pb-5 px-5
          transition-all duration-300
          hover:border-[#6C04D7] hover:shadow-[0_0_32px_rgba(108,4,215,0.35)] hover:cursor-pointer
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
          style={{ fontFamily: "var(--font-Roboto)" }}
        >
          {item.name}
        </h4>



        {/* Delivery info rows */}
        <div className="flex flex-col items-start gap-1.5 w-full mb-5 text-sm text-white/50">
          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5">
            <Star size={13} className="text-yellow-400 " />
            <span className="text-sm text-white">
              {item.rating}({item.reviewsCount})
            </span>
          </div>
          <div className="flex items-center text-sm gap-1.5">
            <Clock size={13} className="text-white flex-shrink-0" />
            <span>{item.deliveryTime} min</span>
          </div>
          <div className="flex text-sm items-center gap-1.5">
            <Truck size={13} className="text-white flex-shrink-0" />
            <span>Delivery charge {item.deliveryFee} Tk</span>
          </div>
        </div>

        {/* Price */}
        <div
          className="text-[#FF5EA0] text-lg sm:text-xl font-semibold mb-4 tracking-wide"
          style={{ fontFamily: "var(--font-Roboto)" }}
        >
          ${item.price}.00
        </div>

        {/* Order button */}
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
          <Image
            src="/order-btn-icon.png"
            alt="Order"
            width={26}
            height={26}
            className="object-contain"
          />
          <span
            className="
      bg-gradient-to-b
      from-[#6C04D7]
      to-[#CD4ECD]
      bg-clip-text
      text-transparent
      font-semibold
    "
            style={{
              fontFamily: "var(--font-Jersey-20)",
            }}
          >Order</span>
        </button>
      </div>
    </div>
  );
}
