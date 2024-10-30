import React from 'react';

const Aside = () => {
  return (
    <aside className="bg-gray-100 p-4 w-64 h-full border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <a href="#home" className="text-blue-600 hover:text-blue-800">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="text-blue-600 hover:text-blue-800">
            About Us
          </a>
        </li>
        <li>
          <a href="#services" className="text-blue-600 hover:text-blue-800">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="text-blue-600 hover:text-blue-800">
            Contact
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;

