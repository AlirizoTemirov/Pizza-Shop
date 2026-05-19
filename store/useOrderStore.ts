import { create } from "zustand";

type OrderForm = {
  name: string;
  location: string;
  phonenumber: string;
  orders: string;
  status: "1";
};

const initialState: OrderForm = {
  name: "",
  location: "",
  phonenumber: "",
  orders: "",
  status: "1",
};

interface OrderStore {
  modalOpen: boolean;
  setVisable: (visable: boolean) => void;
  orderForm: OrderForm;
  changeForm: <K extends keyof OrderForm>(key: K, value: OrderForm[K]) => void;
  resetForm: () => void;
}

export const useOrderStore = create<OrderStore>()((set) => ({
  modalOpen: false,
  setVisable: (visable) => set(() => ({ modalOpen: visable })),

  orderForm: initialState,
  changeForm: (key, value) =>
    set((state) => ({
      orderForm: {
        ...state.orderForm,
        [key]: value,
      },
    })),

  resetForm: () => set({ orderForm: initialState }),
}));
