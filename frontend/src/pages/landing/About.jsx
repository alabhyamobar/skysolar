import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Installations" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support" },
];


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const viewportOptions = { once: true, amount: 0.2 };

const About = () => {
  return (
    <main id="about" className="about relative bg-[#050914] text-white overflow-hidden py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E8A56A]/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
          <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
            About Sky Renewable Energies
          </span>
        </motion.div>

        {/* Heading + paragraph */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl text-4xl mt-5 sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none"
          >
            Building The Future Of
            <span className="block text-[#E8A56A] mt-2">
              Energy Infrastructure
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-8 max-w-3xl text-base md:text-lg text-gray-400 leading-relaxed"
          >
            Sky Renewable Energies delivers industrial-grade solar systems
            engineered for long-term performance, operational resilience, and
            measurable energy savings across residential, commercial, and
            utility-scale applications.
          </motion.p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1200}
                scale={1.05}
                glareEnable={true}
                glareMaxOpacity={0.1}
              >
                <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-8 hover:border-[#E8A56A]/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(232,165,106,0.15)]">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#E8A56A]/20 blur-3xl" />
                  </div>
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E8A56A]">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-400">
                    {item.label}
                  </p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Residential */}
          <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1200}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.08}
            >
              <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 lg:p-10 hover:border-[#E8A56A]/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(232,165,106,0.15)]">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />
                <span className="uppercase tracking-[3px] text-xs text-[#E8A56A] font-semibold">
                  Residential
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-4">
                  Domestic Installations
                </h3>
                <p className="mt-5 text-gray-400 leading-relaxed">
                  Advanced rooftop solar systems designed to maximize efficiency,
                  reduce electricity costs and provide long-term energy
                  independence.
                </p>
              </div>
            </Tilt>
          </motion.div>

          {/* Commercial */}
          <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1200}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.08}
            >
              <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 lg:p-10 hover:border-[#E8A56A]/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(232,165,106,0.15)]">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />
                <span className="uppercase tracking-[3px] text-xs text-[#E8A56A] font-semibold">
                  Commercial
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-4">
                  Enterprise Solutions
                </h3>
                <p className="mt-5 text-gray-400 leading-relaxed">
                  Scalable solar infrastructure built for factories, institutions,
                  warehouses and large-scale operations.
                </p>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>

        {/* CTA panel */}
        <motion.div
          className="mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1500} scale={1.01}>
            <div className="border border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.04] p-6 sm:p-10 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                >
                  <motion.span
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                    className="uppercase tracking-[3px] text-xs text-[#E8A56A] font-semibold"
                  >
                    Why Choose Us
                  </motion.span>
                  <motion.h3
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mt-4 text-3xl md:text-5xl font-black uppercase leading-tight"
                  >
                    Precision Engineered
                    <span className="block text-[#E8A56A]">
                      Solar Excellence
                    </span>
                  </motion.h3>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                >
                  <motion.p
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-gray-400 leading-relaxed"
                  >
                    From consultation and design to installation and
                    maintenance, we deliver complete solar solutions focused on
                    reliability, efficiency and measurable ROI.
                  </motion.p>
                  <motion.button
                    variants={scaleUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-8 bg-[#E8A56A] text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-[#f1b983] transition-all duration-300 hover:scale-105"
                  >
                    Explore Solutions
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </Tilt>
        </motion.div>

      </div>
    </main>
  );
};

export default About;
