import { useProductStore } from "../../store";
import { getUniformData } from "../../utils/funtions";

export const useUpdateUniformStates = () => {
  const {
    // Design
    updateDesignType,
    updateIsDesign,

    // Pattern
    updatePatternLayers,
    updateSecondaryTextures,

    // Color
    updateColor,
    handleDesignColor,
    handlePatternColor,

    // Gradient
    updateGradient,
    updateGradient2,
    handleDesignGradient1,
    handleDesignGradient2,
    updateIsGradient,
    updateGradientScale,
    updateGradientAngle,
    handleDesignScale,
    updateDesignGradientAngle,

    // Number
    updateNumber,
    updateNumberColor,
    updateNumberFont,
    updateNumberOutline,
    updateNumberScale,
    updateNumberAngle,

    // name
    setNameDecalPositions1,
    setNameDecalPositions2,
    setNameDecalPositions3,
    setNameDecalPositions4,
    updateNameFont,
    updateNameRotation,
    updateNameColor,
    updateNameOutline,
    updateNameGradientAngle,
    updateNameGradient,
    updateNameScale,
    updateNameGradientScale,

    //logos
    setUpdatedLogos,
    updateLogoScale,
    setLogos,
    
    updateLogo,
    updateName,
    // Add other relevant update functions here
  } = useProductStore((state) => state);

  const updateFromUniformObject = () => {
    const uniformObject = getUniformData();
    console.log("🚀 ~ updateFromUniformObject ~ uniformObject:", uniformObject);

    if (uniformObject) {
      //design
      updateDesignType(uniformObject.design.designType);
      updateIsDesign(uniformObject.design.isDesign);

      // pattern
      updatePatternLayers(uniformObject.pattern.patternLayers);
      updateSecondaryTextures(uniformObject.pattern.secondaryTextures);

      // color
      updateColor(uniformObject.color.color);
      handleDesignColor(uniformObject.color.designColor);
      handlePatternColor(uniformObject.color.patternColor);

      // gradient
      updateGradient(uniformObject.gradient.gradient);
      updateGradient2(uniformObject.gradient.gradient2);
      handleDesignGradient1(uniformObject.gradient.designGradient1);
      handleDesignGradient2(uniformObject.gradient.designGradient2);
      updateIsGradient(uniformObject.gradient.isGradient);
      updateGradientScale(uniformObject.gradient.gradientScale);
      updateGradientAngle(uniformObject.gradient.gradientAngle);
      handleDesignScale(uniformObject.gradient.designScale);
      updateDesignGradientAngle(uniformObject.gradient.designGradientAngle);

      // number
      updateNumber(uniformObject.number.number);
      updateNumberColor(uniformObject.number.numberColor);
      updateNumberFont(uniformObject.number.numberFont);
      updateNumberOutline(uniformObject.number.numberOutline);
      updateNumberScale(uniformObject.number.numberScale);
      updateNumberAngle(uniformObject.number.numberAngle);

      // name
      updateNameFont(uniformObject.name.nameFont);
      updateNameRotation(uniformObject.name.nameRotation);
      updateNameColor(uniformObject.name.nameColor);
      updateNameOutline(uniformObject.name.nameOutline);
      updateNameGradientAngle(uniformObject.name.nameGradientAngle);
      updateNameGradient(uniformObject.name.nameGradientColor);
      updateNameScale(uniformObject.name.nameScale);
      updateNameGradientScale(uniformObject.name.nameGradientScale);
      setNameDecalPositions1(uniformObject.name.setNameDecalPositions1);
      setNameDecalPositions2(uniformObject.name.setNameDecalPositions2);
      setNameDecalPositions3(uniformObject.name.setNameDecalPositions3);
      setNameDecalPositions4(uniformObject.name.setNameDecalPositions4);

      //logos
      setUpdatedLogos(uniformObject.name.updatedLogos);
      updateLogoScale(uniformObject.name.logoScale);
      setLogos(uniformObject.logo.logos);
    } else {
      console.log("No uniformObject found in localStorage.");
    }
  };

  return updateFromUniformObject;
};
