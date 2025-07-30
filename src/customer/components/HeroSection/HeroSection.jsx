import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center py-12 px-6 bg-gradient-to-b from-[#fff0e6] to-[#ffe0bc]">
      <img
        src="/logo.jpg"
        alt="Nari Vastaram Logo"
        className="mx-auto rounded-2xl shadow-md w-[140px] h-[140px] object-cover"
      />
      <h1 className="text-4xl md:text-5xl font-bold mt-6 text-[#b31567] tracking-wide">
        Nari Vastaram
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Celebrate the grace of Indian ethnic wear — each thread a whisper of tradition, every design a touch of romance.
      </p>
      <a
        href="/#latest"
        className="inline-block mt-8 px-6 py-3 bg-[#b31567] text-white rounded-full shadow hover:bg-[#8f0f4f] transition-all duration-300"
      >
        Explore Collection
      </a>
    </div>
  );
};

export default HeroSection;
