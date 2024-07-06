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
        xPos < 2.5 && xPos > -2.5 ? xPos : modelLogoPosition[index][0],
        yPos < 6.5 && yPos > -7 ? yPos : modelLogoPosition[index][1],
        modelLogoPosition[2],
      ];
      setModelLogoPosition(finalPosition);
    },
    { pointerEvents: true }
  );

  return (
    <Decal
      {...logoBind()}
      onPointerEnter={toggleHovered}
      onPointerLeave={toggleHovered}
      scale={
        logoPosition === 4 || logoPosition === 3
          ? [
              (logoScale[item] || 0.5) * 1.2222,
              (logoScale[item] || 0.5) * 1.2222,
              8,
            ]
          : [(logoScale[item] || 0.3) * 2, (logoScale[item] || 0.5) * 4, 4]
      }
      position={modelLogoPosition}
      rotation={logoRotation}
      map={logoTexture[index]}
      origin={[0, 0, 0]}
    />
  );
};

export default LogoDecal;
