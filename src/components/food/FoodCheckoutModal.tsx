"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Loader2 } from "lucide-react";
import notify from "@/lib/notify";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import type { ApiCartItem } from "@/types/api";

interface FoodCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ApiCartItem[];
  subtotal: number;
  deliveryCharge: number;
  serviceFee: number;
  totalPrice: number;
}

const PLACEHOLDER_IMAGE = "/order-btn-icon.png";

/**
 * FoodCheckoutModal — shown when the user clicks "Review Payment And Address" in CartDrawer.
 * Displays an order summary then:
 *   1. POST /api/foodOrder/createOrder  → get data.id (foodOrderId)
 *   2. POST /api/payment/initialize     → { foodOrderId, paymentType: "FOOD" }
 *   3. Redirect to returned payment URL (same pattern as BookingSummaryModal for GAME)
 */
export default function FoodCheckoutModal({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  deliveryCharge,
  serviceFee,
  totalPrice,
}: FoodCheckoutModalProps) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // ── Step 1: Create Food Order ─────────────────────────────────────
      const orderPayload = {
        items: cartItems.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
        })),
      };

      const orderRes = await axiosSecure.post(
        "/api/foodOrder/createOrder",
        orderPayload
      );

      const foodOrderId = orderRes.data?.data?.id;
      if (!foodOrderId) {
        throw new Error("Order creation failed: missing id in backend response.");
      }

      // ── Step 2: Initialize Payment ────────────────────────────────────
      // Do NOT send bookingId for food payments — only foodOrderId + paymentType
      const paymentRes = await axiosSecure.post("/api/payment/initialize", {
        foodOrderId,
        paymentType: "FOOD",
      });

      const paymentData = paymentRes.data?.data;

      // Same redirect URL resolution pattern as BookingSummaryModal
      const redirectUrl =
        paymentData?.RedirectURL ||
        paymentData?.redirectUrl ||
        paymentData?.paymentUrl ||
        paymentData?.url ||
        paymentRes.data?.RedirectURL ||
        paymentRes.data?.redirectUrl ||
        paymentRes.data?.paymentUrl ||
        paymentRes.data?.url;

      if (!redirectUrl) {
        throw new Error(
          paymentData?.ErrorMessage ||
            paymentData?.errorMessage ||
            "Payment initialization failed: redirect URL not found."
        );
      }

      // Reset cart query cache to empty array so badge instantly becomes 0
      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data ? [{ ...old.data[0], CartItems: [] }] : [],
        };
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Redirect to the payment gateway
      window.location.href = redirectUrl;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      notify.error("Checkout Failed", errMsg, 5000);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#12091F] border border-[#6C04D7] rounded-[24px] shadow-[0_15px_50px_rgba(108,4,215,0.35)] animate-fadeInUp p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#CD4ECD]" size={24} />
            <h3
              className="text-2xl text-white uppercase tracking-wider"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              Order Summary
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition disabled:opacity-40"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* ── Food Items ── */}
          <div className="bg-[#1A102A]/80 border border-white/5 rounded-xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase text-[#CD4ECD] tracking-wider mb-3 pb-2 border-b border-white/5">
              Your Order
            </h4>
            <div className="space-y-3">
              {cartItems.map((item) => {
                const effectivePrice =
                  item.food.isDisCount && item.food.discountPrice > 0
                    ? item.food.discountPrice
                    : item.food.price;
                const imageUrl = item.food.images?.[0]?.url || PLACEHOLDER_IMAGE;
                const lineTotal = effectivePrice * item.quantity;

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#6C04D7]/30 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={item.food.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {item.food.name}
                      </p>
                      <p className="text-white/50 text-xs">
                        {item.quantity} × {effectivePrice} Tk
                      </p>
                    </div>
                    {/* Line total */}
                    <p className="text-[#CD4ECD] font-bold text-sm flex-shrink-0">
                      {lineTotal.toFixed(2)} Tk
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Price Breakdown ── */}
          <div className="bg-[#1A102A]/80 border border-white/5 rounded-xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase text-[#CD4ECD] tracking-wider mb-3 pb-2 border-b border-white/5">
              Price Breakdown
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span className="text-white font-medium">{subtotal.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Standard Delivery</span>
                <span className="text-white font-medium">{deliveryCharge.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Service Fee</span>
                <span className="text-white font-medium">{serviceFee.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="font-bold text-white text-base">Grand Total</span>
                <span className="font-bold text-[#CD4ECD] text-base">
                  {totalPrice.toFixed(2)} Tk
                </span>
              </div>
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
            onClick={handlePayNow}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] hover:shadow-[0_0_20px_rgba(108,4,215,0.6)] text-white hover:scale-[1.02] active:scale-95 transition font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 size={13} className="animate-spin" />}
            {isSubmitting ? "Processing…" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
