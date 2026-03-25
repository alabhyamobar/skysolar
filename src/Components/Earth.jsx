import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";

const Earth = forwardRef((props, ref) => {
  const earthTexture = useTexture(
    `${import.meta.env.BASE_URL}/textures/earth5.png`
  );

  earthTexture.center.set(0.5, 0.5);
  earthTexture.rotation = -Math.PI / 1;

  const rotationRef = useRef();


  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 4;


  let scale;
  if (isLowEnd) scale = 0.5;
  else if (isMobile) scale = 0.6;
  else scale = 0.8;

  const position = isMobile ? [0, -0.3, -2.4] : [0, 0, -10];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (rotationRef.current) {
      rotationRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <mesh
      ref={(el) => {
        rotationRef.current = el;
        if (ref) ref.current = el;
      }}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
      scale={[scale, scale, scale]}
      {...props}
    >
      <sphereGeometry
        args={[isMobile ? 1.2 : 1.6, isMobile ? 24 : 64, isMobile ? 24 : 64]}
      />
      <meshStandardMaterial
        map={earthTexture}
        roughness={1}
        metalness={0}
        transparent
        opacity={0}
      />
    </mesh>
  );
});

export default Earth;