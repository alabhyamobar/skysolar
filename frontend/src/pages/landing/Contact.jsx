import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/sky-renewable-energies-undefined-b2b027405?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { icon: FaInstagram, href: "https://www.instagram.com/skyrenewableenergies?igsh=MTk5dGNhaW5iMDEybw==" },
  { icon: FaFacebookF, href: "https://www.facebook.com/share/1CkpoymTfz/" },
  { icon: FaTwitter, href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const viewportOptions = {
  once: true,
  amount: 0.2,
};

const contactInfo = [
  {
    title: "Call Us",
    value: "+91 8009998980",
    link: "tel:+918009998980",
  },
  {
    title: "Email",
    value: "skyrenewableenergies@gmail.com",
    link: "mailto:skyrenewableenergies@gmail.com",
  },
  {
    title: "Location",
    value: "Prayagraj, Uttar Pradesh",
    isMap: true,
  },
];

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://skysolar.onrender.com/api/user/query",
        {
          userName: name,
          Email: email,
          PhoneNumber: phone,
          Message: message || undefined,
        }
      );

      toast.success(response.data.message);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  return (
    <section
      id="contact"
      className="relative bg-[#070B14] text-white py-24 overflow-hidden"
    >
      <div className="absolute inset-0">
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

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E8A56A]/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
          <span className="text-[#E8A56A] text-xs sm:text-sm uppercase tracking-wider font-semibold">
            Contact Us
          </span>
        </motion.div>


        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mt-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black uppercase leading-none"
          >
            Let's Build Your
            <span className="block text-[#E8A56A] mt-2">
              Solar Future
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl mt-8 text-gray-400 text-lg leading-relaxed"
          >
            Ready to reduce energy costs and transition to renewable
            infrastructure? Speak with our engineering team today.
          </motion.p>
        </motion.div>


        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1200}
              scale={1.01}
            >
              <div className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 lg:p-10">

                <h3 className="text-2xl font-bold mb-8">
                  Request Consultation
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all"
                  />

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all"
                  />

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all"
                  />

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#E8A56A] text-black py-4 font-black uppercase tracking-wider hover:scale-[1.02] transition-all duration-300"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </Tilt>
          </motion.div>


          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={index} variants={fadeUp}>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1200}
                >
                  <div className="group relative border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 hover:border-[#E8A56A]/50 transition-all duration-500">

                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />

                    <p className="uppercase tracking-[3px] text-xs text-[#E8A56A]">
                      {item.title}
                    </p>

                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.isMap ? "_blank" : "_self"}
                        rel={item.isMap ? "noopener noreferrer" : undefined}
                        className="mt-4 block text-xl md:text-2xl font-bold transition-colors duration-300 hover:text-[#E8A56A]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <h3 className="mt-4 text-xl md:text-2xl font-bold">
                        {item.value}
                      </h3>
                    )}

                    {item.isMap && (
                      <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                        <iframe
                          title="SkySolar Location"
                          src="https://maps.app.goo.gl/RzUyrSKKMq7pdbFx8?g_st=awb"
                          width="100%"
                          height="200"
                          loading="lazy"
                          allowFullScreen
                          className="w-full"
                        />
                      </div>
                    )}

                  </div>
                </Tilt>
              </motion.div>
            ))}

          </motion.div>
        </div>
        <motion.div variants={fadeUp}>
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1200}
          >
            <div className="mt-10 group relative border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 hover:border-[#E8A56A]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />
              <div className="grid grid-cols-2 gap-8">

                <div>
                  <h4 className="text-4xl font-black text-[#E8A56A]">
                    24H
                  </h4>
                  <p className="text-gray-400 text-sm mt-2">
                    Response Time
                  </p>
                </div>

                <div>
                  <h4 className="text-4xl font-black text-[#E8A56A]">
                    500+
                  </h4>
                  <p className="text-gray-400 text-sm mt-2">
                    Projects Delivered
                  </p>
                </div>
                <div className="w-full h-[50%] flex jusitify-center items-center gap-5 lg:gap-10">
                  {socialLinks.map(({ icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="border-1 border-white/50 rounded-md p-2 lg:p-5 active:bg-white active:text-black"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;