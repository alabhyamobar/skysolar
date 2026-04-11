import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  useScroll,
} from "framer-motion";

const services = [
  { title: "Residential Solar", desc: "Install rooftop solar systems for homes and reduce electricity bills.", icon: "🏠" },
  { title: "Commercial Solar", desc: "Custom solar solutions for businesses and industries.", icon: "🏢" },
  { title: "Solar Consultation", desc: "Expert guidance on system size, cost, and savings.", icon: "📊" },
  { title: "Subsidy Assistance", desc: "We help you apply for government subsidies.", icon: "💰" },
  { title: "Installation (EPC)", desc: "End-to-end solar installation with high-quality components.", icon: "🔧" },
  { title: "Maintenance", desc: "Servicing and monitoring for maximum efficiency.", icon: "🛠️" },
  { title: "Financing", desc: "Easy EMI options to make solar affordable.", icon: "💳" },
  { title: "Battery Solutions", desc: "Store energy with advanced battery systems.", icon: "🔋" },
];

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 CONTAINER VARIANT (controls all cards)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full py-16 px-4 sm:px-10 lg:px-20"
    >
      <h2 className="text-3xl sm:text-6xl font-semibold text-center mb-14 sm:mb-20">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400">
          Our Services
        </span>
      </h2>

      {/* 🔥 SECTION TRIGGER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-stretch"
      >
        {services.map((service, index) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const depth = (index % 4) * 20 + 20;

          const parallaxY = useTransform(
            scrollYProgress,
            [0, 1],
            isMobile ? [0, 0] : [depth, -depth]
          );

          const smoothParallax = useSpring(parallaxY, {
            stiffness: 60,
            damping: 20,
          });

          const moveX = useSpring(useTransform(x, [-100, 100], [-6, 6]), {
            stiffness: 120,
            damping: 20,
          });

          const moveY = useSpring(useTransform(y, [-100, 100], [-6, 6]), {
            stiffness: 120,
            damping: 20,
          });

          const rotateX = useTransform(y, [-100, 100], [6, -6]);
          const rotateY = useTransform(x, [-100, 100], [-6, 6]);

          const lightX = useTransform(x, (v) => v + 150);
          const lightY = useTransform(y, (v) => v + 150);

          const glowX = useTransform(x, (v) => v + 200);
          const glowY = useTransform(y, (v) => v + 200);

          const background = useMotionTemplate`
            radial-gradient(circle at ${lightX}px ${lightY}px,
              rgba(255,255,255,0.15),
              transparent 60%)
          `;

          const borderGlow = useMotionTemplate`
            radial-gradient(circle at ${glowX}px ${glowY}px,
              rgba(255,180,100,0.6),
              rgba(120,160,255,0.6),
              transparent 70%)
          `;

          const handleMove = (clientX, clientY, rect) => {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set(clientX - centerX);
            y.set(clientY - centerY);
          };

          const fromLeft = index % 2 === 0;

          // 🔥 CARD VARIANT (individual animation)
          const cardVariants = {
            hidden: {
              opacity: 0,
              x: isMobile ? (fromLeft ? -80 : 80) : 0,
              y: 40,
              scale: 0.95,
            },
            show: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          };

          return (
            <motion.div
              key={index}
              variants={cardVariants}

              onMouseMove={(e) => {
                if (isMobile) return;
                handleMove(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
              }}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}

              whileTap={{ scale: 0.97 }}

              style={{
                rotateX,
                rotateY,
                x: moveX,
                y: moveY,
                translateY: smoothParallax,
                transformPerspective: 1200,
              }}

              className="relative group h-full"
            >

              {/* GLOW */}
              <motion.div
                className="absolute -inset-[1px] rounded-[18px] sm:rounded-[22px] opacity-70 blur-md"
                style={{ background: borderGlow }}
              />

              {/* CARD */}
              <div className="relative h-full flex flex-col justify-between rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 overflow-hidden
                backdrop-blur-2xl bg-white/10 border border-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                transition-all duration-500">

                <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background }}
                />

                <div className="relative z-10 text-white flex flex-col h-full">
                  <div>
                    <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-auto">
                    {service.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Services;