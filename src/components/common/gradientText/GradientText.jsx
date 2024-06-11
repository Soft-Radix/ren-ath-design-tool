import React, { useMemo } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { Text, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Create the gradient shader material
const GradientMaterial = shaderMaterial(
  {
    uColor1: new THREE.Color(0xff0000), // Red
    uColor2: new THREE.Color(0x00ff00), // Green
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    void main() {
      vec3 color = mix(uColor1, uColor2, vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend the material in Three.js
extend({ GradientMaterial });

export default function GradientText({ children, color1, color2, ...props }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor1: {
            value: new THREE.Color(color1) ?? new THREE.Color(0xff0000),
          },
          uColor2: {
            value: new THREE.Color(color2) ?? new THREE.Color(0x00ff00),
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
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      void main() {
        vec3 color = mix(uColor1, uColor2, vUv.y);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
      }),
    [color1, color2]
  );

  return (
    <Text {...props} material={material}>
      {children}
    </Text>
  );
}
