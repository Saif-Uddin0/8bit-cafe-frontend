"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import "swiper/css";

import GameServiceCard from "@/components/home/game-services/GameServiceCard";
import BookingModal, { type BookingFormData } from "@/components/home/game-services/BookingModal";
import BookingSummaryModal from "@/components/home/game-services/BookingSummaryModal";
import { SERVICES } from "@/components/home/game-services/gameServicesData";

const ARROW_BTN =
  "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full " +
  "border border-[#6C04D7]/50 bg-[#12091F]/90 " +
  "text-[#CD4ECD] hover:text-white hover:border-[#CD4ECD] hover:bg-[#6C04D7]/25 " +
  "transition-all duration-300 shadow-[0_0_20px_rgba(108,4,215,0.2)] " +
  "active:scale-90 flex-shrink-0";

export default function GameServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [selectedSvcId, setSelectedSvcId] = useState(1);

  // Responsive state for styling
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsDesktop(w >= 1024);
      setIsTablet(w >= 768 && w < 1024);
      setIsSmall(w >= 640 && w < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Wire custom buttons to Swiper navigation after mount
  const onSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swiper.params.navigation.prevEl = prevRef.current;
    // @ts-ignore
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const handleOpenBooking = (id: number) => { setSelectedSvcId(id); setBookingOpen(true); };
  const handleBookingConfirm = (data: BookingFormData) => { setBookingData(data); setBookingOpen(false); setSummaryOpen(true); };
  const handlePaid = () => { setSummaryOpen(false); setBookingData(null); };

  const total = SERVICES.length;
  const loopSlides = total < 8 ? [...SERVICES, ...SERVICES] : SERVICES;

  const isHighlighted = (slideIndex: number) => {
    const norm = (n: number) => ((n % total) + total) % total;
    if (isDesktop) {
      // 4 slides visible (index, index+1, index+2, index+3) -> middle two are index+1 and index+2
      return norm(slideIndex) === norm(activeIndex + 1) ||
        norm(slideIndex) === norm(activeIndex + 2);
    } else if (isTablet) {
      // 3 slides visible -> middle is index+1
      return norm(slideIndex) === norm(activeIndex + 1);
    } else if (isSmall) {
      // 2 slides visible -> highlight both
      return norm(slideIndex) === norm(activeIndex) ||
        norm(slideIndex) === norm(activeIndex + 1);
    } else {
      // 1 slide visible -> highlight active slide
      return norm(slideIndex) === norm(activeIndex);
    }
  };

  return (
    <section id="services" className="bg-[#080818] py-15 lg:py-18 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#6C04D7]/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-[#CD4ECD]/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* ─── HEADER ROW — arrows flank the title ─── */}
        <div className="flex items-center justify-between gap-4 mb-10 sm:mb-14 py-3">
          {/* Prev arrow */}
          <button ref={prevRef} aria-label="Previous slide" className={ARROW_BTN}>
            <ArrowBigLeft size={18} />
          </button>

          {/* Title block */}
          <div className="text-center min-w-0 ">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent tracking-wide"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              Our Game Services
            </h2>
          </div>

          {/* Next arrow */}
          <button ref={nextRef} aria-label="Next slide" className={ARROW_BTN}>
            <ArrowBigRight size={20} />
          </button>
        </div>

        {/* ─── CAROUSEL ─── */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 overflow-hidden pb-10">
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={onSwiper}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            loop
            centeredSlides={false}
            grabCursor
            speed={650}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 14 },
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 22 },
              1280: { slidesPerView: 4, spaceBetween: 26 },
            }}
            className="w-full py-8"
          >
            {loopSlides.map((service, index) => (
              <SwiperSlide
                key={`${service.id}-${index}`}
                className="!h-auto !flex !items-center"
              >
                <div className="w-full transition-all duration-500 ease-out">
                  <GameServiceCard
                    service={service}
                    isCenter={isHighlighted(index)}
                    onBook={handleOpenBooking}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingOpen}
        initialServiceId={selectedSvcId}
        onClose={() => setBookingOpen(false)}
        onConfirm={handleBookingConfirm}
      />
      <BookingSummaryModal
        isOpen={summaryOpen}
        data={bookingData}
        onClose={() => setSummaryOpen(false)}
        onPaid={handlePaid}
      />
    </section>
  );
}
