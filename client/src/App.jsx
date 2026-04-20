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

const App = () => {

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08, 
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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