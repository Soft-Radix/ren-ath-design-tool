// ----------------------------- React imports ----------------------------------
import React, { useEffect, useRef, useState } from "react";

// ----------------------------- Framer motion imports --------------------------
import { motion } from "framer-motion-3d";

// ----------------------------- Store import -----------------------------------
import { useProductStore } from "../../../src/store";

// ----------------------------- Utils function imports -------------------------
import {
  calculateScale,
  transformGradientScale,
} from "../../../src/utils/funtions";

// ----------------------------- Components import ------------------------------
import GradientText from "../../../src/components/common/gradientText/GradientText";
import LogoDecal from "../../../src/components/common/logoDecal";
import NameDecal from "../../../src/components/common/nameDecal";
import SleeveDecalName from "../../../src/components/common/sleeveNameDecal";

// ----------------------------- Fonts import ------------------------------------
import font3 from "../../../src/assets/fonts/BebasNeue.ttf";
import font5 from "../../../src/assets/fonts/Freshman.ttf";
import font6 from "../../../src/assets/fonts/Impact.ttf";
import font7 from "../../../src/assets/fonts/MachineRegular.ttf";
import font8 from "../../../src/assets/fonts/Oswald-VariableFont_wght.ttf";
import font1 from "../../../src/assets/fonts/Roboto.ttf";
import font9 from "../../../src/assets/fonts/SawarabiGothic-Regular.ttf";
import font4 from "../../../src/assets/fonts/TiltNeon.ttf";

