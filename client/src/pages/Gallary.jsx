import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollProvider } from "../Context/ScrollContext";

const images = [
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
  "https://images.unsplash.com/photo-1497436072909-f5e4be3c5f9f",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
];

const Gallary = () => {
  const sliderRef = useRef(null);
  const tweenRef = useRef(null);
  const { gallaryRef } = useContext(ScrollProvider);

  useEffect(() => {
    if (!sliderRef.current) return undefined;

    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;

    gsap.set(slider, { x: -totalWidth });

    tweenRef.current = gsap.to(slider, {
      x: 0,
      duration: 24,
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
  }, []);

  const galleryImages = [...images, ...images];

  return (
    <section
      ref={gallaryRef}
      className="w-full overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] py-20 lg:min-h-screen"
    >
      <h2 className="mb-16 text-center text-4xl font-semibold sm:text-6xl">
        Our Work Gallery
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex w-max gap-6 px-4 will-change-transform"
        >
          {galleryImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative h-[300px] min-w-[250px] overflow-hidden rounded-2xl sm:h-[350px] sm:min-w-[300px] lg:min-w-[350px]"
            >
              <img
                src={src}
                alt="gallery"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div
                className="absolute inset-0 border border-white/20 opacity-0 backdrop-blur-xl transition duration-500 group-hover:opacity-100
                bg-[linear-gradient(135deg,rgba(251,146,60,0.35),rgba(236,72,153,0.25),rgba(59,130,246,0.35))]"
              >
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Solar Installation</h3>
                  <p className="text-sm text-white/80">Clean energy project</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallary;
