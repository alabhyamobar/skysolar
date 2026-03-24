import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { useTexture } from "@react-three/drei";

export default function Space() {
  const meshRef = useRef();

 
  const texture = useTexture(`${import.meta.env.BASE_URL}/textures/stars2.jpg`);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
    //   meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.x = time * 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
}