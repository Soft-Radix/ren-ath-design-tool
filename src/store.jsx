import { create } from "zustand";

export const useProductStore = create((set) => ({
  id: "W1",
  updateProduct: (updatedId) =>
    set(() => ({
      id: updatedId,
    })),
}));
