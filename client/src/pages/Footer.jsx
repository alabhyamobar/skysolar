import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <footer className="relative w-full px-6 sm:px-10 lg:px-20 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className="relative z-10 max-w-7xl mx-auto rounded-2xl 
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        shadow-xl p-8 md:p-12 grid lg:grid-cols-2 gap-12"
      >
        <div className="flex flex-col justify-between">

          <div className="flex items-center gap-4 mb-6">
            <img
              src={`${base}/images/logo.png`}
              alt="Sky Renewable Energies"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />

            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight text-white">
              Sky Renewable Energies
            </h2>
          </div>
          <div className="space-y-4 text-white/70 text-sm leading-relaxed">
            <p>
              Beside GS Dream Honda, Cotton Mill Chauraha, <br />
              Naini, Prayagraj – 211009
            </p>

            <p className="text-white/80 font-medium">
              ⏰ 9:00 AM – 6:00 PM (Mon-Sat) <br />
              📞 +91 8009998980
            </p>
          </div>

          <div className="flex gap-4 mt-6">

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-[#0077b5] transition-all duration-300"
            >
              <FaLinkedin className="w-5 h-5 text-white" />
            </a>

            <a
              href="https://www.instagram.com/skyrenewableenergies?igsh=MTk5dGNhaW5iMDEybw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-gradient-to-br hover:from-pink-500 hover:to-yellow-400 transition-all duration-300"
            >
              <FaInstagram className="w-5 h-5 text-white" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white transition-all duration-300"
            >
              <FaXTwitter className="w-5 h-5 text-white group-hover:text-black" />
            </a>
            <a
              href="https://www.facebook.com/share/1CkpoymTfz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-[#1877f2] transition-all duration-300"
            >
              <FaFacebook className="w-5 h-5 text-white" />
            </a>

          </div>
        </div>
        <div className="w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-white/20">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.1578109179354!2d81.8667979!3d25.399527600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854bd24df4a897%3A0xbfc02681e52933e8!2sSKY%20RENEWABLE%20ENERGIES!5e0!3m2!1sen!2sin!4v1775509464809!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* bottom */}
      <div className="relative z-10 text-center text-white/40 text-sm mt-10 tracking-wide">
        © {new Date().getFullYear()} Sky Renewable Energies. All rights reserved.

        <div className="mt-2 text-white/50 text-xs">
          Designed & Developed by{" "}
          <span className="text-white/80 font-medium hover:text-white transition">
            RV Studios
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;