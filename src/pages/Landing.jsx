import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231" },
  { img: "https://images.unsplash.com/photo-1584277261846-c6a1672ed979" },
  { img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634" },
];

const Landing = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const dText1 = useRef(null);
  const dText2 = useRef(null);
  const dBtn1 = useRef(null);
  const dBtn2 = useRef(null);

  const mText1 = useRef(null);
  const mText2 = useRef(null);
  const mBtn1 = useRef(null);
  const mBtn2 = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const total = slides.length;
        const scrollDistance = window.innerWidth * (total - 1) * 0.8;

        gsap.to(trackRef.current, {
          xPercent: -100 * (total - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 0.6,
            pin: true,
            onUpdate: (self) => {
              gsap.to(progressRef.current, {
                scaleX: self.progress,
                transformOrigin: "left",
                duration: 0.2,
              });
            },
          },
        });

        gsap.set(dText2.current, {
          y: 80,
          opacity: 0,
          filter: "blur(10px)",
        });
        gsap.set(dBtn2.current, { opacity: 0, y: 30 });

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 0.6,

          },
        })
          .to(dText1.current, {
            y: -120,
            opacity: 0,
            filter: "blur(8px)",
          }, 0.1)
          .to(dBtn1.current, { y: -30, opacity: 0 }, 0.1)
          .to(dText2.current, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
          }, 0.35)
          .to(dBtn2.current, { y: 0, opacity: 1 }, 0.45);

      }, containerRef);

      return () => ctx.revert();
    });


    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(mText2.current, { opacity: 0, y: 40 });
        gsap.set(mBtn2.current, { opacity: 0, y: 20 });

        gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=400",
            scrub: 1,
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

      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative w-full h-[90vh] overflow-hidden rounded-3xl"
        >

          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-30">
            <div ref={progressRef} className="h-full bg-white scale-x-0" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />
          <div className="absolute left-0 top-0 h-full w-[40%] z-20 flex flex-col justify-center px-10">

            <div ref={dText1}>
              <h1 className="text-5xl text-white mb-4">
                Sky Renewable Energy
              </h1>
              <p className="text-lg text-white/80">
                Your last stop for energy efficiency
              </p>
            </div>

            <div ref={dText2} className="absolute">
              <h1 className="text-5xl text-white mb-4">Our Story</h1>
              <p className="text-lg text-white/80">
                We make solar simple, affordable and powerful
              </p>
            </div>

            <div className="mt-6 relative h-[40px]">
              <button ref={dBtn1} className="absolute px-6 py-2 bg-white rounded-full">
                Contact
              </button>
              <button ref={dBtn2} className="absolute px-6 py-2 bg-orange-400 rounded-full">
                Gallery
              </button>
            </div>
          </div>

          {/* SLIDES */}
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

      <div className="block md:hidden mt-6">
        <div className="relative w-full h-[85vh] rounded-2xl overflow-hidden">

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              bulletClass: "swiper-bullet",
              bulletActiveClass: "swiper-bullet-active",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={800}
            loop={true}
            slidesPerView={1}
            centeredSlides={false}
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

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />

                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

            <div ref={mText1}>
              <h1 className="text-3xl text-white mb-3">
                Sky Renewable Energy
              </h1>
              <p className="text-sm text-white/80">
                Your last stop for energy efficiency
              </p>
            </div>

            <div ref={mText2} className="absolute">
              <h1 className="text-3xl text-white mb-3">Our Story</h1>
              <p className="text-sm text-white/80">
                We make solar simple, affordable and powerful
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button ref={mBtn1} className="px-5 py-2 bg-white rounded-full text-sm">
                Contact
              </button>
              <button ref={mBtn2} className="px-5 py-2 bg-orange-400 rounded-full text-sm">
                Gallery
              </button>
            </div>

          </div>
          <style jsx>{`
            .swiper-bullet {
              width: 6px;
              height: 6px;
              background: rgba(255, 255, 255, 0.4);
              border-radius: 999px;
              margin: 0 4px !important;
              transition: all 0.3s ease;
            }

            .swiper-bullet-active {
              width: 18px;
              background: white;
            }
          `}</style>

        </div>
      </div>

    </div>
  );
};

export default Landing; 