"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import type { ApiCategory } from "@/types/api";

// ─── Deterministic gradient palette ─────────────────────────────────────────
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

/** Future-proof category image resolver */
function getCategoryImage(cat: ApiCategory): string | null {
  if (!cat) return null;
  if (typeof cat.image === "string" && cat.image.trim() !== "") {
    return cat.image;
  }
  if (cat.image && typeof cat.image === "object" && "url" in cat.image && typeof cat.image.url === "string" && cat.image.url.trim() !== "") {
    return cat.image.url;
  }
  if (Array.isArray(cat.images) && cat.images.length > 0) {
    const first = cat.images[0];
    if (typeof first === "string" && first.trim() !== "") return first;
    if (first && typeof first === "object" && "url" in first && typeof first.url === "string" && first.url.trim() !== "") {
      return first.url;
    }
  }
  if (typeof cat.imageUrl === "string" && cat.imageUrl.trim() !== "") {
    return cat.imageUrl;
  }
  return null;
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
  const [imgError, setImgError] = useState(false);
  const [from, to] = cat.id === "All"
    ? ["#CD4ECD", "#6C04D7"]
    : getCategoryGradient(colorIndex);

  const initials = getCategoryInitials(cat.name);
  const imageUrl = !imgError ? getCategoryImage(cat) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 group/cat focus:outline-none flex-shrink-0"
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

        {/* Image or initials text */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-300 group-hover/cat:scale-110 pointer-events-none"
            onError={() => setImgError(true)}
          />
        ) : (
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
        )}

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
  const outerRef = useRef<HTMLDivElement>(null);      // wraps the purple card strip
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  // true  → items fit → centered compact layout
  // false → items overflow → full-width draggable carousel
  const [isCentering, setIsCentering] = useState(true);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const { data: apiCategories = [], isLoading } = useCategories();

  // Filter to show FOOD categories only
  const categoriesList = React.useMemo(() => {
    const base = apiCategories.filter((c) => !c.isDelete && c.type?.toUpperCase() === "FOOD");
    return showAllOption ? [ALL_CATEGORY, ...base] : base;
  }, [apiCategories, showAllOption]);

  // ─── Measure whether items fit inside the available parent width ─────────────
  // We compare total item width (from DOM children) against outerRef.clientWidth
  // minus the horizontal padding of the scroll container.  This avoids the
  // circular issue of comparing scrollWidth vs clientWidth on the same element.
  const checkFit = React.useCallback(() => {
    const outer = outerRef.current;
    const scroller = scrollContainerRef.current;
    if (!outer || !scroller) return;

    const items = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-category-id]")
    );
    if (items.length === 0) return;

    // Horizontal padding inside the scroll container (px-6 sm:px-10 lg:px-12)
    // We read it from computed style so it's exact at every breakpoint.
    const style = window.getComputedStyle(scroller);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;

    const gap = parseFloat(style.gap) || 24; // gap-6 = 24px default
    const totalItemsWidth =
      items.reduce((acc, el) => acc + el.offsetWidth, 0) +
      gap * (items.length - 1) +
      padL +
      padR;

    const availableWidth = outer.clientWidth;
    setIsCentering(totalItemsWidth <= availableWidth);
  }, []);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
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

  // Run fit-check after layout settles, and on every resize
  useEffect(() => {
    // Short timeout so the browser has painted the items before we measure
    const t = setTimeout(checkFit, 60);
    window.addEventListener("resize", checkFit);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkFit);
    };
  }, [categoriesList, checkFit]);

  // Convert vertical scroll wheel to horizontal scroll wheel over the carousel container
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const isAtLeft = el.scrollLeft <= 0;
      const isAtRight = el.scrollLeft >= maxScroll - 1;
      const scrollingLeft = e.deltaY < 0;
      const scrollingRight = e.deltaY > 0;

      if ((scrollingLeft && !isAtLeft) || (scrollingRight && !isAtRight)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

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

        {/* Card strip — adaptive: w-fit centered when items fit, w-full carousel when they overflow */}
        <div
          ref={outerRef}
          className={[
            "rounded-[24px] sm:rounded-[32px] py-5 sm:py-7 lg:py-9 relative overflow-hidden",
            isCentering ? "mx-auto max-w-full w-fit" : "w-full",
          ].join(" ")}
          style={{
            background: "linear-gradient(135deg, #7B12E0 0%, #A530D8 45%, #CD4ECD 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            transform: "translateZ(0)",
          }}
        >
          {/* Edge fades — only meaningful in carousel mode */}
          {!isCentering && (
            <>
              {/* Left fade — solid zone matches the generous left padding */}
              <div
                aria-hidden="true"
                className={`absolute left-0 top-0 bottom-0 z-20 pointer-events-none transition-opacity duration-300 ${
                  showLeftFade ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "clamp(56px, 8vw, 100px)",
                  background:
                    "linear-gradient(to right, #7B12E0 0%, #7B12E0 40%, transparent 100%)",
                }}
              />
              {/* Right fade — solid zone matches the generous right padding */}
              <div
                aria-hidden="true"
                className={`absolute right-0 top-0 bottom-0 z-20 pointer-events-none transition-opacity duration-300 ${
                  showRightFade ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "clamp(56px, 8vw, 100px)",
                  background:
                    "linear-gradient(to left, #CD4ECD 0%, #CD4ECD 40%, transparent 100%)",
                }}
              />
            </>
          )}

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={[
              "scrollbar-none scroll-smooth select-none",
              isCentering
                // Centered mode: generous symmetric padding so orbs breathe
                ? "flex flex-row flex-wrap justify-center gap-6 sm:gap-8 px-10 sm:px-14 lg:px-16 py-3 sm:py-4"
                // Carousel mode: same generous padding on both ends
                : "w-full overflow-x-auto flex flex-row gap-6 sm:gap-8 snap-x snap-mandatory px-10 sm:px-14 lg:px-16 py-3 sm:py-4",
            ].join(" ")}
            style={{
              WebkitOverflowScrolling: "touch",
              cursor: isCentering ? "default" : isDragging ? "grabbing" : "grab",
              // Tell the browser the snap boundary starts after the left padding
              scrollPaddingInline: !isCentering ? "clamp(40px, 5vw, 64px)" : undefined,
            }}
          >
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <CategorySkeleton />
                  </div>
                ))
              : categoriesList.map((cat, idx) => (
                  <div
                    key={cat.id}
                    data-category-id={cat.id}
                    className={isCentering ? "flex-shrink-0" : "flex-shrink-0 snap-start"}
                  >
                    <CategoryButton
                      cat={cat}
                      isSelected={showAllOption ? activeCategory === cat.id : activeCategory === cat.name}
                      colorIndex={idx}
                      onClick={() => {
                        if (hasDragged.current) return;
                        handleCategoryClick(cat.id);
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
