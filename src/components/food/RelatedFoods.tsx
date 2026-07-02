"use client";

import FoodCard from "./FoodCard";
import { FOOD_ITEMS, FoodItem } from "./foodsData";

interface Props {
  currentFood: FoodItem;
}

export default function RelatedFoods({
  currentFood,
}: Props) {
  const relatedFoods = FOOD_ITEMS.filter(
    (item) =>
      item.category === currentFood.category &&
      item.id !== currentFood.id
  );

  if (relatedFoods.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto mt-16 px-5">
      <h2
        className="mb-8 text-4xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
        style={{
          fontFamily: "var(--font-Jersey-20)",
        }}
      >
        You also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedFoods.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}