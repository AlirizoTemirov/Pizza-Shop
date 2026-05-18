import { create } from "zustand";

type ProductForm = {
  title: string;
  imageUrl: string;
  price: string;
  category: string;
  types: [0];
  sizes: [26, 30, 40];
  rating: "2";
};

const initialState: ProductForm = {
  title: "",
  imageUrl: "",
  price: "",
  category: "",
  types: [0],
  sizes: [26, 30, 40],
  rating: "2",
};

interface ProductStore {
  modalOpen: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setVisable: (visable: boolean) => void;
  productForm: ProductForm;
  changeForm: <K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) => void;
  resetForm: () => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  modalOpen: false,
  setVisable: (visable) => set(() => ({ modalOpen: visable })),
  editingId: null,

  setEditingId: (id) => set({ editingId: id }),

  productForm: initialState,
  changeForm: (key, value) =>
    set((state) => ({
      productForm: {
        ...state.productForm,
        [key]: value,
      },
    })),

  resetForm: () => set({ productForm: initialState }),
}));
