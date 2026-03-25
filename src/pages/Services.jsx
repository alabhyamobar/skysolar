import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const services = [
  {
    title: "Residential Solar",
    desc: "Install rooftop solar systems for homes and reduce electricity bills while contributing to a greener future.",
    icon: "🏠",
  },
  {
    title: "Commercial Solar",
    desc: "Custom solar solutions for businesses, offices, and industries to cut operational costs and improve sustainability.",
    icon: "🏢",
  },
  {
    title: "Solar Consultation",
    desc: "Get expert guidance on system size, cost, savings, and feasibility tailored to your energy needs.",
    icon: "📊",
  },
  {
    title: "Subsidy Assistance",
    desc: "We help you apply for government subsidies and benefits to reduce your solar installation cost.",
    icon: "💰",
  },
  {
    title: "Installation (EPC)",
    desc: "End-to-end solar installation from design to commissioning with high-quality components.",
    icon: "🔧",
  },
  {
    title: "Maintenance & Support",
    desc: "Regular servicing, cleaning, and performance monitoring to ensure maximum efficiency.",
    icon: "🛠️",
  },
  {
    title: "Solar Financing",
    desc: "Easy EMI and financing options to make solar affordable for everyone.",
    icon: "💳",
  },
  {
    title: "Battery Solutions",
    desc: "Store excess solar energy with advanced battery systems for uninterrupted power supply.",
    icon: "🔋",
  },
];

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const randomDelays = useMemo(
    () => services.map(() => Math.random() * 1.2),
    []
  );

  return (
    <div className="min-h-screen w-full bg-black/10 text-white py-20 px-6 sm:px-10 lg:px-20">
      
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => {
          
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const rotateX = useTransform(y, [-50, 50], [10, -10]);
          const rotateY = useTransform(x, [-50, 50], [-10, 10]);

          const handleMouseMove = (e) => {
            if (isMobile) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            x.set(e.clientX - centerX);
            y.set(e.clientY - centerY);
          };

          const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: randomDelays[index],
              }}

              whileTap={
                isMobile
                  ? {
                      scale: 0.96,
                      boxShadow: "0px 0px 40px rgba(34,211,238,0.4)",
                    }
                  : {}
              }

              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}

              style={
                isMobile
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      transformPerspective: 800,
                    }
              }

              className="
                relative p-6 rounded-2xl
                bg-white/5 backdrop-blur-lg
                border border-white/10
                transition-all duration-300
                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]
                group
                active:scale-95
              "
            >
              <div className="
                absolute inset-0 rounded-2xl
                opacity-0 group-hover:opacity-100
                transition duration-300
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl
                
                md:opacity-0 md:group-hover:opacity-100
                sm:opacity-100 sm:animate-pulse
              "></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;