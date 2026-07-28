"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FoodCard from "./FoodCard";
import { useFoods } from "@/hooks/useFoods";

// Skeleton card while loading
function FoodCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center w-full rounded-[24px] border border-white/10 bg-white/5 pt-10 pb-5 px-5 animate-pulse">
      {/* Circle */}
      <div className="w-[160px] h-[160px] rounded-full bg-white/10 mb-5" />
      {/* Name */}
      <div className="h-5 w-32 rounded-full bg-white/10 mb-3" />
      {/* Info rows */}
      <div className="flex flex-col gap-2 w-full mb-5">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-4 w-32 rounded-full bg-white/10" />
      </div>
      {/* Price */}
      <div className="h-6 w-16 rounded-full bg-white/10 mb-4" />
      {/* Button */}
      <div className="h-10 w-full rounded-md bg-white/10" />
    </div>
  );
}

export default function DeliciousFastFood() {
  const { data, isLoading } = useFoods({ page: 1, sortBy: "price", sortOrder: "asc" });

  // Show first 4 foods from API
  const previewItems = data?.foods?.slice(0, 4) ?? [];

  return (
    <section id="foods" className="relative bg-[#080818] py-14 lg:py-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6C04D7]/7 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            Delicious Fast Food
          </h2>

          <Link
            href="/foods"
            className="
              inline-flex shrink-0 items-center gap-2 rounded-xl
              border border-white/15 bg-[#1A0A38]/60
              px-3 py-2 sm:px-5
              text-white/85 hover:border-[#CD4ECD]/60 hover:text-white
              transition-all duration-200
            "
          >
            <span className="sm:hidden text-[11px] font-semibold">View All</span>
            <span className="hidden sm:inline text-sm font-semibold">View All Foods</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <FoodCardSkeleton key={i} />)
            : previewItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
        </div>
      </div>
    </section>
  );
}