// ----------------------------- React three and use-gesture imports --------------
import {
  Decal,
  GradientTexture,
  PerspectiveCamera,
  RenderTexture,
  useCursor,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import * as Three from "three";
import { DoubleSide, ShaderMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

// ---------------------------- A variable for initial color in custom shader ----
const hexColor = "#D2D1D3";
// Extract RGB components from the hexadecimal color
const r = parseInt(hexColor.substring(1, 3), 16) / 255;
const g = parseInt(hexColor.substring(3, 5), 16) / 255;
const b = parseInt(hexColor.substring(5, 7), 16) / 255;
const threeJsColor = new Three.Color(r, g, b); // Create a Three.js Color instance using the RGB values

//** ---------------- Main code of Model >>>> Here is the jsx responsible for all behaviour or change of model in browser -----------------------
export function Model(props) {
  // initialise model glb file
  const { nodes, materials } = useGLTF("./models/W3/long-sleeve-jersey.glb");

  // Set Camera Position
  const camera = useThree((state) => state.camera);

  // React useState
  const [secondaryTextures, setSecondaryTextures] = useState([]);
  const [secondaryColors, setSecondaryColors] = useState([]);

  const [modelLogoPosition, setModelLogoPosition] = useState([
    0, 0.9, 0.3333333,
  ]);
  const [modelLogoPosition2, setModelLogoPosition2] = useState([0, 1, 1]);
  const [logoRotation, setLogoRotation] = useState([0, 0, 0]);

  // NAME STATES
  const name1Scale = [4.5, 2.5, 10];
  const [name1FontSize, setName1FontSize] = useState(1);
  const [name1Position, setName1Position] = useState([0, 0, 1]);
  const [name2Position, setName2Position] = useState([0, 0, 1]);
  const [name1Rotation, setName1Rotation] = useState([0, 0, 0]);
  const [hovered, setHovered] = useState(false);

  // NUMBER STATES
  const [number1Position, setNumber1Position] = useState([0, 0, 2]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);

  // State for primary texture URL (for dynamic texture changes)
  const [designTexture, setDesignTexture] = useState(
    "./model-designs/W3/design1.png"
  );
  const [secondaryTextureUrl, setSecondaryTextureUrl] = useState(
    "./textures/pattern2.png"
  );

  const [loading, setLoading] = useState(false);
  const primaryTexture = useTexture(designTexture);
  const secondaryTexture = useTexture(secondaryTextureUrl);
  const [combinedLogos, setCombinedLogos] = useState({});
  const [combinedNames, setCombinedNames] = useState({});
  const [decalPositions1, setDecalPositions1] = useState(
    [[0, 0, 1]] // Initialize positions array with default values
  );
  const [decalPositions2, setDecalPositions2] = useState(
    [[0, 0, 1]] // Initialize positions array with default values
  );
  const [decalPositions3, setDecalPositions3] = useState(
    [[-0, 0, 0.333333]] // Initialize positions array with default values
  );
  const [decalPositions4, setDecalPositions4] = useState(
    [[1, 0.5, 0.111111]] // Initialize positions array with default values
  );

  const [nameDecalPositions1, setNameDecalPositions1] = useState(
    [[0, 0, 1]] // Initialize positions array with default values
  );
  const [nameDecalPositions2, setNameDecalPositions2] = useState(
    [[0, 0, 1]] // Initialize positions array with default values
  );
  const [nameDecalPositions3, setNameDecalPositions3] = useState(
    [[0.5, 1.8, 1]] // Initialize positions array with default values
  );
  const [nameDecalPositions4, setNameDecalPositions4] = useState(
    [[0.6, -1.2, 1.1]] // Initialize positions array with default values
  );
  const normal = useTexture("./model-designs/W3/normal.png");

  // state to update color of each layer
  const [layerColor, setLayerColor] = useState(threeJsColor);

  // useProductStore initialise and get states from store
  const {
    color,
    gradient2,
    gradient,
    gradientScale,
    gradientAngle,
    designGradientAngle,
    designScale,
    pattern,
    isGradient,
    updateRef,
    number,
    numberPosition,
    numberFont,
    numberAngle,
    numberColor,
    numberOutline,
    numberGradientColor,
    modelName,
    namePosition,
    nameFont,
    nameColor,
    nameOutline,
    nameScale,
    isNumberGradientColor,
    numberScale,
    nameGradientColor,
    isNameGradientColor,
    nameGradientScale,
    nameGradientAngle,
    logo,
    logoPosition,
    logoScale,
    logoAngle,
    colorIndex,
    designType,
    layer,
    isDesign,
    orbitalRef,
    modelRotation,
    designColor,
    patternScale,
    patternColor,
    designGradient1,
    designGradient2,
    isDesignGradientEnabled,
    updatedLogos,
    updatedNames,
  } = useProductStore((state) => state);

  // Load 3D model and textures

  // References
  const orbitRef = useRef();
  const modelRef = useRef();

  // effect to update set colorLayer state
  useEffect(() => {
    let changeColor;
    const colorsCollection = [...secondaryColors];
    if (colorIndex !== null) {
      changeColor = color[colorIndex];
      if (colorIndex == 0 || colorIndex % 2 == 0) {
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
          setLoading({ ...loading, [layer]: true });
          const textures = [...secondaryTextures];
          textures[layer] = texture;
          setSecondaryTextures(textures);
          setTimeout(() => {
            setLoading({ ...loading, [layer]: false });
          }, 1000);
        })
        .catch((error) => {
          //console.error("Failed to load texture", error);
        });
    }
  }, [secondaryTextureUrl, layer]);

  useEffect(() => {
    if (modelRef.current) {
      // Set up primary texture
      primaryTexture.wrapS = primaryTexture.wrapT = Three.RepeatWrapping;
      primaryTexture.repeat.set(1, 1);
      primaryTexture.rotation = 0;
      primaryTexture.encoding = Three.sRGBEncoding;

      const createMaterial = (
        secondaryTexture,
        secondaryColor,
        isSelectedLayer,
        gradientColor1,
        gradientColor2,
        isGradient,
        gradientScale,
        primaryColor,
        patternScale,
        newColor,
        primaryGradientColor1,
        primaryGradientColor2,
        isPrimaryGradient,
        normalMap,
        gradientRotationAngle, // Pass rotation angle as an argument
        primaryGradientRotationAngle, // Pass primary gradient rotation angle
        isPattern,
        index
      ) => {
        const uniforms = {
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
          gradientScale: { value: gradientScale ?? 0.8 },
          ambientLightColor: { value: new Three.Color(0xf3f3f3) },
          directionalLightColor: { value: new Three.Color(0xf3f3f3) },
          directionalLightDirection: { value: new Three.Vector3(-9, 9, 11) },
          patternScale: { value: patternScale || 1 },
          isPrimaryGradient: { value: isPrimaryGradient },
          primaryGradientColor1: { value: primaryGradientColor1 },
          primaryGradientColor2: { value: primaryGradientColor2 },
          normalMap: { value: normalMap },
          gradientRotationAngle: { value: gradientRotationAngle || 0 }, // Add rotation angle uniform
          primaryGradientRotationAngle: {
            value: primaryGradientRotationAngle || 0,
          }, // Add primary gradient rotation angle uniform
          hasPrimaryColor: { value: !!primaryColor },
          primaryColor: {
            value: primaryColor
              ? new Three.Color(primaryColor)
              : new Three.Color(0, 0, 0),
          },
          isPattern: { value: isPattern },
        };

        if (newColor) {
          uniforms.newColor = { value: new Three.Color(newColor) };
        }

        if (secondaryTexture) {
          secondaryTexture.wrapS = secondaryTexture.wrapT =
            Three.ClampToEdgeWrapping; // Use ClampToEdgeWrapping to avoid repeating
        }

        return new ShaderMaterial({
          uniforms,
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec3 vTangent;
            varying vec3 vBitangent;
      
            attribute vec4 tangent;
      
            void main() {
              vUv = uv;
      
              vNormal = normalize(normalMatrix * normal);
              vTangent = normalize(normalMatrix * tangent.xyz);
              vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vViewPosition = -mvPosition.xyz;
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform sampler2D primaryTexture;
            uniform vec3 primaryColor;
            uniform bool hasPrimaryColor;
            uniform sampler2D secondaryTexture;
            uniform vec3 secondaryColor;
            uniform vec3 newColor;
            uniform bool hasSecondaryTexture;
            uniform bool isPattern;
            uniform bool hasSecondaryColor;
            uniform vec3 defaultColor;
            uniform int selectedLayer;
            uniform vec3 gradientColor1;
            uniform vec3 gradientColor2;
            uniform bool isGradient;
            uniform float gradientScale;
            uniform vec3 ambientLightColor;
            uniform vec3 directionalLightColor;
            uniform vec3 directionalLightDirection;
            uniform float patternScale;
            uniform bool isPrimaryGradient;
            uniform vec3 primaryGradientColor1;
            uniform vec3 primaryGradientColor2;
            uniform sampler2D normalMap;
            uniform float gradientRotationAngle; // Add this uniform for gradient rotation
            uniform float primaryGradientRotationAngle; // Add this uniform for primary gradient rotation
      
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec3 vTangent;
            varying vec3 vBitangent;
      
            void main() {
              vec4 primaryTexColor = texture2D(primaryTexture, vUv);
      
              vec4 coloredPrimaryTexColor = primaryTexColor;
              if (hasPrimaryColor) {
                vec4 primaryColColor = vec4(primaryColor, 1.0);
                coloredPrimaryTexColor = vec4(mix(primaryTexColor.rgb, primaryColColor.rgb, primaryTexColor.a), primaryTexColor.a);
              }
      
              if (isPrimaryGradient) {
                // Apply rotation to the primary gradient direction
                float cosThetaPrimary = cos(primaryGradientRotationAngle);
                float sinThetaPrimary = sin(primaryGradientRotationAngle);
                mat2 rotationMatrixPrimary = mat2(cosThetaPrimary, -sinThetaPrimary, sinThetaPrimary, cosThetaPrimary);
                
                // Rotate the gradient vector
                vec2 rotatedUvPrimary = (rotationMatrixPrimary * (vUv - 0.5)) + 0.5;
      
                float gradientPosition = smoothstep(0.15 * gradientScale, 0.75 * gradientScale, rotatedUvPrimary.y);
                vec3 gradientColor = mix(primaryGradientColor1, primaryGradientColor2, gradientPosition);
                vec4 gradientColorWithAlpha = vec4(gradientColor, 1.0);
                coloredPrimaryTexColor = mix(coloredPrimaryTexColor, gradientColorWithAlpha, coloredPrimaryTexColor.a);
              }
      
              // Scale the UV coordinates for the secondary texture
              vec2 scaledUv = vUv / patternScale;
              vec4 secondaryTexColor = hasSecondaryTexture ? texture2D(secondaryTexture, scaledUv) : vec4(1.0);
              secondaryTexColor.a = isPattern  ? secondaryTexColor.a : 1.0 - secondaryTexColor.a;
      
              vec4 coloredSecondaryTexColor = secondaryTexColor;
              if (newColor != vec3(0.0)) {
                vec4 newColColor = vec4(newColor, 1.0);
                coloredSecondaryTexColor = vec4(mix(secondaryTexColor.rgb, newColColor.rgb, secondaryTexColor.a), secondaryTexColor.a);
              }
      
              vec4 secondaryColColor = hasSecondaryColor ? vec4(secondaryColor, 1.0) : vec4(1.0);
              vec4 finalSecondaryColor = mix(secondaryColColor, coloredSecondaryTexColor, coloredSecondaryTexColor.a);
      
              vec4 baseColor = vec4(defaultColor, 1.0);
      
              // Normal Map perturbation
              vec3 normal = normalize(vNormal);
              vec3 tangent = normalize(vTangent);
              vec3 bitangent = normalize(vBitangent);
              mat3 tbnMatrix = mat3(tangent, bitangent, normal);
              vec3 perturbedNormal = texture2D(normalMap, vUv).rgb * 2.0 - 1.0;
              perturbedNormal = normalize(tbnMatrix * perturbedNormal);
      
              vec3 lightDir = normalize(directionalLightDirection);
              float diff = max(dot(perturbedNormal, lightDir), 0.0);
              vec3 diffuse = diff * directionalLightColor * 0.7;
              vec3 ambient = ambientLightColor * 0.7;
      
              vec3 lighting = ambient + diffuse;
      
              vec4 finalColor = baseColor;
      
              if (selectedLayer == 1) {
                if (isGradient) {
                  // Apply rotation to the gradient direction
                  float cosTheta = cos(gradientRotationAngle);
                  float sinTheta = sin(gradientRotationAngle);
                  mat2 rotationMatrix = mat2(cosTheta, -sinTheta, sinTheta, cosTheta);
                  
                  // Rotate the gradient vector
                  vec2 rotatedUv = (rotationMatrix * (vUv - 0.5)) + 0.5;
      
                  float gradientPosition = smoothstep(0.15 * gradientScale, 0.75 * gradientScale, rotatedUv.y);
                  vec3 gradientColor = mix(gradientColor1, gradientColor2, gradientPosition);
      
                  vec4 gradientColorWithAlpha = vec4(gradientColor, 1.0);
                  vec4 blendedColor = mix(finalSecondaryColor, gradientColorWithAlpha, 1.0 - coloredSecondaryTexColor.a);
                  finalColor = vec4(mix(blendedColor.rgb, coloredPrimaryTexColor.rgb, coloredPrimaryTexColor.a), 1.0);
                } else {
                  finalColor = vec4(mix(finalSecondaryColor.rgb, coloredPrimaryTexColor.rgb, coloredPrimaryTexColor.a), 1.0);
                }
              } else {
                finalColor = vec4(mix(finalSecondaryColor.rgb, coloredPrimaryTexColor.rgb, coloredPrimaryTexColor.a), 1.0);
              }
      
              gl_FragColor = vec4(finalColor.rgb * lighting, finalColor.a);
            }
          `,
          side: Three.DoubleSide,
        });
      };

      // Loop through each child of modelRef.current and apply the material
      modelRef.current.children.forEach((child, index) => {
        if (child.isMesh) {
          const isSelectedLayer = index === colorIndex;
          const secondaryTexture = !loading[index]
            ? secondaryTextures[index] || null
            : threeJsColor;
          const secondaryColor = new Three.Color(
            secondaryColors[index] ?? threeJsColor
          );
          const gradientColor1 = new Three.Color(gradient2[index]);
          const gradientColor2 = new Three.Color(gradient[index]);
          const gradientBool = isGradient ? isGradient[index] : false;
          const primaryGradientColor1 = new Three.Color(designGradient1[index]);
          const primaryGradientColor2 = new Three.Color(designGradient2[index]);
          const gradientscale =
            index === 6 || index === 7
              ? transformGradientScale(gradientScale[index])
              : gradientScale[index] ?? designScale[index];

          const rotationAngle = gradientAngle[index] * (Math.PI / 180);
          const rotationAngle2 = designGradientAngle[index] * (Math.PI / 180);
          const designcolor = designColor[index];
          const isPattern = secondaryTextures[index] ? true : false;
          const material = createMaterial(
            secondaryTexture,
            secondaryColor,
            true,
            gradientColor1,
            gradientColor2,
            gradientBool,
            gradientscale,
            designcolor,
            patternScale[index],
            patternColor[index],
            primaryGradientColor1,
            primaryGradientColor2,
            isDesignGradientEnabled,
            normal, // Pass the normal map as an argument
            rotationAngle, // Pass the rotation angle
            rotationAngle2,
            isPattern,
            index
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
    gradient,
    gradient2,
    gradientScale,
    designColor,
    patternScale,
    patternColor,
    designGradient1,
    designGradient2,
    isDesignGradientEnabled,
    normal, // Add normal to dependency array
    designScale,
    gradientAngle,
    designGradientAngle,
    loading,
  ]);

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (number[2]) {
      setNumber1Position([0, 0, 2]);
      setNumber1Scale([4.5, 2.5, 2]);
      setNumber1Rotation(0);
    } else if (number[3]) {
      setNumber1Position([0, 1.6, 0]);
      setNumber1Rotation(180);
    }
  }, [number]);

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    if (modelName[2]) {
      setName1Rotation([0, 0, 0]);
      setNumber1Rotation(0);
    } else if (modelName[3]) {
      setName1Rotation([0, degToRad(180), 0]);
      setNumber1Rotation(180);
    } else if (modelName[0]) {
      setName1Rotation([0, degToRad(90), 0]);
      setNumber1Rotation(90);
    } else if (modelName[1]) {
      setName1Rotation([0, degToRad(270), 0]);
      setNumber1Rotation(270);
    }
  }, [modelName]);

  // CHANGE CURSOR DEFAULT TO POINTER
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
  const bindFront = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

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
  const logoTexture = useTexture(combinedLogos[1] || "./textures/pattern2.png");

  // HANDLE TEXT DRAG ON FIRST LAYER
  const bindBack = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      const xPos = -(x * 0.02);
      const yPos = -(y * 0.03);

      const finalPosition = [
        xPos < 2 && xPos > -2 ? xPos : name2Position[0],
        yPos < 6.5 && yPos > -7 ? yPos : name2Position[1],
        name2Position[2],
      ];

      setName2Position(finalPosition);
    },
    { pointerEvents: true }
  );
  // HANDLE LOGO STATES
  const logoTexture1 = useTexture(
    combinedLogos[1] || "./textures/pattern2.png"
  );
  const logoTexture2 = useTexture(
    combinedLogos[2] || "./textures/pattern2.png"
  );
  const logoTexture3 = useTexture(
    combinedLogos[3] || "./textures/pattern2.png"
  );
  const logoTexture4 = useTexture(
    combinedLogos[4] || "./textures/pattern2.png"
  );

  // HANDLE TEXT DRAG ON FIRST LAYER
  const logoBind = useDrag(
    ({ offset: [x, y], down }) => {
      orbitalRef.current.enabled = !down;
      orbitalRef.current.cursor = "pointer";

      let xPos = x * 0.009;
      let yPos = -(y * 0.009);

      // Ensure positions are within bounds
      xPos = Math.min(2, Math.max(-2, xPos));
      yPos = Math.min(5.5, Math.max(-6, yPos));

      const finalPosition = [xPos, yPos, modelLogoPosition[2]];

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
    if (!isDesign && layer != null) {
      secondaryTexture.wrapS = secondaryTexture.wrapT = Three.RepeatWrapping;
      secondaryTexture.repeat.set(5, 5);
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
      // material.aoMap = secondaryTexture;
      material.aoMapIntensity = 1;
      material.lightMapIntensity = 20;
      material.needsUpdate = true;
    }
  }, [secondaryTexture, layer, isDesign]);

  useEffect(() => {
    setNumber1Rotation(modelRotation);
  }, [modelRotation]);

  const combineKeys = (object) => {
    const combined = { 1: [], 2: [], 3: [], 4: [] };

    Object.values(object).forEach((image) => {
      Object.keys(combined).forEach((key) => {
        combined[key] = [...combined[key], ...image[key]];
      });
    });

    return combined;
  };

  useEffect(() => {
    const result = combineKeys(updatedLogos);
    setCombinedLogos(result);
    const positions1 = result?.[1]?.map(() => [0, 0, 1]);
    const positions2 = result?.[2]?.map(() => [0, 0, 1]);
    const positions3 = result?.[3]?.map(() => [-0, 0, 0.5555555]);
    const positions4 = result?.[4]?.map(() => [1, 0.5, 0.122222222]);
    setDecalPositions1([...decalPositions1, ...positions1]);
    setDecalPositions2([...decalPositions2, ...positions2]);
    setDecalPositions3([...decalPositions3, ...positions3]);
    setDecalPositions4([...decalPositions4, ...positions4]);
  }, [updatedLogos]);

  useEffect(() => {
    const result = combineKeys(updatedNames);
    setCombinedNames(result);
    const positions1 = result?.[1]?.map(() => [0, 0, 1]);
    const positions2 = result?.[2]?.map(() => [0, 0, 1]);
    const positions3 = result?.[3]?.map(() => [0.5, 1.8, 1]);
    const positions4 = result?.[4]?.map(() => [0.6, -1.2, 1.1]);
    setNameDecalPositions1([...nameDecalPositions1, ...positions1]);
    setNameDecalPositions2([...nameDecalPositions2, ...positions2]);
    setNameDecalPositions3([...nameDecalPositions3, ...positions3]);
    setNameDecalPositions4([...nameDecalPositions4, ...positions4]);
  }, [updatedNames]);

  return (
    <>
      {/* Ambient light and orbit controls */}
      <ambientLight intensity={6} />
      {/* <OrbitControls
        ref={orbitRef}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
      /> */}

      {/* Model group */}
      <group {...props} dispose={null}>
        <motion.group
          scale={1.2}
          ref={modelRef}
          animate={{
            rotateY: degToRad(number1Rotation),
            transition: { duration: 0.7, ease: "easeOut" },
          }}
          transition={{ ease: "easeIn", duration: 0.7 }}
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
            {combinedLogos?.[3]?.length > 0 &&
              combinedLogos?.[3]?.map((item, index) => {
                return (
                  <LogoDecal
                    index={index}
                    key={index + item}
                    logoScale={logoScale}
                    toggleHovered={toggleHovered}
                    logoTexture={logoTexture3}
                    modelLogoPosition={decalPositions3[index]}
                    item={item}
                    orbitalRef={orbitalRef}
                    logoPosition={3}
                    logoRotation={[0, degToRad(270), 0]}
                    setModelLogoPosition={(position) => {
                      const newPositions = [...decalPositions3];
                      newPositions[index] = position;
                      setDecalPositions3(newPositions);
                    }}
                  />
                );
              })}

            {combinedNames?.[3]?.length > 0 &&
              combinedNames?.[3]?.map((item, index) => {
                return (
                  <SleeveDecalName
                    item={item}
                    namePosition={3}
                    toggleHovered={toggleHovered}
                    index={index}
                    key={index + item}
                    orbitalRef={orbitalRef}
                    setNameDecalPosition={(position) => {
                      const newPositions = [...nameDecalPositions3];
                      newPositions[index] = position;
                      setNameDecalPositions3(newPositions);
                    }}
                    nameDecalPosition={nameDecalPositions3[index]}
                    nameRotation={[90, 90, -90]}
                    nameScale={[nameScale[item] ?? 3, nameScale[item] ?? 3, 10]}
                    origin={[0, 0, 0]}
                    nameColor={nameColor[item]}
                    nameGradientColor={nameGradientColor[item]}
                    nameOutline={nameOutline[item]}
                    nameGradientAngle={nameGradientAngle[item]}
                    nameGradientScale={nameGradientScale[item]}
                    isNameGradientColor={isNameGradientColor}
                    fontSize={0.5}
                    font={
                      nameFont[item] == 1
                        ? font1
                        : nameFont[item] == 2
                        ? font3
                        : nameFont[item] == 3
                        ? font3
                        : nameFont[item] == 4
                        ? font4
                        : nameFont[item] == 5
                        ? font5
                        : nameFont[item] == 6
                        ? font6
                        : nameFont[item] == 7
                        ? font7
                        : nameFont[item] == 8
                        ? font8
                        : nameFont[item] == 9
                        ? font9
                        : font1
                    }
                  />

                  /* <NameDecal
                    modelNamePosition={nameDecalPositions3[index]}
                    toggleHovered={toggleHovered}
                    index={index}
                    isNameGradientColor={isNameGradientColor}
                    name={item}
                    nameColor={nameColor[item]}
                    nameFont={
                      nameFont[item] == 1
                        ? font1
                        : nameFont[item] == 2
                        ? font8
                        : nameFont[item] == 3
                        ? font3
                        : nameFont[item] == 4
                        ? font4
                        : nameFont[item] == 5
                        ? font5
                        : nameFont[item] == 6
                        ? font6
                        : nameFont[item] == 7
                        ? font7
                        : nameFont[item] == 8
                        ? font8
                        : nameFont[item] == 9
                        ? font9
                        : font1
                    }
                    nameGradientAngle={nameGradientAngle[item]}
                    nameGradientColor={nameGradientColor[item]}
                    nameGradientScale={nameGradientScale[item]}
                    nameScale={name1Scale}
                    nameOutline={nameOutline[item]}
                    orbitalRef={orbitalRef}
                    key={item + index}
                    setModelNamePosition={(position) => {
                      const newPositions = [...nameDecalPositions3];
                      newPositions[index] = position;
                      setNameDecalPositions3(newPositions);
                    }}
                    namePosition={3}
                  /> */
                );
              })}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_7.geometry}
            material={materials.blinn4}
            name="Right Sleeve Upper"
          >
            {combinedLogos?.[4]?.length > 0 &&
              combinedLogos?.[4]?.map((item, index) => {
                return (
                  <LogoDecal
                    index={index}
                    key={index + item}
                    logoScale={logoScale}
                    toggleHovered={toggleHovered}
                    logoTexture={logoTexture4}
                    modelLogoPosition={decalPositions4[index]}
                    item={item}
                    orbitalRef={orbitalRef}
                    logoPosition={4}
                    logoRotation={[0, degToRad(90), 0]}
                    setModelLogoPosition={(position) => {
                      const newPositions = [...decalPositions4];
                      newPositions[index] = position;
                      setDecalPositions4(newPositions);
                    }}
                  />
                );
              })}

            {combinedNames?.[4]?.length > 0 &&
              combinedNames?.[4]?.map((item, index) => {
                return (
                  <SleeveDecalName
                    item={item}
                    nameDecalPosition={nameDecalPositions4[index]}
                    namePosition={4}
                    toggleHovered={toggleHovered}
                    index={index}
                    key={index + item}
                    orbitalRef={orbitalRef}
                    setNameDecalPosition={(position) => {
                      const newPositions = [...nameDecalPositions4];
                      newPositions[index] = position;
                      setNameDecalPositions4(newPositions);
                    }}
                    nameRotation={[180, 180, -20.5]}
                    nameScale={[nameScale[item] ?? 3, nameScale[item] ?? 3, 10]}
                    origin={[0, 0, 0]}
                    nameColor={nameColor[item]}
                    nameGradientColor={nameGradientColor[item]}
                    nameOutline={nameOutline[item]}
                    nameGradientAngle={nameGradientAngle[item]}
                    nameGradientScale={nameGradientScale[item]}
                    isNameGradientColor={isNameGradientColor}
                    font={
                      nameFont[item] == 1
                        ? font1
                        : nameFont[item] == 2
                        ? font8
                        : nameFont[item] == 3
                        ? font3
                        : nameFont[item] == 4
                        ? font4
                        : nameFont[item] == 5
                        ? font5
                        : nameFont[item] == 6
                        ? font6
                        : nameFont[item] == 7
                        ? font7
                        : nameFont[item] == 8
                        ? font8
                        : nameFont[item] == 9
                        ? font9
                        : font1
                    }
                  />
                );
              })}

            {gradient[1] && !isDesign && (
              <meshStandardMaterial side={DoubleSide}>
                <GradientTexture
                  stops={[0.5, gradientScale[1] || 0.1]} // As many stops as you want
                  colors={[color[1] || "transparent", gradient[1]]} // Colors need to match the number of stops
                  size={1024} // Size is optional, default = 1024
                />
              </meshStandardMaterial>
            )}
          </mesh>
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_4.geometry}
            material={materials.blinn3}
            name="Front Side"
          >
            {number[2] && (
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
                    <GradientText
                      rotation={[0, 0, 0]}
                      fontSize={1.2}
                      color1={numberColor[2]}
                      color2={numberGradientColor[2]}
                      outlineColor={numberOutline[2]}
                      isNumberGradientColor={isNumberGradientColor}
                      gradientScale={numberScale[2]}
                      gradientRotation={numberAngle[2]}
                      font={
                        numberFont[2] == 1
                          ? font1
                          : numberFont[2] == 2
                          ? font8
                          : numberFont[2] == 3
                          ? font3
                          : numberFont[2] == 4
                          ? font4
                          : numberFont[2] == 5
                          ? font5
                          : numberFont[2] == 6
                          ? font6
                          : numberFont[2] == 7
                          ? font7
                          : numberFont[2] == 8
                          ? font8
                          : numberFont[2] == 9
                          ? font9
                          : font1
                      }
                    >
                      {number[2]}
                    </GradientText>
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
            {combinedLogos?.[1]?.length > 0 &&
              combinedLogos?.[1]?.map((item, index) => {
                return (
                  <LogoDecal
                    index={index}
                    key={index + item}
                    logoScale={logoScale}
                    toggleHovered={toggleHovered}
                    logoTexture={logoTexture1}
                    modelLogoPosition={decalPositions1[index]}
                    item={item}
                    orbitalRef={orbitalRef}
                    logoPosition={1}
                    logoRotation={[0.1, 0, 0]}
                    setModelLogoPosition={(position) => {
                      const newPositions = [...decalPositions1];
                      newPositions[index] = position;
                      setDecalPositions1(newPositions);
                    }}
                  />
                );
              })}

            {combinedNames?.[1]?.length > 0 &&
              combinedNames?.[1]?.map((item, index) => {
                return (
                  <NameDecal
                    modelNamePosition={nameDecalPositions1[index]}
                    toggleHovered={toggleHovered}
                    index={index}
                    isNameGradientColor={isNameGradientColor}
                    name={item}
                    nameColor={nameColor[item]}
                    nameFont={
                      nameFont[item] == 1
                        ? font1
                        : nameFont[item] == 2
                        ? font8
                        : nameFont[item] == 3
                        ? font3
                        : nameFont[item] == 4
                        ? font4
                        : nameFont[item] == 5
                        ? font5
                        : nameFont[item] == 6
                        ? font6
                        : nameFont[item] == 7
                        ? font7
                        : nameFont[item] == 8
                        ? font8
                        : nameFont[item] == 9
                        ? font9
                        : font1
                    }
                    nameGradientAngle={nameGradientAngle[item]}
                    nameGradientColor={nameGradientColor[item]}
                    nameGradientScale={nameGradientScale[item]}
                    nameScale={calculateScale(nameScale[item])}
                    nameOutline={nameOutline[item]}
                    orbitalRef={orbitalRef}
                    key={item + index}
                    setModelNamePosition={(position) => {
                      const newPositions = [...nameDecalPositions1];
                      newPositions[index] = position;
                      setNameDecalPositions1(newPositions);
                    }}
                    namePosition={1}
                  />
                );
              })}
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

            {number[3] && (
              <Decal
                position={[0, 1.6, 0]}
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
                      position={[0, 0.1, 2.3]}
                    />
                    <GradientText
                      rotation={[0, 0, 0]}
                      fontSize={1.8}
                      color1={numberColor[3]}
                      color2={numberGradientColor[3]}
                      outlineColor={numberOutline[3]}
                      isNumberGradientColor={isNumberGradientColor}
                      gradientScale={numberScale[3]}
                      gradientRotation={numberAngle[3]}
                      font={
                        numberFont[3] == 1
                          ? font1
                          : numberFont[3] == 2
                          ? font8
                          : numberFont[3] == 3
                          ? font3
                          : numberFont[3] == 4
                          ? font4
                          : numberFont[3] == 5
                          ? font5
                          : numberFont[3] == 6
                          ? font6
                          : numberFont[3] == 7
                          ? font7
                          : numberFont[3] == 8
                          ? font8
                          : numberFont[3] == 9
                          ? font9
                          : font1
                      }
                    >
                      {number[3]}
                    </GradientText>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            {combinedLogos?.[2]?.length > 0 &&
              combinedLogos?.[2]?.map((item, index) => {
                return (
                  <LogoDecal
                    index={index}
                    key={index + item}
                    logoScale={logoScale}
                    toggleHovered={toggleHovered}
                    logoTexture={logoTexture2}
                    modelLogoPosition={decalPositions2[index]}
                    item={item}
                    orbitalRef={orbitalRef}
                    setModelLogoPosition={(position) => {
                      const newPositions = [...decalPositions2];
                      newPositions[index] = position;
                      setDecalPositions2(newPositions);
                    }}
                    logoPosition={2}
                    logoRotation={[0, Math.PI, 0]}
                  />
                );
              })}

            {combinedNames?.[2]?.length > 0 &&
              combinedNames?.[2]?.map((item, index) => {
                return (
                  <NameDecal
                    modelNamePosition={nameDecalPositions2[index]}
                    toggleHovered={toggleHovered}
                    index={index}
                    isNameGradientColor={isNameGradientColor}
                    name={item}
                    nameColor={nameColor[item]}
                    nameFont={
                      nameFont[item] == 1
                        ? font1
                        : nameFont[item] == 2
                        ? font8
                        : nameFont[item] == 3
                        ? font3
                        : nameFont[item] == 4
                        ? font4
                        : nameFont[item] == 5
                        ? font5
                        : nameFont[item] == 6
                        ? font6
                        : nameFont[item] == 7
                        ? font7
                        : nameFont[item] == 8
                        ? font8
                        : nameFont[item] == 9
                        ? font9
                        : font1
                    }
                    nameGradientAngle={nameGradientAngle[item]}
                    nameGradientColor={nameGradientColor[item]}
                    nameGradientScale={nameGradientScale[item]}
                    nameScale={calculateScale(nameScale[item])}
                    nameOutline={nameOutline[item]}
                    orbitalRef={orbitalRef}
                    key={item + index}
                    setModelNamePosition={(position) => {
                      const newPositions = [...nameDecalPositions2];
                      newPositions[index] = position;
                      setNameDecalPositions2(newPositions);
                    }}
                    namePosition={2}
                  />
                  // <Decal
                  //   {...bindBack()}
                  //   onPointerEnter={toggleHovered}
                  //   onPointerLeave={toggleHovered}
                  //   position={name2Position}
                  //   rotation={[0, degToRad(180), 0]}
                  //   scale={calculateScale(nameScale[item])}
                  //   origin={[0, 0, 0]}
                  // >
                  //   <meshStandardMaterial
                  //     transparent
                  //     polygonOffset
                  //     polygonOffsetFactor={-1}
                  //   >
                  //     <RenderTexture attach="map">
                  //       <PerspectiveCamera
                  //         makeDefault
                  //         manual
                  //         aspect={2}
                  //         position={[0, 0.1, 2.5]}
                  //       />

                  //       <GradientText
                  //         color1={nameColor[item]}
                  //         color2={nameGradientColor[item]}
                  //         outlineColor={nameOutline[item]}
                  //         isNumberGradientColor={isNameGradientColor}
                  //         rotation={[0, 0, 0]}
                  //         fontSize={0.5}
                  //         gradientRotation={nameGradientAngle[item]}
                  //         gradientScale={nameGradientScale[item]}
                  //         font={
                  //           nameFont[item] == 1
                  //             ? font1
                  //             : nameFont[item] == 2
                  //             ? font8
                  //             : nameFont[item] == 3
                  //             ? font3
                  //             : nameFont[item] == 4
                  //             ? font4
                  //             : nameFont[item] == 5
                  //             ? font5
                  //             : nameFont[item] == 6
                  //             ? font6
                  //             : nameFont[item] == 7
                  //             ? font7
                  //             : nameFont[item] == 8
                  //             ? font8
                  //             : nameFont[item] == 9
                  //             ? font9
                  //             : font1
                  //         }
                  //       >
                  //         {item}
                  //       </GradientText>
                  //     </RenderTexture>
                  //   </meshStandardMaterial>
                  // </Decal>
                );
              })}
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
