import { Decal, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import React from "react";
import GradientText from "../gradientText/GradientText";
import { useDrag } from "@use-gesture/react";

const SleeveDecalName = ({
  namePosition,
  setNameDecalPosition,
  nameRotation,
  index,
  nameScale,
  nameDecalPosition,
  nameColor,
  nameGradientColor,
  nameOutline,
  item,
  nameGradientScale,
  isNameGradientColor,
  nameGradientAngle,
  font,
  toggleHovered,
  orbitalRef,
}) => {
  const bind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      const xPos = -(x * 0.01); // Clamp x to be non-positive only if namePosition is 3
      const yPos = -(y * 0.02);

      const finalPosition = [
        xPos < 2.5 && xPos > -2.5 ? xPos : nameDecalPosition[index][0],
        yPos < 6.5 && yPos > -7 ? yPos : nameDecalPosition[index][1],
        nameDecalPosition[2],
      ];
      setNameDecalPosition(finalPosition);
    },
    { pointerEvents: true }
  );

  console.log(item, nameDecalPosition);
  return (
    <Decal
      position={nameDecalPosition}
      rotation={nameRotation}
      scale={nameScale}
      origin={[0, 0, 0]}
      // debug={true}
      renderOrder={999}
    >
      <meshStandardMaterial transparent polygonOffset polygonOffsetFactor={-5}>
        <RenderTexture attach="map">
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1.2}
            position={[0, 0.1, 2.5]}
          />

          <GradientText
            {...bind()}
            onPointerEnter={toggleHovered}
            onPointerLeave={toggleHovered}
            color1={nameColor}
            color2={nameGradientColor}
            outlineColor={nameOutline}
            gradientRotation={nameGradientAngle}
            gradientScale={nameGradientScale}
            isNumberGradientColor={isNameGradientColor}
            rotation={[320, 360, 0]}
            fontSize={0.5}
            position={[0, 0, -0.9]}
            font={font}
          >
            {item}
          </GradientText>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default SleeveDecalName;
