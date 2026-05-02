import React from "react";
import { motion } from "framer-motion";

const LandingContent = () => {
  return (
    <div className="w-full absolute top-0 ">
      <div className=" text max-w-screen-2xl mx-auto px-5 sm:px-10">
        <div className="para mt-72 sm:mt-[25rem]">
          {[
            "Harness the power of the sun",
            "with the cutting-edge solar solutions",
            "with us the family you can trust bliendly",
          ].map((item, index) => {
            return (
              <p
                key={index}
                className="text-md text-white masker sm:text-3xl w-fit overflow-hidden"
              >
                <motion.span
                  initial={{ rotate: 90, y: "100%", opacity: 0 }}
                  animate={{ rotate: 0, y: "0%", opacity: 1 }}
                  transition={{
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.8,
                    delay: 0.5 + index * 0.3,
                  }}
                  className="inline-block elem origin-left "
                >
                  {item}
                </motion.span>
              </p>
            );
          })}
        </div>
        <div className="headings mt-10 text-white">
          {["SKY","RENEWABLE", "ENERGIES"].map((item, index) => {
            return (
              <h1 className="sm:text-[18rem] text-6xl tracking-tighter py-5 -mt-10 sm:-mt-20 leading-none w-fit overflow-hidden ">
                <motion.span
                  initial={{ rotate: 90, y: "100%", opacity: 0 }}
                  animate={{ rotate: 0, y: "0%", opacity: 1 }}
                  transition={{
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.8,
                    delay: 1 + index * 0.3,
                  }}
                  className="inline-block elem origin-left "
                >
                  {item}
                </motion.span>
              </h1>
            );
          })}
        </div>
        <div className="para2 sm:text-xl sm:w-[60vh] mt-15 sm:mt-20 text-white">
          <p>
            At Sky Renewable Energies, we believe the future is powered by
            clean, limitless energy from the sky above. Our mission is to
            transform how homes and businesses generate electricity—making solar
            solutions accessible, efficient, and sustainable. With cutting-edge
            technology and a commitment to innovation, we help you reduce costs,
            lower your carbon footprint, and take control of your energy future.
            Join us in building a greener tomorrow, one rooftop at a time.
          </p>
          <a
            className="sm:text-xl border-b-[1px] border-zinc-100/50 inline-block pb-1 mt-10"
            href="/#contact"
          >
            contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
