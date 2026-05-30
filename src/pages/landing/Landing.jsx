import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadImageSequence } from "./imageLoader";
import About from "./About";
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;

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
      `${import.meta.env.BASE_URL}desktopframe/frame_${String(index + 1).padStart(4, "0")}.webp`;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(true);
    };

    let lastRenderedFrame = -1;

    const render = (force = false) => {
      const frameIndex = Math.round(imageSeq.frame);

      // Prevent redundant renders of the same frame unless forced (like on resize)
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

    // Create a master timeline that is scrubbed by ScrollTrigger
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

    // 2. Animate brand texts appearing and disappearing at specific progress points
    // The total duration of the timeline is conceptually 1 (since ease:"none" to FRAME_COUNT)
    // We use relative positioning (0.1, 0.3, etc.) to place texts throughout the scroll

    tl.fromTo("#text-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1);
    tl.to("#text-1", { opacity: 0, y: -50, duration: 0.1 }, 0.3);

    tl.fromTo("#text-2", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.4);
    tl.to("#text-2", { opacity: 0, scale: 1.2, duration: 0.1 }, 0.6);

    tl.fromTo("#text-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7);
    tl.to("#text-3", { opacity: 0, y: -50, duration: 0.1 }, 0.9);

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
          className="absolute inset-0 w-full h-full block z-0"
        />
        
        {/* Layer above the canvas for texts */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center bg-black/20">
            <h1 id="text-1" className="absolute text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-widest uppercase opacity-0 text-center drop-shadow-2xl">
                Save Money <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">with </span>
            </h1>
            <h1 id="text-2" className="absolute text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-widest uppercase opacity-0 text-center drop-shadow-2xl">
                Clean <span className="text-teal-400">Energy</span>
            </h1>
            <h1 id="text-3" className="absolute text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-widest uppercase opacity-0 text-center drop-shadow-2xl">
                A Brighter <span className="text-yellow-400">Future</span>
            </h1>
        </div>
      </section>
      <About/>
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-5xl font-semibold text-slate-800">
          Scroll Driven Experience
        </h2>
      </section>
    </div>
  );
};

export default Landing;