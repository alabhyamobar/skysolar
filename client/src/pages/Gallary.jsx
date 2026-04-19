import React from "react";

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
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] w-full py-20  overflow-hidden">

      <h2 className="text-4xl sm:text-6xl font-semibold text-center mb-16">
        Our Work Gallery
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee">

          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] h-[300px] sm:h-[350px] rounded-2xl overflow-hidden relative group"
            >
              <img
                src={src}
                alt="gallery"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                bg-[linear-gradient(135deg,
                  rgba(251,146,60,0.35),
                  rgba(236,72,153,0.25),
                  rgba(59,130,246,0.35)
                )]
                backdrop-blur-xl border border-white/20"
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

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-150%);
          }
        }
      `}</style>
    </div>
  );
};

export default Gallary;