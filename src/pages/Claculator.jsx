import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Calculator as CalcIcon,
  Sun,
  Power,
  Sparkles,
  TrendingDown,
  ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Formatter for Indian Rupees
const formatINR = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const Calculator = () => {
  // Inputs (Indian standard residential/commercial parameters)
  const [monthlyBill, setMonthlyBill] = useState(8000); // Default monthly bill in ₹
  const [rateKwh, setRateKwh] = useState(9); // Default tariff ₹9 per unit
  const [sunHours, setSunHours] = useState(5.0); // Average solar radiation duration in India
  const [coverage, setCoverage] = useState(90); // Offsetting target %

  // Calculations state
  const [results, setResults] = useState({
    systemSize: 0,
    panelsNeeded: 0,
    monthlyProduction: 0,
    monthlySavings: 0,
    newBill: 0,
    paybackYears: 0,
    grossCost: 0,
    subsidy: 0,
    netCost: 0,
    co2Offset: 0
  });

  useEffect(() => {
    // 1. Calculate monthly usage in units (kWh)
    const monthlyKwh = monthlyBill / rateKwh;

    // 2. Target offset based on coverage percentage
    const targetKwhOffset = monthlyKwh * (coverage / 100);

    // 3. System size required (kW)
    // Formula: (Target monthly units / 30 days) / peak daily sun hours
    const sizeNeeded = (targetKwhOffset / 30) / sunHours;

    // 4. Panels needed (assuming standard 500W premium panels)
    const panels = Math.ceil((sizeNeeded * 1000) / 500);

    // 5. System Costs (typical premium installer rate in India is ~₹68,000 per kW)
    const grossVal = sizeNeeded * 68000;

    // 6. PM Surya Ghar Muft Bijli Yojana Central Government Subsidy (Residential)
    // - Up to 2 kW: ₹30,000 per kW
    // - 3 kW: ₹78,000 total (capping at ₹78,000 above 3 kW)
    let subsidyVal = 0;
    if (sizeNeeded >= 3) {
      subsidyVal = 78000;
    } else if (sizeNeeded >= 2) {
      subsidyVal = 60000 + (sizeNeeded - 2) * 18000;
    } else {
      subsidyVal = sizeNeeded * 30000;
    }

    // Safety check for small systems
    subsidyVal = Math.round(Math.min(subsidyVal, grossVal * 0.6));

    const netInstallationCost = Math.max(0, grossVal - subsidyVal);

    const monthlySavingsVal = monthlyBill * (coverage / 100);
    const remainingBill = Math.max(0, monthlyBill - monthlySavingsVal);
    const annualSavingsVal = monthlySavingsVal * 12;

    // Average payback in India is extremely quick (3 to 4.5 years)
    const payback = annualSavingsVal > 0 ? (netInstallationCost / annualSavingsVal) : 0;
    const co2Val = sizeNeeded * 1.35; // ~1.35 metric tons offset per kW annually in India

    setResults({
      systemSize: parseFloat(sizeNeeded.toFixed(2)),
      panelsNeeded: panels,
      monthlyProduction: Math.round(targetKwhOffset),
      monthlySavings: Math.round(monthlySavingsVal),
      newBill: Math.round(remainingBill),
      paybackYears: parseFloat(payback.toFixed(1)),
      grossCost: Math.round(grossVal),
      subsidy: Math.round(subsidyVal),
      netCost: Math.round(netInstallationCost),
      co2Offset: parseFloat(co2Val.toFixed(1))
    });
  }, [monthlyBill, rateKwh, sunHours, coverage]);

  return (
    <section id="calculator" className="relative bg-[#070B14] overflow-hidden py-28 text-white">
      {/* Background aesthetics */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#E8A56A]/5 blur-[200px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Block */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            variants={textReveal}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#E8A56A] mr-2" />
            <span className="text-[#E8A56A] font-semibold tracking-wider text-xs sm:text-sm uppercase">
              Solar ROI Calculator (India)
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide leading-none"
          >
            Calculate Your
            <span className="block text-[#E8A56A] mt-2">Energy Freedom</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            Adjust the sliders below to estimate your panel requirements, PM Surya Ghar subsidy benefits, net costs, and payback periods optimized for Indian solar indices.
          </motion.p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mt-20 items-stretch">

          {/* Controls - Left side */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 hover:border-white/20 transition-all duration-500 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <CalcIcon className="text-[#E8A56A] w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wider">System Inputs</h3>
              </div>

              {/* Monthly Bill Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 font-semibold flex items-center gap-2">
                    Monthly Electric Bill
                  </span>
                  <span className="text-[#E8A56A] font-black text-lg">{formatINR(monthlyBill)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="60000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E8A56A]"
                />
                <div className="flex justify-between text-2xs text-gray-500">
                  <span>₹1,000</span>
                  <span>₹30,000</span>
                  <span>₹60,000</span>
                </div>
              </div>

              {/* Utility Rate Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 font-semibold">
                    Electricity Tariff Rate
                  </span>
                  <span className="text-[#E8A56A] font-black text-lg">₹{rateKwh.toFixed(1)} / Unit</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="18"
                  step="0.5"
                  value={rateKwh}
                  onChange={(e) => setRateKwh(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E8A56A]"
                />
                <div className="flex justify-between text-2xs text-gray-500">
                  <span>₹5</span>
                  <span>₹11.5</span>
                  <span>₹18</span>
                </div>
              </div>

              {/* Sun Hours Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 font-semibold flex items-center gap-2">
                    Daily Average Sun Hours
                  </span>
                  <span className="text-[#E8A56A] font-black text-lg">{sunHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="6.5"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E8A56A]"
                />
                <div className="flex justify-between text-2xs text-gray-500">
                  <span>3.5h (Low)</span>
                  <span>5.0h (Avg India)</span>
                  <span>6.5h (High)</span>
                </div>
              </div>

              {/* Solar Coverage Target */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 font-semibold">
                    Target Power Offset
                  </span>
                  <span className="text-[#E8A56A] font-black text-lg">{coverage}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={coverage}
                  onChange={(e) => setCoverage(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E8A56A]"
                />
                <div className="flex justify-between text-2xs text-gray-500">
                  <span>40% Offset</span>
                  <span>70% Offset</span>
                  <span>100% Net Zero</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-2xs text-gray-500 leading-relaxed">
              Calculations incorporate subsidy brackets from the central PM Surya Ghar Yojana scheme. Setup rates are indexed to state DISCOM average guidelines.
            </div>
          </motion.div>

          {/* Results Output in 3D Card - Right side */}
          <div className="lg:col-span-7 flex">
            <Tilt
              className="w-full flex"
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              perspective={1400}
              scale={1.01}
              glareEnable={true}
              glareMaxOpacity={0.05}
              glareColor="#E8A56A"
              glarePosition="all"
            >
              <div className="w-full border border-white/10 bg-gradient-to-br from-white/[0.03] to-[#E8A56A]/[0.02] backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-[#E8A56A]/30 transition-all duration-700 rounded-lg">

                {/* Visual results header */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">Projections</h3>
                    <span className="text-xs text-[#E8A56A] font-semibold flex items-center gap-1.5 bg-[#E8A56A]/10 px-3 py-1 rounded-full border border-[#E8A56A]/20">
                      <Sparkles className="w-3.5 h-3.5" /> PM Surya Ghar Scheme
                    </span>
                  </div>

                  {/* Top Key Metrics Rows */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold tracking-wider">
                        <Power className="w-4 h-4 text-[#E8A56A]" /> System Size
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white mt-3">
                        {results.systemSize} <span className="text-lg text-gray-400 font-bold">kW</span>
                      </div>
                      <p className="text-2xs text-gray-500 mt-2">Required power array capacity</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold tracking-wider">
                        <CalcIcon className="text-[#E8A56A]" /> Panels Needed
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white mt-3">
                        {results.panelsNeeded} <span className="text-lg text-gray-400 font-bold">Units</span>
                      </div>
                      <p className="text-2xs text-gray-500 mt-2">Based on premium 500W modules</p>
                    </div>
                  </div>

                  {/* Financial Bill Comparison Visual */}
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-lg space-y-5">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                      <span>Monthly Bill Savings</span>
                      <span className="text-[#E8A56A] font-black">{coverage}% Offset</span>
                    </div>

                    {/* Old bill vs New bill bars */}
                    <div className="space-y-4">
                      {/* Old Bill Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-400">Before Solar Bill</span>
                          <span className="text-white font-bold">{formatINR(monthlyBill)}</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-gray-500 h-full w-full" />
                        </div>
                      </div>

                      {/* New Bill Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#E8A56A] font-bold">Estimated After Solar Bill</span>
                          <span className="text-[#E8A56A] font-black">{formatINR(results.newBill)}</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-[#E8A56A] h-full"
                            animate={{ width: `${100 - coverage}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-sm font-bold border-t border-white/5">
                      <span className="text-white">Estimated Monthly Savings</span>
                      <span className="text-emerald-400 text-lg font-black">+ {formatINR(results.monthlySavings)} / mo</span>
                    </div>
                  </div>

                  {/* Pricing and Payback Details */}
                  <div className="space-y-3 bg-white/[0.02] border border-white/5 p-5 rounded-lg text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Gross System Cost:</span>
                      <span className="text-white font-semibold">{formatINR(results.grossCost)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-500">
                      <span>Govt. Subsidy (PM Surya Ghar):</span>
                      <span className="font-semibold">- {formatINR(results.subsidy)}</span>
                    </div>
                    <div className="flex justify-between text-[#E8A56A] border-t border-white/10 pt-2 font-bold text-base">
                      <span>Net Investment:</span>
                      <span>{formatINR(results.netCost)}</span>
                    </div>
                  </div>

                  {/* Environmental & Financial details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-white/5 bg-white/[0.01]">
                      <div className="text-2xs text-gray-500 uppercase tracking-widest font-bold">Payback Term</div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1.5">{results.paybackYears} <span className="text-xs text-gray-400">yrs</span></div>
                    </div>
                    <div className="text-center p-3 border border-white/5 bg-white/[0.01]">
                      <div className="text-2xs text-gray-500 uppercase tracking-widest font-bold">CO2 Offset</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1.5">{results.co2Offset} <span className="text-xs text-emerald-500">t/yr</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-[#E8A56A] text-black py-4 font-bold uppercase tracking-wider hover:bg-[#f1b983] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    Lock In This Configuration <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>

              </div>
            </Tilt>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;