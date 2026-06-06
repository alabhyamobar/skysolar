import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Consultation",
    icon: "◎",
    description:
      "Technical assessment, energy load auditing, and ROI modeling based on specific facility constraints.",
  },
  {
    number: "02",
    title: "Design",
    icon: "⬡",
    description:
      "Custom architecture, regulatory approval handling, and detailed electrical engineering blueprints.",
  },
  {
    number: "03",
    title: "Execution",
    icon: "◈",
    description:
      "Tier-1 hardware deployment by certified specialists with rigorous quality control and testing phases.",
  },
  {
    number: "04",
    title: "Active Monitoring",
    icon: "⬢",
    description:
      "AI-driven output optimization, predictive maintenance alerts, and 24/7 operations center support.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardContentStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function HorizontalPhaseCard({ phase, index, scrollYProgress }) {
  const center = (index + 0.5) / 4;
  const startActivation = Math.max(0, center - 0.12);
  const endActivation = center;

  const numberColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#5C6780", "#E8A56A"]
  );

  const titleColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#4A5568", "#FFFFFF"]
  );

  const descColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#3A4255", "#B8BDC9"]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["rgba(232, 165, 106, 0.15)", "rgba(232, 165, 106, 0.5)"]
  );

  const dotOpacity = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    [0.1, 1]
  );

  const dotScale = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    [0.6, 1.2]
  );

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group pt-2 flex"
    >
      {/* Dot on timeline */}
      <motion.div
        style={{ borderColor, color: numberColor }}
        className="relative w-14 h-14 flex items-center justify-center border bg-[#070B14] text-xl font-black z-10 group-hover:bg-[#E8A56A]/10 transition-colors duration-500"
        whileHover={{ scale: 1.1 }}
      >
        {phase.number}
        {/* Glow dot on track */}
        <motion.span
          style={{ opacity: dotOpacity, scale: dotScale }}
          className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8A56A] shadow-[0_0_12px_4px_rgba(232,165,106,0.5)]"
        />
      </motion.div>

      {/* Staggered Text inside Card */}
      <motion.div variants={cardContentStagger} className="mt-6">
        <motion.h3
          style={{ color: titleColor }}
          className="text-xs font-black tracking-[3px] uppercase"
        >
          {phase.title}
        </motion.h3>

        <motion.p
          style={{ color: descColor }}
          className="mt-3 text-sm leading-7 group-hover:text-white/80 transition-colors duration-300"
        >
          {phase.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// --- Desktop: horizontal progress bar driven by scroll ---
function HorizontalTimeline({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div className="hidden md:block relative mt-24">
      {/* Track */}
      <div className="absolute top-7 left-0 w-full h-[2px] bg-white/10" />

      {/* Animated fill */}
      <motion.div
        className="absolute top-7 left-0 w-full h-[2px] bg-[#E8A56A] origin-left"
        style={{ scaleX }}
      />

      {/* Phase cards */}
      <motion.div
        className="grid grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {phases.map((phase, index) => (
          <HorizontalPhaseCard
            key={phase.number}
            phase={phase}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </div>
  );
}

// --- Vertical Phase Card (Mobile) ---
function VerticalPhaseCard({ phase, index, scrollYProgress }) {
  const center = (index + 0.5) / 4;
  const startActivation = Math.max(0, center - 0.15);
  const endActivation = center;

  const numberColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#5C6780", "#E8A56A"]
  );

  const titleColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#4A5568", "#FFFFFF"]
  );

  const descColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["#3A4255", "#B8BDC9"]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    ["rgba(232, 165, 106, 0.15)", "rgba(232, 165, 106, 0.5)"]
  );

  const dotOpacity = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    [0.1, 1]
  );

  const dotScale = useTransform(
    scrollYProgress,
    [startActivation, endActivation],
    [0.6, 1.2]
  );

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex gap-6 pl-0"
    >
      {/* Dot + number on the left rail */}
      <div className="flex-shrink-0 relative flex flex-col items-center">
        <motion.div
          style={{ borderColor, color: numberColor }}
          className="w-12 h-12 flex items-center justify-center border bg-[#070B14] text-base font-black z-10"
        >
          {phase.number}
        </motion.div>
        {/* connector glow dot */}
        <motion.span
          style={{ opacity: dotOpacity, scale: dotScale }}
          className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E8A56A] shadow-[0_0_10px_3px_rgba(232,165,106,0.5)]"
        />
      </div>

      {/* Staggered Text */}
      <motion.div variants={cardContentStagger} className="pb-2">
        <motion.h3
          style={{ color: titleColor }}
          className="text-xs font-black tracking-[3px] uppercase"
        >
          {phase.title}
        </motion.h3>
        <motion.p
          style={{ color: descColor }}
          className="mt-3 text-sm leading-7"
        >
          {phase.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// --- Mobile: vertical progress bar driven by scroll ---
function VerticalTimeline({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div className="md:hidden relative mt-16">
      {/* Vertical track */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/10" />

      {/* Animated vertical fill */}
      <motion.div
        className="absolute left-6 top-0 w-[2px] bg-[#E8A56A] origin-top"
        style={{ scaleY, height: "100%" }}
      />

      {/* Cards */}
      <motion.div
        className="flex flex-col gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {phases.map((phase, index) => (
          <VerticalPhaseCard
            key={phase.number}
            phase={phase}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </div>
  );
}

// --- Main component ---
const Lifecycle = () => {
  const sectionRef = React.useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070B14] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E8A56A]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Heading */}
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            variants={textReveal}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
            <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
              Our Process
            </span>
          </motion.div>

          <motion.h2
            variants={textReveal}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide leading-none"
          >
            The Deployment
            <span className="block text-[#E8A56A] mt-1">Cycle</span>
          </motion.h2>

          <motion.p
            variants={textReveal}
            className="mt-6 max-w-xl mx-auto text-sm md:text-base text-[#B8BDC9] leading-relaxed"
          >
            Our standardized four-phase engineering framework ensures a
            zero-friction transition to renewable infrastructure.
          </motion.p>
        </motion.div>

        {/* Timelines — desktop horizontal / mobile vertical */}
        <HorizontalTimeline sectionRef={sectionRef} />
        <VerticalTimeline sectionRef={sectionRef} />

      </div>
    </section>
  );
};

export default Lifecycle;