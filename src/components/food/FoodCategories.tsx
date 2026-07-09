"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FOOD_CATEGORIES } from "./foodsData";

interface FoodCategoriesProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  showAllOption?: boolean;
  isHomePage?: boolean;
}

export default function FoodCategories({
  activeCategory = "All",
  onSelectCategory,
  showAllOption = false,
  isHomePage = false,
}: FoodCategoriesProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const categoriesList = React.useMemo(() => {
    return showAllOption
      ? [{ id: "All", name: "All Items", image: "/all-cat.png" }, ...FOOD_CATEGORIES]
      : FOOD_CATEGORIES;
  }, [showAllOption]);

  const handleCategoryClick = (categoryId: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      router.push(`/foods?category=${categoryId}`);
    }
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftFade(scrollLeft > 5);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      handleScroll();
      el.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        el.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [categoriesList]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `[data-category-id="${activeCategory}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory, categoriesList]);

  const CategoryButton = ({
    cat,
    isSelected,
  }: {
    cat: { id: string; name: string; image: string };
    isSelected: boolean;
  }) => (
    <button
      type="button"
      onClick={() => handleCategoryClick(cat.id)}
      className="flex flex-col items-center gap-2.5 group/cat focus:outline-none"
      data-category-id={cat.id}
    >
      <div
        className={[
          "relative rounded-full overflow-hidden",
          "h-[76px] w-[76px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px]",
          "transition-all duration-300 ease-out border-[3px]",
          isSelected
            ? "border-white scale-105 shadow-[0_0_24px_rgba(255,255,255,0.45)]"
            : "border-white/20 group-hover/cat:border-white/80 group-hover/cat:scale-105 group-hover/cat:shadow-[0_0_16px_rgba(255,255,255,0.25)]",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none transition-opacity group-hover/cat:opacity-0" />
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 640px) 76px, (max-width: 1024px) 90px, 110px"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover/cat:scale-110"
        />
      </div>
      <span
        className={[
          "text-center font-bold tracking-wide uppercase transition-all duration-200",
          "text-[10px] sm:text-xs lg:text-[13px]",
          isSelected
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            : "text-white/70 group-hover/cat:text-white",
        ].join(" ")}
      >
        {cat.name}
      </span>
    </button>
  );

  return (
    <section className="relative bg-[#080818] py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6C04D7]/8 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 lg:mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-jersey-20)",
              fontWeight: 400,
            }}
          >
            Food Categories
          </h2>
          {isHomePage && (
            <Link
              href="/foods"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-[#1A0A38]/60 px-3 py-2 sm:px-5 text-white/85 hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200"
            >
              {/* Mobile */}
              <span className="sm:hidden text-[11px] font-semibold">
                View All
              </span>

              {/* Tablet/Desktop */}
              <span className="hidden sm:inline text-sm font-semibold">
                View All Categories
              </span>

              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        <div
          className="w-full rounded-[24px] sm:rounded-[32px] py-5 sm:py-7 lg:py-9"
          style={{
            background: "linear-gradient(135deg, #7B12E0 0%, #A530D8 45%, #CD4ECD 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Desktop (>= lg): evenly spaced row */}
          <div className="hidden lg:flex items-center justify-between w-full px-12 xl:px-16">
            {categoriesList.map((cat) => (
              <CategoryButton
                key={cat.id}
                cat={cat}
                isSelected={showAllOption && activeCategory === cat.id}
              />
            ))}
          </div>

          {/* Mobile/tablet (< lg): Smooth Horizontal Scroll Container */}
          <div className="lg:hidden relative">
            {/* Left fade — pointer-events-none so it never blocks clicks */}
            <div
              aria-hidden="true"
              className={`absolute left-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-r from-[#7B12E0] to-transparent transition-opacity duration-300 ${showLeftFade ? "opacity-75" : "opacity-0"}`}
            />
            {/* Right fade */}
            <div
              aria-hidden="true"
              className={`absolute right-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-l from-[#CD4ECD] to-transparent transition-opacity duration-300 ${showRightFade ? "opacity-75" : "opacity-0"}`}
            />
            
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto flex flex-row gap-6 py-1 px-4 scrollbar-none scroll-smooth select-none"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {categoriesList.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-shrink-0"
                >
                  <CategoryButton
                    cat={cat}
                    isSelected={showAllOption && activeCategory === cat.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
