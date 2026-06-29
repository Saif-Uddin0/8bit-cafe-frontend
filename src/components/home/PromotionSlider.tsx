"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  "/promotion-img.png",
  "/banner.png",
  "/banner-2.png",
];

export default function PromotionSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#0A061A] p-12 md:p-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Slider viewport container */}
        <div
          className="relative w-full aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl"
          style={{
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}
        >
          {slides.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                opacity: index === current ? 1 : 0,
                visibility: index === current ? "visible" : "hidden",
                transform: `scale(${index === current ? 1 : 1.03})`,
              }}
            >
              {/* Image is centered, object-contain ensures black space on left/right */}
              <Image
                src={src}
                alt={`Promotion slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  height: "8px",
                  width: index === current ? "24px" : "8px",
                  backgroundColor: index === current ? "#CD4ECD" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
