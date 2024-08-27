// Navbar.jsx
import React from 'react';


const Navbar = () => {
  return (
    <nav className=" text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stream Forge</h1>
        <div className="space-x-4">
          <a to="#" className="hover:text-gray-400">Home</a>
          <a to="#" className="hover:text-gray-400">About</a>
          <a to="#" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
