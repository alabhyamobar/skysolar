import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rahul Sharma // Homeowner, Lucknow",
    text: "The installation was smooth and professional. My electricity bills have dropped significantly, and the system works flawlessly even during peak summers.",
  },
  {
    name: "Priya Verma // Small Business Owner, Kanpur",
    text: "Switching to solar with Sky Renewable was one of the best decisions for my business. The team handled everything—from subsidy to installation—without any hassle.",
  },
  {
    name: "Amit Singh // Residential Project, Prayagraj",
    text: "Very reliable service and great support after installation. The savings are real, and I feel good knowing I'm using clean energy for my home.",
  },
];

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(false);

  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // DESKTOP GSAP
  useEffect(() => {
    if (isMobile) return;

    gsap.set(leftRef.current, { x: 0, scale: 0.9, opacity: 0 });
    gsap.set(rightRef.current, { x: 0, scale: 0.9, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500",
        pin: true,
        scrub: true,
      },
    });

    tl.fromTo(
      centerRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1.05, opacity: 1 }
    )
      .to(leftRef.current, { x: -120, opacity: 1, scale: 1 }, "-=0.3")
      .to(rightRef.current, { x: 120, opacity: 1, scale: 1 }, "-=0.5");
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] flex flex-col px-4 sm:px-6 lg:px-10 py-16"
    >
      {/* LABEL */}
      <div className="mb-6 px-4 py-2 bg-white shadow text-xs tracking-widest w-fit">
        Sky renewable energy
      </div>

      {/* HEADING */}
      <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl">
        Nice things people <br /> said about us
      </h2>

      {/* MOBILE SWIPE */}
      {isMobile ? (
        <div className="mt-12 overflow-x-auto flex gap-4 snap-x snap-mandatory px-2 scrollbar-hide">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="snap-center flex-shrink-0 w-[85%]"
            >
              <div className="bg-white p-6 rounded-md shadow-md h-full">
                <div className="text-5xl mb-4">“</div>

                <div className="text-xs tracking-widest text-gray-500 mb-4 border-b pb-2">
                  {item.name.toUpperCase()}
                </div>

                <p className="text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DESKTOP */
        <div className="flex items-center justify-center gap-8 mt-16 w-full max-w-7xl mx-auto">
          {testimonials.map((item, index) => {
            let refProp = null;

            if (index === 0) refProp = leftRef;
            if (index === 1) refProp = centerRef;
            if (index === 2) refProp = rightRef;

            return (
              <div
                key={index}
                ref={refProp}
                className={`
                  bg-white p-8 rounded-md shadow-xl max-w-md
                  ${index === 1 ? "scale-105 z-10" : "opacity-90"}
                  ${index === 0 ? "-rotate-3" : ""}
                  ${index === 2 ? "rotate-3" : ""}
                `}
              >
                <div className="text-5xl mb-4">“</div>

                <div className="text-xs text-gray-500 border-b pb-2 mb-4">
                  {item.name.toUpperCase()}
                </div>

                <p className="text-lg">{item.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Testimonial;