export const getLayerName = (layerNo) => {
  let layerName = "";
  if (layerNo == 0) {
    layerName = "Left Sleeve Upper";
  } else if (layerNo == 1) {
    layerName = "Right Sleeve Upper";
  } else if (layerNo == 2) {
    layerName = "Front";
  } else if (layerNo == 3) {
    layerName = "Back";
  } else if (layerNo == 4) {
    layerName = "Front Collor";
  } else if (layerNo == 5) {
    layerName = "Back Collor";
  } else if (layerNo == 6) {
    layerName = "Left Sleeve Inner";
  } else if (layerNo == 7) {
    layerName = "Left Sleeve Inner";
  }
  return layerName;
};
