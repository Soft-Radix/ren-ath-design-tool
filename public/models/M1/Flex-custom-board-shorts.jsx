/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 flex-custom-board-shorts.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/M1/flex-custom-board-shorts.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group scale={0.394}>
        <mesh
          geometry={nodes.Extract3_Extract3_1.geometry}
          material={materials.Back_Right_Short}
        />
        <mesh
          geometry={nodes.Extract3_Extract3_2.geometry}
          material={materials.Front_Right_Short}
        />
        <mesh
          geometry={nodes.Extract3_Extract3_3.geometry}
          material={materials.Back_Waistband}
        />
        <mesh
          geometry={nodes.Extract3_Extract3_4.geometry}
          material={materials.Front_Waistband}
        />
        <mesh
          geometry={nodes.Extract3_Extract3_5.geometry}
          material={materials.Back_Left_Short}
        />
        <mesh
          geometry={nodes.Extract3_Extract3_6.geometry}
          material={materials.Front_Left_Short}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/M1/flex-custom-board-shorts.glb");
