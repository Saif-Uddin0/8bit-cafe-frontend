"use client";

import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="overflow-hidden bg-[#0A061A] py-16 sm:py-20 lg:py-15">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                {/* Heading */}

                <h2
                    className="mb-12 text-center text-4xl sm:text-5xl lg:mb-20"
                    style={{
                        fontFamily: "var(--font-jersey-20)",
                        fontWeight: 400,
                    }}
                >
                    <span className="inline-block bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent">
                        About Us
                    </span>
                </h2>

                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">

                    {/* LEFT CONTENT */}

                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start">

                        <div className="w-full max-w-[700px] rounded-[28px] border border-[#6C04D7] bg-[#12091F] p-7 sm:p-9 lg:p-10">

                            <h3
                                className="mb-5 text-3xl sm:text-[38px] leading-tight bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
                                style={{
                                    fontFamily: "var(--font-jersey-20)",
                                    fontWeight: 400,
                                }}
                            >
                                The Ultimate Gaming Destination in Feni
                            </h3>

                            <p className="text-[15px] leading-8 text-white/70 sm:text-base lg:text-lg lg:leading-9">
                                Experience high-performance gaming, thrilling tournaments,
                                and delicious food in a vibrant space designed for gamers,
                                friends, and unforgettable moments.

                                <br />
                                <br />

                                Whether you're here to compete, relax, or recharge,
                                we've got everything you need under one roof.
                            </p>

                        </div>

                    </div>

                    {/* ================= RIGHT COLLAGE ================= */}

                    <div className="order-1 lg:order-2">

                        <div
                            className="
                relative
                mx-auto

                h-[430px]

                sm:h-[500px]

                md:h-[620px]

                lg:h-[520px]

                xl:h-[620px]

                w-full

                max-w-[650px]
              "
                        >
                            {/* Top Banner */}
                            <div
                                className="
                  absolute
                  top-0
                  right-0

                  w-[92%]
                  sm:w-[88%]
                  lg:w-[90%]
                  xl:w-[520px]

                  h-[95px]
                  sm:h-[115px]
                  md:h-[140px]

                  overflow-hidden
                  rounded-[18px]
                  md:rounded-[22px]
                "
                            >
                                <Image
                                    src="/banner-2.png"
                                    alt="Banner"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>

                            {/* Main Image */}
                            <div
                                className="
                  absolute
                  right-0

                  top-[110px]
                  sm:top-[130px]
                  md:top-[160px]

                  w-[92%]
                  sm:w-[88%]
                  lg:w-[90%]
                  xl:w-[520px]

                  h-[210px]
                  sm:h-[260px]
                  md:h-[330px]

                  overflow-hidden
                  rounded-[18px]
                  md:rounded-[22px]
                "
                            >
                                <Image
                                    src="/Subtract.png"
                                    alt="Gaming Area"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Small Image */}
                            <div
                                className="
                  absolute
                  z-20

                  left-2
                  sm:left-8
                  md:left-16
                  lg:left-8
                  xl:left-20

                  top-[210px]
                  sm:top-[250px]
                  md:top-[310px]
                  lg:top-[260px]
                  xl:top-[315px]

                  h-[130px]
                  w-[130px]

                  sm:h-[170px]
                  sm:w-[170px]

                  md:h-[210px]
                  md:w-[210px]

                  overflow-hidden
                  rounded-[18px]
                  md:rounded-[22px]

                  border
                  border-white/10

                  shadow-[0_20px_40px_rgba(0,0,0,.45)]
                "
                            >
                                <Image
                                    src="/Rectangle 90.png"
                                    alt="Cafe"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Badge */}
                            <div
                                className="
                  absolute
                  z-30

                  right-0
                                
                  bottom-0
                  sm:bottom-2
                  md:bottom-8
                  xl:bottom-12

                  w-[220px]
                  sm:w-[270px]
                  md:w-[320px]
                  lg:w-[340px]
                  xl:w-[360px]
                "
                            >
                                <Image
                                    src="/Frame 2147242956.png"
                                    alt="Best in the town"
                                    width={360}
                                    height={82}
                                    className="h-auto w-full"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}