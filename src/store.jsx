import { create } from "zustand";

// For updating product in product view
export const useProductStore = create((set) => ({
  id: "W1",
  selectedSidebarItem: 1,
  updateProduct: (updatedId) =>
    set(() => ({
      id: updatedId,
    })),
  updateSelectedSidebarItem: (updatedId) =>
    set(() => ({
      selectedSidebarItem: updatedId,
    })),
}));
