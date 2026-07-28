"use client";

import Image from "next/image";
import { Clock, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/contexts/CartContext";
import type { ApiFood } from "@/types/api";

interface Props {
  food: ApiFood;
}

const PLACEHOLDER_IMAGE = "/order-btn-icon.png";

export default function FoodDetails({ food }: Props) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const imageUrl = food.images?.[0]?.url ?? PLACEHOLDER_IMAGE;
  // ── Exact backend field names ──────────────────────────────────────────
  const hasDiscount = food.isDisCount === true && food.discountPrice > 0;
  const discountPct = food.disCountParcentage ?? 0;
  const displayPrice = hasDiscount ? food.discountPrice : food.price;
  const totalPrice = displayPrice * qty;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: food.id as unknown as number,
        name: food.name,
        price: displayPrice,
        image: imageUrl,
        category: food.category?.name ?? "",
      });
    }
    toast.success(`${qty} × ${food.name} added to cart!`, {
      theme: "dark",
      autoClose: 2000,
    });
  };

  return (
    <section className="max-w-[1200px] mx-auto px-5">
      <div
        className="
          rounded-[28px]
          border border-[#F862C9]/30
          bg-[#1A0A38]
          p-8 lg:p-10
          grid
          lg:grid-cols-[320px_1fr]
          gap-12
        "
      >
        {/* IMAGE */}
        <div className="flex justify-center items-start">
          <div
            className="
              relative
              w-[270px]
              h-[270px]
              rounded-full
              overflow-hidden
              border-[5px]
              border-[#5D1BC6]
              shadow-[0_0_50px_rgba(0,0,0,.5)]
            "
          >
            <Image
              src={imageUrl}
              alt={food.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* INFO */}
        <div>
          {/* Name */}
          <h2 className="text-white text-3xl font-bold">{food.name}</h2>

          {/* Category tag */}
          <p className="mt-2 text-[#F862C9] text-lg">{food.category?.name}</p>

          {/* Discount badge */}
          {hasDiscount && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F862C9] to-[#CD4ECD] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_16px_rgba(248,98,201,0.5)]">
              <span>🔥 {discountPct}% OFF — Special Price!</span>
            </div>
          )}

          {/* Delivery info (no rating/reviews) */}
          <div className="mt-5 space-y-3 text-white/70">
            <div className="flex items-center gap-2">
              <Clock size={17} />
              <span>{food.delivery_time} min delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={17} />
              <span>Delivery charge {food.delivery_fee} Tk</span>
            </div>
          </div>

          {/* Short description */}
          <p className="mt-6 max-w-xl leading-7 text-white/70">
            {food.short_description}
          </p>

          {/* Price */}
          <div className="mt-7">
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-[#F862C9]">
                ৳{totalPrice}
              </p>
              {hasDiscount && (
                <span className="text-white/40 text-xl line-through pb-1">
                  ৳{food.price * qty}
                </span>
              )}
            </div>
            <p className="text-white/50 text-sm mt-1">
              ৳{displayPrice} each
              {hasDiscount && (
                <span className="ml-2 text-white/30 line-through">৳{food.price}</span>
              )}
            </p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex rounded-xl bg-[#F6F2ED] overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-12 text-[#CD4ECD] text-xl hover:bg-gray-100 transition"
              >
                -
              </button>
              <div className="w-12 h-12 flex items-center justify-center font-bold text-[#7E00FF]">
                {qty}
              </div>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 text-[#CD4ECD] text-xl hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="
                h-12 px-8 rounded-xl
                bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD]
                text-white font-semibold
                hover:scale-105 active:scale-95 transition-all duration-200
              "
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}