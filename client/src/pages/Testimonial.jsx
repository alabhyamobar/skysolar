import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {  ScrollProvider } from "../Context/ScrollContext";

const testimonials = [
  {
    name: "Rahul Sharma // Homeowner, Lucknow",
    text: "The installation was smooth and professional. My electricity bills have dropped significantly, and the system works flawlessly even during peak summers.",
  },
  {
    name: "Priya Verma // Small Business Owner, Kanpur",
    text: "Switching to solar with Sky Renewable was one of the best decisions for my business.",
  },
  {
    name: "Amit Singh // Residential Project, Prayagraj",
    text: "Very reliable service and great support after installation.",
  },
];

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const tweenRef = useRef(null);
  const { testimonialRef } = useContext(ScrollProvider);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobile || !sliderRef.current) {
      tweenRef.current?.kill();
      return undefined;
    }

    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;

    gsap.set(slider, { x: 0 });

    tweenRef.current = gsap.to(slider, {
      x: -totalWidth,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tweenRef.current?.pause();
    const play = () => tweenRef.current?.play();

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("touchstart", pause, { passive: true });
    slider.addEventListener("touchend", play);

    return () => {
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", play);
      slider.removeEventListener("touchstart", pause);
      slider.removeEventListener("touchend", play);
      tweenRef.current?.kill();
    };
  }, [isMobile]);

  const mobileTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={testimonialRef}
      className="overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] py-20 lg:min-h-screen"
    >
      <h2 className="mb-16 px-4 text-center text-4xl font-semibold sm:text-6xl">
        What People Say
      </h2>

      {isMobile ? (
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex w-max gap-6 px-4 will-change-transform"
          >
            {mobileTestimonials.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="min-w-[280px] max-w-[320px] rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 active:scale-95"
              >
                <div className="mb-4 text-4xl">“</div>
                <p className="mb-4 text-sm leading-relaxed">{item.text}</p>
                <div className="border-t pt-3 text-xs text-gray-500">
                  {item.name.toUpperCase()}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="max-w-sm rounded-2xl bg-white p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-4 text-4xl">“</div>
              <p className="mb-4 text-base leading-relaxed">{item.text}</p>
              <div className="border-t pt-3 text-xs text-gray-500">
                {item.name.toUpperCase()}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonial;
