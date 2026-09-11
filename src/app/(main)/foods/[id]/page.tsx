"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import FoodDetails from "@/components/food/FoodDetails";
import RelatedFoods from "@/components/food/RelatedFoods";
import { useFoodDetail } from "@/hooks/useFoodDetail";

// ─── Full-page skeleton ───────────────────────────────────────────────────────
function FoodDetailSkeleton() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="rounded-[28px] sm:rounded-[32px] border border-white/10 bg-[#1A0A38] p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="max-w-[620px] mx-auto">
          <div className="aspect-[16/10] w-full rounded-2xl bg-white/10" />
          <div className="flex justify-center gap-2.5 mt-4">
            <div className="w-16 h-16 rounded-xl bg-white/10" />
            <div className="w-16 h-16 rounded-xl bg-white/10" />
            <div className="w-16 h-16 rounded-xl bg-white/10" />
          </div>
        </div>
        <div className="space-y-4 border-t border-white/10 pt-6">
          <div className="flex gap-2">
            <div className="h-6 w-24 rounded-full bg-white/10" />
            <div className="h-6 w-36 rounded-full bg-white/10" />
          </div>
          <div className="h-10 w-3/4 rounded-2xl bg-white/10" />
          <div className="h-20 w-full rounded-2xl bg-white/10" />
          <div className="h-12 w-full rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// ─── Inner component that uses the hook ──────────────────────────────────────
function FoodPageContent({ id }: { id: string }) {
  const { data: food, isLoading, isError } = useFoodDetail(id);

  if (isLoading) return <FoodDetailSkeleton />;

  if (isError || !food) return notFound();

  return (
    <>
      <FoodDetails food={food} />
      <RelatedFoods
        categoryId={food.categoryId}
        currentFoodId={food.id}
      />
    </>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function FoodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <main className="bg-[#080818] min-h-screen pt-32 pb-20">
      <FoodPageContent id={id} />
    </main>
  );
}