import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    number: "01",
    title: "CONSULTATION",
    description:
      "Technical assessment, energy load auditing, and ROI modeling based on specific facility constraints.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Custom architecture, regulatory approval handling, and detailed electrical engineering blueprints.",
  },
  {
    number: "03",
    title: "EXECUTION",
    description:
      "Tier-1 hardware deployment by certified specialists with rigorous quality control and testing phases.",
  },
  {
    number: "04",
    title: "ACTIVE MONITORING",
    description:
      "AI-driven output optimization, predictive maintenance alerts, and 24/7 operations center support.",
  },
];

const Lifecycle = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".progress-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.to(".progress-line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      });

      gsap.from(".lifecycle-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".phase-card", {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".phases-container",
          start: "top 80%",
        },
      });

      gsap.to(".phase-number", {
        color: "#E8A56A",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070B14] text-white py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="lifecycle-title text-4xl md:text-5xl font-black uppercase tracking-wide">
            THE DEPLOYMENT CYCLE
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-[#D4A373]">
            Our standardized four-phase engineering framework ensures a
            zero-friction transition to renewable infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-28">
          {/* Background line */}
          <div className="absolute top-6 left-0 w-full h-[1px] bg-white/10" />

          {/* Animated line */}
          <div className="progress-line absolute top-6 left-0 w-full h-[2px] bg-[#E8A56A]" />

          {/* Cards */}
          <div className="phases-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {phases.map((phase) => (
              <div key={phase.number} className="phase-card">
                <div className="phase-number w-14 h-14 border border-[#E8A56A]/30 flex items-center justify-center text-xl font-bold text-[#5C6780]">
                  {phase.number}
                </div>

                <h3 className="mt-8 text-sm font-black tracking-wide uppercase">
                  {phase.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#B8BDC9]">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifecycle;