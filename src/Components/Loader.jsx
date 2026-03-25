import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active) {
      setTimeout(() => setVisible(false), 600);
    }
  }, [active]);

  if (!visible) return null;

  

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="mb-8 relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_60px_rgba(255,200,0,0.8)]" />
        <div className="absolute w-24 h-24 rounded-full border border-yellow-300/30 animate-spin" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-widest mb-2">
        SKY SOLAR
      </h1>

      <p className="text-sm text-zinc-400 mb-6 tracking-wide">
        Powering a brighter future
      </p>

      <p className="mb-3 text-sm tracking-widest text-yellow-300">
        Loading {progress.toFixed(0)}%
      </p>


      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Loader;