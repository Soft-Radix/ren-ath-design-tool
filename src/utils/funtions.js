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

// Define the uniformObject outside of the function scope
let uniformObject = {
  design: { designType: 10, isDesign: false },
  pattern: {
    secondaryTextures: [],
    patternRotationDeegre: {},
    patternScale: {},
    patternLayers: {},
  },
  color: { color: {}, designColor: {}, patternColor: {} },
  gradient: {
    isGradient: {},
    gradient: {},
    designGradient1: {},
    designGradient2: {},
    gradient2: {},

    gradientScale: {},
    gradientAngle: {},
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
    nameDecalPositions1: [[0, 0, 1]],
    nameDecalPositions2: [[0, 0, 1]],
    nameDecalPositions3: [[0.6, -1.2, 1.1]],
    nameDecalPositions4: [[0.5, 1.8, 1]],
  },
  logo: { logoScale: {}, updatedLogos: {}, logos: [] },
};

export const handleAddNewUniform = (keyName, keyData) => {
  uniformObject[keyName] = { ...uniformObject[keyName], ...keyData };
  return uniformObject;
};

export const getUpdatedUniformData = (isSave) => {
  const uniformObject = handleAddNewUniform();
  if (isSave) {
    for (let key in uniformObject) {
      if (typeof uniformObject[key] === "string") {
        uniformObject[key] = uniformObject[key];
      } else {
        uniformObject[key] = JSON.stringify(uniformObject[key]);
      }
    }
  }
  delete uniformObject["createdAt"];
  delete uniformObject["updatedAt"];
  delete uniformObject["undefined"];
  return uniformObject;
};

export function mergeObjects(updatedObj, prefilledObj) {
  // Function to merge objects deeply
  for (let key in prefilledObj) {
    if (prefilledObj.hasOwnProperty(key)) {
      // Check if the value is an object (and not null or an array)
      if (
        typeof prefilledObj[key] === "object" &&
        !Array.isArray(prefilledObj[key]) &&
        prefilledObj[key] !== null
      ) {
        // Ensure the updated object has a corresponding object, if not, create it
        if (!updatedObj[key] || typeof updatedObj[key] !== "object") {
          updatedObj[key] = {};
        }
        // Recursively merge the nested objects
        mergeObjects(updatedObj[key], prefilledObj[key]);
      }
      // Check if it's an array
      else if (Array.isArray(prefilledObj[key])) {
        // If the array in updatedObj is empty or undefined, use the array from prefilledObj
        if (!updatedObj[key] || updatedObj[key].length === 0) {
          updatedObj[key] = [...prefilledObj[key]];
        }
      }
      // For primitive values
      else {
        // If the value in updatedObj is empty, null, or undefined, use the value from prefilledObj
        if (
          updatedObj[key] === undefined ||
          updatedObj[key] === null ||
          (typeof updatedObj[key] === "string" &&
            updatedObj[key].trim() === "") ||
          (typeof updatedObj[key] === "number" && isNaN(updatedObj[key]))
        ) {
          updatedObj[key] = prefilledObj[key];
        }
      }
    }
  }

  // Now stringify all values in the final merged object

  // Remove createdAt and updatedAt if they exist
  delete updatedObj["createdAt"];
  delete updatedObj["updatedAt"];
  delete updatedObj["deleted_at"];
  delete updatedObj["id"];
  delete updatedObj["is_finalized"];
  delete updatedObj["is_logo_upload"];
  delete updatedObj["is_pantone_info"];
  delete updatedObj["pantone_info"];
  delete updatedObj["undefined"];
  delete updatedObj["user_id"];

  return updatedObj;
}
