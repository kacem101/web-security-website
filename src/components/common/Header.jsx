// src/components/common/Header.jsx
import React from 'react';
import { FaLaptopCode } from 'react-icons/fa'; // Make sure you've installed react-icons

const Header = () => {
  return (
    <header className="py-4 px-8 flex justify-between items-center bg-dark-secondary shadow-md">
      <div className="flex items-center space-x-2">
        <FaLaptopCode className="text-neon-blue text-2xl" />
        <h1 className="text-2xl font-mono font-bold text-neon-blue">
          CyberSec Club
        </h1>
      </div>
      <nav className="space-x-4 font-mono">
        <a href="/" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Home
        </a>
        <a href="/theory" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Theory
        </a>
        <a href="/labs" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Labs
        </a>
      </nav>
    </header>
  );
};

export default Header;