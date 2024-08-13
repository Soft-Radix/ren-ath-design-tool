import {
  Decal,
  PerspectiveCamera,
  RenderTexture,
  Text,
} from "@react-three/drei";
import React from "react";
import GradientText from "../gradientText/GradientText";
import { useDrag } from "@use-gesture/react";
import {
  handleDragLimitSeleeveX,
  handleDragLimitSeleeveY,
} from "../../../utils/funtions";

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
  nameRotationAngle = 0.2,
}) => {
  const bind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      const xPos = -(x * 0.01); // Clamp x to be non-positive only if namePosition is 3
      const yPos = -(y * 0.01);
      console.log("🚀 ~ xPos:", xPos);
      console.log("🚀 ~ yPos:", yPos);

      const finalPosition = [
        handleDragLimitSeleeveX(xPos)
          ? handleDragLimitSeleeveX(xPos)
          : nameDecalPosition[index][0],
        handleDragLimitSeleeveY(yPos)
          ? handleDragLimitSeleeveY(yPos)
          : nameDecalPosition[index][1],
        nameDecalPosition[2],
      ];
      setNameDecalPosition(finalPosition);
    },
    { pointerEvents: true }
  );

  return (
    <Decal
      position={nameDecalPosition}
      rotation={nameRotation}
      scale={nameScale}
      origin={[0, 0, 0]}
      // debug={true}
      renderOrder={999}
    >
      <meshStandardMaterial transparent polygonOffset polygonOffsetFactor={-6}>
        <RenderTexture attach="map">
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1.2} // set camera  aspect ration responsible for text visual appearance
            position={[0.1, 0, 2.2]}
          />
          <Text
            {...bind()}
            onPointerEnter={toggleHovered}
            onPointerLeave={toggleHovered}
            rotation={[320, 360, -nameRotationAngle]} // rotation of text
            fontSize={0.4}
            position={[0, 0, -0.8]}
            font={font}
            color={nameColor}
            renderOrder={999}
            outlineColor={nameOutline}
            // outlineWidth={0.05}
          >
            {item}
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default SleeveDecalName;
