import { create } from "zustand";
import type { CartItem } from "../types";

const CART_KEY = "comichub_cart";

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  changeQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: loadCart(),

  addToCart: (item) => {
    const { cart } = get();
    const exist = cart.find((c) => c.id === item.id);
    let updated: CartItem[];
    if (exist) {
      updated = cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      updated = [...cart, { ...item, qty: 1 }];
    }
    saveCart(updated);
    set({ cart: updated });
  },

  changeQty: (id, delta) => {
    let updated = get()
      .cart.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
      .filter((c) => c.qty > 0);
    saveCart(updated);
    set({ cart: updated });
  },

  removeItem: (id) => {
    const updated = get().cart.filter((c) => c.id !== id);
    saveCart(updated);
    set({ cart: updated });
  },

  clearCart: () => {
    saveCart([]);
    set({ cart: [] });
  },

  totalItems: () => get().cart.reduce((s, c) => s + c.qty, 0),
  totalPrice: () => get().cart.reduce((s, c) => s + c.price * c.qty, 0),
}));
