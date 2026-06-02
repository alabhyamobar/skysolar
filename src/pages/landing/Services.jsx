import React ,{useEffect, useRef} from "react";
import Tilt from "react-parallax-tilt";
import {
  Sun,
  Battery,
  Building2,
  Wrench,
  Zap,
  LineChart,
} from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Residential Solar",
    description:
      "High-efficiency rooftop solar systems designed to reduce electricity bills and maximize energy independence.",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Scalable solar infrastructure for factories, warehouses, institutions, and enterprise facilities.",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description:
      "Advanced battery backup solutions for uninterrupted power and intelligent energy management.",
  },
  {
    icon: Zap,
    title: "EV Charging",
    description:
      "Smart EV charging stations integrated with solar generation for sustainable mobility solutions.",
  },
  {
    icon: Wrench,
    title: "Operations & Maintenance",
    description:
      "Comprehensive monitoring, preventive maintenance, and performance optimization services.",
  },
  {
    icon: LineChart,
    title: "Energy Consulting",
    description:
      "Data-driven energy audits, feasibility studies, and ROI-focused solar planning.",
  },
];

const Services = () => {
    const cardRef = useRef(null);

    useEffect(()=>{
      
    },[])
  return (
    <section className="relative bg-[#050914] overflow-hidden py-28 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8A56A]/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />

          <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
            Our Services
          </span>
        </div>

        <div className="mt-8">
          <h2 className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none">
            Complete Solar
            <span className="block mt-2 text-[#E8A56A]">
              Energy Solutions
            </span>
          </h2>

          <p className="mt-8 max-w-3xl text-base md:text-lg text-gray-400 leading-relaxed">
            We deliver end-to-end renewable energy solutions—from system
            design and installation to monitoring, maintenance, and energy
            optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-20">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Tilt
                key={index}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1200}
                scale={1.03}
                glareEnable={true}
                glareMaxOpacity={0.08}
              >
                <div ref={cardRef} className="group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 min-h-[320px] hover:border-[#E8A56A]/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(232,165,106,0.15)]">
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E8A56A]/20 blur-3xl" />
                  </div>
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#E8A56A]/10 border border-[#E8A56A]/20">
                      <Icon
                        size={30}
                        className="text-[#E8A56A]"
                      />
                    </div>

                    <h3 className="mt-8 text-2xl font-bold">
                      {service.title}
                    </h3>

                    <p className="mt-5 text-gray-400 leading-relaxed">
                      {service.description}
                    </p>

                    <button className="mt-8 text-[#E8A56A] font-semibold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      Learn More →
                    </button>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>

        <div className="mt-24">
          <div className="border border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-md p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="uppercase tracking-[3px] text-xs text-[#E8A56A] font-semibold">
                  Ready To Switch?
                </span>

                <h3 className="mt-4 text-3xl md:text-5xl font-black uppercase leading-tight">
                  Build A Cleaner
                  <span className="block text-[#E8A56A]">
                    Energy Future
                  </span>
                </h3>
              </div>

              <div>
                <p className="text-gray-400 leading-relaxed">
                  Let our experts design a solar solution tailored to your
                  energy needs, sustainability goals, and long-term savings.
                </p>

                <button className="mt-8 bg-[#E8A56A] text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-[#f1b983] transition-all duration-300 hover:scale-105">
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;