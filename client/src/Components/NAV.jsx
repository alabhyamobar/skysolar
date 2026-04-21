import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Gallery", id: "gallery" },
  { name: "Solar Calculator", id: "calculator" },
];

const NAV = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("Home");

  // Detect hero visibility (for glass effect)
  useEffect(() => {
    const hero = document.querySelector("#home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Hide navbar on scroll down
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

  // ScrollSpy (auto active on scroll)
  useEffect(() => {
    const sections = navItems.map((item) =>
      document.getElementById(item.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const current = navItems.find((i) => i.id === id);
            if (current) setActive(current.name);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll with offset
  const handleClick = (item) => {
    setActive(item.name);
    setOpen(false);

    const section = document.getElementById(item.id);
    if (section) {
      const yOffset = -100; // adjust to navbar height
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
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
            ? "bg-white/80 backdrop-blur-2xl border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
            : "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-orange-400/10 blur-xl opacity-70" />
        </div>

        {/* Logo */}
        <div
          onClick={() => handleClick({ name: "Home", id: "home" })}
          className="z-10 flex items-center cursor-pointer"
        >
          <img
            src="/skysolar/images/logo.png"
            alt="Sky Energy Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
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

        {/* CTA */}
        <button
          onClick={() => handleClick({ name: "Contact", id: "contact" })}
          className={`z-10 px-5 py-2 rounded-xl text-sm font-medium transition ${
            scrolled ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Contact
        </button>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-2xl z-10 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
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
                onClick={() => handleClick(item)}
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