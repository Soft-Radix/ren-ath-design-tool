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
import * as Three from "three";
import { DoubleSide, ShaderMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import font3 from "../../../src/assets/fonts/BebasNeue.ttf";
import font5 from "../../../src/assets/fonts/Freshman.ttf";
import font6 from "../../../src/assets/fonts/Impact.ttf";
import font7 from "../../../src/assets/fonts/MachineRegular.ttf";
import font8 from "../../../src/assets/fonts/Oswald-VariableFont_wght.ttf";
import font1 from "../../../src/assets/fonts/Roboto.ttf";
import font9 from "../../../src/assets/fonts/SawarabiGothic-Regular.ttf";
import font4 from "../../../src/assets/fonts/TiltNeon.ttf";
import { useProductStore } from "../../../src/store";
const hexColor = "#D2D1D3";

// Extract RGB components from the hexadecimal color
const r = parseInt(hexColor.substring(1, 3), 16) / 255;
const g = parseInt(hexColor.substring(3, 5), 16) / 255;
const b = parseInt(hexColor.substring(5, 7), 16) / 255;

// Create a Three.js Color instance using the RGB values
const threeJsColor = new Three.Color(r, g, b);

export function Model(props) {
  const {
    color,
    gradient,
    gradientScale,
    gradientAngle,

    pattern,
    isGradient,
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
    colorIndex,
    designType,
    layer,
    isDesign,
  } = useProductStore((state) => state);
  console.log("🚀 ~ Model ~ isGradient:", isGradient);

  // SET CAMERA POSITION
  const camera = useThree((state) => state.camera);

  // Load 3D model and textures
  const { nodes, materials } = useGLTF("./models/W3/long-sleeve-jersey.glb");

  // State for primary texture URL (for dynamic texture changes)
  const [designTexture, setDesignTexture] = useState(
    "./model-designs/W3/design3.png"
  );
  const [secondaryTextureUrl, setSecondaryTextureUrl] = useState(
    "./textures/pattern2.png"
  );
  const primaryTexture = useTexture(designTexture);
  const secondaryTexture = useTexture(secondaryTextureUrl);

  // state to update color of each layer
  const [layerColor, setLayerColor] = useState(threeJsColor);

  // References
  const orbitRef = useRef();
  const modelRef = useRef();

  // effect to update set colorLayer state
  useEffect(() => {
    let changeColor;
    const colorsCollection = [...secondaryColors];
    if (colorIndex !== null) {
      changeColor = color[colorIndex];
      if ((colorIndex == 0 || colorIndex % 2 == 0) && !isGradient) {
        colorsCollection[colorIndex] = changeColor;
        colorsCollection[colorIndex + 1] = changeColor;
      } else {
        colorsCollection[colorIndex] = changeColor;
      }
    } else {
      changeColor = threeJsColor;
    }
    setSecondaryColors(colorsCollection);
    setLayerColor(changeColor);
  }, [color[colorIndex]]);

  const [secondaryTextures, setSecondaryTextures] = useState([]);
  const [secondaryColors, setSecondaryColors] = useState([]);
  //console.log("secondaryColors", secondaryColors);
  // Effect to update secondary texture based on pattern change
  useEffect(() => {
    if (pattern !== null) {
      const url = `./textures/pattern${pattern}.png`;
      setSecondaryTextureUrl(url);
    }
  }, [pattern]);

  // Effect to update primary texture based on designType change
  useEffect(() => {
    if (designType) {
      setDesignTexture(`./model-designs/W3/design${designType}.png`);
    }
  }, [designType]);

  // Load texture with sRGB encoding
  const loadTexture = (url) => {
    return new Promise((resolve, reject) => {
      const loader = new Three.TextureLoader();
      loader.load(
        url,
        (texture) => {
          texture.encoding = Three.sRGBEncoding;
          texture.needsUpdate = true;
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  };

  useEffect(() => {
    if (layer !== null && secondaryTextureUrl) {
      loadTexture(secondaryTextureUrl)
        .then((texture) => {
          const textures = [...secondaryTextures];
          textures[layer] = texture;
          setSecondaryTextures(textures);
        })
        .catch((error) => {
          //console.error("Failed to load texture", error);
        });
    }
  }, [secondaryTextureUrl, layer]);

  useEffect(() => {
    if (modelRef.current && isDesign) {
      // Set up primary texture
      primaryTexture.wrapS = primaryTexture.wrapT = Three.RepeatWrapping;
      primaryTexture.repeat.set(1, 1);
      primaryTexture.rotation = 0;
      primaryTexture.encoding = Three.sRGBEncoding;

      // Create shader material
      // const createMaterial = (
      //   secondaryTexture,
      //   secondaryColor,
      //   isSelectedLayer
      // ) => {
      //   //console.log("secondaryColor>>>>>", secondaryColor);
      //   return new ShaderMaterial({
      //     uniforms: {
      //       primaryTexture: { value: primaryTexture },
      //       secondaryTexture: { value: secondaryTexture },
      //       secondaryColor: { value: secondaryColor },
      //       hasSecondaryTexture: { value: !!secondaryTexture },
      //       hasSecondaryColor: { value: !!secondaryColor },
      //       defaultColor: { value: new Three.Color(threeJsColor) },
      //       selectedLayer: { value: isSelectedLayer },
      //     },
      //     vertexShader: `
      //       varying vec2 vUv;
      //       void main() {
      //         vUv = uv;
      //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      //       }
      //     `,
      //     fragmentShader: `
      //       uniform sampler2D primaryTexture;
      //       uniform sampler2D secondaryTexture;
      //       uniform vec3 secondaryColor;
      //       uniform bool hasSecondaryTexture;
      //       uniform bool hasSecondaryColor;
      //       uniform vec3 defaultColor;
      //       uniform int selectedLayer;
      //       varying vec2 vUv;

      //       void main() {
      //         vec4 primaryColor = texture2D(primaryTexture, vUv);
      //         vec4 secondaryTexColor = hasSecondaryTexture ? texture2D(secondaryTexture, vUv) : vec4(1.0);
      //         vec4 secondaryColColor = hasSecondaryColor ? vec4(secondaryColor, 1.0) : vec4(1.0);
      //         vec4 secondaryColor = mix(secondaryTexColor, secondaryColColor, secondaryTexColor.a);
      //         vec4 baseColor = vec4(defaultColor, 1.0);
      //         if (selectedLayer == 1) {
      //           // Mix secondary color only if it's the selected layer
      //           gl_FragColor = mix(secondaryColor, primaryColor, primaryColor.a);
      //         } else {
      //           gl_FragColor = mix(baseColor, primaryColor, primaryColor.a);
      //         }
      //       }
      //     `,
      //     side: DoubleSide,
      //   });
      // };
      // Create shader material
      const createMaterial = (
        secondaryTexture,
        secondaryColor,
        isSelectedLayer,
        gradientColor1,
        gradientColor2,
        isGradient
      ) => {
        return new ShaderMaterial({
          uniforms: {
            primaryTexture: { value: primaryTexture },
            secondaryTexture: { value: secondaryTexture },
            secondaryColor: { value: secondaryColor },
            hasSecondaryTexture: { value: !!secondaryTexture },
            hasSecondaryColor: { value: !!secondaryColor },
            defaultColor: { value: new Three.Color(threeJsColor) },
            selectedLayer: { value: isSelectedLayer },
            gradientColor1: { value: gradientColor1 },
            gradientColor2: { value: gradientColor2 },
            isGradient: { value: isGradient },
          },
          vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
          fragmentShader: `
      uniform sampler2D primaryTexture;
      uniform sampler2D secondaryTexture;
      uniform vec3 secondaryColor;
      uniform bool hasSecondaryTexture;
      uniform bool hasSecondaryColor;
      uniform vec3 defaultColor;
      uniform int selectedLayer;
      uniform vec3 gradientColor1;
      uniform vec3 gradientColor2;
      uniform bool isGradient;
      varying vec2 vUv;

      void main() {
        vec4 primaryColor = texture2D(primaryTexture, vUv);
        vec4 secondaryTexColor = hasSecondaryTexture ? texture2D(secondaryTexture, vUv) : vec4(1.0);
        vec4 secondaryColColor = hasSecondaryColor ? vec4(secondaryColor, 1.0) : vec4(1.0);
        vec4 secondaryColor = mix(secondaryTexColor, secondaryColColor, secondaryTexColor.a);
        vec4 baseColor = vec4(defaultColor, 1.0);
        if (selectedLayer == 1) {
          if (isGradient) {
            // Calculate gradient based on vUv.y (vertical position)
            vec3 gradientColor = mix(gradientColor1, gradientColor2, vUv.y);
            // Mix secondary color only if it's the selected layer
            gl_FragColor = mix(vec4(gradientColor, 1.0), primaryColor, primaryColor.a);
          } else {
            // Mix secondary color only if it's the selected layer
            gl_FragColor = mix(secondaryColor, primaryColor, primaryColor.a);
          }
        } else {
          gl_FragColor = mix(baseColor, primaryColor, primaryColor.a);
        }
      }
    `,
          side: DoubleSide,
        });
      };

      modelRef.current.children.forEach((child, index) => {
        if (child.isMesh) {
          const isSelectedLayer = index === colorIndex;
          const secondaryTexture = secondaryTextures[index] || null;
          const secondaryColor =
            new Three.Color(secondaryColors[index]) ||
            new Three.Color(threeJsColor);
          const gradientColor1 = new Three.Color(color[index]);
          const gradientColor2 = new Three.Color(gradient[index]);
          const material = createMaterial(
            secondaryTexture,
            secondaryColor,
            true,
            gradientColor1,
            gradientColor2,
            isGradient
          );
          child.material = material;
        }
      });
    }
  }, [
    modelRef,
    primaryTexture,
    secondaryTextures,
    secondaryColors,
    layerColor,
    layer,
    isDesign,
  ]);

  // NUMBER STATES
  const [number1Position, setNumber1Position] = useState([0, 0, 2]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (numberPosition === 1) {
      setNumber1Position([0, 0, 2]);
      setNumber1Scale([4.5, 2.5, 2]);
      setNumber1Rotation(0);
    } else if (numberPosition === 2) {
      setNumber1Position([0, 1.6, 0]);
      setNumber1Rotation(180);
    } else if (numberPosition === 3) {
      setNumber1Position([0.6, 1.4, 2]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    } else if (numberPosition === 4) {
      setNumber1Position([-0.7, 1.4, 2]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    }
  }, [numberPosition]);

  // NAME STATES
  const name1Scale = [4.5, 2.5, 10];
  const [name1FontSize, setName1FontSize] = useState(1);
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
    } else if (namePosition === 3) {
      setName1Rotation([0, degToRad(90), 0]);
      setNumber1Rotation(90);
    } else if (namePosition === 4) {
      setName1Rotation([0, degToRad(270), 0]);
      setNumber1Rotation(270);
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
      setName1FontSize(1); // Default font size
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
  const logoTexture = useTexture(logo || "./textures/pattern7.png");
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

  // Effects for setting up material properties
  useEffect(() => {
    if (modelRef.current) {
      // Set up material properties
      modelRef.current.children.forEach((element) => {
        element.material.side = DoubleSide;
      });

      // Update reference in the store
      updateRef(modelRef);
    }
  }, []);

  useEffect(() => {
    if (!isDesign && layer) {
      secondaryTexture.wrapS = secondaryTexture.wrapT = Three.RepeatWrapping;
      secondaryTexture.repeat.set(1, 1);
      secondaryTexture.rotation = 0;
      secondaryTexture.encoding = Three.sRGBEncoding;
      secondaryTexture.needsUpdate = true;

      const material = modelRef.current.children[layer].material;

      // Set the secondary texture as the map
      material.map = secondaryTexture;

      // Assuming the secondaryTexture has an alpha channel, use it as the alpha map
      material.alphaMap = secondaryTexture;
      // material.transparent = true;
      // material.alphaTest = 0.5; // Adjust as needed to handle transparency cutoff

      // Set other properties
      material.aoMap = secondaryTexture;
      material.aoMapIntensity = 1;
      material.lightMapIntensity = 20;
      material.needsUpdate = true;
    }
  }, [secondaryTexture, layer, isDesign]);

  console.log("gradient[2]", gradient[2]);
  console.log("gradient[3]", gradient[3]);
  console.log("color", color);
  console.log("gradientScale", gradientScale);

  return (
    <>
      {/* Ambient light and orbit controls */}
      <ambientLight intensity={6} />
      <OrbitControls
        ref={orbitRef}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
      />

      {/* Model group */}
      <group {...props} dispose={null}>
        <motion.group
          scale={1}
          ref={modelRef}
          animate={{
            rotateY: degToRad(number1Rotation),
            transition: { duration: 0.5 },
          }}
        >
          {/* Individual meshes of the model */}
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_1.geometry}
            material={materials.blinn2}
            name="Left Sleeve Upper"
          >
            {gradient[0] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[0] || 0.1]} // As many stops as you want
                  colors={[color[0] || "transparent", gradient[0]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}

            {modelName && namePosition === 3 && (
              <Decal
                {...bind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                position={[0.5, 1.8, 1]}
                rotation={[90, 90, -90]}
                scale={name1Scale}
                origin={[0, 0, 0]}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-5}
                >
                  <RenderTexture attach="map">
                    <PerspectiveCamera
                      makeDefault
                      manual
                      aspect={2}
                      position={[-0.4, 1.6, 2.9]}
                    />
                    {hovered && (
                      <color attach="background" args={["#279954"]} />
                    )}
                    <Text
                      rotation={[320, 360, -0.2]}
                      fontSize={0.5}
                      position={[-0.2, 0.8, -0.9]}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font3
                          : nameFont === 3
                          ? font3
                          : nameFont === 4
                          ? font4
                          : nameFont === 5
                          ? font5
                          : nameFont === 6
                          ? font6
                          : nameFont === 7
                          ? font7
                          : nameFont === 8
                          ? font8
                          : nameFont === 9
                          ? font9
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_7.geometry}
            material={materials.blinn4}
            name="Right Sleeve Upper"
          >
            {gradient[1] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[1] || 0.1]} // As many stops as you want
                  colors={[color[1] || "transparent", gradient[1]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
            {modelName && namePosition === 4 && (
              <Decal
                {...bind()}
                onPointerEnter={toggleHovered}
                onPointerLeave={toggleHovered}
                position={[0.5, -1, 1]}
                rotation={[180, 180, -20.1]}
                scale={name1Scale}
                origin={[0, 0, 0]}
              >
                <meshStandardMaterial
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-5}
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
                      rotation={[320, 360, 0]}
                      fontSize={0.5}
                      position={[0, 0, -0.9]}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font8
                          : nameFont === 3
                          ? font3
                          : nameFont === 4
                          ? font4
                          : nameFont === 5
                          ? font5
                          : nameFont === 6
                          ? font6
                          : nameFont === 7
                          ? font7
                          : nameFont === 8
                          ? font8
                          : nameFont === 9
                          ? font9
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_4.geometry}
            material={materials.blinn3}
            name="Front Side"
          >
            {(numberPosition === 1 ||
              numberPosition === 3 ||
              numberPosition === 4) && (
              <Decal
                // debug={true}
                position={[0, 1.5, 1]}
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
                      position={[0, 0.1, 2.5]}
                    />

                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={1.2}
                      color={numberColor || "black"}
                      outlineColor={numberOutline || "black"}
                      outlineWidth={numberOutline ? 0.05 : 0}
                      font={
                        numberFont === 1
                          ? font1
                          : numberFont === 2
                          ? font8
                          : numberFont === 3
                          ? font3
                          : numberFont === 4
                          ? font4
                          : numberFont === 5
                          ? font5
                          : numberFont === 6
                          ? font6
                          : numberFont === 7
                          ? font7
                          : numberFont === 8
                          ? font8
                          : numberFont === 9
                          ? font9
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
                      fontSize={0.5}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font8
                          : nameFont === 3
                          ? font3
                          : nameFont === 4
                          ? font4
                          : nameFont === 5
                          ? font5
                          : nameFont === 6
                          ? font6
                          : nameFont === 7
                          ? font7
                          : nameFont === 8
                          ? font8
                          : nameFont === 9
                          ? font9
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            {gradient[2] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[2] || 0.1]} // As many stops as you want
                  colors={[color[2] || "transparent", gradient[2]]} // Colors need to match the number of stops
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
            geometry={nodes.Dress_1_Group6255_0005_2.geometry}
            material={materials.blinn1}
            name="Back Side"
          >
            {gradient[3] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[3] || 0.1]} // As many stops as you want
                  colors={[color[3] || "transparent", gradient[3]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}

            {numberPosition === 2 && (
              <Decal
                position={number1Position}
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
                          ? font8
                          : numberFont === 3
                          ? font3
                          : numberFont === 4
                          ? font4
                          : numberFont === 5
                          ? font5
                          : numberFont === 6
                          ? font6
                          : numberFont === 7
                          ? font7
                          : numberFont === 8
                          ? font8
                          : numberFont === 9
                          ? font9
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
                      fontSize={0.5}
                      color={nameColor || "black"}
                      outlineColor={nameOutline || "black"}
                      outlineWidth={nameOutline ? 0.05 : 0}
                      font={
                        nameFont === 1
                          ? font1
                          : nameFont === 2
                          ? font8
                          : nameFont === 3
                          ? font3
                          : nameFont === 4
                          ? font4
                          : nameFont === 5
                          ? font5
                          : nameFont === 6
                          ? font6
                          : nameFont === 7
                          ? font7
                          : nameFont === 8
                          ? font8
                          : nameFont === 9
                          ? font9
                          : font1
                      }
                    >
                      {modelName}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
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
            geometry={nodes.Dress_1_Group6255_0005_6.geometry}
            material={materials.lambert3}
            name="Front Collar"
          >
            {gradient[4] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[4] || 0.1]} // As many stops as you want
                  colors={[color[4] || "transparent", gradient[4]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_5.geometry}
            material={materials.blinn5}
            name="Back Collar"
          >
            {gradient[5] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[5] || 0.1]} // As many stops as you want
                  colors={[color[5] || "transparent", gradient[5]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>

          <mesh
            geometry={nodes.Dress_1_Group6255_0005_3.geometry}
            material={materials.lambert2}
            name="Left Sleeve Inner"
          >
            {gradient[6] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[6] || 0.6]} // As many stops as you want
                  colors={[color[6] || "transparent", gradient[6]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_8.geometry}
            material={materials.Dress_1_Gr}
            name="Right Sleeve Inner"
          >
            {gradient[7] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[7] || 0.1]} // As many stops as you want
                  colors={[color[7] || "transparent", gradient[7]]} // Colors need to match the number of stops
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

// Preload the GLTF model
useGLTF.preload("/long-sleeve-jersey.glb");