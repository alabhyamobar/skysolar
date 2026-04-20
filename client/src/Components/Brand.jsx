import React from "react";

const brands = [
  "skysolar/images/tata-logo.webp",
  "skysolar/images/Adani Electricity.webp",
  "skysolar/images/LuminousLogoBlue.webp",
  "skysolar/images/tata-logo.webp",
  "skysolar/images/Adani Electricity.webp",
  "skysolar/images/LuminousLogoBlue.webp",
];

const Brand = () => {
  return (
    <div className="w-full absolute top-0 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-12 animate-marquee items-center">

          {[...brands, ...brands].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[120px] sm:min-w-[160px]"
            >
              <img
                src={logo}
                alt="brand"
                className="h-12 sm:h-16 object-contain   transition duration-500"
              />
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 3s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Brand;