import { useEffect, useState } from "react";
import { useProductStore } from "../../store";
import { getUniformData } from "../../utils/funtions";
import useFetch from "./usefetch";

export const useUpdateUniformStates = () => {
  const [designData, setDesignData] = useState();
  const {
    //Id
    myDesignId,

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
    setNames,
    setNamePositions1,
    setNamePositions2,
    setNamePositions3,
    setNamePositions4,
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

    setLogoDecalPositions1,
    setLogoDecalPositions2,
    setLogoDecalPositions3,
    setLogoDecalPositions4,
    setUpdatedNames,

    updateLogo,
    updateName,
    // Add other relevant update functions here
  } = useProductStore((state) => state);

  const [getDesignByIdQuery, { response, loading, error }] = useFetch(
    `/design/detail/${myDesignId}`,
    {
      method: "post",
    }
  );

  useEffect(() => {
    if (true) {
      // getDesignByIdQuery();
    }
  }, []);

  useEffect(() => {
    if (response) {
      const parseData = response?.data;
      for (const key in parseData) {
        try {
          if (typeof parseData[key] === "string") {
            parseData[key] = JSON.parse(parseData[key]);
          } else {
            parseData[key] = parseData[key];
          }
        } catch (error) {
          console.error(`Error parsing value for key "${key}":`, error);
          parseData[key] = parseData[key]; // Preserve original value if parsing fails
        }
      }
      setDesignData(parseData);
    }
  }, [response]);

  const updateFromUniformObject = () => {
    const uniformObject = designData;
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
      setNamePositions1(uniformObject.name.nameDecalPositions1);
      setNamePositions2(uniformObject.name.nameDecalPositions2);
      setNamePositions3(uniformObject.name.nameDecalPositions3);
      setNamePositions4(uniformObject.name.nameDecalPositions4);
      setNames(uniformObject.name.names);

      //logos
      setUpdatedLogos(uniformObject.logo.updatedLogos);
      updateLogoScale(uniformObject.logo.logoScale);
      setLogos(uniformObject.logo.logos);
      setLogoDecalPositions1(uniformObject.logo.decalPositions1);
      setLogoDecalPositions2(uniformObject.logo.decalPositions2);
      setLogoDecalPositions3(uniformObject.logo.decalPositions3);
      setLogoDecalPositions4(uniformObject.logo.decalPositions4);

      setUpdatedNames(uniformObject.name.updatedNames);
    } else {
      console.log("No uniformObject found in localStorage.");
    }
  };

  return updateFromUniformObject;
};
