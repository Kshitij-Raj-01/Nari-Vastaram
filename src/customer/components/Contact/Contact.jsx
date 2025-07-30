"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../../config/apiConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("💖 Thank you for reaching out! We’ll respond with love soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(`❌ Oops! ${data.error}`);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("🚨 Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-[#FFE0BC] min-h-screen flex flex-col items-center py-16 px-6 lg:px-20 font-sans">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
          Let’s Connect
        </h1>
        <p className="text-gray-800 text-lg leading-relaxed">
          Whether it’s a whisper of appreciation, a suggestion, or a sweet hello —<br />
          your voice makes our journey meaningful.
        </p>
      </motion.header>

      {/* Contact Info */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#F1D4A9] rounded-2xl shadow-lg p-10 w-full max-w-4xl mb-10"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h2>
        <div className="text-gray-700 space-y-2 text-base">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a href="mailto:support@narivastaram.com" className="text-indigo-600 hover:underline">
              support@narivastaram.com
            </a>
          </p>
          <p>
            <span className="font-medium">Phone:</span> +91 99422 15592
          </p>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#F1D4A9] rounded-2xl shadow-lg p-10 w-full max-w-4xl mb-10"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Write to Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9155fd]"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9155fd]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9155fd]"
              placeholder="Tell us what’s on your heart..."
            />
          </div>
          <button
            type="submit"
            className="bg-[#9155fd] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7d3fdf] transition"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* Location Placeholder */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-[#F1D4A9] rounded-2xl shadow-lg p-10 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Location</h2>
        <div className="w-full h-64 bg-gray-300 rounded-md flex items-center justify-center text-gray-600">
          [ Google Map Embed Coming Soon ]
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
