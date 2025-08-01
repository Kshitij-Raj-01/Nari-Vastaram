"use client";

import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Rupa Kumari Gupta",
    role: "Founder & Creative Director",
    image: "https://res.cloudinary.com/dg2rjn4qj/image/upload/v1752927883/WhatsApp_Image_2025-07-19_at_17.54.13_xpjrdy.jpg",
  },
  {
    name: "Ujjwal Raj",
    role: "Co-Founder and CEO",
    image: "https://res.cloudinary.com/dg2rjn4qj/image/upload/v1752927838/WhatsApp_Image_2025-07-19_at_17.53.33_mxkd3n.jpg",
  },
  {
    name: "Sarvan Kumar",
    role: "CMO",
    image: "https://res.cloudinary.com/dg2rjn4qj/image/upload/v1752927882/WhatsApp_Image_2025-07-19_at_17.53.34_ijuu76.jpg",
  },
  {
    name: "Kshitij Raj",
    role: "CTO",
    image: "https://res.cloudinary.com/dg2rjn4qj/image/upload/v1752927696/WhatsApp_Image_2025-07-19_at_17.49.23_pzood3.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SectionDivider = () => (
  <div className="w-20 h-1 bg-[#A0522D] rounded-full my-8 mx-auto" />
);

const AboutUs = () => {
  return (
    <div className="bg-[#FFE0BC] min-h-screen flex flex-col items-center py-12 px-6 lg:px-24 font-sans text-gray-800">
      
      {/* Header */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-[#7C4F2A]">About Us</h1>
        <p className="mt-4 text-lg text-gray-700">
          A story of passion, craftsmanship, and a commitment to make you feel extraordinary.
        </p>
      </motion.header>

      {/* Mission Statement */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#F1D4A9] rounded-2xl shadow-xl px-10 py-8 w-full max-w-5xl mb-12"
      >
        <p className="text-lg leading-loose font-light space-y-4">
          <span className="block text-2xl font-semibold text-[#7C4F2A] mb-4">
            “Rooted in tradition, woven with dreams.”
          </span>

          Nari Vastaram is more than just a clothing brand — it’s a{" "}
          <span className="font-medium text-[#A0522D]">heartfelt vision</span>{" "}
          brought to life by a dreamer who dared to start from scratch.

          <br /><br />

          Our journey began with a powerful thought:{" "}
          <span className="italic text-[#6B4226]">
            "Why not create a women’s clothing brand that offers both quality and affordability — without compromise?"
          </span>

          <br /><br />

          While many brands either overcharge or compromise on quality, Nari Vastaram was born to offer elegant, affordable, and authentic ethnic wear. Every piece reflects grace, comfort, and timeless Indian tradition — tailored for today’s woman.

          <br /><br />

          From handpicking fabrics across{" "}
          <span className="font-semibold">Delhi, Banaras, and Ahmedabad</span> to researching every detail — Nari Vastaram is built on{" "}
          <span className="italic">unwavering effort, sleepless nights</span>, and unstoppable belief.

          <br /><br />

          <span className="block font-medium text-[#7C4F2A] mb-2">We’re proud to say:</span>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Our products are handpicked with love</li>
            <li>We prioritize honest pricing</li>
            <li>We deeply value your trust</li>
          </ul>

          <br />

          Whether for everyday elegance or festive charm, our styles are meant to make you feel seen, confident, and cherished.

          <br /><br />
          🧵
          <span className="block mt-4 text-right">With warmth,<br />Team Nari Vastaram</span>
        </p>
      </motion.section>

      <SectionDivider />

      {/* Our Goals */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#F1D4A9] rounded-2xl shadow-lg px-10 py-8 w-full max-w-5xl mb-12"
      >
        <h2 className="text-3xl font-bold text-[#7C4F2A] mb-6 tracking-wide text-center">
          Our Goals
        </h2>

        <p className="text-lg leading-loose font-light space-y-4 text-center">
          At <span className="font-semibold text-[#A0522D]">Nari Vastaram</span>, our goal is simple yet powerful:
          <br />
          <span className="italic text-[#6B4226] block my-4">
            To make high-quality, elegant ethnic wear accessible and affordable for every woman.
          </span>

          <div className="text-left mt-6">
            <ul className="list-none space-y-3">
              <li>🌺 <span className="font-medium">Celebrate Indian tradition</span> with a modern touch</li>
              <li>💰 <span className="font-medium">Fair pricing</span> without compromise</li>
              <li>🙋‍♀️ <span className="font-medium">Empower women</span> through confidence and elegance</li>
              <li>🛍️ <span className="font-medium">Build trust</span> by delivering what we promise</li>
            </ul>
          </div>
        </p>
      </motion.section>

      <SectionDivider />

      {/* Team Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl mb-16"
      >
        <h2 className="text-3xl font-bold text-[#7C4F2A] mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="bg-[#F1D4A9] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FFE0BC]"
              />
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <SectionDivider />

      {/* Contact Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-[#F1D4A9] rounded-xl shadow-md px-10 py-8 w-full max-w-5xl mb-20"
      >
        <h2 className="text-3xl font-bold text-[#7C4F2A] mb-4 text-center">Let’s Connect</h2>
        <p className="text-center text-gray-700 mb-6 italic">
          Your thoughts, stories, and smiles are always welcome. 💌
        </p>
        <div className="text-center text-gray-800 space-y-2">
          <p>
            Email:{" "}
            <a
              href="mailto:support@narivastaram.com"
              className="text-indigo-700 hover:underline"
            >
              support@narivastaram.com
            </a>
          </p>
          <p>Phone: +91 99422 15592</p>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
