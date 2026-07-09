"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { id: number; name: string; price: number; image: string; category: string } }
  | { type: "DECREASE_QTY"; payload: number }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "TOGGLE_CART"; payload?: boolean }
  | { type: "CLEAR_CART" }
  | { type: "REHYDRATE"; payload: CartItem[] };

const CART_STORAGE_KEY = "8bit_cafe_cart";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newItems };
    }

    case "DECREASE_QTY": {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload);
      if (existingIndex === -1) return state;

      let newItems;
      const targetItem = state.items[existingIndex];
      if (targetItem.quantity <= 1) {
        newItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        newItems = state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return { ...state, items: newItems };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "TOGGLE_CART": {
      const nextOpen = action.payload !== undefined ? action.payload : !state.isOpen;
      return { ...state, isOpen: nextOpen };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    // Runs once after mount to restore persisted cart from localStorage
    case "REHYDRATE": {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (item: { id: number; name: string; price: number; image: string; category: string }) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleCart: (isOpen?: boolean) => void;
  clearCart: () => void;
  subtotal: number;
  totalQuantity: number;
  deliveryCharge: number;
  serviceFee: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Always start with empty state so server HTML and first client render match.
  // localStorage is read AFTER hydration in the effect below.
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Rehydrate from localStorage after the first client-side render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "REHYDRATE", payload: parsed });
        }
      }
    } catch {
      // corrupted storage — ignore
    }
  }, []);

  // Sync to localStorage on every cart change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item: { id: number; name: string; price: number; image: string; category: string }) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const decreaseQty = (id: number) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const toggleCart = (isOpen?: boolean) => {
    dispatch({ type: "TOGGLE_CART", payload: isOpen });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const subtotal = state.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const totalQuantity = state.items.reduce((qty: number, item: CartItem) => qty + item.quantity, 0);
  const deliveryCharge = totalQuantity > 0 ? 30 : 0; // Flat 30 Tk standard delivery
  const serviceFee = totalQuantity > 0 ? Math.round(subtotal * 0.0557 * 100) / 100 : 0; // 5.57% matching figma total
  const totalPrice = subtotal + deliveryCharge + serviceFee;

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        decreaseQty,
        removeFromCart,
        toggleCart,
        clearCart,
        subtotal,
        totalQuantity,
        deliveryCharge,
        serviceFee,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
