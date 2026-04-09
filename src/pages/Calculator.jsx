import React, { useState } from "react";

const Calculator = () => {
  const [units, setUnits] = useState("");
  const [bill, setBill] = useState("");
  const [result, setResult] = useState(null);

  const calculateSolar = () => {
    let monthlyUnits = units;
    if (bill && !units) {
      monthlyUnits = bill / 8; 
    }

    if (!monthlyUnits || monthlyUnits <= 0) return;

    const kw = (monthlyUnits / 120).toFixed(2);
    const cost = (kw * 50000).toFixed(0);
    const monthlySavings = (monthlyUnits * 8).toFixed(0);
    const yearlySavings = (monthlySavings * 12).toFixed(0);

    setResult({
      kw,
      cost,
      monthlySavings,
      yearlySavings,
    });
  };

  return (
    <div className="w-full min-h-screen px-6 sm:px-10 lg:px-20 py-20 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h1 className="bg-clip-text text-5xl font-bold mb-5 md:text-xl text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-400">
          Solar Calculator
        </h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Find out how much solar you need and how much you can save — instantly.
        </p>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl 
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        shadow-xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-white/80 block mb-2">
              Monthly Units (kWh)
            </label>
            <input
              type="number"
              placeholder="e.g. 300"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full p-4 rounded-xl 
              bg-white/10 border border-white/20 
              text-white placeholder-white/50 
              outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-white/80 block mb-2">
              OR <br/> Monthly Bill (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 2400"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="w-full p-4 rounded-xl 
              bg-white/10 border border-white/20 
              text-white placeholder-white/50 
              outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
        <button
          onClick={calculateSolar}
          className="w-full py-4 px-2 rounded-xl 
          bg-gradient-to-r from-orange-400 to-orange-500 
          text-white font-medium text-lg 
          transition duration-300 
          hover:scale-[1.02] hover:shadow-xl"
        >
          Calculate Solar Requirement
        </button>


        {result && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">

            <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-white">
              <p className="text-white/60 text-sm">Required System</p>
              <h2 className="text-2xl font-semibold text-orange-300">
                {result.kw} kW
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-white">
              <p className="text-white/60 text-sm">Estimated Cost</p>
              <h2 className="text-2xl font-semibold text-green-300">
                ₹{result.cost}
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-white">
              <p className="text-white/60 text-sm">Monthly Savings</p>
              <h2 className="text-2xl font-semibold text-blue-300">
                ₹{result.monthlySavings}
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-white">
              <p className="text-white/60 text-sm">Yearly Savings</p>
              <h2 className="text-2xl font-semibold text-purple-300">
                ₹{result.yearlySavings}
              </h2>
            </div>
          </div>
        )}
      </div>
      {result && (
        <div className="text-center mt-12">
          <button className="px-10 py-4 rounded-full 
            bg-white text-black font-medium 
            transition duration-300 
            hover:scale-105 hover:shadow-xl">
            Get Free Consultation
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;