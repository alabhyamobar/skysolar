import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

/* 🔥 Card Component (NO HOOK ERRORS) */
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
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-30 blur-xl transition duration-500" />

      {/* Card */}
      <div className="relative p-6 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-lg group-hover:shadow-2xl transition">
        <p className="text-gray-700 leading-relaxed mb-4">
          “{item.text}”
        </p>
        <h4 className="text-sm font-semibold text-blue-600">
          — {item.name}
        </h4>
      </div>
    </motion.div>
  );
};

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

  /* 🔥 FETCH TESTIMONIALS */
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
    <div className="relative w-full min-h-screen py-24 px-6 sm:px-10 lg:px-20">

      {/* 🔥 Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">
            Testimonials
          </span>
        </h2>

        {/* Toggle Form */}
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
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
            className="max-w-2xl mx-auto mb-16 p-6 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              placeholder="Your Feedback"
              value={form.text}
              onChange={(e) =>
                setForm({ ...form, text: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 💎 STATES */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* 💎 GRID */}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
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
      )}
    </div>
  );
};

export default Testimonial;