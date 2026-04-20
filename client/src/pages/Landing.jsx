import React, { useEffect, useRef, useState } from "react";

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobile(isMobileWidth || isPortrait);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleVideo1End = () => {
    setCurrentVideo(2);

    if (video2Ref.current) {
      video2Ref.current.play();
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0">
      <>
        <video
          ref={video1Ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
          src="/video/skymobile1.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideo1End}
        />

        <video
          ref={video2Ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentVideo === 2 ? "opacity-100" : "opacity-0"
          }`}
          src="/video/skymobile2.mp4"
          muted
          playsInline
          loop
        />
      </>

      <div
        className={`
          absolute inset-0 z-10
          flex bg-black/40 w-full h-full
          ${isMobile ? "flex-col justify-end" : "items-center"}
          px-[5vw]
          ${isMobile ? "pb-[25vh]" : ""}
        `}
      >
        <div className={`${isMobile ? "" : "max-w-4xl"}`}>
          <h1
            className="
              font-extrabold leading-none tracking-tight
              bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400
              bg-clip-text text-transparent
              opacity-80 lg:text-9xl text-4xl
              drop-shadow-[0_0_40px_rgba(0,255,255,0.35)]
            "
          >
            Sky Renewable
          </h1>

          <h2
            className="
              font-extrabold leading-none tracking-tight
              bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400
              bg-clip-text text-transparent
              opacity-80
              drop-shadow-[0_0_40px_rgba(0,255,255,0.35)]
              lg:text-9xl text-4xl
            "
          >
            Energy
          </h2>

          <p
            className="text-white/80 mt-4 max-w-md"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)" }}
          >
            Harness the power of the sun with our cutting-edge solar solutions.
          </p>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              mt-6 px-6 py-3 rounded-full
              bg-gradient-to-r from-cyan-400 to-teal-400
              text-black font-semibold
              shadow-lg shadow-cyan-500/30
              hover:scale-105 hover:shadow-cyan-400/50
              transition-all duration-300
            "
          >
            Contact Us →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;