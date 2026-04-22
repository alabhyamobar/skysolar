import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ScrollProvider } from "../Context/ScrollContext";
import { useRef } from "react";

const navItems = [
  { name: "Home", refKey: "home" },
  { name: "About", refKey: "about" },
  { name: "Services", refKey: "services" },
  { name: "Testimonials", refKey: "testimonials" },
  { name: "Gallery", refKey: "gallery" },
  { name: "Solar Calculator", refKey: "calculator" },
];

const NAV = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/skysolar/";

    const {
    homeRef,
    aboutRef,
    serviceRef,
    testimonialRef,
    contactRef,
    galleryRef,
    calculatorRef,
    scrollToView,
  } = useContext(ScrollProvider);

  const refMap = {
    home: homeRef,
    about: aboutRef,
    services: serviceRef,
    testimonials: testimonialRef,
    contact: contactRef,
    gallery: galleryRef,
    calculator: calculatorRef,
  };

  useEffect(() => {
    if(!homeRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry])=> setScrolled(!entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(homeRef.current);
    return ()=> observer.disconnect();
  }, [homeRef]);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () =>{
      const currentScroll = window.scrollY;
      if(currentScroll > lastScroll && currentScroll > 100){
        setHidden(true);
      }else{
        setHidden(false);
      }
      lastScroll = currentScroll;
    }

    window.addEventListener("scroll", handleScroll);
    return ()=> window.removeEventListener("scroll", handleScroll);
  },[])

  useEffect(() => {
    if(location.hash){
      const key  = location.hash.replace("#", "");
      const ref = refMap[key];
      if(ref?.current){
        setTimeout(()=>{
          scrollToView(ref);
        },100);
      }
    }
  },[location])

  const handleClick = (item)=>{
    setActive(item.name);
    const ref = refMap[item.refKey];
    if(isHome){
      if(ref?.current){
        scrollToView(ref);
      }
    }else{
      navigate(`/#${item.refKey}`);
    }
  }
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-0 w-full z-50 px-4"
    >
      <div
        className={`relative max-w-7xl mx-auto flex items-center justify-between
        px-6 py-3 rounded-2xl transition-all duration-500
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
            : "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
        }`}
      >

        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-orange-400/10 blur-xl opacity-70" />
        </div>


        <div
          onClick={() =>{
            navigate("/");
            setOpen(false);
          }}
          className="z-10 flex items-center cursor-pointer"
        >
          <img
            src="/skysolar/images/logo.png"
            alt="Sky Energy Logo"
            className="h-8 w-auto object-contain"
          />
        </div>


        <div className="hidden md:flex items-center gap-2 z-10">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className="relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
            >
              {active === item.name && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-blue-500/10 border border-blue-500/20"
                />
              )}

              <span
                className={
                  active === item.name
                    ? "text-blue-500"
                    : scrolled
                    ? "text-gray-700 hover:text-black"
                    : "text-white/80 hover:text-white"
                }
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleClick({ name: "Contact", refKey: "contact" })}
          className={`z-10 px-5 py-2 rounded-xl text-sm font-medium transition ${
            scrolled ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Contact
        </button>


        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-2xl z-10 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 mx-auto max-w-7xl bg-white/90 backdrop-blur-xl rounded-2xl p-6"
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  handleClick(item)
                  setOpen(false)}}
                className="py-2 text-gray-800 cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NAV;