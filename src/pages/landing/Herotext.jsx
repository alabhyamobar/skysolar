import React from "react";

const Herotext = () => {
  return (
    <div className="absolute inset-0 z-10">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />

      {/* Content */}
      <div
        className="
          relative z-20 h-full text-white
          flex flex-col
          justify-end md:justify-center
          px-6 md:px-12 lg:px-20
          pb-16 md:pb-0
          mt-25
        "
      >
        {/* Small Tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[1px] bg-orange-400" />
          <span className="text-[11px] md:text-xs tracking-[4px] uppercase text-orange-300 font-semibold">
            Precision Solar Engineering
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-5xl font-black uppercase leading-[0.95]">
          <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl">
            Unlock The Next Era Of
          </span>

          <span className="block text-orange-300 text-4xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
            Solar Power With
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          Deploying tier-1 solar infrastructure designed for industrial
          resilience,Domestic usage,and grid-scale stability.
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
            "
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block mt-16 flex items-center gap-3 justify-center">
          <span className="text-[10px] tracking-[6px] uppercase text-gray-500">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
};

export default Herotext;