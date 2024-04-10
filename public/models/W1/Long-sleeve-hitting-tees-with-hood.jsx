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
import font1 from "../../../src/assets/fonts/Roboto.ttf";
import font2 from "../../../src/assets/fonts/TiltNeon.ttf";
import font3 from "../../../src/assets/fonts/BebasNeue.ttf";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "./models/W1/long-sleeve-hitting-tees-with-hood.glb"
  );

  // Set camera position
  // const camera = useThree((state) => state.camera);
  useThree(({ camera }) => {
    camera.position.set(0, 2, 8);
  });

  const modelRef = useRef();
  const {
    updateRef,
    number,
    numberPosition,
    numberFont,
    numberColor,
    numberOutline,

    modelName,
    namePosition,
    nameFont,
    nameColor,
    nameOutline,
  } = useProductStore((state) => state);

  useEffect(() => {
    modelRef.current.children.forEach((element) => {
      element.material.side = DoubleSide;
    });
    updateRef(modelRef);
    // camera.position.set(0, 2, 8);
  }, []);

  // Number states
  const [number1Position, setNumber1Position] = useState([0, 2.5, 4]);
  const [number1Scale, setNumber1Scale] = useState([4.5, 2.5, 2]);
  const [number1Rotation, setNumber1Rotation] = useState(0);
  useEffect(() => {
    if (numberPosition === 1) {
      setNumber1Position([0, 2.5, 4]);
      setNumber1Scale([4.5, 2.5, 2]);
      setNumber1Rotation(0);
    } else if (numberPosition === 2) {
      setNumber1Rotation(180);
    } else if (numberPosition === 3) {
      setNumber1Position([1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    } else if (numberPosition === 4) {
      setNumber1Position([-1.5, 4, 3]);
      setNumber1Scale([2, 1.5, 3]);
      setNumber1Rotation(0);
    }
  }, [numberPosition]);

  // Name states
  const [name1Position, setName1Position] = useState([0, 2.5, 4]);
  const [name1Scale, setName1Scale] = useState([4.5, 2.5, 2]);

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
                      position={[0, 0.2, 2]}
                    />

                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={2}
                      color={numberColor || "black"}
                      outlineColor={numberOutline || "black"}
                      outlineWidth={numberOutline ? 0.05 : 0}
                      font={
                        numberFont === 1
                          ? font1
                          : numberFont === 2
                          ? font2
                          : numberFont === 3
                          ? font3
                          : font1
                      }
                    >
                      {number}
                    </Text>
                  </RenderTexture>
                </meshStandardMaterial>
              </Decal>
            )}

            <Decal
              // debug={true}
              position={name1Position}
              rotation={[0, 0, 0]}
              scale={name1Scale}
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
                  <color attach="background" args={["#af2040"]} />
                  <Text
                    rotation={[0, 0, 0]}
                    fontSize={2}
                    color={nameColor || "black"}
                    outlineColor={nameOutline || "black"}
                    outlineWidth={nameOutline ? 0.05 : 0}
                    font={
                      nameFont === 1
                        ? font1
                        : nameFont === 2
                        ? font2
                        : nameFont === 3
                        ? font3
                        : font1
                    }
                  >
                    {modelName}
                  </Text>
                </RenderTexture>
              </meshStandardMaterial>
            </Decal>
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
                      position={[0, 0.2, 2]}
                    />
                    <Text
                      rotation={[0, 0, 0]}
                      fontSize={2}
                      color={numberColor || "black"}
                      outlineColor={numberOutline || "black"}
                      outlineWidth={numberOutline ? 0.05 : 0}
                      font={
                        numberFont === 1
                          ? font1
                          : numberFont === 2
                          ? font2
                          : numberFont === 3
                          ? font3
                          : font1
                      }
                    >
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
