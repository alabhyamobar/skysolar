import { useTexture } from "@react-three/drei";
import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Sun = forwardRef((props, ref) => {
  const texture = useTexture(
    `${import.meta.env.BASE_URL}/textures/sun3.png`
  );

  const meshRef = useRef();
  const lightRef = useRef();


  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 4;

  let scale;
  if (isLowEnd) scale = 0.4;
  else if (isMobile) scale = 0.55;
  else scale = 1;

 
  const position = isMobile ? [-0.8, 2, 0] : [-4.5, 2, 0];

  useFrame((state) => {

    if (isLowEnd && state.clock.elapsedTime % 0.05 > 0.016) return;

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

        <sphereGeometry
          args={[
            1.1,
            isMobile ? 24 : 32,
            isMobile ? 24 : 32,
          ]}
        />

        <meshBasicMaterial map={texture} />
      </mesh>

  
      <directionalLight
        ref={lightRef}
        intensity={isLowEnd ? 2 : 4}
      />
    </>
  );
});

export default Sun;