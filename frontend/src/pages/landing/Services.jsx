import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Sun,
  Battery,
  Building2,
  Wrench,
  Zap,
  LineChart,
} from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Residential Solar",
    description:
      "High-efficiency rooftop solar systems designed to reduce electricity bills and maximize energy independence.",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Scalable solar infrastructure for factories, warehouses, institutions, and enterprise facilities.",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description:
      "Advanced battery backup solutions for uninterrupted power and intelligent energy management.",
  },
  {
    icon: Zap,
    title: "EV Charging",
    description:
      "Smart EV charging stations integrated with solar generation for sustainable mobility solutions.",
  },
  {
    icon: Wrench,
    title: "Operations & Maintenance",
    description:
      "Comprehensive monitoring, preventive maintenance, and performance optimization services.",
  },
  {
    icon: LineChart,
    title: "Energy Consulting",
    description:
      "Data-driven energy audits, feasibility studies, and ROI-focused solar planning.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 55 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardContentStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const viewportOptions = { once: true, amount: 0.15 };

const Services = () => {
  return (
    <section id="solutions" className="relative bg-[#050914] overflow-hidden py-28 text-white">
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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8A56A]/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Badge */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={textReveal}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
          <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
            Our Services
          </span>
        </motion.div>

        {/* Heading Section */}
        <motion.div 
          className="mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeUp}
            className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none"
          >
            Complete Solar
            <span className="block mt-2 text-[#E8A56A]">
              Energy Solutions
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="mt-8 max-w-3xl text-base md:text-lg text-gray-400 leading-relaxed"
          >
            We deliver end-to-end renewable energy solutions—from system
            design and installation to monitoring, maintenance, and energy
            optimization.
          </motion.p>
        </motion.div>

        {/* Grid cards with stagger */}
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1200}
                  scale={1.03}
                  glareEnable={true}
                  glareMaxOpacity={0.08}
                >
                  <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 min-h-[320px] hover:border-[#E8A56A]/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(232,165,106,0.15)] flex flex-col justify-between">
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E8A56A]/20 blur-3xl" />
                    </div>
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />

                    <motion.div 
                      variants={cardContentStagger}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative z-10 flex flex-col h-full justify-between"
                    >
                      <div>
                        <motion.div 
                          variants={textReveal}
                          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#E8A56A]/10 border border-[#E8A56A]/20"
                        >
                          <Icon
                            size={30}
                            className="text-[#E8A56A]"
                          />
                        </motion.div>

                        <motion.h3 
                          variants={textReveal}
                          className="mt-8 text-2xl font-bold"
                        >
                          {service.title}
                        </motion.h3>

                        <motion.p 
                          variants={textReveal}
                          className="mt-5 text-gray-400 leading-relaxed"
                        >
                          {service.description}
                        </motion.p>
                      </div>

                      <motion.div variants={textReveal}>
                        <button className="mt-8 text-[#E8A56A] font-semibold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                          Learn More →
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA banner section with anim */}
        <motion.div 
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <div className="border border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-md p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
              >
                <motion.span 
                  variants={textReveal}
                  className="uppercase tracking-[3px] text-xs text-[#E8A56A] font-semibold"
                >
                  Ready To Switch?
                </motion.span>

                <motion.h3 
                  variants={textReveal}
                  className="mt-4 text-3xl md:text-5xl font-black uppercase leading-tight"
                >
                  Build A Cleaner
                  <span className="block text-[#E8A56A]">
                    Energy Future
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
                  variants={textReveal}
                  className="text-gray-400 leading-relaxed"
                >
                  Let our experts design a solar solution tailored to your
                  energy needs, sustainability goals, and long-term savings.
                </motion.p>

                <motion.button 
                  variants={textReveal}
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 bg-[#E8A56A] text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-[#f1b983] transition-all duration-300"
                >
                  Get Free Consultation
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;