import React from "react";
import Landing from "./pages/Landing";
import NAV from "./Components/NAV";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      <div
        className="bg-stars fixed inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}/textures/stars2.jpg)`,
        }}
      />

      <div className="bg-overlay fixed inset-0 -z-20 bg-gradient-to-b from-black/40 to-black/80" />

      <div className="relative z-10">
        <NAV />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
