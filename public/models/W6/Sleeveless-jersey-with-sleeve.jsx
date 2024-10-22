/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 ./sleeveless-jersey-with-sleeve.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/sleeveless-jersey-with-sleeve.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pCylinder1.geometry} material={materials['Dress_1:Left_Side_Sleeve']} scale={0.394} />
      <mesh geometry={nodes.pCylinder2.geometry} material={materials['Dress_1:Right_Side_Sleeve']} scale={0.394} />
      <group position={[0, -10.848, 0.036]} scale={0.091}>
        <mesh geometry={nodes.Dress_1Group6254_1.geometry} material={materials['Dress_1:Back_Bodice']} />
        <mesh geometry={nodes.Dress_1Group6254_2.geometry} material={materials['Dress_1:Front_Bodice']} />
        <mesh geometry={nodes.Dress_1Group6254_3.geometry} material={materials['Dress_1:Front_Collar']} />
        <mesh geometry={nodes.Dress_1Group6254_4.geometry} material={materials['Dress_1:Back_Collar']} />
        <mesh geometry={nodes.Dress_1Group6254_5.geometry} material={materials['Dress_1:Right_Armhole']} />
        <mesh geometry={nodes.Dress_1Group6254_6.geometry} material={materials['Dress_1:Left_Armhole']} />
      </group>
    </group>
  )
}

useGLTF.preload('/sleeveless-jersey-with-sleeve.glb')
