import { create } from "zustand";

type AdminAuthForm = {
  password: string;
  email: string;
};

const initialState: AdminAuthForm = {
  password: "",
  email: "",
};

type Store = {
  adminAuthForm: AdminAuthForm;
  changeForm: (key: keyof AdminAuthForm, value: string) => void;
  resetForm: () => void;
};

export const useAdminAuthStore = create<Store>()((set) => ({
  adminAuthForm: initialState,

  changeForm: (key, value) =>
    set((state) => ({
      adminAuthForm: {
        ...state.adminAuthForm,
        [key]: value,
      },
    })),

  resetForm: () => set({ adminAuthForm: initialState }),
}));
