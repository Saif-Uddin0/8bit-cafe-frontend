"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#0A061A] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <h2
          className="mb-16 text-center text-4xl md:text-5xl"
          style={{
            fontFamily: "var(--font-jersey-20)",
            fontWeight: 400,
            background: "linear-gradient(180deg,#CD4ECD 0%,#6C04D7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Us
        </h2>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="rounded-[28px] border border-[#6C04D7] bg-[#12091F] p-8 md:p-10">
              <h3
                className="mb-6 text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-jersey-20)",
                  fontWeight: 400,
                  background:
                    "linear-gradient(180deg,#CD4ECD 0%,#6C04D7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                The Ultimate Gaming Destination in Feni
              </h3>

              <p className="text-base leading-8 text-white/70">
                Experience high-performance gaming, thrilling tournaments,
                and delicious food in a vibrant space designed for gamers,
                friends, and unforgettable moments. Whether you're here to
                compete, relax, or recharge, we've got everything you need
                under one roof.
              </p>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative mx-auto w-full max-w-[620px]">
            {/* Top Banner */}
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src="/banner.png"
                alt="8Bit Cafe"
                width={700}
                height={220}
                className="h-[170px] w-full object-cover"
              />
            </div>

            {/* Bottom Images */}
            <div className="mt-5 flex gap-5">
              {/* Small */}
              <div className="relative mt-20 h-[220px] w-[42%] overflow-hidden rounded-[24px]">
                <Image
                  src="/about-1.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* Large */}
              <div className="relative h-[330px] flex-1 overflow-hidden rounded-[24px]">
                <Image
                  src="/about-2.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 right-0 rounded-full bg-gradient-to-r from-[#CD4ECD] to-[#6C04D7] px-8 py-4 shadow-xl">
              <span
                className="text-2xl text-white"
                style={{
                  fontFamily: "var(--font-jersey-20)",
                  fontWeight: 400,
                }}
              >
                🏆 Best in the town
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}