import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import Sun from "../Components/Sun";
import Space from "../Components/Space";
import Earth from "../Components/Earth";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Solar from "../Components/Solar";
gsap.registerPlugin(ScrollTrigger);
import GUI from "lil-gui";
import { Link } from "react-router-dom";
import { div } from "three/tsl";
import Services from "./Services";

const Landing = () => {
  const textRef = useRef(null);
  const earthRef = useRef(null);
  const secondryRef = useRef(null);
  const aboutRef = useRef();
  const butonRef = useRef();
  const containerRef = useRef();
  const solarRef = useRef(null);
  const sunRef = useRef(null);
  const introDone = useRef(false);
  const storyRef = useRef(null);

  const text = "SKY Renewable Energy";
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 4;

  useEffect(() => {
    const interval = setInterval(() => {
      if (earthRef.current && textRef.current) {
        clearInterval(interval);

        const letters = textRef.current.querySelectorAll("span");
        const tl = gsap.timeline();

        tl.to(earthRef.current.position, {
          z: 0,
          duration: 1.5,
          ease: "power3.out",
        });

        tl.to(
          earthRef.current.material,
          {
            opacity: 1,
            duration: 1,
          },
          "<",
        );

        tl.to(
          earthRef.current.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "<",
        );

        tl.fromTo(
          letters,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1.1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
          },
          "a",
        );
        tl.fromTo(
          secondryRef.current,
          {
            opacity: 0,
            scale: 0.01,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
          "b",
        );
        tl.fromTo(
          aboutRef.current,
          {
            opacity: 0,
            scale: 0.01,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
          "b",
        );

        tl.fromTo(
          butonRef.current,
          {
            opacity: 0,
            scale: 0.01,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
          "b",
        );

        tl.to(
          letters,
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.02,
          },
          "a",
        );
        tl.call(() => {
          introDone.current = true;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const check = setInterval(() => {
      if (
        earthRef.current &&
        solarRef.current &&
        introDone.current &&
        sunRef.current
      ) {
        clearInterval(check);

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1000",
            scrub: 2,
            pin: true,
          },
        });
        tl1.to(textRef.current, { x: "150vw" }, "a");
        tl1.to(secondryRef.current, { x: "-100vw" }, "a");
        tl1.to(aboutRef.current, { x: "150vw" }, "a");
        tl1.to(butonRef.current, { x: "-100vw" }, "a");
        tl1.to(
          earthRef.current.position,
          {
            z: -50,
          },
          "a",
        );

        tl1.to(
          earthRef.current.scale,
          {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          },
          "a",
        );

        if (earthRef.current.material) {
          tl1.to(
            earthRef.current.material,
            {
              opacity: 0,
            },
            "a",
          );
          tl1.to(
            sunRef.current.position,
            {
              x: isMobile ? 1 : 4,
              duration: 2,
              ease: "power2.out",
            },
            "b",
          );
          tl1.fromTo(
            storyRef.current,
            {
              opacity: 0,
              scale: 0.5,
            },
            {
              opacity: 1,
              scale: 1,
              ease: "power3.out",
            },
            "b+=0.5",
          );
        }
      }
    }, 50);
  }, []);

  useEffect(() => {
    const ENABLE_GUI = false; // 🔥 turn this off when not needed
    if (!ENABLE_GUI) return;

    const interval = setInterval(() => {
      if (solarRef.current && earthRef.current && sunRef.current) {
        clearInterval(interval);

        const gui = new GUI();

        // ---------- GENERIC CONTROLLER ----------
        const addControls = (folder, ref) => {
          // Position
          folder.add(ref.position, "x", -10, 10, 0.1).name("posX");
          folder.add(ref.position, "y", -10, 10, 0.1).name("posY");
          folder.add(ref.position, "z", -10, 10, 0.1).name("posZ");

          // Uniform Scale (single slider)
          const scaleObj = { scale: ref.scale.x };

          folder
            .add(scaleObj, "scale", 0.1, 10, 0.1)
            .name("scale")
            .onChange((v) => {
              ref.scale.set(v, v, v);
            });

          // Rotation
          folder.add(ref.rotation, "x", 0, Math.PI * 2, 0.01).name("rotX");
          folder.add(ref.rotation, "y", 0, Math.PI * 2, 0.01).name("rotY");
          folder.add(ref.rotation, "z", 0, Math.PI * 2, 0.01).name("rotZ");
        };

        // ---------- SUN ----------
        const sunFolder = gui.addFolder("☀️ Sun");
        addControls(sunFolder, sunRef.current);

        // ---------- EARTH ----------
        const earthFolder = gui.addFolder("🌍 Earth");
        addControls(earthFolder, earthRef.current);

        // ---------- SOLAR ----------
        const solarFolder = gui.addFolder("🔋 Solar Panel");
        addControls(solarFolder, solarRef.current);

        // Open folders
        sunFolder.open();
        earthFolder.open();
        solarFolder.open();

        // Optional: start minimized
        // gui.close();

        // Cleanup
        return () => gui.destroy();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div ref={containerRef} className="w-full h-screen relative">
        <Canvas
          dpr={isMobile ? 1 : [1, 1.5]}
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
            top: 0,
            left: 0,
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Sun ref={sunRef} />
          <Space />
          <Earth ref={earthRef} />
          <Solar ref={solarRef} />
          <ambientLight intensity={0.03} />
          <EffectComposer>
            {!isMobile && (
              <EffectComposer>
                <Bloom intensity={2.5} />
              </EffectComposer>
            )}
          </EffectComposer>
        </Canvas>
        <div className="anime min-h-screen w-full fixed top-0 left-0 z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-20 lg:mt-10">
          <h1
            ref={textRef}
            className="text-3xl sm:text-5xl lg:text-7xl text-white mb-4 font-bold leading-tight"
          >
            {text.split("").map((char, i) => (
              <span key={i} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <h2
            ref={secondryRef}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-4"
          >
            Your last stop for sustainable energy
          </h2>

          <p
            ref={aboutRef}
            className="text-base sm:text-lg lg:text-xl max-w-full sm:max-w-xl lg:max-w-2xl text-gray-300"
          >
            “Pioneering the future of sustainable energy with advanced solar
            solutions that help you save more, gain energy independence, and
            build a cleaner, brighter future for generations to come.”
          </p>

          <button
            ref={butonRef}
            className="mt-8 px-6 py-3 sm:px-8 sm:py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl w-full sm:w-fit"
          >
            Contact Us
          </button>
        </div>
        <div
          ref={storyRef}
          className="w-[90%] sm:w-full max-w-md lg:max-w-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          lg:left-auto lg:right-20 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 z-30  flex flex-col items-center lg:items-start text-center lg:text-left bg-transparent lg:bg-white/5 backdrop-blur-none lg:backdrop-blur-xl border-none lg:border lg:border-white/10 rounded-none lg:rounded-2xl shadow-none lg:shadow-[0_0_40px_rgba(255,255,255,0.05)] opacity-0 "
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 sm:mb-6">
            Our Story
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 leading-relaxed mb-6 sm:mb-8">
            Sky Solar was founded with a simple vision—to make clean, renewable
            energy accessible to everyone. What started as a mission to reduce
            dependence on traditional power sources has grown into a commitment
            to delivering reliable, efficient, and affordable solar solutions.
            Over time, we have evolved into a trusted partner for homes and
            businesses seeking energy independence, combining advanced
            technology with expert installation and ongoing support.
          </p>

          <Link
            to="/gallery"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold bg-white text-black hover:scale-105 hover:bg-white/90 transition-all duration-300
            text-sm sm:text-base "
          >
            View Gallery
          </Link>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default Landing;
