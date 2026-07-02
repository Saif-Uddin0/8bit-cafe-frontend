import { notFound } from "next/navigation";
import FoodDetails from "@/components/food/FoodDetails";

import { FOOD_ITEMS } from "@/components/food/foodsData";
import RelatedFoods from "@/components/food/RelatedFoods";

export default async function FoodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const food = FOOD_ITEMS.find((item) => item.id === Number(id));

  if (!food) return notFound();

  return (
    <main className="bg-[#080818] min-h-screen pt-32 pb-20">
    <FoodDetails food={food} />

    <RelatedFoods currentFood={food} />
  </main>
  );
}