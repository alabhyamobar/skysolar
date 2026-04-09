import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientBG from "./Components/GradientBg";
import Services from "./pages/Services";
import Faq from "./pages/Faq";
import Landing from "./pages/Landing";
import NAV from "./Components/NAV";
import { Route, Routes } from "react-router-dom";
import Gallary from "./pages/Gallary";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import Testimonial from "./pages/Testimonial";
import Footer from "./pages/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // 🔥 SYNC LENIS WITH GSAP
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll.instance.scroll.y;
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

    // RAF LOOP
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-screen overflow-x-hidden">
      <NAV />
      <div className="fixed inset-0 -z-10">
        <GradientBG />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full overflow-x-hidden">
              <Landing />
              <Services />
              <Faq />
              <Testimonial />
              <Footer/>
            </div>
          }
        />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
