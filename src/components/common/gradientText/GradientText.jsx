import React, { useMemo } from "react";
import { extend } from "@react-three/fiber";
import { Text, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const hexColor = "#D2D1D3";
// Extract RGB components from the hexadecimal color
const r = parseInt(hexColor.substring(1, 3), 16) / 255;
const g = parseInt(hexColor.substring(3, 5), 16) / 255;
const b = parseInt(hexColor.substring(5, 7), 16) / 255;

// Create a Three.js Color instance using the RGB values
const threeJsColor = new THREE.Color(r, g, b);

// Create the gradient shader material
const GradientMaterial = shaderMaterial(
  {
    uColor1: threeJsColor, // Default color1
    uColor2: threeJsColor, // Default color2
    uGradientScale: 0.2, // Default gradient scale
    uRotation: 0.0, // Default rotation angle
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uRotation;
    void main() {
      vUv = uv;
      // Apply rotation
      float cosRot = cos(uRotation);
      float sinRot = sin(uRotation);
      vec2 rotatedUv = vec2(
        cosRot * (vUv.x - 0.5) - sinRot * (vUv.y - 0.5) + 0.5,
        sinRot * (vUv.x - 0.5) + cosRot * (vUv.y - 0.5) + 0.5
      );
      vUv = rotatedUv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uGradientScale;
    varying vec2 vUv;
    void main() {
      float lowerEdge = 0.5 - uGradientScale / 2.0;
      float upperEdge = 0.5 + uGradientScale / 2.0;
      float stepFactor = smoothstep(lowerEdge, upperEdge, vUv.y);
      vec3 color = mix(uColor1, uColor2, stepFactor);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend the material in Three.js
extend({ GradientMaterial });

export default function GradientText({
  children,
  color1,
  color2,
  gradientScale,
  gradientRotation,
  outlineColor = null,
  outlineWidth = 0.01,
  isNumberGradientColor,
    ...props
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor1: { value: new THREE.Color(color1) ?? threeJsColor },
          uColor2: { value: new THREE.Color(color2) ?? threeJsColor },
          uGradientScale: { value: gradientScale || 0.48 },
          uRotation: { value: gradientRotation || 60 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uRotation;
          void main() {
            vUv = uv;
            // Apply rotation
            float cosRot = cos(uRotation);
            float sinRot = sin(uRotation);
            vec2 rotatedUv = vec2(
              cosRot * (vUv.x - 0.5) - sinRot * (vUv.y - 0.5) + 0.5,
              sinRot * (vUv.x - 0.5) + cosRot * (vUv.y - 0.5) + 0.5
            );
            vUv = rotatedUv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uGradientScale;
          varying vec2 vUv;
          void main() {
            float lowerEdge = 0.5 - uGradientScale / 2.0;
            float upperEdge = 0.5 + uGradientScale / 2.0;
            float stepFactor = smoothstep(lowerEdge, upperEdge, vUv.y);
            vec3 color = mix(uColor1, uColor2, stepFactor);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [color1, color2, gradientScale, gradientRotation]
  );

  return (
    <>
      <Text
        {...props}
        renderOrder={999}
        color={color1}
        outlineColor={outlineColor}
        
        outlineWidth={outlineColor ? 0.01 : 0}
      >
        {children}
      </Text>
      {isNumberGradientColor && (
        <Text {...props} material={material} renderOrder={999}>
          {children}
        </Text>
      )}
    </>
  );
}
