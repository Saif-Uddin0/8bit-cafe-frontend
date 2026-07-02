"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import FoodCategories from "@/components/food/FoodCategories";
import FoodCard from "@/components/food/FoodCard";
import { FOOD_ITEMS } from "@/components/food/foodsData";

function FoodsPageContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pre-select category from ?category=X query param
  useEffect(() => {
    const catParam = searchParams.get("category");
    setActiveCategory(catParam ?? "All");
  }, [searchParams]);

  const filteredFoods = FOOD_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <h2
            className="text-3xl sm:text-4xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            {activeCategory === "All" ? "All Foods" : activeCategory}
          </h2>
          <p className="text-xs sm:text-sm text-white/40">
            {filteredFoods.length} items found
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border border-white/5 bg-[#12091F]/40 text-white/40 text-center">
            <Search size={44} strokeWidth={1.2} />
            <p className="text-base font-semibold">No items match your search</p>
            <button
              type="button"
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-1 text-[#CD4ECD] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
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
