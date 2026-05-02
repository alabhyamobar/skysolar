import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent ✅");
        reset();
      } else {
        alert("Something went wrong ❌");
      }
    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      <div className="lg:w-1/2 w-full relative">

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Cylinder+Chauraha+Kanpur&output=embed"
          className="w-full h-full min-h-[50vh] border-0"
          loading="lazy"
        />

        <a
          href="https://wa.me/918009998980"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition"
        >
          💬 Chat on WhatsApp
        </a>
      </div>

      <div className="lg:w-1/2 w-full bg-black text-white flex items-center justify-center p-6">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Contact Us
          </h2>

          <input
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-amber-400"
          />

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-amber-400"
          />

          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-amber-400"
          />

          <textarea
            {...register("message", { required: true })}
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;