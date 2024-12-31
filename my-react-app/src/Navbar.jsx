import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import icon from "./images/icon.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={icon} alt="Taskly Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">TASKLY</h1>
        </div>

        {/* Menu links */}
        <ul className={`md:flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <li><Link to="/" className="block py-2 md:py-0 text-gray-700 hover:text-blue-500">Home</Link></li>
          <li><Link to="/contact" className="block py-2 md:py-0 text-gray-700 hover:text-blue-500">Contact</Link></li>
          <li><Link to="/help" className="block py-2 md:py-0 text-gray-700 hover:text-blue-500">Help Center</Link></li>
          <li><Link to="/add" className="block py-2 md:py-0 text-gray-700 hover:text-blue-500">Add </Link></li>
          <li><Link to="/stat" className="block py-2 md:py-0 text-gray-700 hover:text-blue-500">statistique </Link></li>
          {/* Buttons in menu for mobile */}
          <div className="md:hidden mt-4 space-y-2">
            <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200">Log in</button>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign up</button>
          </div>
        </ul>

        {/* Buttons on larger screens */}
        <div className="hidden md:flex items-center space-x-2">
          <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200">Log in</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign up</button>
        </div>

        {/* Hamburger menu icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-2xl text-gray-800" /> : <FaBars className="text-2xl text-gray-800" />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

