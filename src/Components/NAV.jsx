import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Solar Calculator", path: "/calculator" },
];

const NAV = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-4 py-4"
    >
      {/* 🌤️ NAV CONTAINER */}
      <div
        className={`
        max-w-7xl mx-auto flex items-center justify-between
        px-6 py-3 rounded-2xl transition-all duration-500

        ${
          scrolled
            ? `
              bg-white/70 backdrop-blur-xl
              border border-black/5
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            `
            : `
              bg-white/40 backdrop-blur-lg
              border border-white/30
            `
        }
      `}
      >
        {/* 🔷 LOGO */}
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          SKY Energy
        </NavLink>

        {/* 💻 DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 relative">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <div className="relative px-4 py-2 rounded-xl text-sm font-medium">
                  {/* Active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-blue-500/10 border border-blue-500/20"
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                    />
                  )}

                  <motion.span
                    whileHover={{ y: -1 }}
                    className={`
                      relative z-10 transition-colors duration-300
                      ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-gray-900"
                      }
                    `}
                  >
                    {item.name}
                  </motion.span>
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* 💎 CTA BUTTON */}
        <NavLink to="/contact">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              hidden md:block px-5 py-2 rounded-xl text-sm font-medium
              bg-black text-white
              shadow-[0_6px_20px_rgba(0,0,0,0.15)]
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
              transition-all duration-300
            "
          >
            Contact
          </motion.button>
        </NavLink>

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-900"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-full left-0 w-full mt-3 z-50"
            >
              <div className="mx-auto max-w-7xl px-4">
                <div className="
                  rounded-2xl bg-white/80 backdrop-blur-xl
                  border border-black/5
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  p-6 flex flex-col gap-5
                ">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                    >
                      {item.name}
                    </NavLink>
                  ))}

                  <NavLink to="/contact" onClick={() => setOpen(false)}>
                    <button className="
                      mt-4 px-5 py-3 rounded-xl
                      bg-black text-white
                      hover:opacity-90 transition
                    ">
                      Contact
                    </button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NAV;