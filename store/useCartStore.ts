import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number;
  types: string;
  quantity: number;
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
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        }),

      increment: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
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
