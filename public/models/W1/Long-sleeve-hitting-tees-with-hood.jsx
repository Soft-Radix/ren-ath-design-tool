import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { DoubleSide } from "three";
import { useProductStore } from "../../../src/store";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );

  // Set camera position
  useThree(({ camera }) => {
    camera.position.set(0, 2, 8);
  });

  const modelRef = useRef();
  const updateRef = useProductStore((state) => state.updateRef);

  useEffect(() => {
    modelRef.current.children.forEach((element) => {
      element.material.side = DoubleSide;
    });
    updateRef(modelRef);
  }, []);

  return (
    <>
      {/* <ambientLight intensity={6} />
      <OrbitControls
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
        enableZoom={false}
      /> */}

      <group {...props} dispose={null}>
        <group scale={0.394} ref={modelRef}>
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_1"].geometry
            }
            material={materials.blinn2}
            name="Layer 1"
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_2"].geometry
            }
            material={
              materials.Dress_1_Group6255_0003_Dress_1_Group6255_0003_blinn
            }
            name="Layer 2"
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_3"].geometry
            }
            material={materials.blinn4}
            name="Layer 3"
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_4"].geometry
            }
            material={materials.blinn3}
            name="Layer 4"
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_5"].geometry
            }
            material={materials.blinn1}
            name="Layer 5"
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("./models/W1/long-sleeve-hitting-tees-with-hood.glb");
