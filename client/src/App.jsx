import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./pages/Services";
import Faq from "./pages/Faq";
import Landing from "./pages/Landing";
import NAV from "./Components/NAV";
import { Route, Routes } from "react-router-dom";
import Gallary from "./pages/Gallary";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import About from "./pages/About";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 1.1 : 1.6, 
      easing: (t) => 1 - Math.pow(1 - t, 3),

      smooth: true,

  
      smoothTouch: false,
      syncTouch: false, 

      touchMultiplier: 1, 
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time); 
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);


    if (!isMobile) {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.defaults({
        scroller: document.body,
      });
    }

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-screen overflow-x-hidden">
      <NAV />

      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full overflow-x-hidden">
              <Landing />
              <About />
            </div>
          }
        />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
