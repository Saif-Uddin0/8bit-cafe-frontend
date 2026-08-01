"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import "swiper/css";

import GameServiceCard from "@/components/home/game-services/GameServiceCard";
import BookingModal, { type BookingFormData } from "@/components/home/game-services/BookingModal";
import BookingSummaryModal from "@/components/home/game-services/BookingSummaryModal";
import { useGames } from "@/hooks/useGames";

const ARROW_BTN =
  "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full " +
  "border border-[#6C04D7]/50 bg-[#12091F]/90 " +
  "text-[#CD4ECD] hover:text-white hover:border-[#CD4ECD] hover:bg-[#6C04D7]/25 " +
  "transition-all duration-300 shadow-[0_0_20px_rgba(108,4,215,0.2)] " +
  "active:scale-90 flex-shrink-0";

function GameCardSkeleton() {
  return (
    <div className="relative w-full rounded-[24px] overflow-hidden border border-white/5 bg-[#12091F]/40 animate-pulse h-[400px]">
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute inset-x-0 bottom-0 p-5 space-y-3">
        <div className="h-3 w-16 bg-white/10 rounded-full" />
        <div className="h-5 w-40 bg-white/10 rounded-full" />
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-28 bg-white/5 rounded-full" />
          <div className="h-4 w-20 bg-white/10 rounded-full" />
        </div>
        <div className="h-10 w-full bg-white/10 rounded-xl" />
      </div>
    </div>
  );
}

export default function GameServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [selectedSvcId, setSelectedSvcId] = useState<string>("");

  const { data: gamesList, isLoading } = useGames();

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

  const swiperRef = useRef<SwiperType | null>(null);

  // Wire custom buttons to Swiper navigation after mount
  const onSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swiper.params.navigation.prevEl = ".game-prev-btn";
    // @ts-ignore
    swiper.params.navigation.nextEl = ".game-next-btn";
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const handleOpenBooking = (id: string) => { setSelectedSvcId(id); setBookingOpen(true); };
  const handleBookingConfirm = (data: BookingFormData) => { setBookingData(data); setBookingOpen(false); setSummaryOpen(true); };
  const handlePaid = () => { setSummaryOpen(false); setBookingData(null); };

  const services = gamesList ?? [];
  const total = services.length;
  const loopSlides = total < 8 && total > 0 ? [...services, ...services] : services;

  const isHighlighted = (slideIndex: number) => {
    if (total === 0) return false;
    const norm = (n: number) => ((n % total) + total) % total;
    if (isDesktop) {
      return norm(slideIndex) === norm(activeIndex + 1) ||
        norm(slideIndex) === norm(activeIndex + 2);
    } else if (isTablet) {
      return norm(slideIndex) === norm(activeIndex + 1);
    } else if (isSmall) {
      return norm(slideIndex) === norm(activeIndex) ||
        norm(slideIndex) === norm(activeIndex + 1);
    } else {
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

        {/* ─── DESKTOP HEADER ROW — visible on >= 1024px ─── */}
        <div className="hidden lg:flex items-center justify-between gap-4 mb-10 sm:mb-14 py-3">
          {/* Prev arrow (left side) */}
          <div className="flex items-center justify-start flex-1">
            <button aria-label="Previous slide" className={`game-prev-btn ${ARROW_BTN}`}>
              <ArrowBigLeft size={18} />
            </button>
          </div>

          {/* Title block (centered) */}
          <div className="text-center shrink-0">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent tracking-wide"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              Our Game Services
            </h2>
          </div>

          {/* Next arrow & View All button (right side) */}
          <div className="flex items-center justify-end gap-3 flex-1">
            <button aria-label="Next slide" className={`game-next-btn ${ARROW_BTN}`}>
              <ArrowBigRight size={20} />
            </button>
            <Link
              href="/game"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#1A0A38]/60 px-3 py-2 sm:px-4 text-white/85 hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200 text-xs sm:text-sm font-semibold shrink-0"
            >
              <span className="hidden sm:inline">View All Games</span>
              <span className="sm:hidden">View All</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* ─── MOBILE/TABLET HEADER ROW — visible on < 1024px ─── */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6 sm:mb-8 py-3">
          <h2
            className="text-2xl sm:text-3xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent tracking-wide"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            Our Game Services
          </h2>
          <Link
            href="/game"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#1A0A38]/60 px-3 py-2 sm:px-4 text-white/85 hover:border-[#CD4ECD]/60 hover:text-white transition-all duration-200 text-xs sm:text-sm font-semibold shrink-0"
          >
            <span className="sm:hidden">View All</span>
            <span className="hidden sm:inline">View All Games</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        {/* ─── CAROUSEL wrapper with absolute edge arrows for Mobile/Tablet ─── */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 pb-10">
          
          {/* Mobile/Tablet edge arrows — hidden on Desktop lg */}
          <button
            aria-label="Previous slide"
            className={`game-prev-btn lg:hidden absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 ${ARROW_BTN}`}
          >
            <ArrowBigLeft size={18} />
          </button>
          
          <button
            aria-label="Next slide"
            className={`game-next-btn lg:hidden absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 ${ARROW_BTN}`}
          >
            <ArrowBigRight size={20} />
          </button>

          <div className="overflow-hidden">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <GameCardSkeleton key={i} />
                ))}
              </div>
            ) : total === 0 ? (
              <div className="text-center py-16 text-white/40 text-sm">
                No game services available.
              </div>
            ) : (
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
                  prevEl: ".game-prev-btn",
                  nextEl: ".game-next-btn",
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
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {bookingOpen && (
        <BookingModal
          isOpen={bookingOpen}
          initialServiceId={selectedSvcId}
          onClose={() => setBookingOpen(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
      <BookingSummaryModal
        isOpen={summaryOpen}
        data={bookingData}
        onClose={() => setSummaryOpen(false)}
        onPaid={handlePaid}
      />
    </section>
  );
}
