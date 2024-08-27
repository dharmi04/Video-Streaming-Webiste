
// HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen ">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-50"></div>
      <div className="container mx-auto flex flex-col justify-center items-center h-full relative text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Stream Forge</h1>
        <p className="text-xl mb-8">Your ultimate destination for y video streaming.</p>
        <a href="#explore" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">Explore Now</a>
      </div>
    </section>
  );
};

export default HeroSection;
