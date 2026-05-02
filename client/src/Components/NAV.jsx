import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollProvider } from "../Context/ScrollContext";

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
  const isHome =
    location.pathname === "/" || location.pathname === "/skysolar/";

  const {
    homeRef,
    aboutRef,
    serviceRef,
    testimonialRef,
    contactRef,
    gallaryRef,
    calculatorRef,
    scrollToView,
  } = useContext(ScrollProvider);

  const refMap = {
    home: homeRef,
    about: aboutRef,
    services: serviceRef,
    testimonials: testimonialRef,
    contact: contactRef,
    gallery: gallaryRef,
    calculator: calculatorRef,
  };

  useEffect(() => {
    if (!homeRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(homeRef.current);
    return () => observer.disconnect();
  }, [homeRef]);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const key = location.hash.replace("#", "");
      const ref = refMap[key];

      if (ref?.current) {
        setTimeout(() => {
          scrollToView(ref);
        }, 100);
      }
    }
  }, [location]);

  const handleClick = (item) => {
    setActive(item.name);
    setOpen(false);

    const ref = refMap[item.refKey];

    if (isHome) {
      if (ref?.current) {
        scrollToView(ref);
      }
    } else {
      navigate(`/#${item.refKey}`);
    }
  };

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
            ? "bg-[#f5e9dc]/90 backdrop-blur-2xl border border-[#d6c2a8]/40 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            : "bg-[#f5e9dc]/40 backdrop-blur-2xl border border-[#f5e9dc]/30 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
        }`}
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d6c2a8]/20 via-transparent to-[#c4a484]/20 blur-xl opacity-70" />
        </div>
        <div
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
          className="z-10 flex items-center cursor-pointer"
        >
          <img
            src="/skysolar/images/logo.png"
            alt="Sky Energy Logo"
            className="h-8 w-auto object-contain "
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 z-10">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className="relative px-4 py-2 rounded-xl text-sm cursor-pointer"
            >
              {active === item.name && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-[#e8d8c3]/60 border border-[#d6c2a8]"
                />
              )}

              <span
                className={`
                  tracking-wide font-semibold transition-all duration-300
                  ${
                    active === item.name
                      ? "text-[#8b5e34]"
                      : scrolled
                        ? "text-[#5c4432] hover:text-[#2c1f14]"
                        : "text-[#3e2c20]/80 hover:text-[#1f140d]"
                  }
                `}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => handleClick({ name: "Contact", refKey: "contact" })}
            className={`z-10 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300
          ${
            scrolled
              ? "bg-[#8b5e34] text-white hover:bg-[#6f4728]"
              : "bg-[#f5e9dc] text-[#5c4432] hover:bg-[#e8d8c3]"
          }`}
          >
            Contact
          </button>
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden text-2xl z-10 ${
              scrolled ? "text-[#2c1f14]" : "text-[#3e2c20]"
            }`}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 mx-auto max-w-7xl bg-[#f5e9dc]/95 backdrop-blur-xl rounded-2xl p-6 border border-[#e0cbb0]"
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  handleClick(item);
                  setOpen(false);
                }}
                className="py-2 text-[#5c4432] font-medium cursor-pointer hover:text-[#2c1f14]"
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
