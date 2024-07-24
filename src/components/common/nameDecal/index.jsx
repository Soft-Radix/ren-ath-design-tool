import { Decal, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import React from "react";
import GradientText from "../gradientText/GradientText";
import { degToRad } from "three/src/math/MathUtils.js";

const NameDecal = ({
  nameScale,
  item,
  index,
  name,
  nameFont,
  orbitalRef,
  toggleHovered,
  nameColor,
  nameGradientColor,
  nameOutline,
  nameGradientAngle,
  nameGradientScale,
  isNameGradientColor,
  namePosition,
  modelNamePosition,
  setModelNamePosition,
  fontSize = 0.3,
  nameRotationAngle=0,
}) => {
  console.log("🚀 ~ fontSize:", fontSize)
  const bindFront = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      const xPos = namePosition === 1 ? x * 0.01 : -(x * 0.01);
      const yPos = -(y * 0.02);

      const finalPosition = [
        xPos < 2 && xPos > -2 ? xPos : modelNamePosition[index][0],
        yPos < 6.5 && yPos > -7 ? yPos : modelNamePosition[index][1],
        modelNamePosition[2],
      ];

      setModelNamePosition(finalPosition);
    },
    { pointerEvents: true }
  );
  return (
    <Decal
      position={modelNamePosition}
      rotation={[0, namePosition == 1 ? 0 : degToRad(180), 0]}
      scale={nameScale}
      origin={[0, 0, 0]}
    >
      <meshStandardMaterial transparent polygonOffset polygonOffsetFactor={-1}>
        <RenderTexture attach="map">
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1.6}
            position={[0, 0.1, 2]}
          />
          <GradientText
            {...bindFront()}
            onPointerEnter={toggleHovered}
            onPointerLeave={toggleHovered}
            rotation={[0, 0, -nameRotationAngle]}
            fontSize={fontSize}
            color1={nameColor}
            color2={nameGradientColor}
            outlineColor={nameOutline}
            gradientRotation={nameGradientAngle}
            gradientScale={nameGradientScale}
            isNumberGradientColor={isNameGradientColor}
            font={nameFont}
          >
            {`${name}`.toUpperCase()}
          </GradientText>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default NameDecal;
