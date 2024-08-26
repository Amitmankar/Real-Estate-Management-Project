// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-white py-4 px-8 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-600">&copy; 2024 Real Estate Management. All rights reserved.</div>
        <nav className="space-x-4">
          <a href="#privacy" className="text-black hover:text-gray-800">Privacy Policy</a>
          <a href="#terms" className="text-black hover:text-gray-800">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
