import { useGLTF, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import React, { useEffect, useRef, useState } from "react";
import { ShaderMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import * as Three from "three";
import { useProductStore } from "../../../src/store";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );
  const modelRef = useRef();
  console.log("🚀 ~ Model ~ materials :", materials)

  // Import data from store
  const { designType } = useProductStore((store) => store);

  // State for primary texture URL
  const [designTexture, setDesignTexture] = useState(
    "./model-designs/W1/design1.png"
  );
  const primaryTexture = useTexture(designTexture);

  const normalTexture = useTexture("./model-designs/W1/normal.png");

  // Function to set texture properties
  const setTextureProperties = (texture) => {
    if (texture) {
      texture.wrapS = texture.wrapT = Three.RepeatWrapping;
      texture.repeat.set(1, 1); 
      texture.rotation = 0;
      texture.encoding = Three.sRGBEncoding;
    }
  };

  // Set texture properties for primary and normal textures
  useEffect(() => {
    setTextureProperties(primaryTexture);
    setTextureProperties(normalTexture);
  }, [primaryTexture, normalTexture]);

  // Update primary texture based on designType change
  useEffect(() => {
    if (designType) {
      const newTextureUrl = `./model-designs/W1/design${designType}.png`;
      setDesignTexture(newTextureUrl);
    }
  }, [designType]);

  // Apply shader material to the mesh
  useEffect(() => {
    if (modelRef.current) {
      primaryTexture.wrapS = primaryTexture.wrapT = Three.RepeatWrapping;

      modelRef.current.children.forEach((child) => {
        if (child.isMesh) {
          const uniforms = {
            primaryTexture: { value: null },
            normalMap: { value: normalTexture },
            primaryColor: { value: new Three.Color(0xffffff) },
            lightPosition: { value: new Three.Vector3(0.01, 0.08, 0.09) },
            roughness: { value:0.5 },
          };

          child.material = new ShaderMaterial({
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
              uniform sampler2D normalMap;
              uniform vec3 primaryColor;
              uniform vec3 lightPosition;
              uniform float roughness;

              varying vec2 vUv;
              varying vec3 vNormal;
              varying vec3 vViewPosition;
              varying vec3 vTangent;
              varying vec3 vBitangent;

              void main() {
                vec3 normalTex = texture2D(normalMap, vUv).rgb * 2.0 - 1.0;

                // Compute TBN matrix for normal mapping
                vec3 normal = normalize(vNormal);
                vec3 tangent = normalize(vTangent);
                vec3 bitangent = normalize(vBitangent);
                mat3 tbnMatrix = mat3(tangent, bitangent, normal);
                vec3 perturbedNormal = normalize(tbnMatrix * normalTex);

                // Lighting calculations (Phong)
                vec3 lightDir = normalize(lightPosition);
                vec3 viewDir = normalize(vViewPosition);

                // Ambient lighting
                vec3 ambient = 0.3 * primaryColor;

                // Diffuse lighting (Lambertian)
                float diffuseFactor = max(dot(perturbedNormal, lightDir), 0.0);
                vec3 diffuse = diffuseFactor * primaryColor;

                // Specular lighting (Phong)
                vec3 reflectDir = reflect(-lightDir, perturbedNormal);
                float specularFactor = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
                vec3 specular = specularFactor * vec3(1.0) * (1.0 - roughness);

                vec4 primaryTexColor = texture2D(primaryTexture, vUv);

                // Final color output
                vec3 lighting = ambient + diffuse + specular;
                vec4 finalColor = mix(vec4(primaryColor, 1.0), primaryTexColor, primaryTexColor.a);

                gl_FragColor = vec4(finalColor.rgb * lighting, finalColor.a);
              }
            `,
            side: Three.DoubleSide,
          });
        }
      });
    }
  }, [modelRef, primaryTexture, normalTexture]);

  return (
    <>
      {/* Ambient light with adjusted intensity and color */}
      <ambientLight intensity={0.5} color={0xffffff} /> {/* Change intensity and color as needed */}
      <group {...props} dispose={null}>
        <motion.group
          scale={0.25}
          ref={modelRef}
          animate={{
            rotateY: degToRad(0),
            transition: { duration: 0.7, ease: "easeOut" },
          }}
          transition={{ ease: "easeIn", duration: 0.7 }}
        >
          {/* Applying shader to all mesh components */}
          <mesh
            geometry={nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_1.geometry}
          ></mesh>

          {/* Applying shader to other parts of the model */}
          <mesh
            geometry={nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_2.geometry}
          ></mesh>

          <mesh
            geometry={nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_3.geometry}
          ></mesh>

          <mesh
            geometry={nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_4.geometry}
          ></mesh>

          <mesh
            geometry={nodes.Dress_1_Group6255_0003_Dress_1_Group6255_0003_5.geometry}
          ></mesh>
        </motion.group>
      </group>
    </>
  );
}

useGLTF.preload("/long-sleeve-hitting-tees-with-hood.glb");
