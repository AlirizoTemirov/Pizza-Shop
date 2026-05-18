import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number;
  types: string;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  modalOpen: boolean;
  setVisable: (visable: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (product) => product.id === item.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((product) =>
                product.id === item.id &&
                product.types === item.types &&
                product.sizes === item.sizes
                  ? { ...product, count: product.count + 1 }
                  : product
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, count: 1 }],
          };
        }),

      increment: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, count: item.count - 1 } : item
            )
            .filter((item) => item.count > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      modalOpen: false,
      setVisable: (visable) => set(() => ({ modalOpen: visable })),
    }),
    {
      name: "cart-storage",
    }
  )
);
