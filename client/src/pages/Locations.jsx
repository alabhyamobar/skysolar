import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Prayagraj",
    info: "A historic and spiritual city known for the Triveni Sangam and the grand Kumbh Mela.",
    image: `${import.meta.env.BASE_URL}/images/pryagraj.jpg`,
    services: ["TRIVENI SANGAM", "KUMBH MELA", "SPIRITUAL TOURISM", "HERITAGE SITES"],
  },
  {
    name: "Lucknow",
    info: "The capital of Uttar Pradesh, famous for its Nawabi culture and architecture.",
    image: `${import.meta.env.BASE_URL}/images/lucknow.avif`,
    services: ["BARA IMAMBARA", "NAWABI CULTURE", "FOOD & CUISINE", "HERITAGE WALK"],
  },
  {
    name: "Kanpur",
    info: "An important industrial city known for leather production and education.",
    image: `${import.meta.env.BASE_URL}/images/kanpur.jpg`,
    services: ["INDUSTRIAL HUB", "LEATHER MARKET", "EDUCATION CENTERS", "RIVERFRONT"],
  },
  {
    name: "Delhi",
    info: "India’s capital city blending modern infrastructure with historic landmarks.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format",
    services: ["RED FORT", "INDIA GATE", "QUTUB MINAR", "MODERN CITY LIFE"],
  },
  {
    name: "Gorakhpur",
    info: "A growing city known for Gorakhnath Temple and rapid development.",
    image: `${import.meta.env.BASE_URL}/images/gorakhpur.jpg`,
    services: ["GORAKHNATH TEMPLE", "CULTURAL ROOTS", "RAILWAY HUB", "URBAN GROWTH"],
  },
];

const Locations = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap.set(cardsRef.current.slice(1), { y: "100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? `top -10%` : `top top`,
          end: isMobile ? `+=1000` : `+=1200`,
          scrub: true,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (i === 0) return;

        tl.to(
          card,
          {
            y: "0%",
            ease: "power2.out",
          },
          i * (isMobile ? 0.8 : 1)
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5,_#fed7aa)] p-10"
    >
      <h1 className="text-4xl lg:text-6xl font-bold  text-gray-800 mb-8">Our Locations</h1>
      <div className="relative w-[95vw] lg:w-[90vw] h-[90vh] lg:h-[85vh] overflow-hidden rounded-xl  shadow-xl">

        {locations.map((location, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute inset-0 w-full h-full flex flex-col-reverse lg:flex-row"
          >
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8  bg-[#f3f3f3]">
              
              <div className="text-xs sm:text-sm tracking-widest text-gray-500 mb-3">
                {index + 1} — LOCATION
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 text-black leading-tight">
                {location.name}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 max-w-md">
                {location.info}
              </p>

              <div className="space-y-3 mb-6">
                {location.services.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-300 pb-2 text-xs sm:text-sm tracking-wide text-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button className="border border-black px-5 py-2 w-fit text-xs sm:text-sm tracking-wide hover:bg-black hover:text-white transition">
                EXPLORE
              </button>
            </div>
            <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-full overflow-hidden rounded-t-2xl">
              <img
                src={location.image}
                alt={location.name}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Locations;