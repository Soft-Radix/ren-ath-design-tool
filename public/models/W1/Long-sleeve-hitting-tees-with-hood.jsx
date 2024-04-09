import {
  Decal,
  PerspectiveCamera,
  RenderTexture,
  Text,
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import { useProductStore } from "../../../src/store";
import { degToRad } from "three/src/math/MathUtils";
import { motion } from "framer-motion-3d";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );

  // Set camera position
  useThree(({ camera }) => {
    camera.position.set(0, 2, 8);
  });

  const modelRef = useRef();
  const { updateRef, number, numberPosition } = useProductStore(
    (state) => state
  );

  useEffect(() => {
    modelRef.current.children.forEach((element) => {
      element.material.side = DoubleSide;
    });
    updateRef(modelRef);
  }, []);

  // Number states
  const [number1Position, setNumber1Position] = useState([0, 2.5, 4]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);
  useEffect(() => {
    if (numberPosition === 1) {
      setNumber1Position([0, 2.5, 4]);
      setNumber1Scale([4.5, 2.5, 2]);
      // modelRef.current.rotation.y = degToRad(0);
      setNumber1Rotation(0);
    } else if (numberPosition === 2) {
      // modelRef.current.rotation.y = degToRad(180);
      setNumber1Rotation(180);
    } else if (numberPosition === 3) {
      setNumber1Position([1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      // modelRef.current.rotation.y = degToRad(0);
      setNumber1Rotation(0);
    } else if (numberPosition === 4) {
      setNumber1Position([-1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      // modelRef.current.rotation.y = degToRad(0);
      setNumber1Rotation(0);
    }
  }, [numberPosition]);

  return (
    <>
      {/* <ambientLight intensity={6} />
      <OrbitControls
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.55}
        enableZoom={false}
      /> */}

      <group {...props} dispose={null}>
        <motion.group
          scale={0.394}
          ref={modelRef}
          animate={{
            rotateY: degToRad(number1Rotation),
            transition: { duration: 0.5 },
          }}
        >
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
          >
            {(numberPosition === 1 ||
              numberPosition === 3 ||
              numberPosition === 4) && (
              <Decal
                // debug={true}
                position={number1Position}
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
                      position={[0, 0, 2]}
                    />

                    <Text rotation={[0, 0, 0]} fontSize={2} color="black">
                      {number}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}
          </mesh>
          <mesh
            geometry={
              nodes["31106-women-long-sleeve-sub-warmup-w-hood_3"].geometry
            }
            material={materials.blinn4}
            name="Layer 3"
          >
            {numberPosition === 2 && (
              <Decal
                position={[0, 4, -2]}
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
                      position={[0, 0, 2]}
                    />
                    <Text rotation={[0, 0, 0]} fontSize={2} color="black">
                      {number}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}
          </mesh>
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
        </motion.group>
      </group>
    </>
  );
}

useGLTF.preload("./models/W1/long-sleeve-hitting-tees-with-hood.glb");
