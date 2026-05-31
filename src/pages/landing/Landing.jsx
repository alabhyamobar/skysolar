import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadImageSequence } from "./imageLoader";
import About from "./About";
import Herotext from "./Herotext";
import Lifecycle from "./Lifecycle";
gsap.registerPlugin(ScrollTrigger);


const isMobile = window.innerWidth < 768;
const FRAME_COUNT = isMobile ? 240 : 300;


const Landing = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startFrame = 94;
    const images = [];
    const imageSeq = {
      frame: 0,
    };


    const currentFrame = (index) =>
      `${import.meta.env.BASE_URL}${isMobile ? 'mobileframe' : 'desktopframe'}/frame_${String(index + 1).padStart(4, "0")}.webp`;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(true);
    };

    let lastRenderedFrame = -1;

    const render = (force = false) => {
      const frameIndex = Math.round(imageSeq.frame);

      if (frameIndex === lastRenderedFrame && !force) return;

      const img = images[frameIndex];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );

      lastRenderedFrame = frameIndex;
    };

    preloadImageSequence(startFrame, FRAME_COUNT, images, currentFrame, () => render(true));

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#sequence-container",
        start: "top top",
        end: "+=4000",
        scrub: 1, // added a slight scrub delay for smoothness
        pin: true,
      }
    });

    // 1. Animate the image sequence over the entire timeline duration
    tl.to(imageSeq, {
      frame: FRAME_COUNT - 1, 
      snap: "frame",
      ease: "none",
      onUpdate: () => render(false),
    }, 0); // start at time 0


    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div>
      <section
        id="sequence-container"
        className="relative h-screen bg-slate-900 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 top-0 lg:top-15"
        />
        <Herotext/>
      </section>
      <About/>
      <Lifecycle/>
    </div>
  );
};

export default Landing;