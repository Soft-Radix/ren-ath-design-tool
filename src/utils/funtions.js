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
  return newYPosition;
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
    newXPosition = 2.4;
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
    newYPosition = 3.75;
  } else if (yPos < -1.27) {
    newYPosition = -1.27;
  } else {
    newYPosition = yPos;
  }
  return newYPosition;
};
