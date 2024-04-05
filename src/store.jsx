import { create } from "zustand";

// Save data as cookies in browser
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
const { id, name } = cookies.get("productDetails");

// For updating product in product view
export const useProductStore = create((set) => ({
  id: id || "W1",
  name: name || "Long Sleeve Hitting Tees with Hood",
  selectedSidebarItem: 1,
  selectedSidebarItemName: "Color",
  updateProduct: (updatedId, updatedName) =>
    set(() => ({
      id: updatedId,
      name: updatedName,
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
