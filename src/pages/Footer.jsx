import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full mt-20 px-6 sm:px-10 lg:px-20 py-16">

      <div
        className="max-w-9xl mx-auto rounded-2xl 
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        shadow-xl p-8 md:p-12 grid lg:grid-cols-2 gap-12"
      >
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/skysolar/images/logo.png"
              alt="Sky Renewable Energies"
              className="w-20 h-20 object-contain"
            />

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Sky Renewable Energies
            </h2>
          </div>

          <div className="space-y-4 text-white/70 text-base leading-relaxed">
            <p>
              Beside GS Dream Honda, Cotton Mill Chauraha, <br />
              Naini, Prayagraj – 211009
            </p>

            <p className="text-white/80 font-medium">
              ⏰ Timeings from 9:00 AM to 6:00 PM (Mon-Sat) <br />
              📞 +91 8009998980 <br />
            </p>
          </div>
        </div>
        <div className="w-full h-[320px] rounded-xl overflow-hidden border border-white/20">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.1578109179354!2d81.8667979!3d25.399527600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854bd24df4a897%3A0xbfc02681e52933e8!2sSKY%20RENEWABLE%20ENERGIES!5e0!3m2!1sen!2sin!4v1775509464809!5m2!1sen!2sin"
            className="w-full h-full border-0"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="text-center text-white/40 text-sm mt-10 tracking-wide">
        © {new Date().getFullYear()} Sky Renewable Energies. All rights
        reserved.
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
