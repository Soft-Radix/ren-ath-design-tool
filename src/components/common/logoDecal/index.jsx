import { Decal } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import React from "react";
import { handleDragLimitX, handleDragLimitY } from "../../../utils/funtions";
import * as THREE from "three";

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
  // Calculate texture aspect ratio
  const texture = logoTexture[index];
  let aspectRatio = 1; // Default aspect ratio

  if (texture) {
    texture.encoding = THREE.sRGBEncoding; // Use sRGB encoding for natural colors
    if (texture.image) {
      aspectRatio = texture.image.width / texture.image.height;
    }
  }

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
        handleDragLimitX(xPos)
          ? handleDragLimitX(xPos)
          : modelLogoPosition[index][0],
        handleDragLimitY(yPos)
          ? handleDragLimitY(yPos)
          : modelLogoPosition[index][1],
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

  // Calculate the scale while preserving the aspect ratio
  const decalScale = [
    aspectRatio * ((logoScale ? logoScale[item] : 0.3) || 0.3) * 1.5, // Adjust width according to aspect ratio
    ((logoScale ? logoScale[item] : 0.3) || 0.3) * 1.5, // Height
    10, // Depth scale (Adjust if needed)
  ];

  return (
    <Decal
      {...logoBind()}
      onPointerEnter={toggleHovered}
      onPointerLeave={toggleHovered}
      scale={decalScale}
      position={modelLogoPosition}
      rotation={logoRotation}
      origin={[0, 0, 0]}
    >
      <meshBasicMaterial
        map={texture} // Logo texture
        transparent={true} // Enable transparency
        opacity={1} // Full opacity for the visible part
        alphaTest={0.5} // Remove pixels with low alpha values
        color="#ffffff" // Set color to white to preserve natural colors
        toneMapped={false} // Disable tone mapping to preserve natural colors
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </Decal>
  );
};

export default LogoDecal;
