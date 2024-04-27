import {
  Decal,
  GradientTexture,
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
  Text,
  useCursor,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { motion } from "framer-motion-3d";
import React, { useEffect, useRef, useState } from "react";
import {
  Color,
  DataTexture,
  DoubleSide,
  MultiplyBlending,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  UnsignedByteType,
} from "three";
import { degToRad } from "three/src/math/MathUtils";
import font3 from "../../../src/assets/fonts/BebasNeue.ttf";
import font1 from "../../../src/assets/fonts/Roboto.ttf";
import font2 from "../../../src/assets/fonts/TiltNeon.ttf";
import { useProductStore } from "../../../src/store";

export function Model(props) {
  const orbitRef = useRef();
  const modelRef = useRef();

  // DESTRUCTURE OF MODEL NODES
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );

  const {
    color,
    gradient,
    gradientScale,
    gradientAngle,

    pattern,

    updateRef,
    number,
    numberPosition,
    numberFont,
    numberColor,
    numberOutline,

    modelName,
    namePosition,
    nameFont,
    nameColor,
    nameOutline,

    logo,
    logoPosition,
    logoScale,
    logoAngle,
  } = useProductStore((state) => state);

  // SET CAMERA POSITION
  const camera = useThree((state) => state.camera);

  // ADD TEXTURE ON LAYER
  const [textureUrl, setTextureUrl] = useState("./textures/pattern.png");
  const layerTexture = useTexture(textureUrl);

  useEffect(() => {
    setTextureUrl(
      pattern === 1
        ? "./textures/pattern.png"
        : pattern === 2
        ? "./textures/pattern2.png"
        : "./textures/pattern3.png"
    );
  }, [pattern]);

  useEffect(() => {
    // console.log("modelRef ==> ", modelRef.current.children[1]);
    // console.log("layerTexture ==> ", layerTexture);

    layerTexture.wrapS = layerTexture.wrapT = RepeatWrapping;
    layerTexture.repeat.set(4, 4);
    layerTexture.rotation = 0;
    layerTexture.channel = 1;
    layerTexture.needsUpdate = true;

    // modelRef.current.children[1].material.aoMap = layerTexture;
    // modelRef.current.children[1].material.aoMapIntensity = 1;
    modelRef.current.children[1].material.map = layerTexture;
    // modelRef.current.children[1].material.lightMapIntensity = 20;
  }, [textureUrl]);

  useEffect(() => {
    modelRef.current.children.forEach((element) => {
      element.material.side = DoubleSide;
    });

    updateRef(modelRef);
    camera.position.set(0, 2, 8);
  }, []);

  // NUMBER STATES
  const [number1Position, setNumber1Position] = useState([0, 2.5, 4]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);
  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (numberPosition === 1) {
      setNumber1Position([0, 2.5, 4]);
      setNumber1Scale([4.5, 2.5, 2]);
      setNumber1Rotation(0);
    } else if (numberPosition === 2) {
      setNumber1Rotation(180);
    } else if (numberPosition === 3) {
      setNumber1Position([1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    } else if (numberPosition === 4) {
      setNumber1Position([-1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    }
  }, [numberPosition]);

  // NAME STATES
  const name1Scale = [4.5, 2.5, 10];
  const [name1FontSize, setName1FontSize] = useState(2);
  const [name1Position, setName1Position] = useState([0, 0, 1]);
  const [name1Rotation, setName1Rotation] = useState([0, 0, 0]);

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (namePosition === 1) {
      setName1Rotation([0, 0, 0]);
      setNumber1Rotation(0);
    } else if (namePosition === 2) {
      setName1Rotation([0, degToRad(180), 0]);
      setNumber1Rotation(180);
    }
  }, [namePosition]);

  // CHANGE CURSOR DEFAULT TO POINTER
  const [hovered, setHovered] = useState(false);
  const toggleHovered = () => setHovered(!hovered);
  useCursor(hovered, "grab");

  // HANDLE SCALING ON TEXT CHANGE
  useEffect(() => {
    // Calculate adjusted font size based on modelName length and decal dimensions
    if (modelName.length > 2) {
      const textWidth = modelName.length; // Approximate text width
      const maxWidth = name1Scale[0] * 0.8; // 80% of decal width
      const adjustedWidth = Math.min(textWidth, maxWidth);
      const adjustedFontSize = (adjustedWidth / modelName.length) * 2; // Adjust the factor as needed
      setName1FontSize(adjustedFontSize);
    } else {
      setName1FontSize(2); // Default font size
    }
  }, [modelName]);

  // HANDLE TEXT DRAG ON FIRST LAYER
  const bind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitRef.current.enabled = !down;
      orbitRef.current.cursor = "pointer";

      const xPos = namePosition === 1 ? x * 0.02 : -(x * 0.02);
      const yPos = -(y * 0.03);

      const finalPosition = [
        xPos < 2 && xPos > -2 ? xPos : name1Position[0],
        yPos < 6.5 && yPos > -7 ? yPos : name1Position[1],
        name1Position[2],
      ];

      setName1Position(finalPosition);
    },
    { pointerEvents: true }
  );

  // HANDLE LOGO STATES
  const logoTexture = useTexture(logo || "./textures/1.png");
  const [modelLogoPosition, setModelLogoPosition] = useState([0, 0, 1]);
  const [logoRotation, setLogoRotation] = useState([0, 0, 0]);

  // HANDLE TEXT DRAG ON FIRST LAYER
  const logoBind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitRef.current.enabled = !down;
      orbitRef.current.cursor = "pointer";

      const xPos = logoPosition === 1 ? x * 0.02 : -(x * 0.02);
      const yPos = -(y * 0.03);

      const finalPosition = [
        xPos < 3 && xPos > -3 ? xPos : modelLogoPosition[0],
        yPos < 6.5 && yPos > -7 ? yPos : modelLogoPosition[1],
        modelLogoPosition[2],
      ];

      setModelLogoPosition(finalPosition);
    },
    { pointerEvents: true }
  );

  useEffect(() => {
    setLogoRotation([
      0,
      logoPosition === 1 ? 0 : degToRad(180),
      degToRad(logoAngle),
    ]);
  }, [logoAngle, logoPosition]);

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (logoPosition === 1) {
      setLogoRotation([0, 0, 0]);
      setNumber1Rotation(0);
    } else if (logoPosition === 2) {
      setLogoRotation([0, degToRad(180), 0]);

      setNumber1Rotation(180);
    }
  }, [logoPosition]);

  return (
    <>
      <ambientLight intensity={6} />
      <OrbitControls
        ref={orbitRef}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
        // enableZoom={false}
      />

      <group {...props} dispose={null}>
        <motion.group
          scale={0.394}
          ref={modelRef}
          animate={{
            rotateY: degToRad(number1Rotation),
            transition: { duration: 0.5 },
          }}
        >
          <mesh
            geometry={
              nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_1.geometry
            }
            material={materials.blinn2}
            name="Layer 1"
          >
            {gradient[0] && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0, gradientScale[0] || 0.1]} // As many stops as you want
                  colors={[color[0] || "transparent", gradient[0]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
          <mesh
            geometry={
              nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_2.geometry
            }
            material={
              materials.Dress_1_Group6255_0003_Dress_1_Group6255_0003_blinn
            }
            name="Layer 2"
          >
            {(numberPosition === 1 ||
              numberPosition === 3 ||
              numberPosition === 4) && (
              <Decal
                // debug={true}
                position={number1Position}
                rotation={[0, 0, 0]}
                scale={number1Scale}
                origin={[0, 0, 0]}
                // ref={textDecalRef}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-1}
                >
                  <RenderTexture attach="map">
                    <PerspectiveCamera
                      makeDefault
                      manual
                      aspect={2}
                      position={[0, 0.2, 2]}
                    />

                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={2}
                      color={numberColor || "black"}
                      outlineColor={numberOutline || "black"}
                      outlineWidth={numberOutline ? 0.05 : 0}
                      font={
                        numberFont === 1
                          ? font1
                          : numberFont === 2
                          ? font2
                          : numberFont === 3
                          ? font3
                          : font1
                      }
                    >
                      {number}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            {modelName && namePosition === 1 && (
              <Decal
                {...bind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                position={name1Position}
                rotation={[0, 0, 0]}
                scale={name1Scale}
                origin={[0, 0, 0]}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-1}
                >
                  <RenderTexture attach="map">
                    <PerspectiveCamera
                      makeDefault
                      manual
                      aspect={2}
                      position={[0, 0.1, 2.5]}
                    />
                    {hovered && (
                      <color attach="background" args={["#279954"]} />
                    )}

                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={name1FontSize}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font2
                          : nameFont === 3
                          ? font3
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            {gradient[1] && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0, gradientScale[1] || 0.1]} // As many stops as you want
                  colors={[color[1] || "transparent", gradient[1]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}

            {logo && logoPosition === 1 && (
              <Decal
                {...logoBind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                scale={[logoScale * 5, logoScale * 5, 10]}
                // debug={true}
                position={modelLogoPosition}
                rotation={logoRotation}
                map={logoTexture}
                origin={[0, 0, 0]}
              />
            )}
          </mesh>
          <mesh
            geometry={
              nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_3.geometry
            }
            material={materials.blinn4}
            name="Layer 3"
          >
            {numberPosition === 2 && (
              <Decal
                position={[0, 4, -2]}
                rotation={[0, degToRad(180), 0]}
                scale={[4.5, 2.5, 2]}
                origin={[0, 0, 0]}
                // ref={textDecalRef}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-1}
                >
                  <RenderTexture attach="map">
                    <PerspectiveCamera
                      makeDefault
                      manual
                      aspect={2}
                      position={[0, 0.2, 2]}
                    />
                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={2}
                      color={numberColor || "black"}
                      outlineColor={numberOutline || "black"}
                      outlineWidth={numberOutline ? 0.05 : 0}
                      font={
                        numberFont === 1
                          ? font1
                          : numberFont === 2
                          ? font2
                          : numberFont === 3
                          ? font3
                          : font1
                      }
                    >
                      {number}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}
            {modelName && namePosition === 2 && (
              <Decal
                {...bind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                position={name1Position}
                rotation={name1Rotation}
                scale={name1Scale}
                origin={[0, 0, 0]}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-1}
                >
                  <RenderTexture attach="map">
                    <PerspectiveCamera
                      makeDefault
                      manual
                      aspect={2}
                      position={[0, 0.1, 2.5]}
                    />
                    {hovered && (
                      <color attach="background" args={["#279954"]} />
                    )}

                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={name1FontSize}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font2
                          : nameFont === 3
                          ? font3
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            {gradient[2] && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0, gradientScale[2] || 0.1]} // As many stops as you want
                  colors={[color[2] || "transparent", gradient[2]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}

            {logo && logoPosition === 2 && (
              <Decal
                {...logoBind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                scale={[logoScale * 5, logoScale * 5, 10]}
                // debug={true}
                position={modelLogoPosition}
                rotation={logoRotation}
                map={logoTexture}
                origin={[0, 0, 0]}
              />
            )}
          </mesh>
          <mesh
            geometry={
              nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_4.geometry
            }
            material={materials.blinn3}
            name="Layer 4"
          >
            {gradient[3] && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0, gradientScale[3] || 0.1]} // As many stops as you want
                  colors={[color[3] || "transparent", gradient[3]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
          <mesh
            geometry={
              nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_5.geometry
            }
            material={materials.blinn1}
            name="Layer 5"
          >
            {gradient[4] && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0, gradientScale[4] || 0.1]} // As many stops as you want
                  colors={[color[4] || "transparent", gradient[4]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
        </motion.group>
      </group>
    </>
  );
}

useGLTF.preload("./models/W1/long-sleeve-hitting-tees-with-hood.glb");
