/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 sleeveless-jersey-without-sleeve.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W7/sleeveless-jersey-without-sleeve.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group position={[0, -10.848, 0.036]} scale={0.091}>
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_1"].geometry}
          material={materials["Dress_1:Back_Bodice"]}
        />
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_2"].geometry}
          material={materials["Dress_1:Front_Bodice"]}
        />
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_3"].geometry}
          material={materials["Dress_1:Front_Collar"]}
        />
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_4"].geometry}
          material={materials["Dress_1:Back_Collar"]}
        />
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_5"].geometry}
          material={materials["Dress_1:Right_Armhole"]}
        />
        <mesh
          geometry={nodes["10013_-_WOMENS_SLEEVELESS_6"].geometry}
          material={materials["Dress_1:Left_Armhole"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/W7/sleeveless-jersey-without-sleeve.glb");
