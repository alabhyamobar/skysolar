import React from "react";
import { motion } from "framer-motion";
import Services from "./Services";
import { Stats } from "./Stats";
import Locations from "./Locations";
import Gallary from "./Gallary";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import Brand from "../Components/Brand";

const About = () => {
  // Wave animation (headings)
  const waveVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Slide from left (text)
  const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="w-screen min-h-screen absolute top-0 z-20 ">
      <div className="relative">
        <div className="h-screen w-screen"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black/60" />
      </div>
      <div className="w-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] min-h-screen relative z-10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] px-6 md:px-24 py-16 flex flex-col md:flex-row gap-12">
        <Brand/>
        <div className="flex-1 mt-10 max-w-xl">
          <motion.h2
            variants={waveVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Who are we?
          </motion.h2>  
          <motion.p
            variants={slideLeft}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-700 text-lg mt-6 leading-relaxed"
          >
            Sky Renewable Energy provides reliable solar solutions that make clean power simple and accessible, helping homes and businesses reduce costs and transition to a sustainable future.
          </motion.p>
          <motion.h3
            variants={waveVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-black mt-12"
          >
            Our work helps you:
          </motion.h3>
          <div className="mt-6 space-y-4 text-gray-800 text-base lg:text-xl">
            {[
              "Convert better",
              "Launch sooner",
              "Scale efficiently",
              "(And look good while doing it)",
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={slideLeft}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={i === 3 ? "text-gray-500" : ""}
              >
                {text}
              </motion.p>
            ))}
          </div>
          <motion.div
            variants={slideLeft}
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:mt-20 shadow-2xl"
          >
            <img
              src="skysolar/images/hero1.webp"
              alt="About Us"
              className="w-full h-auto mt-8 rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
        <motion.div
          variants={slideLeft}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 flex justify-end"
        >
          <div className="w-full md:w-[90%] h-[300px] md:h-[600px] lg:h-[1000px] rounded-xl overflow-hidden shadow-lg">
            <video
              className="w-full h-full object-cover"
              src="skysolar/video/skymobile1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </div>
      <Services />
      <Stats/>
      <Locations/>
      <Testimonial/>
      <Gallary/>
      <Footer/>
    </div>
  );
};

export default About;