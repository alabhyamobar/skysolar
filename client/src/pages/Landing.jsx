import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: "skysolar/images/hero1.webp" },
  { img: "https://images.unsplash.com/photo-1584277261846-c6a1672ed979" },
  { img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634" },
];

const Landing = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const dText1 = useRef(null);
  const dText2 = useRef(null);
  const dBtn1 = useRef(null);
  const dBtn2 = useRef(null);

  const mText1 = useRef(null);
  const mText2 = useRef(null);
  const mBtn1 = useRef(null);
  const mBtn2 = useRef(null);

  useEffect(() => {
    // 🔥 ENTRY ANIMATION
    gsap.fromTo(
      [dText1.current, mText1.current],
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
        filter: "blur(12px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
      }
    );

    const mm = gsap.matchMedia();

    // 💻 DESKTOP
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const total = slides.length;
        const scrollDistance = window.innerWidth * (total - 1) * 0.8;

        gsap.to(trackRef.current, {
          xPercent: -100 * (total - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 5%",
            end: `+=${scrollDistance+20}`,
            scrub: true,
            pin: true,
          },
        });

        gsap.set(dText2.current, { y: 100, opacity: 0 });
        gsap.set(dBtn2.current, { y: 40, opacity: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 5%",
            end: `+=${scrollDistance+20}`,
            scrub: true,
          },
        })
          .to(dText1.current, { y: -100, opacity: 0 }, 0)
          .to(dBtn1.current, { y: -30, opacity: 0 }, 0)
          .to(dText2.current, { y: 0, opacity: 1 }, 0.4)
          .to(dBtn2.current, { y: 0, opacity: 1 }, 0.5);
      }, containerRef);

      return () => ctx.revert();
    });

    // 📱 MOBILE
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(mText2.current, { opacity: 0, y: 40 });
        gsap.set(mBtn2.current, { opacity: 0, y: 20 });

        gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=400",
            scrub: true,
            pin: true,
          },
        })
          .to(mText1.current, { opacity: 0, y: -30 }, 0.2)
          .to(mBtn1.current, { opacity: 0, y: -20 }, 0.2)
          .to(mText2.current, { opacity: 1, y: 0 }, 0.5)
          .to(mBtn2.current, { opacity: 1, y: 0 }, 0.6);
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="hero-section" className="w-full px-4 sm:px-6 lg:px-10 py-10">

      {/* DESKTOP */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative w-full h-[90vh] overflow-hidden rounded-3xl">

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

          <div className="absolute left-0 top-0 h-full max-w-[650px] z-20 flex flex-col justify-center px-10">

            {/* TEXT */}
            <div ref={dText1} className="opacity-0">
              <h1 className="text-5xl lg:text-7xl text-white mb-4">
                Sky Renewable Energy
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 leading-relaxed">
                We simplify the transition to solar energy by delivering solutions that are efficient, affordable, and built for long-term performance.
              </p>
            </div>

            <div ref={dText2} className="absolute">
              <h1 className="text-5xl lg:text-7xl text-white mb-4">
                Our Story
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 leading-relaxed">
                We simplify the transition to solar energy by delivering solutions that are efficient, affordable, and built for long-term performance. Our approach combines advanced technology with practical design to ensure seamless installation, optimal energy output, and significant cost savings.
              </p>
            </div>

            {/* 🔥 PERFECT BUTTONS */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                ref={dBtn1}
                className="px-6 py-2 bg-white text-black rounded-full text-sm lg:text-base font-medium shadow-md hover:scale-105 transition"
              >
                Contact
              </button>

              <Link to="/gallery">
                <button
                  ref={dBtn2}
                  className="px-7 py-2.5 bg-orange-400 text-white rounded-full text-sm lg:text-base font-medium shadow-lg hover:scale-105 transition"
                >
                  Gallery
                </button>
              </Link>
            </div>

          </div>

          <div ref={trackRef} className="flex h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="min-w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              />
            ))}
          </div>

        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden mt-30">
        <div className="relative w-full h-[55vh] rounded-2xl overflow-hidden">

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={800}
            loop
            className="h-full w-full"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <div className="h-full w-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${slide.img})`,
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 text-center">

            <div ref={mText1} className="opacity-0 mb-6">
              <h1 className="text-3xl font-semibold text-white mb-3">
                Sky Renewable Energy
              </h1>
              <p className="text-sm text-white/80 leading-relaxed">
                We simplify the transition to solar energy by delivering solutions that are efficient, affordable, and built for long-term performance.
              </p>
            </div>

            <div ref={mText2} className="absolute opacity-0 px-4">
              <h1 className="text-3xl font-semibold text-white mb-3">
                Our Story
              </h1>
              <p className="text-sm text-white/80 leading-relaxed">
                Our approach combines advanced technology with practical design to ensure seamless installation, optimal energy output, and significant cost savings.
              </p>
            </div>

            {/* 🔥 PERFECT MOBILE BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                ref={mBtn1}
                className="w-full sm:w-auto px-5 py-2 bg-white text-black rounded-full text-sm font-medium shadow-md"
              >
                Contact
              </button>

              <Link to="/gallery" className="w-full sm:w-auto">
                <button
                  ref={mBtn2}
                  className="w-full sm:w-auto px-6 py-2.5 bg-orange-400 text-white rounded-full text-sm font-medium shadow-lg"
                >
                  Gallery
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Landing;