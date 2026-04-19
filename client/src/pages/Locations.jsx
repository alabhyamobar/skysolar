import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const locations = [
  {
    city: "Delhi",
    desc: "The capital of India, blending history with modern infrastructure and rapid solar adoption.",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600",
  },
  {
    city: "Mumbai",
    desc: "Financial hub of India with increasing demand for rooftop solar solutions.",
    img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1600",
  },
  {
    city: "Jaipur",
    desc: "The Pink City, ideal for solar energy with abundant sunlight throughout the year.",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600",
  },
  {
    city: "Varanasi",
    desc: "One of the oldest cities in the world, now moving towards sustainable energy solutions.",
    img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1600",
  },
];

const Locations = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % locations.length);
  };

  const nextPrev = () => {
    setIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  // 🔥 container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // 🔥 child animation
  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="min-h-screen w-full px-4 sm:px-10 lg:px-20 py-16 flex flex-col justify-center items-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-6xl font-semibold text-center mb-12"
      >
        <span className="bg-clip-text text-white">
          Our Locations
        </span>
      </motion.h2>


      <motion.div
        variants={itemVariants}
        className="relative w-full max-w-5xl h-[400px] sm:h-[500px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 120, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -120, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[20px] overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
          >

            <div className="absolute inset-0">
              <img
                src={locations[index].img}
                alt={locations[index].city}
                className="w-full h-full object-cover opacity-70"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 bottom-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white">
              <motion.h3
                key={locations[index].city}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-4xl font-semibold mb-2"
              >
                {locations[index].city}
              </motion.h3>

              <motion.p
                key={locations[index].desc}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-white/80 max-w-xl"
              >
                {locations[index].desc}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={nextSlide}
          className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 z-20 p-3 rounded-full 
          backdrop-blur-xl bg-white/10 border border-white/20 
          hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="text-white" />
        </button>

        <button
          onClick={nextPrev}
          className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-20 p-3 rounded-full 
          backdrop-blur-xl bg-white/10 border border-white/20 
          hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Locations;