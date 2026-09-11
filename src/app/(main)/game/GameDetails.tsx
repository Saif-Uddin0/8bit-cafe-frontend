"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gamepad2,
  Sparkles,
  Tag,
} from "lucide-react";

import type { ApiGame } from "@/types/api";
import BookingModal, {
  type BookingFormData,
} from "@/components/home/game-services/BookingModal";
import BookingSummaryModal from "@/components/home/game-services/BookingSummaryModal";
import {
  loadPendingBooking,
  type PendingBookingData,
} from "@/utils/pendingBooking";

interface Props {
  game: ApiGame;
}

const PLACEHOLDER_IMAGE = "/banner-2.png";

export default function GameDetails({ game }: Props) {
  const router = useRouter();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingData, setBookingData] =
    useState<BookingFormData | null>(null);
  const [pendingData, setPendingData] =
    useState<PendingBookingData | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  /* Restore pending booking after login */
  useEffect(() => {
    const pending = loadPendingBooking();

    if (pending?.openModal) {
      setPendingData(pending);
      setBookingOpen(true);
    }
  }, []);

  /* Images */
  const images =
    game.images && game.images.length > 0
      ? game.images
      : [{ url: PLACEHOLDER_IMAGE }];

  const currentImage =
    images[activeImageIndex]?.url || PLACEHOLDER_IMAGE;

  /* Discount */
  const discountPct = game.disCountParcenTage ?? 0;

  const hasDiscount =
    game.isDiscount === true && discountPct > 0;

  const discountPrice30 = hasDiscount
    ? game.price30Min -
      (game.price30Min * discountPct) / 100
    : game.price30Min;

  const discountPrice60 = hasDiscount
    ? game.price60Min -
      (game.price60Min * discountPct) / 100
    : game.price60Min;

  /* Booking handlers */
  const handleBookingConfirm = (data: BookingFormData) => {
    setBookingData(data);
    setBookingOpen(false);
    setSummaryOpen(true);
    setPendingData(null);
  };

  const handlePaid = () => {
    setSummaryOpen(false);
    setBookingData(null);
  };

  /* Gallery handlers */
  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  /* Time formatter */
  const formatTime = (isoStr: string) => {
    try {
      const date = new Date(isoStr);

      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="
          mb-6
          inline-flex
          items-center
          gap-2.5
          text-white/60
          hover:text-white
          text-xs
          font-semibold
          uppercase
          tracking-wider
          transition-colors
          duration-200
          group
        "
      >
        <span
          className="
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            bg-white/5
            border
            border-white/10
            group-hover:bg-[#6C04D7]/40
            group-hover:border-[#6C04D7]/60
            group-hover:text-white
            transition-all
            duration-200
          "
        >
          <ArrowLeft size={15} />
        </span>

        Back to Games
      </button>

      {/* Main Product Container */}
      <div
        className="
          rounded-[28px]
          sm:rounded-[32px]
          border
          border-[#6C04D7]/30
          bg-gradient-to-b
          from-[#1A0A38]
          to-[#12091F]
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          overflow-hidden
        "
      >
        {/* IMAGE GALLERY */}
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <div className="max-w-[620px] mx-auto">
            {/* Main Image */}
            <div
              className="
                relative
                w-full
                aspect-[16/10]
                max-h-[400px]
                rounded-2xl
                sm:rounded-[20px]
                overflow-hidden
                border
                border-white/10
                bg-[#0A0612]
                group
                shadow-[0_15px_40px_rgba(0,0,0,0.45)]
              "
            >
              <Image
                src={currentImage}
                alt={game.name}
                fill
                priority
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.025]
                "
                sizes="(max-width: 768px) 100vw, 620px"
              />

              {/* Dark overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

              {/* Discount Badge */}
              {hasDiscount && (
                <div
                  className="
                    absolute
                    top-4
                    left-4
                    z-10
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-full
                    bg-gradient-to-r
                    from-[#F862C9]
                    to-[#873CE2]
                    text-white
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    shadow-lg
                  "
                >
                  <Sparkles size={13} />
                  {discountPct}% OFF
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div
                  className="
                    absolute
                    right-4
                    bottom-4
                    z-10
                    px-2.5
                    py-1
                    rounded-md
                    bg-black/65
                    backdrop-blur-md
                    border
                    border-white/10
                    text-[11px]
                    font-medium
                    text-white/80
                  "
                >
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Previous */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    z-10
                    w-9
                    h-9
                    rounded-full
                    bg-black/55
                    backdrop-blur-md
                    border
                    border-white/15
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-[#6C04D7]
                    hover:border-[#6C04D7]
                    transition-all
                    duration-200
                  "
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    z-10
                    w-9
                    h-9
                    rounded-full
                    bg-black/55
                    backdrop-blur-md
                    border
                    border-white/15
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-[#6C04D7]
                    hover:border-[#6C04D7]
                    transition-all
                    duration-200
                  "
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={`
                      relative
                      w-16
                      h-16
                      sm:w-[72px]
                      sm:h-[72px]
                      flex-shrink-0
                      rounded-xl
                      overflow-hidden
                      border-2
                      transition-all
                      duration-200
                      ${
                        activeImageIndex === idx
                          ? "border-[#F862C9] shadow-[0_0_14px_rgba(248,98,201,0.4)]"
                          : "border-white/10 opacity-55 hover:opacity-100 hover:border-white/30"
                      }
                    `}
                  >
                    <Image
                      src={img.url}
                      alt={`${game.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div
          className="
            mt-8
            sm:mt-10
            border-t
            border-white/10
            px-5
            py-7
            sm:px-8
            sm:py-9
            lg:px-10
            lg:py-10
          "
        >
          {/* Category */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                bg-[#6C04D7]/20
                border
                border-[#6C04D7]/40
                text-[#F862C9]
                text-xs
                font-medium
                uppercase
              "
            >
              <Gamepad2 size={12} />
              {game.category?.name ?? "Gaming"}
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                bg-emerald-500/10
                border
                border-emerald-500/25
                text-emerald-400
                text-xs
                font-semibold
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Available for Booking
            </span>
          </div>

          {/* Game Name */}
          <h1
            style={{ fontFamily: "var(--font-jersey-20)" }}
            className="
              text-3xl
              sm:text-4xl
              lg:text-[42px]
              leading-tight
              text-white
              font-normal
              tracking-wide
            "
          >
            {game.name}
          </h1>

          {/* Description */}
          {game.description && (
            <div className="mt-5 max-w-3xl">
              <p
                className="
                  text-white/65
                  text-sm
                  sm:text-[15px]
                  leading-7
                  whitespace-pre-line
                "
              >
                {game.description}
              </p>
            </div>
          )}

          {/* Pricing */}
          <div className="mt-8">
            <div
              className="
                flex
                items-center
                gap-2
                mb-3
              "
            >
              <Tag
                size={14}
                className="text-[#CD4ECD]"
              />

              <h2
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-white/45
                "
              >
                Session Pricing
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 30 Minutes */}
              <div
                className="
                  relative
                  rounded-2xl
                  border
                  border-[#6C04D7]/35
                  bg-[#12091F]/75
                  p-4
                  sm:p-5
                  hover:border-[#F862C9]/45
                  transition-colors
                  duration-200
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="
                      text-white/55
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    "
                  >
                    30 Minutes
                  </span>

                  {hasDiscount && (
                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-emerald-400
                        bg-emerald-500/10
                        border
                        border-emerald-500/20
                        px-2
                        py-1
                        rounded-md
                      "
                    >
                      Save{" "}
                      {(game.price30Min - discountPrice30).toFixed(0)} Tk
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span
                    style={{ fontFamily: "var(--font-jersey-20)" }}
                    className="
                      text-3xl
                      sm:text-4xl
                      text-[#F862C9]
                      tracking-wide
                    "
                  >
                    ৳{discountPrice30.toFixed(0)}
                  </span>

                  {hasDiscount && (
                    <span
                      style={{ fontFamily: "var(--font-jersey-20)" }}
                      className="text-lg text-white/35 line-through tracking-wide"
                    >
                      ৳{game.price30Min}
                    </span>
                  )}
                </div>
              </div>

              {/* 60 Minutes */}
              <div
                className="
                  relative
                  rounded-2xl
                  border
                  border-[#6C04D7]/35
                  bg-[#12091F]/75
                  p-4
                  sm:p-5
                  hover:border-[#F862C9]/45
                  transition-colors
                  duration-200
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="
                      text-white/55
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    "
                  >
                    60 Minutes
                  </span>

                  {hasDiscount && (
                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-emerald-400
                        bg-emerald-500/10
                        border
                        border-emerald-500/20
                        px-2
                        py-1
                        rounded-md
                      "
                    >
                      Save{" "}
                      {(game.price60Min - discountPrice60).toFixed(0)} Tk
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span
                    style={{ fontFamily: "var(--font-jersey-20)" }}
                    className="
                      text-3xl
                      sm:text-4xl
                      text-[#F862C9]
                      tracking-wide
                    "
                  >
                    ৳{discountPrice60.toFixed(0)}
                  </span>

                  {hasDiscount && (
                    <span
                      style={{ fontFamily: "var(--font-jersey-20)" }}
                      className="text-lg text-white/35 line-through tracking-wide"
                    >
                      ৳{game.price60Min}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          {game.schedules && game.schedules.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays
                  size={14}
                  className="text-[#CD4ECD]"
                />

                <h2
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-white/45
                  "
                >
                  Weekly Available Hours
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {game.schedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.01]
                      px-3
                      py-4
                    "
                  >
                    <span
                      className="
                        block
                        text-center
                        text-xs
                        font-bold
                        uppercase
                        text-white
                        mb-1
                      "
                    >
                      {sch.day}
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        text-[11px]
                        text-white/50
                      "
                    >
                      <Clock
                        size={10}
                        className="text-[#CD4ECD]"
                      />

                      {formatTime(sch.openTime)} -{" "}
                      {formatTime(sch.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              BOOKING CTA
          ================================================== */}
          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/10
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >
            <div>
              <p className="text-white text-sm font-semibold">
                Ready to play?
              </p>

              <p className="text-white/40 text-xs mt-1">
                Choose your preferred session and reserve your slot.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="
                w-full
                sm:w-auto
                min-w-[220px]
                h-12
                px-7
                rounded-xl
                bg-gradient-to-b
                from-[#6C04D7]
                via-[#9B24D9]
                to-[#CD4ECD]
                text-white
                font-bold
                uppercase
                tracking-wider
                text-xs
                shadow-[0_8px_25px_rgba(108,4,215,0.25)]
                hover:shadow-[0_10px_30px_rgba(205,78,205,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-200
                flex
                items-center
                justify-center
                gap-2.5
              "
            >
              <Gamepad2 size={17} />
              Book Gaming Session
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOOKING MODALS
      ================================================== */}
      {bookingOpen && (
        <BookingModal
          isOpen={bookingOpen}
          initialGame={game}
          initialData={pendingData ?? undefined}
          onClose={() => {
            setBookingOpen(false);
            setPendingData(null);
          }}
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