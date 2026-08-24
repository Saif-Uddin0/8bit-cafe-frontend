"use client";

import FoodCard from "./FoodCard";
import { useFoods } from "@/hooks/useFoods";

interface Props {
  categoryId: string;
  currentFoodId: string;
}

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

export default function RelatedFoods({ categoryId, currentFoodId }: Props) {
  const { data, isLoading } = useFoods({ page: 1, sortBy: "price", sortOrder: "asc" });

  const relatedFoods = (data?.foods ?? []).filter(
    (item) =>
      (item.categoryId === categoryId || item.category?.id === categoryId) &&
      item.id !== currentFoodId
  );

  if (!isLoading && relatedFoods.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto mt-16 px-5">
      <h2
        className="mb-8 text-4xl sm:text-5xl lg:mb-10"
        style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
      >
        <span className="inline-block bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent">
          You Also Like
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <FoodCardSkeleton key={i} />)
          : relatedFoods.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
      </div>
    </section>
  );
}