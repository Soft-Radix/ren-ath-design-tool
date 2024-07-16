import { Decal } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import React from "react";

const LogoDecal = ({
  logoScale,
  item,
  index,
  logoTexture,
  logoRotation,
  modelLogoPosition,
  setModelLogoPosition,
  toggleHovered,
  orbitalRef,
  logoPosition,
}) => {
  // use drag hook
  const logoBind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      const xPos =
        logoPosition === 3
          ? Math.min(-0.2, x * 0.01)
          : logoPosition === 1
          ? x * 0.01
          : -(x * 0.01); // Clamp x to be non-positive only if logoPosition is 3
      const yPos = -(y * 0.02);

      const finalPosition = [
        xPos < 5 && xPos > -4.5 ? xPos : modelLogoPosition[index][0],
        yPos < 6.5 && yPos > -10 ? yPos : modelLogoPosition[index][1],
        changeZPosition(yPos) ? changeZPosition(yPos) : modelLogoPosition[2],
      ];
      setModelLogoPosition(finalPosition);
    },
    { pointerEvents: true }
  );

  function changeZPosition(zPosition) {
    if (logoPosition === 3) {
      switch (true) {
        case zPosition < -2.0:
          return 0.8888;
        case zPosition < -1.78:
          return 0.7777;
        case zPosition < -1.08:
          return 0.6666;
        case zPosition < -0.6:
          return 0.5555;
        default:
          return 0.3333;
      }
    } else if (logoPosition === 4) {
      switch (true) {
        case zPosition < -2.0:
          return 0.8888;
        case zPosition < -1.6:
          return 0.7777;
        case zPosition < -1.1:
          return 0.6666;
        case zPosition < -0.7:
          return 0.5555;
        case zPosition < -0.38:
          return 0.4444;
        case zPosition < 0.12:
          return 0.3333;
        default:
          return 0.2222;
      }
    }
  }

  return (
    <Decal
      {...logoBind()}
      onPointerEnter={toggleHovered}
      onPointerLeave={toggleHovered}
      scale={
        logoPosition === 4 || logoPosition === 3
          ? [
              ((logoScale[item] ?? 0.4) || 0.5) * 1.2222,
              ((logoScale[item] ?? 0.4) || 0.5) * 1.2222,
              8,
            ]
          : [
              ((logoScale[item] ?? 0.4) || 0.3) * 2,
              ((logoScale[item] ?? 0.4) || 0.5) * 4,
              4,
            ]
      }
      position={modelLogoPosition}
      rotation={logoRotation}
      map={logoTexture[index]}
      origin={[0, 0, 0]}
    />
  );
};

export default LogoDecal;
