import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const brands = [
  `${import.meta.env.BASE_URL}/images/tata-logo.webp`,
  `${import.meta.env.BASE_URL}/images/Adani Electricity.webp`,
  `${import.meta.env.BASE_URL}/images/LuminousLogoBlue.webp`,
  `${import.meta.env.BASE_URL}/images/tata-logo.webp`,
  `${import.meta.env.BASE_URL}/images/Adani Electricity.webp`,
  `${import.meta.env.BASE_URL}/images/LuminousLogoBlue.webp`,
];

const Brand = () => {
  const sliderRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return undefined;

    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;

    gsap.set(slider, { x: 0 });

    tweenRef.current = gsap.to(slider, {
      x: -totalWidth,
      duration: 10,
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

  const brandLogos = [...brands, ...brands];

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex w-max items-center gap-12 will-change-transform"
        >
          {brandLogos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex min-w-[120px] items-center justify-center sm:min-w-[160px]"
            >
              <img
                src={logo}
                alt="brand"
                className="h-12 object-contain transition duration-500 sm:h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
