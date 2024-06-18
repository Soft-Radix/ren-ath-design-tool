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
  orbitalRef: null,
  modelRotation: 0,
  designColor: null,
  designGradient1: null,
  designGradient2: null,
  isDesignGradientEnabled: false,
  patternColor: {},

  designCount: designCount,
  designType: 0,
  color: {},
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
  numberGradientColor: "",
  isNumberGradientColor: false,
  modelName: "",
  namePosition: 1,
  nameFont: 1,
  nameColor: "",
  nameOutline: "",
  nameGradientColor: "",
  isNameGradientColor: false,

  logo: {},
  logoPosition: {},
  logoPositionIndex: null,
  logoScale: { 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.5 },
  logoAngle: { 1: 0, 2: 0, 3: 0, 4: 0 },
  logos: [],
  logoRotate: 0,
  isDesign: false,
  modelLoading: true,
  isGradient: null,
  setLogos: (logos) =>
    set((state) => ({
      logos,
    })),
  handleDesignGradient1: (color) =>
    set(() => ({
      designGradient1: color,
    })),
  handleDesignGradient2: (color) =>
    set(() => ({
      designGradient2: color,
    })),
  handleIsDesignGradientEnabled: (color) =>
    set(() => ({
      isDesignGradientEnabled: color,
    })),
  handleDesignColor: (color) =>
    set(() => ({
      designColor: color,
    })),
  handlePatternColor: (color) =>
    set((state) => ({
      patternColor: { ...state.patternColor, ...color },
    })),
  handleModelRotation: (rotation) =>
    set(() => ({
      modelRotation: rotation,
    })),
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
  updateOrbitalRef: (updatedOrbitalRef) =>
    set(() => ({
      orbitalRef: updatedOrbitalRef,
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
  updateNumberGradient: (color) =>
    set(() => ({
      numberGradientColor: color,
    })),
  updateIsNumberGradient: (isValue) =>
    set(() => ({
      isNumberGradientColor: isValue,
    })),

  updateNameGradient: (color) =>
    set(() => ({
      nameGradientColor: color,
    })),
  updateIsNameGradient: (isValue) =>
    set(() => ({
      isNameGradientColor: isValue,
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
    set((state) => ({
      logo: {
        ...state.logo,
        ...imageFile,
      },
    })),
  updateLogoPosition: (position) =>
    set((state) => ({
      logoPosition: { ...state.logoPosition, ...position },
    })),
  updateLogoPositionIndex: (positionIndex) =>
    set(() => ({
      logoPositionIndex: positionIndex,
    })),
  updateLogoScale: (updatedScale) =>
    set((state) => ({
      logoScale: { ...state.logoScale, ...updatedScale },
    })),
  updateLogoAngle: (updatedAngle) =>
    set((state) => ({
      logoAngle: { ...state.logoAngle, ...updatedAngle },
    })),
  updateIsDesign: (updatedIsDesign) => {
    set(() => ({
      isDesign: updatedIsDesign,
    }));
  },
  updateIsGradient: (updatedIsGradient) => {
    set((state) => ({
      isGradient: { ...state.isGradient, ...updatedIsGradient },
    }));
  },
  updatePatternScale: (patternScale) => {
    set((state) => ({
      patternScale: { ...state.patternScale, ...patternScale },
    }));
  },
}));
