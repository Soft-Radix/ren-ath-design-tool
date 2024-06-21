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
