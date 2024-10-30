import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm">
            We are dedicated to providing an engaging and interactive quiz experience. Explore various topics and test your knowledge with our curated quizzes.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#home" className="text-blue-400 hover:text-blue-600">Home</a></li>
            <li><a href="#about" className="text-blue-400 hover:text-blue-600">About Us</a></li>
            <li><a href="#quizzes" className="text-blue-400 hover:text-blue-600">Quizzes</a></li>
            <li><a href="#contact" className="text-blue-400 hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#facebook" aria-label="Facebook" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="#twitter" aria-label="Twitter" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a href="#instagram" aria-label="Instagram" className="text-pink-400 hover:text-pink-600">
              <i className="fab fa-instagram-square text-2xl"></i>
            </a>
            <a href="#linkedin" aria-label="LinkedIn" className="text-blue-700 hover:text-blue-900">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6">
        &copy; {new Date().getFullYear()} Quiz Application. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

