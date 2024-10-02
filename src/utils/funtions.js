const MAX_ZOOM = 1.4; // Maximum zoom level
const MIN_ZOOM = 0.7; // Minimum zoom level

export const handleZoomIn = (orbitControlsRef) => {
  if (orbitControlsRef.current) {
    const camera = orbitControlsRef.current.object;
    if (camera.zoom < MAX_ZOOM) {
      camera.zoom *= 1.1; // Zoom in
      camera.zoom = Math.min(camera.zoom, MAX_ZOOM); // Ensure zoom does not exceed max
      camera.updateProjectionMatrix();
      orbitControlsRef.current.update();
    }
  }
};

export const handleZoomOut = (orbitControlsRef) => {
  if (orbitControlsRef.current) {
    const camera = orbitControlsRef.current.object;
    if (camera.zoom > MIN_ZOOM) {
      camera.zoom /= 1.1; // Zoom out
      camera.zoom = Math.max(camera.zoom, MIN_ZOOM); // Ensure zoom does not go below min
      camera.updateProjectionMatrix();
      orbitControlsRef.current.update();
    }
  }
};

export function transformGradientScale(originalValue) {
  var scaledValue = originalValue * 0.2 + 1.0;
  return scaledValue;
}

export const calculateScale = (value) => {
  if (value <= 10) {
    const minScale = [1, 1, 1];
    const maxScale = [10, 10, 10];
    const factor = (value - 1) / 9; // Normalize value to range 0 to 1

    return minScale.map((min, i) => min + factor * (maxScale[i] - min));
  }
};

export const handleDragLimitY = (yPos) => {
  let newYPosition = yPos;
  if (yPos > 2.5) {
    newYPosition = 2.5;
  } else if (yPos < -2.52) {
    newYPosition = -2.52;
  } else {
    newYPosition = yPos;
  }
  return yPos;
};

export const handleDragLimitX = (xPos) => {
  let newXPosition = xPos;
  if (xPos > 1.2) {
    newXPosition = 1.2;
  } else if (xPos < -1.3) {
    newXPosition = -1.3;
  } else {
    newXPosition = xPos;
  }
  return newXPosition;
};

export const handleDragLimitSeleeveX = (xPos) => {
  let newXPosition = xPos;
  if (xPos > 2.4) {
    newXPosition = 2.5;
  } else if (xPos < -0.9) {
    newXPosition = -0.9;
  } else {
    newXPosition = xPos;
  }
  return newXPosition;
};

export const handleDragLimitSeleeveY = (yPos) => {
  let newYPosition = yPos;
  if (yPos > 3.75) {
    newYPosition = 3.76;
  } else if (yPos < -1.27) {
    newYPosition = -1.28;
  } else {
    newYPosition = yPos;
  }
  return newYPosition;
};

export const nonRepeatingPatterns = [2, 3, 5, 6, 7, 8, 9, 15, 16];

export const modelRotationValue = (layerIndex) => {
  if (layerIndex === 0) {
    return 270;
  } else if (layerIndex === 6) {
    return -45;
  } else if (layerIndex === 7) {
    return 45;
  } else if (layerIndex === 1) {
    return 90;
  } else if (layerIndex === 2 || layerIndex === 4) {
    return 0;
  } else if (layerIndex === 3 || layerIndex === 5) {
    return 180;
  }
};

export const removeInitialSpace = (value) => value.replace(/^\s+/g, "");

export const handleAddNewUniform = (keyName, keyData) => {
  const uniformObject = {
    design: { designType: 10, isDesign: false },
    pattern: {
      secondaryTextures: [],
      patternRotationDeegre: {},
      patternScale: {},
      patternLayers: {},
    },
    color: { color: {}, designColor: {}, patternColor: {} },
    gradient: {
      gradient: {},
      gradient2: {},
      gradientScale: {},
      gradientAngle: {},
      designGradient1: {},
      designGradient2: {},
      designScale: {},
      designGradientAngle: {},
    },
    number: {
      number: {},
      numberColor: {},
      numberFont: {},
      numberOutline: {},
      numberScale: {},
      numberAngle: {},
    },
    name: {
      nameFont: {},
      nameRotation: {},
      nameColor: {},
      combinedNames: {},
      nameOutline: {},
      nameGradientAngle: {},
      nameGradientColor: {},
      nameScale: {},
      nameGradientScale: {},
    },
    logo: { combinedLogos: {}, logoScale: {} },
  };

  uniformObject[keyName] = { ...uniformObject[keyName], ...keyData };
  localStorage.setItem("uniformObject", JSON.stringify(uniformObject));
};

export const getUniformData = () => {
  const storedUniform = localStorage.getItem("uniformObject");
  if (storedUniform) {
    return JSON.parse(storedUniform);
  } else {
    return null;
  }
};
