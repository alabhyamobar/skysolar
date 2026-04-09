import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
  "https://images.unsplash.com/photo-1497436072909-f5e4be3c5f9f",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Gallary = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen w-full py-20 px-6 sm:px-10 lg:px-20">

      <h2 className="text-4xl sm:text-6xl font-semibold text-center mb-16">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400">
          Our Work Gallery
        </span>
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {images.map((src, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              variants={item}
              onClick={() => {
                if (isMobile) {
                  setActiveIndex(isActive ? null : index);
                }
              }}
              className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
            >
              <motion.img
                src={src}
                alt="gallery"
                loading="lazy"
                whileTap={{ scale: 0.97 }}
                className={`w-full h-full object-cover transition-all duration-700 
                  ${!isMobile ? "group-hover:scale-110" : ""}
                  blur-sm scale-105`}
                onLoad={(e) => {
                  e.target.classList.remove("blur-sm", "scale-105");
                }}
              />

              {/* OVERLAY */}
              <div
                className={`absolute inset-0 transition duration-500
                  ${isMobile
                    ? isActive
                      ? "opacity-100"
                      : "opacity-0"
                    : "opacity-0 group-hover:opacity-100"
                  }
                  bg-[linear-gradient(135deg,
                    rgba(251,146,60,0.35),
                    rgba(236,72,153,0.25),
                    rgba(59,130,246,0.35)
                  )]
                  backdrop-blur-xl border border-white/20`}
              >
                {/* LIGHT BLOBS */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,180,100,0.4),transparent_40%),
                                                      radial-gradient(circle_at_70%_60%,rgba(120,160,255,0.4),transparent_50%)]" />
                </div>

                {/* TEXT */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="text-lg font-semibold">Solar Installation</h3>
                  <p className="text-sm text-white/80">Clean energy project</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Gallary;