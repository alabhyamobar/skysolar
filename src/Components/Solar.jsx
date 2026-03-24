import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { materialOpacity } from "three/tsl";

const Solar = forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/solarpanel.glb");

  return (
    <primitive
      ref={ref} 
      object={scene}
      scale={0.003}
      position={[-2, 0.2, 1.6]}
      rotation={[0,4.37,0]}
      
      {...props}
    />
  );
});

export default Solar;