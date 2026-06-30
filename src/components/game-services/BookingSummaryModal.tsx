"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Gamepad2, Check } from "lucide-react";
import { toast } from "react-toastify";
import { SERVICE_FEE } from "@/components/game-services/gameServicesData";
import type { BookingFormData } from "@/components/game-services/BookingModal";

interface BookingSummaryModalProps {
  isOpen: boolean;
  data: BookingFormData | null;
  onClose: () => void;
  onPaid: () => void;
}

const PAYMENT_METHODS = [
  { id: "Bkash",          label: "Bkash",           emoji: "📱" },
  { id: "Nogod",          label: "Nagad",            emoji: "⚡" },
  { id: "CashOnDelivery", label: "Cash On delivery", emoji: "💵" },
];

function formatDate(date: Date): string {
  const dd   = String(date.getDate()).padStart(2, "0");
  const mm   = String(date.getMonth() + 1).padStart(2, "0");
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
  const [paymentMethod, setPaymentMethod] = useState("Bkash");

  if (!isOpen || !data) return null;

  const { service, duration, firstName, lastName, email, phone, date, timeSlot } = data;
  const subtotal  = service.price;
  const total     = subtotal + SERVICE_FEE;

  const handlePay = () => {
    onPaid();
    toast.success(`🎮 Booking Confirmed! See you at 8bit Café on ${formatDate(date)}.`, {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
    });
  };

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
                <Image src={service.image} alt={service.name} fill className="object-cover" sizes="64px" />
              </div>
              {/* Info */}
              <div className="flex-1 space-y-1 text-xs sm:text-sm">
                <p className="font-bold text-white text-base leading-tight">{service.name}</p>
                <p className="text-white/60">Duration : <span className="text-white font-medium">{duration}</span></p>
                <p className="text-white/60">Price : <span className="text-white font-medium">{service.price} Tk</span></p>
                <p className="text-white/60">
                  Date &amp; Time :{" "}
                  <span className="text-[#CD4ECD] font-bold">{formatDate(date)} • {timeSlot}</span>
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Service Fee</span>
                <span>{SERVICE_FEE.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-white/5 text-[#CD4ECD]">
                <span>Total</span>
                <span>{total.toFixed(2)} Tk</span>
              </div>
            </div>
          </div>

          {/* ── Payment Method ── */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-white/60 tracking-wider">Payment Method</h4>
            {PAYMENT_METHODS.map((method) => {
              const selected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`
                    w-full flex items-center gap-3 bg-[#1A102A] border rounded-xl p-3 px-4 transition-all
                    ${selected ? "border-[#CD4ECD] bg-[#6C04D7]/10" : "border-white/5 hover:border-[#6C04D7]/50"}
                  `}
                >
                  {/* Checkbox indicator */}
                  <div
                    className={`
                      w-5 h-5 rounded-md flex items-center justify-center border flex-shrink-0 transition-all
                      ${selected ? "border-transparent bg-[#CD4ECD] text-[#0A061A]" : "border-white/20"}
                    `}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="text-base">{method.emoji}</span>
                  <span className="text-sm font-bold text-white">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/5 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition font-bold text-xs uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePay}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] hover:shadow-[0_0_20px_rgba(108,4,215,0.6)] text-white hover:scale-[1.02] active:scale-95 transition font-bold text-xs uppercase tracking-wider"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
