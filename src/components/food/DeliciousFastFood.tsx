"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FoodCard from "./FoodCard";
import { FOOD_ITEMS } from "./foodsData";

export default function DeliciousFastFood() {
  // Home page preview — exactly 4 items matching the Figma design
  const previewItems = FOOD_ITEMS.slice(0, 4);

  return (
    <section id="foods" className="relative bg-[#080818] py-14 lg:py-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6C04D7]/7 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 sm:mb-10">
          <h2
            className="text-4xl sm:text-5xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            Delicious Fast Food
          </h2>

          <Link
            href="/foods"
            className="
              inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15
              bg-[#1A0A38]/60 px-5 py-2 text-sm font-semibold text-white/85
              hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200
            "
          >
            <span>View All Foods</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── 4-card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
