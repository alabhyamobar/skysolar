import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen w-full py-20 px-6 sm:px-10 lg:px-20">

      {/* HEADING */}
      <h2 className="text-4xl sm:text-6xl font-semibold text-center mb-20">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400">
          Our Services
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const rippleX = useMotionValue(50);
          const rippleY = useMotionValue(50);
          const rippleScale = useMotionValue(0);

          const moveX = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
            stiffness: 140,
            damping: 18,
          });

          const moveY = useSpring(useTransform(y, [-100, 100], [-8, 8]), {
            stiffness: 140,
            damping: 18,
          });

          const rotateX = useTransform(y, [-100, 100], [8, -8]);
          const rotateY = useTransform(x, [-100, 100], [-8, 8]);

          const lightX = useTransform(x, (v) => v + 150);
          const lightY = useTransform(y, (v) => v + 150);

          const background = useMotionTemplate`
            radial-gradient(circle at ${lightX}px ${lightY}px,
              rgba(255,200,120,0.2),
              rgba(120,180,255,0.2),
              transparent 70%)
          `;

          const handleMove = (clientX, clientY, rect) => {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set(clientX - centerX);
            y.set(clientY - centerY);
          };

          const handleRipple = (clientX, clientY, rect) => {
            const rx = ((clientX - rect.left) / rect.width) * 100;
            const ry = ((clientY - rect.top) / rect.height) * 100;

            rippleX.set(rx);
            rippleY.set(ry);
            rippleScale.set(0);

            requestAnimationFrame(() => rippleScale.set(3));
            setTimeout(() => rippleScale.set(0), 600);
          };

          return (
            <motion.div
              key={index}
              onMouseMove={(e) => {
                if (isMobile) return;
                handleMove(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
              }}
              onTouchMove={(e) => {
                if (!isMobile) return;
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
              }}
              onClick={(e) => {
                handleRipple(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleRipple(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
              }}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: 1.03,
                y: -4,
              }}
              style={{
                rotateX,
                rotateY,
                x: moveX,
                y: moveY,
                transformPerspective: 1200,
              }}
              className="relative group cursor-pointer will-change-transform"
            >
              {/* 🔥 EXACT FAQ STYLE CARD */}
              <div className="relative rounded-[20px] p-6 overflow-hidden border border-white/20 backdrop-blur-xl saturate-150
                shadow-[0_10px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]
                hover:shadow-[0_25px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
                transition-all duration-500
                bg-[linear-gradient(135deg,
                  rgba(251,146,60,0.35),
                  rgba(236,72,153,0.25),
                  rgba(59,130,246,0.35)
                )]">

                {/* COLOR BLOBS */}
                <div className="absolute inset-0 opacity-70 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,180,100,0.4),transparent_40%),
                                                      radial-gradient(circle_at_70%_60%,rgba(120,160,255,0.4),transparent_50%)]" />
                </div>

                {/* RIPPLE */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(circle at ${rippleX}% ${rippleY}%,
                        rgba(255,255,255,0.25),
                        transparent 60%)
                    `,
                    scale: rippleScale,
                    opacity: rippleScale,
                  }}
                />

                {/* LIGHT */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background }}
                />

                {/* CONTENT */}
                <div className="relative z-10 text-white">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-white/80">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;