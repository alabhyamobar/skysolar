import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/* 🔥 CARD */
const TestimonialCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative group"
    >
      {/* ✨ Glow */}
      <div className="absolute inset-0 rounded-2xl 
        bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-300 
        opacity-0 group-hover:opacity-20 
        blur-2xl transition duration-500" />

      {/* 💎 Glass Card */}
      <div className="relative p-6 rounded-2xl 
        border border-white/20 
        bg-white/10 backdrop-blur-2xl 
        shadow-xl 
        transition duration-300 
        group-hover:shadow-2xl"
      >
        <p className="text-white/90 leading-relaxed mb-4">
          “{item.text}”
        </p>

        <h4 className="text-sm font-semibold text-white/70">
          — {item.name}
        </h4>
      </div>
    </motion.div>
  );
};

/* 🔥 MAIN */
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    text: "",
  });

  /* 📦 FETCH */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/testimonials");
        setTestimonials(res.data || []);
      } catch (err) {
        setError("Failed to load testimonials");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* ➕ SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.text.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (form.text.length > 300) {
      alert("Message too long (max 300 chars)");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        "http://localhost:5000/api/testimonials",
        form
      );

      setTestimonials((prev) => [res.data, ...prev].slice(0, 5));

      setForm({ name: "", text: "" });
      setShowForm(false);
    } catch (err) {
      alert("Something went wrong!");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full py-20 px-6 sm:px-10 lg:px-20">

      {/* 🔥 HEADING */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-300">
            Testimonials
          </span>
        </h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="mt-6 px-6 py-3 rounded-xl 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          text-white hover:bg-white/20 
          transition shadow-lg"
        >
          {showForm ? "Close" : "Add Testimonial"}
        </button>
      </div>

      {/* ✨ FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto mb-16 p-6 rounded-2xl 
            border border-white/20 
            bg-white/10 backdrop-blur-xl 
            shadow-xl space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 rounded-lg 
              bg-white/10 border border-white/20 
              text-white placeholder-white/60 
              focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              placeholder="Your Feedback"
              value={form.text}
              onChange={(e) =>
                setForm({ ...form, text: e.target.value })
              }
              className="w-full p-3 rounded-lg 
              bg-white/10 border border-white/20 
              text-white placeholder-white/60 
              focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-lg 
              bg-gradient-to-r from-blue-500 to-indigo-500 
              text-white hover:opacity-90 
              transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 💎 STATES */}
      {loading && (
        <p className="text-center text-white/60">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {/* 💎 CONTENT */}
      {!loading && !error && (
        <>
          {/* 🖥️ DESKTOP GRID */}
          <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.length === 0 ? (
              <p className="text-center col-span-full text-white/60">
                No testimonials yet
              </p>
            ) : (
              testimonials.map((item, index) => (
                <TestimonialCard
                  key={item._id || item.name + index}
                  item={item}
                  index={index}
                />
              ))
            )}
          </div>

          {/* 📱 MOBILE SWIPER */}
          <div className="md:hidden max-w-md mx-auto">
            <Swiper
              spaceBetween={20}
              slidesPerView={1.1}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={item._id || item.name + index}>
                  <TestimonialCard item={item} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonial;