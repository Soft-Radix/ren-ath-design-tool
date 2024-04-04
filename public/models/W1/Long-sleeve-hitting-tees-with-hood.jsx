import React, { useEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DoubleSide } from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );
  useThree(({ camera }) => {
    camera.position.set(0, 2, 8);
  });

  const modelRef = useRef();

  useEffect(() => {
    modelRef.current.children.forEach((element) => {
      element.material.side = DoubleSide;
    });
  }, []);

  return (
    <>
      <ambientLight intensity={6} />
      <OrbitControls
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
        enableZoom={false}
      />

      <group {...props} dispose={null}>
        <group scale={0.394} ref={modelRef}>
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_1"].geometry
            }
            material={materials.blinn2}
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_2"].geometry
            }
            material={
              materials.Dress_1_Group6255_0003_Dress_1_Group6255_0003_blinn
            }
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_3"].geometry
            }
            material={materials.blinn4}
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_4"].geometry
            }
            material={materials.blinn3}
          />
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_5"].geometry
            }
            material={materials.blinn1}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("./models/W1/long-sleeve-hitting-tees-with-hood.glb");
