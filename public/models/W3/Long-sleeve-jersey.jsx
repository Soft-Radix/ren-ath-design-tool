import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as Three from "three";
import { DoubleSide, ShaderMaterial } from "three";
import { useProductStore } from "../../../src/store";
import { useThree } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
const hexColor = "#D2D1D3";

// Extract RGB components from the hexadecimal color
const r = parseInt(hexColor.substring(1, 3), 16) / 255;
const g = parseInt(hexColor.substring(3, 5), 16) / 255;
const b = parseInt(hexColor.substring(5, 7), 16) / 255;

// Create a Three.js Color instance using the RGB values
const threeJsColor = new Three.Color(r, g, b);

export function Model(props) {
  // SET CAMERA POSITION
  const camera = useThree((state) => state.camera);

  // Load 3D model and textures
  const { nodes, materials } = useGLTF("./models/W3/long-sleeve-jersey.glb");
  // State for primary texture URL (for dynamic texture changes)
  const [primaryTextureUrl, setPrimaryTextureUrl] = useState(
    "./textures/pattern3.png"
  );
  const [secondaryTextureUrl, setSecondaryTextureUrl] = useState(
    "./textures/pattern15.png"
  );
  const primaryTexture = useTexture("./textures/pattern33.png");
  const secondaryTexture = useTexture(secondaryTextureUrl); // No secondary texture for now

  // Store state and functions
  const { pattern, updateRef, color, colorIndex } = useProductStore(
    (state) => state
  );

  // NUMBER STATES
  const [number1Position, setNumber1Position] = useState([0, 2.5, 4]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);

  // state to update color of each layer
  const [layerColor, setLayerColor] = useState(null);

  // References
  const orbitRef = useRef();
  const modelRef = useRef();

  // effect to update set colorLayer state
  useEffect(() => {
    let changeColor;
    if (color[colorIndex]) {
      console.log("🚀 ~ useEffect ~ color[colorIndex]:", color[colorIndex]);
      changeColor = color[colorIndex];
    } else {
      changeColor = threeJsColor;
    }
    setLayerColor(changeColor);
  }, [color[colorIndex]]);

  // Effect to update primary texture based on pattern change
  useEffect(() => {
    if (pattern) {
      setSecondaryTextureUrl(`./textures/pattern${pattern}.png`);
    }
  }, [pattern]);

  // Effects for setting up materials and textures
  useEffect(() => {
    if (modelRef.current) {
      // Set up primary texture
      primaryTexture.wrapS = primaryTexture.wrapT = Three.RepeatWrapping;
      primaryTexture.repeat.set(1, 1);
      primaryTexture.rotation = 0;
      primaryTexture.encoding = Three.sRGBEncoding;

      // Create shader material
      const material = new ShaderMaterial({
        uniforms: {
          primaryTexture: { value: primaryTexture },
          secondaryTexture: { value: secondaryTexture },
          hasSecondaryTexture: { value: !!secondaryTexture },
          defaultColor: {
            value: new Three.Color(layerColor),
          },
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
          uniform bool hasSecondaryTexture;
          uniform vec3 defaultColor;
          varying vec2 vUv;
          void main() {
            vec4 primaryColor = texture2D(primaryTexture, vUv);
            vec4 secondaryColor = hasSecondaryTexture ? texture2D(secondaryTexture, vUv) : vec4(defaultColor, 1.0);
            gl_FragColor = mix(secondaryColor, primaryColor, primaryColor.a);
          }
        `,
        // transparent: true,
        // alphaTest: 0.5,
      });

      // Apply material to all meshes in the model
      modelRef.current.children.forEach((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });
    }
  }, [primaryTexture, secondaryTexture, layerColor]);

  // Effects for setting up material properties
  useEffect(() => {
    if (modelRef.current) {
      // Set up material properties
      modelRef.current.children.forEach((element) => {
        element.material.side = DoubleSide;
      });

      // Update reference in the store
      updateRef(modelRef);
      // camera.position.set(0, 2, 8);
    }
  }, []);

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
          scale={0.7}
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
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_3.geometry}
            material={materials.lambert2}
            name="Left Sleeve Inner"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_2.geometry}
            material={materials.blinn1}
            name="Back Side"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_4.geometry}
            material={materials.blinn3}
            name="Front Side"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_5.geometry}
            material={materials.blinn5}
            name="Back Collar"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_6.geometry}
            material={materials.lambert3}
            name="Front Collar"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_7.geometry}
            material={materials.blinn4}
            name="Right Sleeve Upper"
          />
          <mesh
            geometry={nodes.Dress_1_Group6255_0005_8.geometry}
            material={materials.Dress_1_Gr}
            name="Right Sleeve Inner"
          />
        </motion.group>
      </group>
    </>
  );
}

// Preload the GLTF model
useGLTF.preload("/long-sleeve-jersey.glb");
