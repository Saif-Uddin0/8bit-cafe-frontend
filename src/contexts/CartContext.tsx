"use client";

import React, { createContext, useContext, useState } from "react";

interface CartUIContextType {
  isOpen: boolean;
  toggleCart: (isOpen?: boolean) => void;
}

const CartUIContext = createContext<CartUIContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = (nextOpen?: boolean) => {
    setIsOpen((prev) => (nextOpen !== undefined ? nextOpen : !prev));
  };

  return (
    <CartUIContext.Provider value={{ isOpen, toggleCart }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const context = useContext(CartUIContext);
  if (!context) {
    throw new Error("useCartUI must be used within a CartProvider");
  }
  return context;
}
