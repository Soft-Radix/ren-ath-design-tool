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

  designColor: {},
  designGradient1: {},
  designGradient2: {},
  designScale: {
    0: 0.08,
    1: 0.08,
    2: 0.08,
    3: 0.08,
    4: 0.08,
    5: 0.08,
    6: 0.09,
    7: 0.09,
  },
  isDesignGradientEnabled: false,
  designCount: designCount,
  designType: 10,

  patternColor: {},
  pattern: null,
  patternScale: {},
  patternAngle: {},
  patternRotationDeegre: {},
  patternLayers: {},
  secondaryTexturesPattern: [],

  color: {},
  colorIndex: null,
  gradient: {},
  gradient2: {},
  gradientScale: {
    0: 0.5,
    1: 0.5,
    2: 0.5,
    3: 0.5,
    4: 0.5,
    5: 0.5,
    6: 0.5,
    7: 0.5,
  },
  gradientAngle: {},
  designGradientAngle: {},

  layer: null,

  number: {},
  numberPosition: 0,
  numberFont: {
    2: "1",
    3: "1",
  },
  numberColor: {},
  numberOutline: {},
  numberScale: {
    2: 0.48,
    3: 0.48,
  },
  numberAngle: {},
  numberGradientColor: {},
  isNumberGradientColor: false,

  namePosition: 1,
  nameFont: {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
  },
  modelName: {},
  nameColor: {},
  nameOutline: {},
  nameScale: {
    0: 4,
    1: 4,
    2: 4,
    3: 4,
  },
  nameRotation: {},
  nameGradientColor: {},
  nameGradientScale: {},
  nameGradientAngle: {},
  isNameGradientColor: false,
  updatedNames: {},

  logo: null,
  logoPosition: 1,
  logoScale: {},
  logoRotate: 0,

  isDesign: false,

  modelLoading: false,
  isGradient: null,
  updatedLogos: {},
  names: [],
  logos: [],
  resetLogoIndex: null,
  namePositions1: [],
  namePositions2: [],
  namePositions3: [],
  namePositions4: [],

  logoDecalPositions1: [],
  logoDecalPositions2: [],
  logoDecalPositions3: [],
  logoDecalPositions4: [],
  myDesignId: null,
  snapShot: "",
  editedDesignId: null,
  editDesignData: {},
  snapShotImg: "",
  callSnapShotFunc: false,
  colorPelleteCollection: [],
  handleUpdateCollorPellteCollection: (colorsCollection) =>
    set(() => ({
      colorPelleteCollection: colorsCollection,
    })),
  handleCallSnapShotFunc: (isYes) =>
    set(() => ({
      callSnapShotFunc: isYes,
    })),
  updateSnapShotImage: (img) =>
    set(() => ({
      snapShotImg: img,
    })),
  updateEditedDesignData: (data) =>
    set(() => ({
      editDesignData: data,
    })),
  updateEditedDesignId: (id) => {
    set(() => ({
      editedDesignId: id,
    }));
  },
  updateSnapShot: (img) =>
    set(() => ({
      snapShot: img,
    })),
  updateMyDesignId: (id) =>
    set(() => ({
      myDesignId: id,
    })),
  setLogoDecalPositions1: (logoDecalPosition) =>
    set((state) => ({
      logoDecalPositions1: [logoDecalPosition],
    })),
  setLogoDecalPositions2: (logoDecalPosition) =>
    set((state) => ({
      logoDecalPositions2: [logoDecalPosition],
    })),
  setLogoDecalPositions3: (logoDecalPosition) =>
    set((state) => ({
      logoDecalPositions3: [logoDecalPosition],
    })),
  setLogoDecalPositions4: (logoDecalPosition) =>
    set((state) => ({
      logoDecalPositions4: [logoDecalPosition],
    })),

  setNamePositions1: (nameDecalPosition) =>
    set((state) => ({
      namePositions1: [nameDecalPosition],
    })),
  setNamePositions2: (nameDecalPosition) =>
    set((state) => ({
      namePositions2: [nameDecalPosition],
    })),
  setNamePositions3: (nameDecalPosition) =>
    set((state) => ({
      namePositions3: [nameDecalPosition],
    })),
  setNamePositions4: (nameDecalPosition) =>
    set((state) => ({
      namePositions4: [nameDecalPosition],
    })),

  updatePatternLayers: (layers) =>
    set((state) => ({
      patternLayers: { ...state.patternLayers, ...layers },
    })),
  updateSecondaryTextures: (textures) =>
    set((state) => ({
      secondaryTexturesPattern: [
        ...state.secondaryTexturesPattern,
        ...textures,
      ],
    })),
  setResetLogoIndex: (logoIndex) =>
    set(() => ({
      resetLogoIndex: logoIndex,
    })),
  setNames: (names) =>
    set(() => ({
      names: names,
    })),
  setLogos: (logos) =>
    set(() => ({
      logos: logos,
    })),
  setUpdatedNames: (updatedNames) =>
    set(() => ({
      updatedNames: updatedNames,
    })),
  setUpdatedLogos: (updatedLogos) =>
    set(() => ({
      updatedLogos: updatedLogos,
    })),
  handleDesignGradient1: (color) =>
    set((state) => ({
      designGradient1: { ...state.designGradient1, ...color },
    })),
  handleDesignGradient2: (color) =>
    set((state) => ({
      designGradient2: { ...state.designGradient2, ...color },
    })),
  handleDesignScale: (scale) =>
    set((state) => ({
      designScale: { ...state.designScale, ...scale },
    })),
  handleIsDesignGradientEnabled: (color) =>
    set(() => ({
      isDesignGradientEnabled: color,
    })),
  handleDesignColor: (color) =>
    set((state) => ({
      designColor: { ...state.designColor, ...color },
    })),
  handlePatternColor: (color) =>
    set((state) => ({
      patternColor: { ...state.patternColor, ...color },
    })),
  handleModelRotation: (rotation) =>
    set((state) => ({
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
  updateGradient2: (updatedGradient) =>
    set((state) => ({
      gradient2: { ...state.gradient2, ...updatedGradient },
    })),
  updateGradientScale: (updatedScale) =>
    set((state) => ({
      gradientScale: { ...state.gradientScale, ...updatedScale },
    })),
  updateGradientAngle: (updatedAngle) =>
    set((state) => ({
      gradientAngle: { ...state.gradientAngle, ...updatedAngle },
    })),
  updateDesignGradientAngle: (updatedAngle) =>
    set((state) => ({
      designGradientAngle: { ...state.designGradientAngle, ...updatedAngle },
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
    set((state) => ({
      number: { ...state.number, ...updatedNumber },
    })),
  updateNumberPosition: (updatedPosition) =>
    set(() => ({
      numberPosition: updatedPosition,
    })),
  updateNumberFont: (updatedFont) =>
    set((state) => ({
      numberFont: { ...state.numberFont, ...updatedFont },
    })),
  updateNumberColor: (color) =>
    set((state) => ({
      numberColor: { ...state.numberColor, ...color },
    })),
  updateNumberGradient: (color) =>
    set((state) => ({
      numberGradientColor: { ...state.numberGradientColor, ...color },
    })),
  updateIsNumberGradient: (isValue) =>
    set(() => ({
      isNumberGradientColor: isValue,
    })),

  updateNameGradient: (color) =>
    set((state) => ({
      nameGradientColor: { ...state.nameGradientColor, ...color },
    })),
  updateIsNameGradient: (isValue) =>
    set(() => ({
      isNameGradientColor: isValue,
    })),
  updateNameGradientScale: (scale) =>
    set((state) => ({
      nameGradientScale: { ...state.nameGradientScale, ...scale },
    })),
  updateNameGradientAngle: (angle) =>
    set((state) => ({
      nameGradientAngle: { ...state.nameGradientAngle, ...angle },
    })),

  updateNumberOutline: (color) =>
    set((state) => ({
      numberOutline: { ...state.numberOutline, ...color },
    })),
  updateNumberScale: (scale) =>
    set((state) => ({
      numberScale: { ...state.numberScale, ...scale },
    })),
  updateNumberAngle: (angle) =>
    set((state) => ({
      numberAngle: { ...state.numberAngle, ...angle },
    })),

  updateName: (updatedName) =>
    set((state) => ({
      modelName: { ...state.modelName, ...updatedName },
    })),
  updateNamePosition: (updatedPosition) =>
    set(() => ({
      namePosition: updatedPosition,
    })),
  updateNameFont: (updatedFont) =>
    set((state) => ({
      nameFont: { ...state.nameFont, ...updatedFont },
    })),
  updateNameColor: (color) =>
    set((state) => ({
      nameColor: { ...state.nameColor, ...color },
    })),
  updateNameOutline: (color) =>
    set((state) => ({
      nameOutline: { ...state.nameOutline, ...color },
    })),
  updateNameScale: (scale) =>
    set((state) => ({
      nameScale: { ...state.nameScale, ...scale },
    })),
  updateNameRotation: (rotation) =>
    set((state) => ({
      nameRotation: { ...state.nameRotation, ...rotation },
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
    set((state) => ({
      isGradient: { ...state.isGradient, ...updatedIsGradient },
    }));
  },
  updatePatternScale: (patternScale) => {
    set((state) => ({
      patternScale: { ...state.patternScale, ...patternScale },
    }));
  },
  updatePatternRotationDeegre: (patternRotationDeegre) => {
    set((state) => ({
      patternRotationDeegre: {
        ...state.patternRotationDeegre,
        ...patternRotationDeegre,
      },
    }));
  },
}));
