import React, { useState, useRef, useEffect } from "react";
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
  const itemRefs = useRef([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full min-h-screen py-24 px-6 sm:px-10 lg:px-20">

      {/* HEADING */}
      <div className="text-center mb-20">
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400">
            FAQs
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

        {/* LEFT SIDE */}
        <div className="space-y-5">
          {faqs.map((item, index) => {
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

            const isActive = active === index;

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
                ref={(el) => (itemRefs.current[index] = el)}
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
                  setActive(index);
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
                  scale: isActive ? 1.04 : 1,
                  y: isActive ? -6 : 0,
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
                {/* 🌈 CARD WITH PREMIUM SHADOW */}
                <div className="relative rounded-[20px] p-5 overflow-hidden border border-white/20 backdrop-blur-xl saturate-150
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
                  <div className="relative z-10 flex justify-between items-center text-white">
                    <h3 className="text-lg font-medium">{item.q}</h3>

                    <motion.span
                      animate={{ rotate: isActive ? 90 : 0 }}
                      className="text-white/70"
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* MOBILE ANSWER */}
                <AnimatePresence>
                  {isMobile && isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-5 text-white/80">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={faqs[active].q}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative rounded-[24px] p-[1px]"
            >
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400 blur-lg opacity-40" />

              <div className="relative rounded-[24px] p-8 text-white backdrop-blur-xl border border-white/20
                bg-[linear-gradient(135deg,
                  rgba(251,146,60,0.35),
                  rgba(236,72,153,0.25),
                  rgba(59,130,246,0.35)
                )]">

                <h3 className="text-2xl font-semibold mb-4">
                  {faqs[active].q}
                </h3>

                <p className="text-white/80 leading-relaxed">
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