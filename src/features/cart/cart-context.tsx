"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { storage } from "@/lib/storage";
import { cartReducer, type CartAction } from "./cart-reducer";
import type { CartLine } from "./types";

const STORAGE_KEY = "cart";
const EMPTY: CartLine[] = [];

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, EMPTY);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", lines: storage.get<CartLine[]>(STORAGE_KEY, EMPTY) });
  }, []);

  useEffect(() => {
    if (lines === EMPTY) return;
    storage.set(STORAGE_KEY, lines);
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      dispatch,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      count: lines.reduce((total, line) => total + line.qty, 0),
      subtotal: lines.reduce((total, line) => total + line.qty * line.unitPrice, 0),
    }),
    [lines, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
