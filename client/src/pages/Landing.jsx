import React, { useEffect, useRef, useState, useContext } from "react";
import { ScrollProvider } from "../Context/ScrollContext";
import { useNavigate } from "react-router-dom";
import LandingContent from "../Components/LandingContent";

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);
  const navigate = useNavigate();

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const { homeRef, contactRef, scrollToView } = useContext(ScrollProvider);

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
    <div ref={homeRef} className="relative h-[150vh] sm:h-[250vh] w-full overflow-hidden">
      <>
        <video
          data-scroll
          data-scroll-speed="-1"
          ref={video1Ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
          onCanPlayThrough={() => {
            if (window.__revealApp) window.__revealApp();
          }}
          src={`${import.meta.env.BASE_URL}/video/skymobile1.mp4`}
          autoPlay
          muted
          playsInline
          onEnded={handleVideo1End}
        />

        <video
          data-scroll
          data-scroll-speed="-1"
          ref={video2Ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentVideo === 2 ? "opacity-100" : "opacity-0"
          }`}
          src={`${import.meta.env.BASE_URL}/video/skymobile2.mp4`}
          muted
          playsInline
          loop
        />
      </>
      <LandingContent />
    </div>
  );
};

export default Landing;
