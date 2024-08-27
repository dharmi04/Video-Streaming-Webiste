// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Stream Forge. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
