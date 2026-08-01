"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import type { ApiGame } from "@/types/api";
import BookingModal, { type BookingFormData } from "@/components/home/game-services/BookingModal";
import BookingSummaryModal from "@/components/home/game-services/BookingSummaryModal";

interface Props {
  game: ApiGame;
}

const PLACEHOLDER_IMAGE = "/banner-2.png";

export default function GameDetails({ game }: Props) {
  const router = useRouter();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const discountPct = game.disCountParcenTage ?? 0;
  const hasDiscount = game.isDiscount === true && discountPct > 0;
  
  const discountPrice30 = hasDiscount ? game.price30Min - (game.price30Min * discountPct / 100) : game.price30Min;
  const discountPrice60 = hasDiscount ? game.price60Min - (game.price60Min * discountPct / 100) : game.price60Min;

  const handleBookingConfirm = (data: BookingFormData) => {
    setBookingData(data);
    setBookingOpen(false);
    setSummaryOpen(true);
  };

  const handlePaid = () => {
    setSummaryOpen(false);
    setBookingData(null);
  };

  const formatTime = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
    } catch (e) {
      return isoStr;
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-5">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="
          mb-6 flex items-center gap-2
          text-white/60 hover:text-white
          text-sm font-medium
          transition-colors duration-200
          group
        "
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#6C04D7]/40 group-hover:border-[#6C04D7]/60 transition-all duration-200">
          <ArrowLeft size={15} />
        </span>
        Back
      </button>
      <div
        className="
          rounded-[28px]
          border border-[#F862C9]/30
          bg-[#1A0A38]
          p-8 lg:p-10
          grid
          lg:grid-cols-[320px_1fr]
          gap-12
        "
      >
        {/* IMAGE SLIDER */}
        <div className="flex justify-center items-start">
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
            {game.images && game.images.length > 0 ? (
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={game.images.length > 1 ? { clickable: true } : false}
                autoplay={game.images.length > 1 ? { delay: 3000, disableOnInteraction: false } : false}
                loop={game.images.length > 1}
                className="w-full h-full"
              >
                {game.images.map((img, idx) => (
                  <SwiperSlide key={idx} className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={img.url}
                      alt={`${game.name} image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={game.name}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* INFO */}
        <div>
          {/* Name */}
          <h2 className="text-white text-3xl font-bold">{game.name}</h2>

          {/* Category tag */}
          <p className="mt-2 text-[#F862C9] text-lg">{game.category?.name ?? "Gaming"}</p>

          {/* Discount badge */}
          {hasDiscount && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#B7E9E9] to-[#66D1E5] text-black text-xs font-bold px-3 py-1.5 rounded-full">
              <span>🔥 {discountPct}% OFF — Special Price!</span>
            </div>
          )}

          {/* Schedules */}
          {game.schedules && game.schedules.length > 0 && (
            <div className="mt-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider text-[#CD4ECD] mb-3">
                Weekly Schedules
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                {game.schedules.map((sch) => (
                  <div key={sch.id} className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white/70">
                    <span className="font-bold text-white block uppercase mb-1">{sch.day}</span>
                    <span>{formatTime(sch.openTime)} - {formatTime(sch.endTime)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="mt-6 max-w-xl leading-7 text-white/70">
            {game.description}
          </p>

          {/* Prices */}
          <div className="mt-8 flex flex-wrap gap-8 border-t border-white/5 pt-6">
            <div>
              <p className="text-white/40 text-xs uppercase font-bold tracking-wider">30 Minutes</p>
              <div className="flex items-end gap-2.5 mt-1">
                <p className="text-3xl font-bold text-[#F862C9]">
                  ৳{discountPrice30.toFixed(0)}
                </p>
                {hasDiscount && (
                  <span className="text-white/40 text-lg line-through pb-0.5">
                    ৳{game.price30Min}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase font-bold tracking-wider">60 Minutes</p>
              <div className="flex items-end gap-2.5 mt-1">
                <p className="text-3xl font-bold text-[#F862C9]">
                  ৳{discountPrice60.toFixed(0)}
                </p>
                {hasDiscount && (
                  <span className="text-white/40 text-lg line-through pb-0.5">
                    ৳{game.price60Min}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Gaming Session Button */}
          <div className="mt-8 flex items-center">
            <button
              onClick={() => setBookingOpen(true)}
              className="
                h-12 px-8 rounded-md
                bg-gradient-to-b from-[#6C04D7] to-[#CD4ECD]
                text-white font-semibold uppercase tracking-wider text-xs
                active:scale-95 transition-all duration-200
              "
            >
              Book Gaming Session
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modals */}
      {bookingOpen && (
        <BookingModal
          isOpen={bookingOpen}
          initialServiceId={game.id}
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
