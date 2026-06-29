import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

import {
  MapPin,
  Info,
  Sun,
  Activity,
  Trees,
  Car
} from "lucide-react";


const formatINR = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const Calculator = () => {
  const [pinCode, setPinCode] = useState("211008");
  const [monthlyBill, setMonthlyBill] = useState(4500);
  const [rateKwh, setRateKwh] = useState(7.5);

  const [locationMessage, setLocationMessage] = useState({
    title: "Allahabad, Uttar Pradesh",
    subtitle: "Serviceable! State avg tariff: ₹7.5/unit"
  });

  const stateTariffMap = {
    "Uttar Pradesh": 7.5,
    "Maharashtra": 10.5,
    "Karnataka": 8.5,
    "Delhi": 6.5,
    "Gujarat": 7.0,
    "Tamil Nadu": 8.0,
    "Rajasthan": 7.8,
    "West Bengal": 7.2,
    "Madhya Pradesh": 7.0,
    "Andhra Pradesh": 7.5,
    "Telangana": 7.5,
    "Kerala": 7.0,
    "Haryana": 7.0,
    "Punjab": 7.0,
    "Bihar": 7.5,
    "Odisha": 6.5,
    "Chhattisgarh": 6.0,
    "Jharkhand": 6.0,
    "Assam": 7.5,
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (pinCode.length === 6) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
          const data = await res.json();
          if (data && data[0].Status === "Success") {
            const state = data[0].PostOffice[0].State;
            const district = data[0].PostOffice[0].District;
            const rate = stateTariffMap[state] || 9;
            setRateKwh(rate);
            setLocationMessage({
              title: `${district}, ${state}`,
              subtitle: `Serviceable! State avg tariff: ₹${rate}/unit`
            });
          } else {
            setLocationMessage({
              title: "Oh! We haven't reached your location yet",
              subtitle: "We are not yet serviceable at your location but we will soon!"
            });
            setRateKwh(9);
          }
        } catch (error) {
          setLocationMessage({
            title: "Could not fetch location",
            subtitle: "Please check your network or enter a valid PIN"
          });
        }
      } else {
        setLocationMessage({
          title: "Enter 6-digit PIN",
          subtitle: "We will auto-detect your location tariff"
        });
      }
    };
    const timer = setTimeout(fetchLocation, 500);
    return () => clearTimeout(timer);
  }, [pinCode]);


  const [results, setResults] = useState({
    systemSize: 0,
    roofArea: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    lifetimeSavings: 0,
    co2Mitigated: 0,
    treesPlanted: 0,
    distance: 0,
  });

  useEffect(() => {
    const monthlyKwh = monthlyBill / rateKwh;
    const targetKwhOffset = monthlyKwh;
    const sizeNeeded = (targetKwhOffset / 30) / 6.5;
    const roofAreaNeeded = sizeNeeded * 100;
    const monthlySav = monthlyBill;
    const yearlySav = monthlySav * 12;
    const lifetimeSav = yearlySav * 25;
    const co2 = sizeNeeded * 1176;
    const trees = sizeNeeded * 39;
    const dist = sizeNeeded * 10500;

    setResults({
      systemSize: parseFloat(sizeNeeded.toFixed(2)),
      roofArea: Math.round(roofAreaNeeded),
      monthlySavings: Math.round(monthlySav),
      yearlySavings: Math.round(yearlySav),
      lifetimeSavings: Math.round(lifetimeSav),
      co2Mitigated: Math.round(co2),
      treesPlanted: Math.round(trees),
      distance: Math.round(dist)
    });
  }, [monthlyBill, rateKwh]);

  return (
    <section id="calculator" className="relative bg-[#070B14] overflow-hidden py-28 text-white min-h-screen">
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8A56A]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E8A56A]/5 blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
                Calculate Your Solar <span className="text-[#E8A56A]">Savings Now!</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Unlock savings, build that dream fund, and start ticking off your checklist.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300">Pin code</label>
                <input 
                  type="text" 
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full bg-[#050914] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8A56A] transition-colors"
                />
                
                <div className="mt-4 bg-[#E8A56A]/10 border border-[#E8A56A]/20 rounded-lg p-4 flex gap-4 items-start">
                  <div className="bg-[#E8A56A]/20 p-2 rounded-full mt-1">
                    <MapPin className="text-[#E8A56A] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#E8A56A]">{locationMessage.title}</h4>
                    <p className="text-sm text-[#E8A56A]/70 mt-1">{locationMessage.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center text-sm font-semibold text-gray-300">
                  <span className="flex items-center gap-2">Avg electricity bill <Info className="w-4 h-4 text-gray-500" /></span>
                </div>
                
                <div className="relative pt-6 pb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Min. ₹500</span>
                    <span>Max ₹60,000</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="60000"
                    step="100"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E8A56A]"
                  />
                  <div className="mt-4 flex justify-center">
                    <div className="bg-[#050914] border border-[#E8A56A]/30 text-[#E8A56A] font-bold px-6 py-2 rounded-lg text-xl shadow-[0_0_15px_rgba(232,165,106,0.15)]">
                      {formatINR(monthlyBill)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md text-center space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Take control of your electricity bill with <span className="text-white font-bold">SkySolar</span></h3>
              <p className="text-[#E8A56A] font-bold text-xl">India's <span className="text-2xl">#1</span> home solar company!</p>
              <div className="flex justify-center gap-1 text-[#E8A56A] pt-2">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-2xl drop-shadow-lg">{star}</span>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <Tilt
              tiltMaxAngleX={2}
              tiltMaxAngleY={2}
              perspective={1500}
              scale={1}
              glareEnable={false}
              className="h-full"
            >
              <div className="h-full bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md space-y-10">
                

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">Required System Size</h3>
                  <div className="bg-[#050914] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-white/10 p-6">
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-semibold">
                          <Sun className="w-4 h-4 text-[#E8A56A]" /> System Size
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {results.systemSize} <span className="text-lg text-gray-500 font-bold">kW</span>
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-semibold">
                          <Activity className="w-4 h-4 text-[#E8A56A]" /> Roof Area
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {results.roofArea} <span className="text-lg text-gray-500 font-bold">sq. ft.</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#E8A56A]/5 border-t border-[#E8A56A]/10 p-4 text-center text-sm text-gray-400">
                      Do not have required roof area? <br className="sm:hidden" />
                      Our consultants will guide you, <a href="#contact" className="text-[#E8A56A] hover:underline font-semibold">Get in touch</a>
                    </div>
                  </div>
                </div>


                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">Your Solar Savings</h3>
                  <div className="bg-[#050914] border border-white/5 rounded-2xl p-6">
                    <div className="text-center text-sm text-gray-400 font-medium mb-6">Your savings with SkySolar</div>
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                      <div className="text-center space-y-1">
                        <div className="text-xs text-gray-500 font-semibold">Monthly*</div>
                        <div className="text-lg sm:text-2xl font-black text-emerald-400">{formatINR(results.monthlySavings)}</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-xs text-gray-500 font-semibold">Yearly*</div>
                        <div className="text-lg sm:text-2xl font-black text-emerald-400">{formatINR(results.yearlySavings)}</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-xs text-gray-500 font-semibold">Lifetime*</div>
                        <div className="text-lg sm:text-2xl font-black text-[#E8A56A]">{formatINR(results.lifetimeSavings)}</div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">Your Solar Saves More Than Money</h3>
                  <div className="bg-[#050914] border border-white/5 rounded-2xl p-6">
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                      <div className="text-center space-y-2">
                        <div className="flex justify-center"><Activity className="w-5 h-5 text-gray-400" /></div>
                        <div className="text-xs text-gray-500 font-semibold leading-tight">CO2 Mitigated</div>
                        <div className="text-lg sm:text-xl font-black text-white">{results.co2Mitigated.toLocaleString()} <span className="text-xs font-normal text-gray-500">Kg</span></div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="flex justify-center"><Trees className="w-5 h-5 text-emerald-500" /></div>
                        <div className="text-xs text-gray-500 font-semibold leading-tight">Trees Planted</div>
                        <div className="text-lg sm:text-xl font-black text-white">{results.treesPlanted.toLocaleString()}</div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="flex justify-center"><Car className="w-5 h-5 text-[#E8A56A]" /></div>
                        <div className="text-xs text-gray-500 font-semibold leading-tight">Distance</div>
                        <div className="text-lg sm:text-xl font-black text-white">{results.distance.toLocaleString()} <span className="text-xs font-normal text-gray-500">Kms</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-2xs text-gray-600 mt-4 leading-relaxed">
                  Disclaimer: The values displayed here are estimates based on standard Indian power indices and generic assumptions. Actual savings and system requirements may vary based on your exact location, roof conditions, and shadow analysis.
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