import React from "react";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import About from "./pages/About";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {

    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,

      smartphone: {
        smooth: true,
      },

      tablet: {
        smooth: true,
      },
    });

    return () => {
      scroll.destroy();
    };

  }, []);
  return (
    <div data-scroll-container className="h-screen w-screen ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <About />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
