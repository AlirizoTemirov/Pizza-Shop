import { create } from "zustand";

type CategoryForm = {
  name: string;
};

const initialState: CategoryForm = {
  name: "",
};

interface CategoryStore {
  modalOpen: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setVisable: (visable: boolean) => void;
  categoryForm: CategoryForm;
  changeForm: <K extends keyof CategoryForm>(
    key: K,
    value: CategoryForm[K]
  ) => void;
  resetForm: () => void;
}

export const useCategoryStore = create<CategoryStore>()((set) => ({
  modalOpen: false,
  setVisable: (visable) => set(() => ({ modalOpen: visable })),
  editingId: null,

  setEditingId: (id) => set({ editingId: id }),

  categoryForm: initialState,
  changeForm: (key, value) =>
    set((state) => ({
      categoryForm: {
        ...state.categoryForm,
        [key]: value,
      },
    })),

  resetForm: () => set({ categoryForm: initialState }),
}));
