"use client";

import { useCartUI } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import notify from "@/lib/notify";
import FoodCheckoutModal from "@/components/food/FoodCheckoutModal";

export default function CartDrawer() {
  const { isOpen, toggleCart } = useCartUI();
  const {
    cartItems,
    subtotal,
    deliveryCharge,
    serviceFee,
    totalPrice,
    updateQuantityAsync,
    removeItemAsync,
  } = useCart();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [inFlightItemIds, setInFlightItemIds] = useState<Set<string>>(new Set());

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleCart(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, toggleCart]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      notify.info("Cart is Empty", "Your cart is empty! Add some delicious food first.");
      return;
    }
    setIsSummaryOpen(true);
  };

  const handleIncreaseQty = async (itemId: string, _currentQty: number) => {
    try {
      await updateQuantityAsync(itemId, "increment");
    } catch {
      notify.error("Cart Update Failed", "Failed to update cart quantity.", 2500);
    }
  };

  const handleDecreaseQty = async (itemId: string, currentQty: number) => {
    try {
      if (currentQty > 1) {
        await updateQuantityAsync(itemId, "decrement");
      }
    } catch {
      notify.error("Cart Update Failed", "Failed to update cart quantity.", 2500);
    }
  };

  const handleRemove = async (itemId: string) => {
    if (inFlightItemIds.has(itemId)) return;
    setInFlightItemIds((prev) => new Set(prev).add(itemId));
    try {
      await removeItemAsync(itemId);
    } catch {
      notify.error("Cart Update Failed", "Failed to remove item from cart.", 2500);
    } finally {
      setInFlightItemIds((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  return (
    <>
      <div
        className={`
          fixed inset-0 z-[999] pointer-events-none transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Backdrop */}
        <div
          onClick={() => toggleCart(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        />

        {/* Alignment container */}
        <div className="fixed top-4 left-0 right-0 z-[1000] flex justify-center px-4 sm:px-6 lg:px-20 pointer-events-none">
          <div className="w-full max-w-[1500px] relative h-0 pointer-events-none">

            {/* Cart Panel — bottom sheet on mobile, popup on desktop */}
            <div
              ref={drawerRef}
              className={`
                ${isOpen ? "pointer-events-auto" : "pointer-events-none"}

                fixed inset-x-0 bottom-0
                h-[88dvh]

                sm:absolute sm:inset-auto
                sm:right-5 sm:top-[90px]
                sm:h-auto sm:w-[400px] sm:max-h-[740px]

                flex flex-col

                rounded-t-[28px] sm:rounded-[24px]

                bg-[#0D0820]
                border border-[#6C04D7]/40
                shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(108,4,215,0.1)]

                transition-all duration-300

                ${isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full sm:-translate-y-5 sm:opacity-0"
                }
              `}
            >
              {/* Mobile drag handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={20} className="text-[#CD4ECD]" />
                  <h2
                    style={{ fontFamily: "var(--font-jersey-20)" }}
                    className="text-[26px] text-white tracking-wide"
                  >
                    Cart
                  </h2>
                </div>

                <button
                  onClick={() => toggleCart(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-[#6C04D7]/40 hover:border-[#6C04D7]/60 transition-all duration-200 cursor-pointer"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5">
                {cartItems.length === 0 ? (
                  <div className="py-20 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-[#6C04D7]/10 border border-[#6C04D7]/20 flex items-center justify-center">
                      <ShoppingBag size={36} className="text-[#6C04D7]/50" strokeWidth={1.5} />
                    </div>
                    <p className="text-white/40 text-sm font-medium">Your cart is empty</p>
                    <button
                      onClick={() => toggleCart(false)}
                      className="text-[#CD4ECD] text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                      Browse Food
                    </button>
                  </div>
                ) : (
                  <div className="py-3 space-y-1">
                    {cartItems.map((item) => {
                      const effectivePrice =
                        item.food.isDisCount && item.food.discountPrice > 0
                          ? item.food.discountPrice
                          : item.food.price;
                      const lineTotal = effectivePrice * item.quantity;
                      const imageUrl = item.food.images?.[0]?.url || "/order-btn-icon.png";

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 py-3.5 border-b border-white/[0.08]"
                        >
                          {/* Food Image */}
                          <div className="relative h-[60px] w-[60px] sm:h-[68px] sm:w-[68px] shrink-0 overflow-hidden rounded-xl border border-white/10">
                            <Image
                              src={imageUrl}
                              alt={item.food.name}
                              fill
                              sizes="68px"
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="truncate text-sm sm:text-base font-semibold text-white leading-tight">
                              {item.food.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-xs text-[#CD4ECD] font-bold">
                                {effectivePrice} Tk
                              </p>
                              {item.food.isDisCount && item.food.discountPrice > 0 && (
                                <p className="text-[10px] text-white/30 line-through">
                                  {item.food.price} Tk
                                </p>
                              )}
                            </div>

                            {/* Qty controls + line total */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleDecreaseQty(item.id, item.quantity)}
                                  className={`w-7 h-7 flex items-center justify-center text-[#CD4ECD] hover:bg-white/10 transition ${
                                    item.quantity > 1
                                      ? "opacity-100"
                                      : "opacity-30 pointer-events-none"
                                  }`}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-7 h-7 flex items-center justify-center font-bold text-white text-sm select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleIncreaseQty(item.id, item.quantity)}
                                  className="w-7 h-7 flex items-center justify-center text-[#CD4ECD] hover:bg-white/10 transition"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/90 font-medium">
                                  {lineTotal.toFixed(0)} Tk
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemove(item.id)}
                                  className="flex items-center justify-center w-10 h-10 rounded-lg text-white/90 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 px-4 sm:px-5 pt-4 pb-6 sm:pb-5 shrink-0 bg-[#0D0820]">
                  {/* Price breakdown */}
                  <div className="space-y-2 text-xs sm:text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Subtotal</span>
                      <span className="text-white/90 font-medium">
                        {subtotal.toFixed(2)} Tk
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Delivery</span>
                      <span className="text-white/90 font-medium">
                        {deliveryCharge.toFixed(2)} Tk
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Service Fee</span>
                      <span className="text-white/90 font-medium">
                        {serviceFee.toFixed(2)} Tk
                      </span>
                    </div>
                  </div>

                  {/* Gradient divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#6C04D7]/50 to-transparent mb-4" />

                  {/* Total */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                      Total
                    </span>
                    <span
                      style={{ fontFamily: "var(--font-jersey-20)" }}
                      className="text-[28px] sm:text-[32px] text-[#F862C9] tracking-wide leading-none"
                    >
                      {totalPrice.toFixed(0)} Tk
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="
                      w-full py-3.5 rounded-md
                      bg-gradient-to-b from-[#6C04D7] via-[#9B24D9] to-[#CD4ECD]
                      text-white font-bold uppercase text-xs sm:text-sm
                      shadow-[0_8px_25px_rgba(108,4,215,0.35)]
                      hover:shadow-[0_10px_30px_rgba(205,78,205,0.4)]
                      hover:-translate-y-0.5 active:translate-y-0
                      transition-all duration-200
                      flex items-center justify-center gap-2.5
                    "
                  >
                    <ShoppingCart size={16} />
                    Review Payment &amp; Address
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Food checkout summary modal */}
      <FoodCheckoutModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        serviceFee={serviceFee}
        totalPrice={totalPrice}
      />
    </>
  );
}
