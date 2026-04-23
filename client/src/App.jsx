import React, { useEffect } from "react";
import Services from "./pages/Services";
import Faq from "./pages/Faq";
import Landing from "./pages/Landing";
import NAV from "./Components/NAV";
import { Route, Routes } from "react-router-dom";
import Gallary from "./pages/Gallary";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Components/Loader";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Loader>
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
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Loader>
  );
};

export default App;
