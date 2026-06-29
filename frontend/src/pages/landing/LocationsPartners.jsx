import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Zap, Award } from "lucide-react";

const partners = [
  { name: "Tata Power Solar", logo: "TATA" },
  { name: "Adani Solar", logo: "ADANI" },
  { name: "Waaree Energies", logo: "WAAREE" },
  { name: "Vikram Solar", logo: "VIKRAM" },
  { name: "Loom Solar", logo: "LOOM" }
];

const locations = [
  "Uttar Pradesh", "Maharashtra", "Gujarat", "Himachal Pradesh", "Rajasthan", "Delhi NCR"
];

const LocationsPartners = () => {
  return (
    <section className="relative bg-[#050914] py-24 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] to-[#050914]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8A56A]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Locations Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <MapPin className="w-4 h-4 text-[#E8A56A]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">Serviceable Areas</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Bringing Solar to <span className="text-[#E8A56A]">Your Doorstep</span>
              </h2>
              <p className="mt-4 text-gray-400 text-lg">
                We are rapidly expanding across India. Check out some of our most active regions where we provide end-to-end solar installations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {locations.map((loc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-lg p-3 hover:border-[#E8A56A]/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#E8A56A]"></div>
                  <span className="text-sm font-semibold text-gray-300">{loc}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 italic">
              * More cities and states are being added every month!
            </p>
          </motion.div>

          {/* Partners Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md"
          >
            <div className="text-center space-y-3 mb-10">
              <h3 className="text-2xl font-bold text-white">Our Premium Partners</h3>
              <p className="text-sm text-gray-400">We source only Tier-1 equipment from industry leaders for maximum efficiency and durability.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center p-6 bg-[#050914] border border-white/5 rounded-xl hover:bg-white/5 transition-all group">
                  <span className="font-black text-xl tracking-widest text-gray-500 group-hover:text-[#E8A56A] transition-colors">{partner.logo}</span>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#E8A56A]/20 to-transparent border border-[#E8A56A]/20 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-[#E8A56A] mb-2" />
                <span className="text-xs font-bold text-white text-center">25-Year<br/>Warranty</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold">High Yield</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-5 h-5 text-[#E8A56A]" />
                <span className="text-sm font-semibold">Tier-1 Grade</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LocationsPartners;
