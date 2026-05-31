import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Impact", href: "#impact" },
  { name: "Calculator", href: "#calculator--" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav className="h-10 py-7  bg-[#050914]/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">

            <div className="flex items-center">
              <h1 className="text-white text-3xl font-extrabold tracking-tight">
                SKY
                <span className="text-[#E8A56A] ml-1">|</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-12 lg:gap-16">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[2px] font-semibold text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="bg-[#E8A56A] hover:bg-[#f0b37d] text-[#111827] px-8 py-4 font-bold text-sm uppercase tracking-[1.5px] transition-all duration-300"
              >
                Get Quote
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5"
            >
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[9998] bg-[#050914] transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-3xl font-bold uppercase tracking-[3px] hover:text-[#E8A56A] transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 bg-[#E8A56A] text-[#111827] px-8 py-4 font-bold uppercase tracking-[2px]"
          >
            Get Quote
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;