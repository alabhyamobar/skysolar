import React, { useEffect } from "react";
import Services from "./pages/Services";
import Landing from "./pages/Landing";
import NAV from "./Components/NAV";
import { Route, Routes } from "react-router-dom";
import Gallary from "./pages/Gallary";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Loader from "./Components/Loader";
import LocomotiveScroll from 'locomotive-scroll';


const App = () => {

const locomotiveScroll = new LocomotiveScroll();

  return (
    <Loader>
      <div className="w-screen overflow-x-hidden">
        <NAV />

        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full  overflow-x-hidden">
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
