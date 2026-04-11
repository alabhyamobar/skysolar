import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const faqs = [
  { q: "How does solar energy work?", a: "Solar panels convert sunlight into electricity using photovoltaic cells." },
  { q: "What is the cost of installation?", a: "Costs vary depending on system size, but subsidies make it affordable." },
  { q: "How much can I save?", a: "You can save up to 80% on electricity bills." },
  { q: "Do panels work in cloudy weather?", a: "Yes, but at reduced efficiency." },
  { q: "What is the lifespan?", a: "Most systems last 25+ years." },
];

export default function Faq() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="relative w-full min-h-screen py-24 px-6 sm:px-10 lg:px-20">


      <div className="text-center mb-20">
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-tight">
          <span className="text-white">
            FAQs
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

        {/* LEFT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {faqs.map((item, index) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const moveX = useSpring(useTransform(x, [-100, 100], [-10, 10]));
            const moveY = useSpring(useTransform(y, [-100, 100], [-10, 10]));

            const rotateX = useTransform(y, [-100, 100], [10, -10]);
            const rotateY = useTransform(x, [-100, 100], [-10, 10]);

            const lightX = useTransform(x, (v) => v + 150);
            const lightY = useTransform(y, (v) => v + 150);

            const glow = useMotionTemplate`
              radial-gradient(circle at ${lightX}px ${lightY}px,
                rgba(255,255,255,0.15),
                transparent 60%)
            `;

            const isActive = active === index;
            const fromLeft = index % 2 === 0;

            const itemVar = {
              hidden: {
                opacity: 0,
                x: isMobile ? (fromLeft ? -80 : 80) : 0,
                y: 40,
                scale: 0.92,
              },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: { duration: 0.5 },
              },
            };

            return (
              <motion.div
                key={index}
                variants={itemVar}
                onMouseMove={(e) => {
                  if (isMobile) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  x.set(e.clientX - (rect.left + rect.width / 2));
                  y.set(e.clientY - (rect.top + rect.height / 2));
                }}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
                onClick={() => setActive(index)}
                style={{
                  rotateX,
                  rotateY,
                  x: moveX,
                  y: moveY,
                  transformPerspective: 1200,
                }}
                className="relative group cursor-pointer"
              >


                <div className={`relative rounded-[20px] p-5 backdrop-blur-2xl border border-white/20
                  bg-white/10 transition-all duration-500
                  ${isActive
                    ? "scale-[1.03] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
                    : "shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  }`}>


                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: glow }}
                  />

                  <div className="relative z-10 flex justify-between items-center text-white">
                    <h3 className="text-lg">{item.q}</h3>
                    <motion.span animate={{ rotate: isActive ? 90 : 0 }}>
                      →
                    </motion.span>
                  </div>
                </div>


                <AnimatePresence>
                  {isMobile && isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 text-white/80">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>


        <div className="hidden lg:flex items-center justify-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={faqs[active].q}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-lg"
            >

              <div className="relative rounded-[30px] p-10 backdrop-blur-2xl border border-white/20
                bg-white/10 shadow-[0_50px_140px_rgba(0,0,0,0.8)]
                hover:scale-[1.02] transition-all duration-500">

                <h3 className="text-3xl font-semibold text-white mb-6">
                  {faqs[active].q}
                </h3>

                <p className="text-white/80 text-lg leading-relaxed">
                  {faqs[active].a}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}