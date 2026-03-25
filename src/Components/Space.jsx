import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Space() {
  const meshRef = useRef();

  // ✅ Device detection
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 4;

  // ✅ Use optimized texture (you should replace with .webp later)
  const texture = useTexture(
    `${import.meta.env.BASE_URL}/textures/stars2.jpg`
  );

  useFrame((state) => {
    // 🔥 Throttle on low-end devices
    if (isLowEnd && state.clock.elapsedTime % 0.05 > 0.016) return;

    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.005; // smoother, lighter
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* ✅ Reduce geometry + radius */}
      <sphereGeometry
        args={[
          60,                      // smaller radius
          isMobile ? 16 : 32,     // segments reduced
          isMobile ? 16 : 32,
        ]}
      />

      {/* ✅ Proper constant + optimization */}
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}