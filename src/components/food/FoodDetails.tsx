"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Truck,
  Utensils,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Tag,
} from "lucide-react";
import notify from "@/lib/notify";
import { useCart } from "@/hooks/useCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { ApiFood } from "@/types/api";

interface Props {
  food: ApiFood;
}

const PLACEHOLDER_IMAGE = "/order-btn-icon.png";

export default function FoodDetails({ food }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addItemAsync } = useCart();
  const { requireAuth } = useRequireAuth();

  /* Images */
  const images =
    food.images && food.images.length > 0
      ? food.images
      : [{ url: PLACEHOLDER_IMAGE }];

  const currentImage =
    images[activeImageIndex]?.url || PLACEHOLDER_IMAGE;

  /* Discount Calculations */
  const hasDiscount = food.isDisCount === true && food.discountPrice > 0;
  const discountPct = food.disCountParcentage ?? 0;
  const displayPrice = hasDiscount ? food.discountPrice : food.price;
  const totalPrice = displayPrice * qty;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    requireAuth(async () => {
      try {
        await addItemAsync(food.id, qty);
        notify.success(
          `🛒 Added to cart!`,
          `${qty} × ${food.name} added successfully.`
        );
      } catch {
        notify.error(
          "Couldn’t add item",
          `Failed to add ${food.name}. Please try again.`
        );
      }
    });
  };

  return (
    <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="
          mb-6
          inline-flex
          items-center
          gap-2.5
          text-white/60
          hover:text-white
          text-xs
          font-semibold
          uppercase
          tracking-wider
          transition-colors
          duration-200
          group
        "
      >
        <span
          className="
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            bg-white/5
            border
            border-white/10
            group-hover:bg-[#6C04D7]/40
            group-hover:border-[#6C04D7]/60
            group-hover:text-white
            transition-all
            duration-200
          "
        >
          <ArrowLeft size={15} />
        </span>
        Back to Foods
      </button>

      {/* Main Product Container */}
      <div
        className="
          rounded-[28px]
          sm:rounded-[32px]
          border
          border-[#6C04D7]/30
          bg-gradient-to-b
          from-[#1A0A38]
          to-[#12091F]
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          overflow-hidden
        "
      >
        {/* IMAGE GALLERY */}
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <div className="max-w-[620px] mx-auto">
            {/* Main Image */}
            <div
              className="
                relative
                w-full
                aspect-[16/10]
                max-h-[400px]
                rounded-2xl
                sm:rounded-[20px]
                overflow-hidden
                border
                border-white/10
                bg-[#0A0612]
                group
                shadow-[0_15px_40px_rgba(0,0,0,0.45)]
              "
            >
              <Image
                src={currentImage}
                alt={food.name}
                fill
                priority
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.025]
                "
                sizes="(max-width: 768px) 100vw, 620px"
              />

              {/* Dark overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

              {/* Discount Badge */}
              {hasDiscount && (
                <div
                  className="
                    absolute
                    top-4
                    left-4
                    z-10
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-full
                    bg-gradient-to-r
                    from-[#F862C9]
                    to-[#873CE2]
                    text-white
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    shadow-lg
                  "
                >
                  <Sparkles size={13} />
                  {discountPct}% OFF
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div
                  className="
                    absolute
                    right-4
                    bottom-4
                    z-10
                    px-2.5
                    py-1
                    rounded-md
                    bg-black/65
                    backdrop-blur-md
                    border
                    border-white/10
                    text-[11px]
                    font-medium
                    text-white/80
                  "
                >
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Previous Arrow */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    z-10
                    w-9
                    h-9
                    rounded-full
                    bg-black/55
                    backdrop-blur-md
                    border
                    border-white/15
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-[#6C04D7]
                    hover:border-[#6C04D7]
                    transition-all
                    duration-200
                  "
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Next Arrow */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    z-10
                    w-9
                    h-9
                    rounded-full
                    bg-black/55
                    backdrop-blur-md
                    border
                    border-white/15
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-[#6C04D7]
                    hover:border-[#6C04D7]
                    transition-all
                    duration-200
                  "
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={`
                      relative
                      w-16
                      h-16
                      sm:w-[72px]
                      sm:h-[72px]
                      flex-shrink-0
                      rounded-xl
                      overflow-hidden
                      border-2
                      transition-all
                      duration-200
                      ${
                        activeImageIndex === idx
                          ? "border-[#F862C9] shadow-[0_0_14px_rgba(248,98,201,0.4)]"
                          : "border-white/10 opacity-55 hover:opacity-100 hover:border-white/30"
                      }
                    `}
                  >
                    <Image
                      src={img.url}
                      alt={`${food.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div
          className="
            mt-8
            sm:mt-10
            border-t
            border-white/10
            px-5
            py-7
            sm:px-8
            sm:py-9
            lg:px-10
            lg:py-10
          "
        >
          {/* Category & Status */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                bg-[#6C04D7]/20
                border
                border-[#6C04D7]/40
                text-[#F862C9]
                text-xs
                font-medium
                uppercase
              "
            >
              <Utensils size={12} />
              {food.category?.name ?? "Food Item"}
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                bg-emerald-500/10
                border
                border-emerald-500/25
                text-emerald-400
                text-xs
                font-semibold
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Available to Order
            </span>
          </div>

          {/* Food Name (Jersey 20 font) */}
          <h1
            style={{ fontFamily: "var(--font-jersey-20)" }}
            className="
              text-3xl
              sm:text-4xl
              lg:text-[42px]
              leading-tight
              text-white
              font-normal
              tracking-wide
            "
          >
            {food.name}
          </h1>

          {/* Delivery & Time Specs */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-xl
                bg-white/[0.04]
                border
                border-white/10
                text-white/70
                text-xs
              "
            >
              <Clock size={14} className="text-[#CD4ECD]" />
              <span>{food.delivery_time} min delivery</span>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-xl
                bg-white/[0.04]
                border
                border-white/10
                text-white/70
                text-xs
              "
            >
              <Truck size={14} className="text-[#CD4ECD]" />
              <span>Delivery fee: {food.delivery_fee} Tk</span>
            </div>
          </div>

          {/* Description */}
          {food.short_description && (
            <div className="mt-5 max-w-3xl">
              <p
                className="
                  text-white/65
                  text-sm
                  sm:text-[15px]
                  leading-7
                  whitespace-pre-line
                "
              >
                {food.short_description}
              </p>
            </div>
          )}

          {/* Price Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={14} className="text-[#CD4ECD]" />
              <h2
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-white/45
                "
              >
                Item Price
              </h2>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-[#6C04D7]/35
                bg-[#12091F]/75
                p-4
                sm:p-5
                max-w-md
              "
            >
              <div className="flex items-baseline gap-3">
                <span
                  style={{ fontFamily: "var(--font-jersey-20)" }}
                  className="
                    text-3xl
                    sm:text-4xl
                    text-[#F862C9]
                    tracking-wide
                  "
                >
                  ৳{totalPrice}
                </span>

                {hasDiscount && (
                  <span
                    style={{ fontFamily: "var(--font-jersey-20)" }}
                    className="text-lg text-white/35 line-through tracking-wide"
                  >
                    ৳{food.price * qty}
                  </span>
                )}
              </div>

              <p className="text-white/45 text-xs mt-1.5">
                ৳{displayPrice} per item
                {hasDiscount && (
                  <span className="ml-2 text-white/30 line-through">
                    ৳{food.price}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quantity & Add to Cart CTA */}
          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/10
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-4
            "
          >
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-xs uppercase font-bold tracking-wider">
                Quantity:
              </span>
              <div className="inline-flex rounded-xl bg-white/10 border border-white/15 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 text-lg transition"
                >
                  -
                </button>
                <div className="w-12 h-10 flex items-center justify-center font-bold text-white text-sm">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 text-lg transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                w-full
                sm:w-auto
                min-w-[220px]
                h-12
                px-7
                rounded-xl
                bg-gradient-to-b
                from-[#6C04D7]
                via-[#9B24D9]
                to-[#CD4ECD]
                text-white
                font-bold
                uppercase
                tracking-wider
                text-xs
                shadow-[0_8px_25px_rgba(108,4,215,0.25)]
                hover:shadow-[0_10px_30px_rgba(205,78,205,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-200
                flex
                items-center
                justify-center
                gap-2.5
              "
            >
              <ShoppingBag size={17} />
              Add To Cart
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}