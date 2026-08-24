"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Gamepad2, Loader2 } from "lucide-react";
import notify from "@/lib/notify";
import type { BookingFormData } from "@/components/home/game-services/BookingModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

interface BookingSummaryModalProps {
  isOpen: boolean;
  data: BookingFormData | null;
  onClose: () => void;
  onPaid: () => void;
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

/**
 * BookingSummaryModal — shows a full order summary after the booking form is submitted.
 * - Displays personal details, selected session info, price breakdown, and payment method.
 * - Uses react-toastify for confirmation/success notification.
 */
export default function BookingSummaryModal({
  isOpen,
  data,
  onClose,
  onPaid,
}: BookingSummaryModalProps) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !data) return null;

  const { service, duration, firstName, lastName, email, phone, date, timeSlot } = data;

  const basePrice = duration === "30 Minutes"
    ? service.price30Min
    : duration === "60 Minutes"
      ? service.price60Min
      : service.price60Min + service.price30Min; // 90 Min fallback

  const hasDiscount = service.isDiscount === true && typeof service.disCountParcenTage === "number" && (service.disCountParcenTage ?? 0) > 0;
  const discountPct = service.disCountParcenTage ?? 0;
  const subtotal = hasDiscount ? basePrice - (basePrice * discountPct / 100) : basePrice;

  const handleProceedToPayment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const durationMin = duration === "30 Minutes" ? 30 : 60;

      // 1. Create Booking
      const bookingRes = await axiosSecure.post("/api/booking/create-booking", {
        gameId: service.id,
        startTime: data.selectedSlot.startTime,
        durationMin,
      });
      console.log("========== BOOKING RESPONSE ==========");
      console.log(bookingRes.data);
      console.log("======================================");

      const bookingId = bookingRes.data?.data?.id;
      if (!bookingId) {
        throw new Error("Booking creation failed: missing ID in backend response.");
      }
      // 2. Initialize Payment
      const paymentRes = await axiosSecure.post("/api/payment/initialize", {
        bookingId,
        paymentType: "GAME",
      });

      // ===== DEBUG LOGS =====
      console.log("========== PAYMENT RESPONSE ==========");
      console.log("Full Response:", paymentRes);
      console.log("Response Data:", paymentRes.data);
      console.log("Backend Data:", paymentRes.data?.data);
      console.log("======================================");

      // Backend may return RedirectURL (capital) instead of paymentUrl
      const paymentData = paymentRes.data?.data;

      const redirectUrl =
        paymentData?.RedirectURL ||
        paymentData?.redirectUrl ||
        paymentData?.paymentUrl ||
        paymentData?.url ||
        paymentRes.data?.RedirectURL ||
        paymentRes.data?.redirectUrl ||
        paymentRes.data?.paymentUrl ||
        paymentRes.data?.url;

      // If backend returns an error even though success=true
      if (!redirectUrl) {
        console.error("Payment initialize failed:", paymentData);

        throw new Error(
          paymentData?.ErrorMessage ||
          paymentData?.errorMessage ||
          "Payment initialization failed: redirect URL not found."
        );
      }


      // Invalidate slots as we successfully booked
      queryClient.invalidateQueries({
        queryKey: ["availableSlots"],
      });

      // Redirect to payment gateway
      window.location.href = redirectUrl;
    } catch (error: any) {
      console.error("Proceed to payment error:", error);

      // Invalidate slots so they refetch immediately for reselection
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });

      const errMsg = error.response?.data?.message || error.message || "Slot already reserved or reservation conflict occurred.";
      notify.error("Booking Failed", errMsg, 5000);

      // Keep summary open & re-enable button
      setIsSubmitting(false);
    }
  };

  const imageUrl = service.images?.[0]?.url ?? "/banner-2.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#12091F] border border-[#6C04D7] rounded-[24px] shadow-[0_15px_50px_rgba(108,4,215,0.35)] animate-fadeInUp p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-[#CD4ECD]" size={24} />
            <h3
              className="text-2xl text-white uppercase tracking-wider"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              Booking Summary
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* ── Personal Details ── */}
          <div className="bg-[#1A102A]/80 border border-white/5 rounded-xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase text-[#CD4ECD] tracking-wider mb-3 pb-2 border-b border-white/5">
              Personal Details
            </h4>
            <div className="space-y-1.5 text-sm">
              <p className="text-white/60">Name : <span className="text-white font-medium">{firstName} {lastName}</span></p>
              <p className="text-white/60">Email : <span className="text-white font-medium">{email}</span></p>
              <p className="text-white/60">Phone : <span className="text-white font-medium">{phone}</span></p>
            </div>
          </div>

          {/* ── Your Session ── */}
          <div className="bg-[#1A102A]/80 border border-white/5 rounded-xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase text-[#CD4ECD] tracking-wider mb-3 pb-2 border-b border-white/5">
              Your Session
            </h4>

            <div className="flex items-start gap-4 mb-4">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#6C04D7]/40 flex-shrink-0">
                <Image src={imageUrl} alt={service.name} fill className="object-cover" sizes="64px" />
              </div>
              {/* Info */}
              <div className="flex-1 space-y-1 text-xs sm:text-sm">
                <p className="font-bold text-white text-base leading-tight">{service.name}</p>
                <p className="text-white/60">Duration : <span className="text-white font-medium">{duration}</span></p>
                <p className="text-white/60">
                  Price :{" "}
                  {hasDiscount ? (
                    <span className="text-white font-medium">
                      <span className="line-through text-white/40 mr-1.5">{basePrice} Tk</span>
                      <span>{subtotal} Tk</span>
                    </span>
                  ) : (
                    <span className="text-white font-medium">{basePrice} Tk</span>
                  )}
                </p>
                <p className="text-white/60">
                  Date &amp; Time :{" "}
                  <span className="text-[#CD4ECD] font-bold">{formatDate(date)} • {timeSlot}</span>
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-xs sm:text-sm">
              {hasDiscount && (
                <div className="flex justify-between text-white/60">
                  <span>Original Price</span>
                  <span className="line-through">{basePrice.toFixed(2)} Tk</span>
                </div>
              )}
              {hasDiscount && (
                <div className="flex justify-between text-white/60">
                  <span>Discount Price</span>
                  <span className="text-[#EF3D86] font-medium">{subtotal.toFixed(2)} Tk</span>
                </div>
              )}
              {!hasDiscount && (
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} Tk</span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/5 gap-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition font-bold text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleProceedToPayment}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] hover:shadow-[0_0_20px_rgba(108,4,215,0.6)] text-white hover:scale-[1.02] active:scale-95 transition font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 size={13} className="animate-spin" />}
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}
