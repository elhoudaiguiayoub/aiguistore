import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "../types/product";

type CartSelection = {
  size: string;
  color: string;
  image: string;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Product, selection: CartSelection) => void;
  removeFromCart: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selection: CartSelection) => {
    setCart((prev) => {
      const cartId = `${product.id}-${selection.color}-${selection.size}`;
      const found = prev.find((p) => p.cartId === cartId);

      if (found) {
        return prev.map((p) =>
          p.cartId === cartId ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [
        ...prev,
        {
          ...product,
          ...selection,
          cartId,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((p) => p.cartId !== cartId));
  };

  const updateQty = (cartId: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.cartId === cartId ? { ...p, qty: Math.max(1, qty) } : p
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + p.price * p.qty, 0),
    [cart]
  );

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};