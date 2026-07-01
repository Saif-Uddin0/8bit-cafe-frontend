"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FOOD_CATEGORIES } from "./foodsData";

interface FoodCategoriesProps {
  /** Currently selected category (Foods page only) */
  activeCategory?: string;
  /** Callback when a category button is clicked (Foods page only) */
  onSelectCategory?: (category: string) => void;
  /** Show the "All Items" option first (Foods page only) */
  showAllOption?: boolean;
  /** When true, clicking a category navigates to /foods?category=X  */
  isHomePage?: boolean;
}

export default function FoodCategories({
  activeCategory = "All",
  onSelectCategory,
  showAllOption = false,
  isHomePage = false,
}: FoodCategoriesProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      router.push(`/foods?category=${categoryId}`);
    }
  };

  return (
    <section className="relative bg-[#080818] py-14 lg:py-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6C04D7]/8 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 sm:mb-10">
          <h2
            className="text-4xl sm:text-5xl bg-gradient-to-b from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            Food Categories
          </h2>

          {isHomePage && (
            <Link
              href="/foods"
              className="
                inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15
                bg-[#1A0A38]/60 px-5 py-2 text-sm font-semibold text-white/85
                hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200
              "
            >
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* ── Gradient pill container ── */}
        <div
          className="w-full rounded-[32px] px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11"
          style={{
            background: "linear-gradient(135deg, #7B12E0 0%, #A530D8 45%, #CD4ECD 100%)",
          }}
        >
          {/* Scrollable row — centers when items fit, scrolls when they overflow */}
          <div
            className="
              flex items-center justify-center
              gap-4 sm:gap-6 lg:gap-8 xl:gap-10
              overflow-x-auto
              px-2
              pb-1
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* "All Items" option — Foods page only */}
            {showAllOption && (
              <button
                type="button"
                onClick={() => onSelectCategory?.("All")}
                className="flex flex-shrink-0 flex-col items-center gap-3 group/cat"
              >
                <div
                  className={`
                    relative h-[100px] w-[100px] sm:h-[110px] sm:w-[110px] rounded-full overflow-hidden
                    border-[3px] transition-all duration-300
                    ${activeCategory === "All"
                      ? "border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "border-white/30 group-hover/cat:border-white group-hover/cat:scale-105 group-hover/cat:shadow-[0_0_16px_rgba(255,255,255,0.2)]"}
                  `}
                >
                  <Image
                    src="/all-cat.png"
                    alt="All Items"
                    fill
                    sizes="120px"
                    className="object-cover object-center transition-transform duration-500 group-hover/cat:scale-105"
                  />
                </div>
                <span className="text-center text-xs sm:text-sm font-semibold text-white">
                  All Items
                </span>
              </button>
            )}

            {/* Category items */}
            {FOOD_CATEGORIES.map((cat) => {
              const isSelected = showAllOption && activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-shrink-0 flex-col items-center gap-3 group/cat"
                >
                  <div
                    className={`
                      relative h-[92px] w-[92px] sm:h-[96px] sm:w-[96px] rounded-full overflow-hidden bg-white/10
                      border-[3px] transition-all duration-300
                      ${isSelected
                        ? "border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                        : "border-white/25 group-hover/cat:border-white group-hover/cat:scale-105 group-hover/cat:shadow-[0_0_16px_rgba(255,255,255,0.2)]"}
                    `}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="120px"
                      className="object-cover object-center transition-transform duration-500 group-hover/cat:scale-105"
                    />
                  </div>
                  <span
                    className={`
                      text-center text-xs sm:text-sm font-semibold transition-colors duration-200
                      ${isSelected ? "text-white" : "text-white/90 group-hover/cat:text-white"}
                    `}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
