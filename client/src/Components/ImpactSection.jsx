import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Sun, Handshake, Zap, Sparkles } from "lucide-react";

const Counter = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.floor(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2.2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const stats = [
  {
    icon: Sun,
    emoji: "☀️",
    value: 12500,
    suffix: "+",
    label: "Solar Panels Installed",
    delay: 0,
  },
  {
    icon: Handshake,
    emoji: "🤝",
    value: 850,
    suffix: "+",
    label: "Trusted Partners",
    delay: 0.15,
  },
  {
    icon: Zap,
    emoji: "⚡",
    value: 340,
    suffix: " MW",
    label: "Energy Generated",
    delay: 0.3,
  },
];

const ImpactSection = () => {
  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, #fff7ed 0%, #ffedd5 40%, #fed7aa 100%)",
      }}
    >
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 bg-orange-300/40 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300/40 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-orange-300/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-yellow-300/20"
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <Sparkles className="w-4 h-4 text-orange-400/60" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-orange-200/60 shadow-lg shadow-orange-200/30 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
        </span>
        <span className="text-xs font-semibold tracking-widest uppercase text-orange-700">
          Our Impact
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative text-5xl sm:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent text-center tracking-tight"
      >
        Our Impact
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative mt-5 text-base sm:text-lg lg:text-xl text-gray-600 text-center max-w-2xl leading-relaxed"
      >
        Powering the future with clean energy, innovation, and trust.
      </motion.p>

      <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: stat.delay }}
              className="group relative"
            >
              <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-orange-300/60 via-white/50 to-yellow-300/60 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(251,146,60,0.5)_60deg,transparent_120deg,transparent_240deg,rgba(250,204,21,0.5)_300deg,transparent_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative rounded-3xl bg-white/70 backdrop-blur-2xl p-8 text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-300/40 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <div className="relative inline-flex items-center justify-center mb-5">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl blur-xl opacity-50"
                    />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-400/40">
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.2} />
                    </div>
                  </div>

                  <h2 className="relative text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-none">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </h2>

                  <div className="relative mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

                  <p className="relative mt-4 text-sm font-medium text-gray-600 tracking-wider uppercase">
                    {stat.label}
                  </p>

                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-t from-orange-400/40 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ImpactSection;