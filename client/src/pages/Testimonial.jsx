import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] py-20 overflow-hidden">

      {/* HEADING */}
      <h2 className="text-4xl sm:text-6xl font-semibold text-center mb-16 px-4">
        What People Say
      </h2>

      {/* MOBILE → MARQUEE */}
      {isMobile ? (
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 w-max animate-marquee">

            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="
                  min-w-[280px] max-w-[320px] 
                  bg-white p-6 rounded-2xl shadow-lg
                  transition-all duration-500 active:scale-95
                "
              >
                <div className="text-4xl mb-4">“</div>

                <p className="text-sm leading-relaxed mb-4">
                  {item.text}
                </p>

                <div className="text-xs text-gray-500 border-t pt-3">
                  {item.name.toUpperCase()}
                </div>
              </div>
            ))}

          </div>
        </div>
      ) : (
        /* DESKTOP */
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg max-w-sm 
              transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">“</div>

              <p className="text-base leading-relaxed mb-4">
                {item.text}
              </p>

              <div className="text-xs text-gray-500 border-t pt-3">
                {item.name.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ANIMATION */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
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

export default Testimonial;