import { create } from "zustand";

// For updating product in product view
export const useProductStore = create((set) => ({
  id: "W1",
  selectedSidebarItem: 1,
  selectedSidebarItemName: "Color",
  updateProduct: (updatedId) =>
    set(() => ({
      id: updatedId,
    })),
  updateSelectedSidebarItem: (updatedId) =>
    set(() => ({
      selectedSidebarItem: updatedId,
      selectedSidebarItemName:
        updatedId === 1
          ? "Color"
          : updatedId === 2
          ? "Number"
          : updatedId === 3
          ? "Name"
          : updatedId === 4
          ? "Text"
          : updatedId === 5
          ? "Logo"
          : updatedId === 6
          ? "Gradient"
          : "",
    })),
}));
