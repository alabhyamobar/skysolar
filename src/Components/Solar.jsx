import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const Solar = forwardRef((props, ref) => {
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}/models/solarpanel.glb`
  );


  const isMobile = window.innerWidth < 768;

  const scale = isMobile ? 0.002 : 0.003;
  const position = isMobile ? [-3, -0.5, 1.2] : [-6, 0.2, 1.6];

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[scale, scale, scale]}
      position={position}
      rotation={[0, 4.37, 0]}
      {...props}
    />
  );
});

export default Solar;