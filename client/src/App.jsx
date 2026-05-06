import React from "react";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import About from "./pages/About";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="h-screen w-screen">
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
