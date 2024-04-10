import { create } from "zustand";

// Save data as cookies in browser
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
const { id, name } = cookies.get("productDetails") || {
  id: "W1",
  name: "Long Sleeve Hitting Tees with Hood",
};

// For updating product in product view
export const useProductStore = create((set) => ({
  id: id,
  name: name,
  selectedSidebarItem: 1,
  selectedSidebarItemName: "Color",
  ref: null,
  color: {},

  number: "",
  numberPosition: 0,
  numberFont: 1,
  numberColor: "",
  numberOutline: "",

  modelName: "",
  namePosition: 0,
  nameFont: 1,
  nameColor: "",
  nameOutline: "",

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
  updateRef: (updatedRef) =>
    set(() => ({
      ref: updatedRef,
    })),
  updateColor: (updatedColor) =>
    set((state) => ({
      color: { ...state.color, ...updatedColor },
    })),

  updateNumber: (updatedNumber) =>
    set(() => ({
      number: updatedNumber,
    })),
  updateNumberPosition: (updatedPosition) =>
    set(() => ({
      numberPosition: updatedPosition,
    })),
  updateNumberFont: (updatedFont) =>
    set(() => ({
      numberFont: updatedFont,
    })),
  updateNumberColor: (color) =>
    set(() => ({
      numberColor: color,
    })),
  updateNumberOutline: (color) =>
    set(() => ({
      numberOutline: color,
    })),

  updateName: (updatedName) =>
    set(() => ({
      modelName: updatedName,
    })),
  updateNamePosition: (updatedPosition) =>
    set(() => ({
      namePosition: updatedPosition,
    })),
  updateNameFont: (updatedFont) =>
    set(() => ({
      nameFont: updatedFont,
    })),
  updateNameColor: (color) =>
    set(() => ({
      nameColor: color,
    })),
  updateNameOutline: (color) =>
    set(() => ({
      nameOutline: color,
    })),
}));
