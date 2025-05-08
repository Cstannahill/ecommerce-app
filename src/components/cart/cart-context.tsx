"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  name: string;
  price: number; // cents
  currency: string;
  quantity: number;
  image?: string | null;
};

type CartContext = {
  items: CartItem[];
  addItem: (i: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartCtx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* hydrate cart from cookie on first mount */
  useEffect(() => {
    const raw = Cookies.get("cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  /* write to cookie whenever items change */
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(items), { expires: 7, sameSite: "lax" });
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx === -1) return [...prev, item];
      const updated = [...prev];
      updated[idx].quantity += item.quantity;
      return updated;
    });
  };

  const removeItem = (id: string) =>
    setItems((p) => p.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be within CartProvider");
  return ctx;
};
