import { create } from "zustand";

// Save data as cookies in browser
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
const { id, name, designCount } = cookies.get("productDetails") || {
  id: "W1",
  name: "Long Sleeve Hitting Tees with Hood",
  designCount: 0,
};

// For updating product in product view
export const useProductStore = create((set) => ({
  id: id,
  name: name,
  selectedSidebarItem: 0.9,
  selectedSidebarItemName: "Design",
  ref: null,

  designCount: designCount,
  designType: 0,
  color: {},
  gradientColor1: {},
  gradientColor2: {},
  colorIndex: null,
  gradient: {},
  gradientScale: {},
  gradientAngle: {},

  pattern: null,
  layer: null,
  patternScale: {},
  patternAngle: {},

  number: "",
  numberPosition: 0,
  numberFont: 1,
  numberColor: "",
  numberOutline: "",

  modelName: "",
  namePosition: 1,
  nameFont: 1,
  nameColor: "",
  nameOutline: "",

  logo: null,
  logoPosition: 1,
  logoScale: 0.5,
  logoRotate: 0,
  isDesign: false,
  modelLoading: true,
  isGradient: false,
  setModelLoading: (loading) => set({ modelLoading: loading }),
  updateProduct: (updatedId, updatedName, updatedDesignCount) =>
    set(() => ({
      id: updatedId,
      name: updatedName,
      designCount: updatedDesignCount,
    })),
  updateSelectedSidebarItem: (updatedId) =>
    set(() => ({
      selectedSidebarItem: updatedId,
      selectedSidebarItemName:
        updatedId === 0.9
          ? "Design"
          : updatedId === 1
          ? "Color"
          : updatedId === 1.1
          ? "Pattern"
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

  updateDesignType: (type) =>
    set(() => ({
      designType: type,
    })),

  updateColor: (updatedColor) =>
    set((state) => ({
      color: { ...state.color, ...updatedColor },
    })),
  updateGradientColor1: (updateGradientColor1) =>
    set((state) => ({
      gradientColor1: { ...state.gradientColor1, ...updateGradientColor1 },
    })),
  updateGradientColor2: (updateGradientColor2) =>
    set((state) => ({
      gradientColor2: { ...state.gradientColor2, ...updateGradientColor2 },
    })),
  updateColorIndex: (newIndex) =>
    set(() => ({
      colorIndex: newIndex,
    })),
  updateGradient: (updatedGradient) =>
    set((state) => ({
      gradient: { ...state.gradient, ...updatedGradient },
    })),
  updateGradientScale: (updatedScale) =>
    set((state) => ({
      gradientScale: { ...state.gradientScale, ...updatedScale },
    })),
  updateGradientAngle: (updatedAngle) =>
    set(() => ({
      gradientAngle: updatedAngle,
    })),

  updatePattern: (updatedPattern) =>
    set(() => ({
      pattern: updatedPattern,
    })),
  updateLayer: (updatedLayer) =>
    set(() => ({
      layer: updatedLayer,
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

  updateLogo: (imageFile) =>
    set(() => ({
      logo: imageFile ? URL.createObjectURL(imageFile) : null,
    })),
  updateLogoPosition: (position) =>
    set(() => ({
      logoPosition: position,
    })),
  updateLogoScale: (updatedScale) =>
    set(() => ({
      logoScale: updatedScale,
    })),
  updateLogoAngle: (updatedAngle) =>
    set(() => ({
      logoAngle: updatedAngle,
    })),
  updateIsDesign: (updatedIsDesign) => {
    set(() => ({
      isDesign: updatedIsDesign,
    }));
  },
  updateIsGradient: (updatedIsGradient) => {
    set(() => ({
      isGradient: updatedIsGradient,
    }));
  },
}));
