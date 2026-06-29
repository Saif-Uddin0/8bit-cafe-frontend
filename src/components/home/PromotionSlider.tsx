"use client";

import { useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const slides = [
  "/promotion-img.png",
  "/banner.png",
  "/banner-2.png",
];

export default function PromotionSlider() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      skipSnaps: false,
    },
    [autoplay.current]
  );

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="bg-[#0A061A] py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
        {/* Gradient Border */}
        <div className="rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD] p-[2px]">
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-[14px] sm:rounded-[22px] lg:rounded-[38px] bg-[#090313]"
          >
            <div className="flex">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="
                relative
                min-w-full
                aspect-[16/10]
                sm:aspect-[16/9]
                lg:aspect-[18/7]
              "
                >
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    draggable={true}
                    className="object-cover object-center select-none"
                    sizes="(max-width:640px) 100vw,
                       (max-width:1024px) 100vw,
                       1700px"
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 sm:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className="
                  h-2 w-2
                  sm:h-2.5 sm:w-2.5
                  rounded-full
                  bg-white/30
                  transition-all
                  duration-300
                  hover:bg-white
                "
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}