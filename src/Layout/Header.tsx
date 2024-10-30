import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <a href="/" className="text-white hover:text-gray-300">QuizApp</a>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">About</a>
            </li>
            <li>
              <a href="#quizzes" className="hover:text-gray-300">Quizzes</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </nav>

        {/* User Account Section */}
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">Login</button>
          <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

