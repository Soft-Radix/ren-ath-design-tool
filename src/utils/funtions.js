export const handleZoomIn = (orbitControlsRef) => {
  if (orbitControlsRef.current) {
    const camera = orbitControlsRef.current.object;
    camera.zoom *= 1.1; // Zoom in
    camera.updateProjectionMatrix();
    orbitControlsRef.current.update();
  }
};

export const handleZoomOut = (orbitControlsRef) => {
  if (orbitControlsRef.current) {
    const camera = orbitControlsRef.current.object;
    camera.zoom /= 1.1; // Zoom out
    camera.updateProjectionMatrix();
    orbitControlsRef.current.update();
  }
};
