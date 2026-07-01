"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function CartDrawer() {
  const {
    state: { items, isOpen },
    toggleCart,
    addToCart,
    decreaseQty,
    removeFromCart,
    subtotal,
    deliveryCharge,
    serviceFee,
    totalPrice,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleCart(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // disable background scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, toggleCart]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.info("Your cart is empty! Add some delicious food first.", { theme: "dark" });
      return;
    }
    toast.success("🎮 Proceeding to Address & Payment Review!", {
      theme: "dark",
      position: "top-center",
    });
  };

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <div
        onClick={() => toggleCart(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Cart Panel — bottom sheet on mobile, popup on desktop */}
      <div
        ref={drawerRef}
        className="
          absolute
          /* ── Mobile: full-width bottom sheet ── */
          bottom-0 left-0 right-0
          rounded-t-[28px]
          max-h-[90dvh]
          /* ── sm+: floating popup near cart icon ── */
          sm:bottom-auto sm:top-[88px]
          sm:left-auto sm:right-4
          sm:w-[390px]
          sm:max-h-none
          sm:rounded-[22px]
          /* ── shared ── */
          bg-white
          border border-gray-200
          shadow-[0_35px_80px_rgba(0,0,0,.28)]
          overflow-hidden
          origin-bottom sm:origin-top-right
          animate-cartPopup
        "
      >

        {/* Header */}
 
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <h2 className="text-3xl font-bold text-black">
            Cart
          </h2>

          <button
            onClick={() => toggleCart(false)}
            className="text-gray-500 hover:text-black transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[45dvh] sm:max-h-[430px] overflow-y-auto px-6">

          {items.length === 0 ? (
            <div className="py-16 flex flex-col items-center">

              <ShoppingBag
                size={55}
                className="text-gray-400"
              />

              <p className="mt-5 text-gray-500">
                Your cart is empty
              </p>

            </div>
          ) : (

            items.map((item) => (

              <div
                key={item.id}
                className="border-b border-gray-200 py-5"
              >

                <div className="flex items-start justify-between gap-3">

                  {/* LEFT */}

                  <div className="flex gap-3">

                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#2E2545]">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold text-black text-[18px]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[14px] text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 font-semibold text-black">
                        Price : {item.price} Tk
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => addToCart(item)}
                      className="text-[#C300FF] hover:scale-110 transition"
                    >
                      <Plus size={18} />
                    </button>

                    <span className="font-bold text-black text-lg w-4 text-center">
                      {item.quantity}
                    </span>

                    {item.quantity > 1 ? (

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-[#C300FF] hover:scale-110 transition"
                      >
                        <Minus size={18} />
                      </button>

                    ) : (

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))

          )}


        </div>
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5">

            <div className="space-y-3 text-[15px]">

              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Subtotal
                </span>

                <span className="font-semibold text-black">
                  {subtotal.toFixed(2)} Tk
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Standard Delivery
                </span>

                <span className="font-semibold text-black">
                  {deliveryCharge.toFixed(2)} Tk
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Service Fee
                </span>

                <span className="font-semibold text-black">
                  {serviceFee.toFixed(2)} Tk
                </span>
              </div>

            </div>

            <div className="my-4 h-px bg-gray-300" />

            <div className="flex items-center justify-between">

              <span className="text-[22px] font-bold text-black">
                Total
              </span>

              <span className="text-[22px] font-bold text-black">
                {totalPrice.toFixed(2)} Tk
              </span>

            </div>

            <button
              onClick={handleCheckout}
              className="
              mt-6
              h-[52px]
              w-full
              rounded-xl
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-95
            "
              style={{
                background:
                  "linear-gradient(90deg,#7A00FF 0%,#D94CF7 100%)",
              }}
            >
              Review Payment And Address
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
