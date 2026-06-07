import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, TrendingDown, ShieldCheck, Leaf } from "lucide-react";
import { useInView, useMotionValue, animate } from "framer-motion";

// High-performance animated counter that runs when in viewport
const AnimatedCounter = ({ target, prefix = "", suffix = "", duration = 1.8 }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted = Math.round(latest).toLocaleString();
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, target, prefix, suffix, count, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const impactStats = [
  {
    icon: Leaf,
    target: 14820,
    prefix: "",
    suffix: " Tons",
    label: "CO2 Offset Annually",
    description: "Equivalent to planting over 245,000 trees.",
  },
  {
    icon: TrendingDown,
    target: 62,
    prefix: "",
    suffix: "% Avg.",
    label: "Utility Bill Reduction",
    description: "Average savings calculated across all clients.",
  },
  {
    icon: ShieldCheck,
    target: 25,
    prefix: "",
    suffix: " Years",
    label: "Performance Warranty",
    description: "Guaranteed power output reliability and hardware.",
  },
];

const testimonials = [
  {
    quote: "Sky Renewable Energies transformed our warehouse facilities. The consulting team precisely calculated our ROI, and the actual energy yields have exceeded the projections by 8%. An exceptional enterprise partner.",
    author: "Sarah Jenkins",
    role: "Director of Operations, Vanguard Logistics",
    location: "Commercial Installation — 420kW",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote: "Switching our corporate park to solar with battery backups has solved our grid latency issues entirely. Sky Solar's engineering was top-tier, navigating all regulatory processes seamlessly.",
    author: "Marcus Vance",
    role: "VP of Sustainability, Core Tech Industries",
    location: "Industrial Microgrid — 1.2MW",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote: "From the first technical audit to the final grid connection, Sky Solar was professional, transparent, and prompt. Our home now generates more electricity than we consume, feeding power back into the grid.",
    author: "David L. Ross",
    role: "Estate Owner",
    location: "Residential Smart Solar — 18kW",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
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

const viewportOptions = { once: true, amount: 0.15 };

const Impact = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="impact" className="relative bg-[#050914] overflow-hidden py-28 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/80" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ambient glow highlight */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-[#E8A56A]/5 blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Block */}
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.div
              variants={textReveal}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
              <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                Real World Impact
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide leading-none"
            >
              Delivering Proven
              <span className="block text-[#E8A56A] mt-2">Solar Performance</span>
            </motion.h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
          >
            We quantify our engineering success through real, measurable milestones. See how our microgrids, residential arrays, and industrial installations empower clean independence.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {impactStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  perspective={1200}
                  scale={1.02}
                  glareEnable={true}
                  glareMaxOpacity={0.06}
                >
                  <div className="group relative overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 hover:border-[#E8A56A]/50 transition-all duration-700">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />
                    
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E8A56A]/10 border border-[#E8A56A]/20">
                      <Icon className="text-[#E8A56A] w-6 h-6" />
                    </div>

                    <h3 className="text-4xl font-black text-[#E8A56A] mt-8 tracking-tight">
                      <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                    </h3>
                    
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase mt-2">
                      {stat.label}
                    </h4>

                    <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Layout split for testimonials */}
        <div className="grid lg:grid-cols-12 gap-12 mt-28 items-center">
          {/* Quote visual element (Left side decoration) */}
          <motion.div
            className="lg:col-span-4 hidden lg:flex flex-col items-start"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <div className="w-20 h-20 bg-[#E8A56A]/10 border border-[#E8A56A]/20 flex items-center justify-center rounded-2xl mb-8">
              <Quote className="text-[#E8A56A] w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-wider leading-snug">
              What Our
              <span className="block text-[#E8A56A]">Partners Say</span>
            </h3>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Read how Sky Renewable Energies engineered long-term yields, cost cuts, and reliability for leading brands and private estates.
            </p>
          </motion.div>

          {/* Testimonial slider (Right side) */}
          <div className="lg:col-span-8 w-full">
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 sm:p-12 min-h-[380px] flex flex-col justify-between">
              
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E8A56A]/10 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-8">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E8A56A] text-[#E8A56A]" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-white">
                      "{testimonials[activeIndex].quote}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].author}
                      className="w-14 h-14 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white leading-none">
                        {testimonials[activeIndex].author}
                      </h4>
                      <p className="text-sm text-[#E8A56A] font-semibold mt-1">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {testimonials[activeIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Nav Controls */}
              <div className="absolute bottom-8 right-8 flex gap-3">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#E8A56A] hover:text-black hover:border-[#E8A56A] transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#E8A56A] hover:text-black hover:border-[#E8A56A] transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;