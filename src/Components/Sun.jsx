import { useTexture } from "@react-three/drei";
import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Sun = forwardRef((props, ref) => {
  const texture = useTexture(`${import.meta.env.BASE_URL}/textures/sun3.png`)

  const meshRef = useRef();
  const lightRef = useRef();


  const isMobile = window.innerWidth < 768;


  const position = isMobile ? [-0.9, 2.2, 0] : [-4.5, 2, 0];
  const scale = isMobile ? 0.5 : 1; 

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
    }

    if (meshRef.current && lightRef.current) {
      lightRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <>
      <mesh
        ref={(node) => {
          meshRef.current = node;
          if (ref) ref.current = node;
        }}
        position={position}
        scale={[scale, scale, scale]}
        {...props}
      >
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      <directionalLight ref={lightRef} intensity={4} />
    </>
  );
});

export default Sun;