"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import type { ApiCategory } from "@/types/api";

// ─── Deterministic gradient palette ─────────────────────────────────────────
// Each index maps to a unique, vibrant gradient pair so every category card
// looks distinct regardless of name or how many categories the admin adds.
const GRADIENT_PALETTE: Array<[string, string]> = [
  ["#FF6B6B", "#FF8E53"],
  ["#4ECDC4", "#45B7D1"],
  ["#A8E6CF", "#56CCF2"],
  ["#F8BBD9", "#E91E8C"],
  ["#FFD93D", "#FF6B35"],
  ["#C9B1FF", "#7B2FBE"],
  ["#98D8C8", "#2ECC71"],
  ["#FFB347", "#FF6B6B"],
  ["#74B9FF", "#0984E3"],
  ["#FD79A8", "#E84393"],
  ["#FDCB6E", "#E17055"],
  ["#81ECEC", "#00CEC9"],
];

function getCategoryGradient(index: number): [string, string] {
  return GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];
}

/** Returns up to 2 characters for the category initial display */
function getCategoryInitials(name: string): string {
  const words = name.trim().split(/[\s/]+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// ─── Skeleton card ───────────────────────────────────────────────────────────
function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2.5 flex-shrink-0">
      <div
        className="rounded-full animate-pulse bg-white/10"
        style={{ width: 76, height: 76 }}
      />
      <div className="h-3 w-14 rounded-full bg-white/10 animate-pulse" />
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface FoodCategoriesProps {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  showAllOption?: boolean;
  isHomePage?: boolean;
}

// ─── "All Items" synthetic entry ─────────────────────────────────────────────
const ALL_CATEGORY: ApiCategory = {
  id: "All",
  type: "FOOD",
  name: "All Items",
  isDelete: false,
  createdAt: "",
};

// ─── Single category button ──────────────────────────────────────────────────
function CategoryButton({
  cat,
  isSelected,
  colorIndex,
  onClick,
}: {
  cat: ApiCategory;
  isSelected: boolean;
  colorIndex: number;
  onClick: () => void;
}) {
  const [from, to] = cat.id === "All"
    ? ["#CD4ECD", "#6C04D7"]
    : getCategoryGradient(colorIndex);

  const initials = getCategoryInitials(cat.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 group/cat focus:outline-none"
    >
      {/* Circular orb */}
      <div
        className={[
          "relative rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden",
          "h-[76px] w-[76px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px]",
          "transition-all duration-300 ease-out border-[3px]",
          isSelected
            ? "border-white scale-105 shadow-[0_0_24px_rgba(255,255,255,0.45)]"
            : "border-white/20 group-hover/cat:border-white/80 group-hover/cat:scale-105 group-hover/cat:shadow-[0_0_16px_rgba(255,255,255,0.25)]",
        ].join(" ")}
        style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      >
        {/* Subtle inner shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

        {/* Abstract geometric accent ring */}
        <div
          className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-[6px] border-white/10 pointer-events-none"
        />

        {/* Initials text */}
        <span
          className={[
            "relative z-10 font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]",
            "text-[22px] sm:text-[26px] lg:text-[30px]",
            "tracking-tight leading-none select-none",
            "transition-transform duration-300 group-hover/cat:scale-110",
          ].join(" ")}
          style={{ fontFamily: "var(--font-jersey-20)" }}
        >
          {initials}
        </span>

        {/* Hover shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none opacity-60 transition-opacity group-hover/cat:opacity-0" />
      </div>

      {/* Label */}
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
}

// ─── Main component ───────────────────────────────────────────────────────────
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

  const { data: apiCategories = [], isLoading } = useCategories();

  // Build final list
  const categoriesList = React.useMemo(() => {
    const base = apiCategories.filter((c) => !c.isDelete);
    return showAllOption ? [ALL_CATEGORY, ...base] : base;
  }, [apiCategories, showAllOption]);

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
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(
      `[data-category-id="${activeCategory}"]`
    );
    if (!activeEl) return;
    const itemLeft = activeEl.offsetLeft;
    const itemWidth = activeEl.offsetWidth;
    const ctrWidth = container.clientWidth;
    container.scrollTo({
      left: itemLeft - ctrWidth / 2 + itemWidth / 2,
      behavior: "smooth",
    });
  }, [activeCategory, categoriesList]);

  // Skeleton count while loading
  const SKELETON_COUNT = 7;

  return (
    <section className="relative bg-[#080818] py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6C04D7]/8 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 lg:mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            Food Categories
          </h2>
          {isHomePage && (
            <Link
              href="/foods"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-[#1A0A38]/60 px-3 py-2 sm:px-5 text-white/85 hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200"
            >
              <span className="sm:hidden text-[11px] font-semibold">View All</span>
              <span className="hidden sm:inline text-sm font-semibold">View All Categories</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Card strip */}
        <div
          className="w-full rounded-[24px] sm:rounded-[32px] py-5 sm:py-7 lg:py-9"
          style={{
            background: "linear-gradient(135deg, #7B12E0 0%, #A530D8 45%, #CD4ECD 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* ── Desktop: evenly spaced row ── */}
          <div className="hidden lg:flex items-center justify-between w-full px-12 xl:px-16">
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <CategorySkeleton key={i} />
                ))
              : categoriesList.map((cat, idx) => (
                  <CategoryButton
                    key={cat.id}
                    cat={cat}
                    isSelected={showAllOption && activeCategory === cat.id}
                    colorIndex={idx}
                    onClick={() => handleCategoryClick(cat.id)}
                  />
                ))}
          </div>

          {/* ── Mobile/tablet: horizontal scroll ── */}
          <div className="lg:hidden relative">
            {/* Left fade */}
            <div
              aria-hidden="true"
              className={`absolute left-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-r from-[#7B12E0] to-transparent transition-opacity duration-300 ${
                showLeftFade ? "opacity-75" : "opacity-0"
              }`}
            />
            {/* Right fade */}
            <div
              aria-hidden="true"
              className={`absolute right-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-l from-[#CD4ECD] to-transparent transition-opacity duration-300 ${
                showRightFade ? "opacity-75" : "opacity-0"
              }`}
            />

            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto flex flex-row gap-6 py-1 px-4 scrollbar-none scroll-smooth select-none"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {isLoading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <CategorySkeleton key={i} />
                  ))
                : categoriesList.map((cat, idx) => (
                    <div
                      key={cat.id}
                      data-category-id={cat.id}
                      className="flex-shrink-0"
                    >
                      <CategoryButton
                        cat={cat}
                        isSelected={showAllOption && activeCategory === cat.id}
                        colorIndex={idx}
                        onClick={() => handleCategoryClick(cat.id)}
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
