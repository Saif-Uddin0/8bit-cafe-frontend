"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useBanners } from "@/hooks/useBanners";

// ── Skeleton shown while banners are loading ─────────────────────────────────
function BannerSkeleton() {
  return (
    <section className="bg-[#0A061A] py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD] p-[2px]">
          <div className="overflow-hidden rounded-[14px] sm:rounded-[22px] lg:rounded-[38px] bg-[#090313]">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[18/7] animate-pulse bg-gradient-to-r from-[#1a0a30] via-[#2d1060] to-[#1a0a30] bg-[length:200%_100%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PromotionSlider() {
  const { data: banners, isLoading, isError } = useBanners();

  const autoplay = useRef(
    Autoplay({
      delay: 3500,
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

  // Track which slide is active for dot highlighting
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // initialise

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Show skeleton while loading
  if (isLoading) return <BannerSkeleton />;

  // Nothing to render if no banners (or API error)
  if (isError || !banners || banners.length === 0) return null;

  return (
    <section className="bg-[#0A061A] py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
        {/* Gradient Border */}
        <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD] p-[2px]">
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-[14px] sm:rounded-[22px] lg:rounded-[38px] bg-[#090313]"
          >
            <div className="flex">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="relative min-w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[18/7]"
                >
                  <Image
                    src={banner.image}
                    alt={`Promotional Banner ${index + 1}`}
                    fill
                    priority={index === 0}
                    draggable={false}
                    className="object-cover object-center select-none"
                    sizes="(max-width:640px) 100vw,
                       (max-width:1024px) 100vw,
                       1700px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation Dots (only shown when >1 banner) ── */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={[
                      "h-2 rounded-full transition-all duration-300",
                      selectedIndex === index
                        ? "w-5 sm:w-6 bg-[#F862C9] shadow-[0_0_8px_#F862C9]"
                        : "w-2 bg-white/30 hover:bg-white/60",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}