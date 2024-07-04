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
      const xPos = logoPosition === 1 ? x * 0.01 : -(x * 0.01);
      const yPos = -(y * 0.02);
      console.log("x:", x, "y:", y, "xPos:", xPos, "yPos:", yPos);

      const finalPosition = [
        xPos < 3 && xPos > -3 ? xPos : modelLogoPosition[index][0],
        yPos < 6.5 && yPos > -7 ? yPos : modelLogoPosition[index][1],
        modelLogoPosition[index][2],
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
              5,
            ]
          : [(logoScale[item] || 0.3) * 2, (logoScale[item] || 0.5) * 4, 4]
      }
      position={modelLogoPosition[index]}
      rotation={logoRotation}
      map={logoTexture[index]}
      origin={[0, 0, 0]}
    />
  );
};

export default LogoDecal;
