import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";


const Herotext = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const lineVariants = {
    hidden: {
      y: "100%",
      rotate: 9,
    },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 " />

      <div
        className="
          relative z-20 h-full text-white
          flex flex-col
          justify-end md:justify-center
          px-6 md:px-12 lg:px-20
          pb-16 md:pb-0
          mt-25 lg:mt-30
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <p className="w-fit overflow-hidden masker flex items-center justify-center gap-2">
            <div className="w-10 h-[1px] bg-orange-400" />
            <motion.span initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-[11px] md:text-xs tracking-[4px] uppercase text-orange-300 font-semibold">
              Precision Solar Engineering
            </motion.span>
          </p>
        </div>
        <motion.h1 variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-5xl font-black uppercase leading-[0.95]">
          <p className="masker w-fit  overflow-hidden m-2">
            <motion.span variants={lineVariants} className="inline-block origin-left  text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl">
              Unlock The Next Era Of
            </motion.span>
          </p>

          <p className="masker w-fit  overflow-hidden">
            <motion.span variants={lineVariants} className="block origin-left  text-orange-300 text-4xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              Solar Power With
            </motion.span>
          </p>
        </motion.h1>

        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed overflow-hidden">
          <motion.span initial={{ x: "200%" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Deploying tier-1 solar infrastructure designed for industrial</motion.span>
          <motion.span initial={{ x: "200%" }} animate={{ x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>resilience,Domestic usage,and grid-scale stability.</motion.span>
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-5">
          <a
            href="#solutions"
            className="
              bg-orange-300 text-black
              px-8 py-4
              font-bold text-xs tracking-[2px]
              uppercase
              text-center
              hover:bg-orange-200
              transition-all duration-300
              rounded-full
              active:scale-[0.88]
            "
          >
            Explore Solutions
          </a>

          <a
            href="#contact"
            className="
              border border-white/20
              px-8 py-4
              font-bold text-xs tracking-[2px]
              uppercase
              text-center
              backdrop-blur-sm
              hover:bg-white/10
              transition-all duration-300
              rounded-full
              active:scale-[0.88]
              border-2 border-white
            "
          >
            Get In Touch
          </a>
        </div>

        <div className="invisible md:block mt-16">
          <span className="text-[10px] tracking-[6px] uppercase text-gray-500">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
};

export default Herotext;