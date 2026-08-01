"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import FoodCategories from "@/components/food/FoodCategories";
import FoodCard from "@/components/food/FoodCard";
import { useFoods } from "@/hooks/useFoods";
import { useCategories } from "@/hooks/useCategories";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function FoodCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center w-full rounded-[24px] border border-white/10 bg-white/5 pt-10 pb-5 px-5 animate-pulse">
      <div className="w-[160px] h-[160px] rounded-full bg-white/10 mb-5" />
      <div className="h-5 w-32 rounded-full bg-white/10 mb-3" />
      <div className="flex flex-col gap-2 w-full mb-5">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-4 w-32 rounded-full bg-white/10" />
      </div>
      <div className="h-6 w-16 rounded-full bg-white/10 mb-4" />
      <div className="h-10 w-full rounded-md bg-white/10" />
    </div>
  );
}

// ─── Inner page (needs Suspense for useSearchParams) ─────────────────────────
function FoodsPageContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pre-select category from ?category=X query param
  useEffect(() => {
    const catParam = searchParams.get("category");
    setActiveCategory(catParam ?? "All");
  }, [searchParams]);

  const { data: apiCategories = [] } = useCategories();

  // Resolve activeCategory (may be a raw ID or a name) to a display name.
  // Priority: exact name match → ID match → "Selected Category" fallback
  const resolvedCategoryName = React.useMemo(() => {
    if (activeCategory === "All") return "All Foods";
    const byName = apiCategories.find(
      (c) => c.name === activeCategory && c.type?.toUpperCase() === "FOOD"
    );
    if (byName) return byName.name;
    const byId = apiCategories.find(
      (c) => c.id === activeCategory && c.type?.toUpperCase() === "FOOD"
    );
    if (byId) return byId.name;
    // If activeCategory looks like a UUID/ID (no spaces, long string), show fallback
    return "Selected Category";
  }, [activeCategory, apiCategories]);

  const categorySubtitle = React.useMemo(() => {
    if (activeCategory === "All") return "Browse our complete food collection.";
    return `Showing all foods in this category.`;
  }, [activeCategory]);

  const { data, isLoading, isError } = useFoods({
    page: 1,
    sortBy: "price",
    sortOrder: "asc",
  });

  const allFoods = data?.foods ?? [];

  // Client-side filter: category + search
  const filteredFoods = allFoods.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category?.name === activeCategory ||
      item.categoryId === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ── Search bar ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-2">
        <div className="relative w-full max-w-[500px] mx-auto">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
          />
          <input
            type="text"
            id="food-search"
            placeholder="Search Food"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full rounded-2xl border border-white/10 bg-[#1A0A38]/60 py-3 pl-11 pr-5
              text-sm text-white placeholder-white/35
              focus:border-[#CD4ECD]/60 focus:outline-none focus:ring-0
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* ── Food Categories (with "All" filter option) ── */}
      <FoodCategories
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        showAllOption={true}
        isHomePage={false}
      />

      {/* ── Foods grid ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-20">
        {/* Sub-header */}
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2
              className="text-3xl sm:text-4xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              {resolvedCategoryName}
            </h2>
            <p className="text-xs sm:text-sm text-white/40">
              {isLoading ? "Loading…" : `${filteredFoods.length} items found`}
            </p>
          </div>
          <p className="text-sm text-white/40">{categorySubtitle}</p>
        </div>

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border border-red-500/20 bg-red-900/10 text-white/50 text-center">
            <p className="text-base font-semibold">Failed to load foods</p>
            <p className="text-sm">Please check your connection and try again.</p>
          </div>
        )}

        {/* Skeleton loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredFoods.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border border-white/5 bg-[#12091F]/40 text-white/40 text-center">
            <Search size={44} strokeWidth={1.2} />
            <p className="text-base font-semibold">No items match your search</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-1 text-[#CD4ECD] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Food grid */}
        {!isLoading && !isError && filteredFoods.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFoods.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function FoodsPage() {
  return (
    <div className="relative min-h-screen bg-[#080818] pt-32 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/4 h-[600px] w-[600px] rounded-full bg-[#6C04D7]/5 blur-[160px]" />
        <div className="absolute -right-60 bottom-0 h-[600px] w-[600px] rounded-full bg-[#CD4ECD]/4 blur-[160px]" />
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-white/40 text-sm">
            Loading menu…
          </div>
        }
      >
        <FoodsPageContent />
      </Suspense>
    </div>
  );
}
