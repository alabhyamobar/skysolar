import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
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
  { icon: Sun,       value: 12500, suffix: "+",   label: "Solar Panels Installed", delay: 0    },
  { icon: Handshake, value: 850,   suffix: "+",   label: "Trusted Partners",        delay: 0.15 },
  { icon: Zap,       value: 340,   suffix: " MW", label: "Energy Generated",        delay: 0.3  },
];

const SPARKLE_POSITIONS = [
  { top: "15%", left: "10%" }, { top: "25%", left: "85%" },
  { top: "50%", left: "5%"  }, { top: "60%", left: "90%" },
  { top: "75%", left: "20%" }, { top: "80%", left: "70%" },
  { top: "35%", left: "50%" }, { top: "90%", left: "45%" },
];
const SPARKLE_TRANSITIONS = [
  { duration: 3.2, delay: 0   }, { duration: 4.1, delay: 0.8 },
  { duration: 5.0, delay: 1.5 }, { duration: 3.7, delay: 2.1 },
  { duration: 4.5, delay: 0.4 }, { duration: 3.9, delay: 1.2 },
  { duration: 5.2, delay: 2.7 }, { duration: 4.8, delay: 0.6 },
];

const ImpactSection = () => {
  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center
                 px-4 sm:px-6 lg:px-8
                 py-16 sm:py-24 lg:py-32
                 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, #fff7ed 0%, #ffedd5 40%, #fed7aa 100%)",
      }}
    >

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-5
                   w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96
                   bg-orange-300/30 sm:bg-orange-300/40
                   blur-[60px] sm:blur-[100px] lg:blur-[140px]
                   rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -35, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 right-5
                   w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96
                   bg-yellow-300/30 sm:bg-yellow-300/40
                   blur-[60px] sm:blur-[100px] lg:blur-[140px]
                   rounded-full pointer-events-none"
      />


      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   hidden sm:block
                   w-[min(700px,90vw)] h-[min(700px,90vw)]
                   rounded-full border border-orange-300/30 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   hidden sm:block
                   w-[min(900px,110vw)] h-[min(900px,110vw)]
                   rounded-full border border-yellow-300/20 pointer-events-none"
      />


      <div className="hidden sm:block">
        {SPARKLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={pos}
            animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: SPARKLE_TRANSITIONS[i].duration,
              repeat: Infinity,
              delay: SPARKLE_TRANSITIONS[i].delay,
            }}
          >
            <Sparkles className="w-4 h-4 text-orange-400/60" />
          </motion.div>
        ))}
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative inline-flex items-center gap-2
                   px-3 py-1.5 sm:px-4 sm:py-2
                   rounded-full bg-white/60 backdrop-blur-xl
                   border border-orange-200/60
                   shadow-lg shadow-orange-200/30 mb-5 sm:mb-6"
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
        className="relative
                   text-4xl sm:text-5xl lg:text-7xl
                   font-semibold
                   bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                   bg-clip-text text-transparent
                   text-center tracking-tight leading-tight"
      >
        Our Impact
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative mt-4 sm:mt-5
                   text-sm sm:text-base lg:text-xl
                   text-gray-600 text-center
                   max-w-xs sm:max-w-lg lg:max-w-2xl
                   leading-relaxed px-2"
      >
        Powering the future with clean energy, innovation, and trust.
      </motion.p>


      <div
        className="relative mt-10 sm:mt-14 lg:mt-16
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                   gap-4 sm:gap-6 lg:gap-8
                   w-full max-w-xs sm:max-w-2xl lg:max-w-6xl"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: stat.delay }}
              className="group relative
                         sm:last:odd:col-span-2 sm:last:odd:mx-auto sm:last:odd:w-1/2
                         lg:last:odd:col-span-1 lg:last:odd:mx-0 lg:last:odd:w-full"
            >
              <div
                className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl p-[1.5px]
                            bg-gradient-to-br from-orange-300/60 via-white/50 to-yellow-300/60
                            overflow-hidden"
              >
  
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[100%]
                             bg-[conic-gradient(from_0deg,transparent_0deg,rgba(251,146,60,0.5)_60deg,transparent_120deg,transparent_240deg,rgba(250,204,21,0.5)_300deg,transparent_360deg)]
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />


                <div
                  className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl
                              bg-white/70 backdrop-blur-2xl
                              p-3.5 sm:p-6 lg:p-8
                              text-center
                              transition-all duration-500
                              group-hover:-translate-y-1 sm:group-hover:-translate-y-2
                              group-hover:shadow-xl sm:group-hover:shadow-2xl
                              group-hover:shadow-orange-300/40
                              overflow-hidden"
                >
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                transition-transform duration-1000
                                bg-gradient-to-r from-transparent via-white/40 to-transparent
                                skew-x-12"
                  />

                  <div className="relative inline-flex items-center justify-center mb-3 sm:mb-5">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400
                                 rounded-lg sm:rounded-xl lg:rounded-2xl blur-xl opacity-50"
                    />
                    <div
                      className="relative
                                  w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16
                                  rounded-lg sm:rounded-xl lg:rounded-2xl
                                  bg-gradient-to-br from-orange-400 to-yellow-400
                                  flex items-center justify-center
                                  shadow-lg shadow-orange-400/40"
                    >
                      <Icon
                        className="w-4 h-4 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                        strokeWidth={2.2}
                      />
                    </div>
                  </div>


                  <h2
                    className="relative
                               text-3xl sm:text-5xl lg:text-6xl
                               font-bold
                               bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500
                               bg-clip-text text-transparent
                               leading-none"
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </h2>

                  <div
                    className="relative mx-auto mt-2 sm:mt-4 h-px w-8 sm:w-12
                                bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"
                  />

                  <p
                    className="relative mt-2 sm:mt-4
                               text-xs sm:text-sm
                               font-medium text-gray-600
                               tracking-wider uppercase"
                  >
                    {stat.label}
                  </p>
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