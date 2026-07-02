"use client";

import Image from "next/image";
import { Star, Clock, Truck } from "lucide-react";
import { useState } from "react";
import { FoodItem } from "./foodsData";

interface Props {
  food: FoodItem;
}

export default function FoodDetails({
  food,
}: Props) {

  const [qty, setQty] = useState(1);

  return (
    <section className="max-w-[1200px] mx-auto px-5">

      <div
        className="
        rounded-[28px]
        border border-[#F862C9]/30
        bg-[#1A0A38]
        p-10
        grid
        lg:grid-cols-[320px_1fr]
        gap-12
      "
      >

        {/* IMAGE */}

        <div className="flex justify-center">

          <div
            className="
            relative
            w-[270px]
            h-[270px]
            rounded-full
            overflow-hidden
            border-[5px]
            border-[#5D1BC6]
            shadow-[0_0_50px_rgba(0,0,0,.5)]
          "
          >

            <Image
              src={food.image}
              alt={food.name}
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* INFO */}

        <div>

          <h2 className="text-white text-3xl font-bold">

            Food Name:
            <span className="font-normal ml-2">
              {food.name}
            </span>

          </h2>

          <p className="mt-2 text-[#F862C9] text-lg">

            Services:
            <span className="text-white ml-2">
              {food.service}
            </span>

          </p>

          <div className="mt-5 space-y-3 text-white/70">

            <div className="flex items-center gap-2">

              <Star
                size={17}
                className="text-yellow-400"
              />

              <span>

                {food.rating}
                ({food.reviewsCount})

              </span>

            </div>

            <div className="flex items-center gap-2">

              <Clock size={17} />

              <span>

                {food.deliveryTime} min

              </span>

            </div>

            <div className="flex items-center gap-2">

              <Truck size={17} />

              <span>

                Delivery charge {food.deliveryFee} Tk

              </span>

            </div>

          </div>

          <p
            className="
            mt-6
            max-w-xl
            leading-7
            text-white/70
          "
          >

            {food.shortDescription}

          </p>

          {/* Quantity */}

          <div
            className="
            mt-8
            inline-flex
            rounded-xl
            bg-[#F6F2ED]
            overflow-hidden
          "
          >

            <button
              onClick={() =>
                setQty(Math.max(1, qty - 1))
              }
              className="
              w-12
              h-12
              text-[#CD4ECD]
              text-xl
            "
            >
              -
            </button>

            <div
              className="
              w-12
              flex
              items-center
              justify-center
              font-bold
              text-[#7E00FF]
            "
            >
              {qty}
            </div>

            <button
              onClick={() =>
                setQty(qty + 1)
              }
              className="
              w-12
              h-12
              text-[#CD4ECD]
              text-xl
            "
            >
              +
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}