import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect } from "react";

export default function GradientBG() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc]">

      {/* 🌤️ MORNING SKY (TOP COOL TONES) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(180deg, #60a5fa 0%, #93c5fd 40%, #fca5a5 100%)",
            "linear-gradient(180deg, #38bdf8 0%, #bae6fd 40%, #fdba74 100%)",
            "linear-gradient(180deg, #60a5fa 0%, #93c5fd 40%, #fca5a5 100%)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌅 SUNSET GLOW (BOTTOM WARM) */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-[#fb923c] opacity-50 blur-[140px] bottom-[-10%] left-[20%]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      {/* 🌸 PINK SUNSET LIGHT */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#f472b6] opacity-40 blur-[140px] bottom-[0%] right-[10%]"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* ☁️ COOL MORNING LIGHT */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#38bdf8] opacity-35 blur-[150px] top-[10%] right-[20%]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {/* 🔥 CURSOR LIGHT (BLENDS BOTH WORLDS) */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,140,0,0.45), transparent 60%)",
            "radial-gradient(circle, rgba(236,72,153,0.45), transparent 60%)",
            "radial-gradient(circle, rgba(59,130,246,0.45), transparent 60%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🧊 GLASS REACTION LIGHT */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[280px] h-[280px] rounded-full bg-white opacity-30 blur-[70px] pointer-events-none"
      />

      {/* 🌫️ ATMOSPHERIC HAZE */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(255,255,255,0.25),transparent)]" />

      {/* 🌌 VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)]" />

      {/* ✨ NOISE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
    </div>
  );
}