import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import UserGreeting from './UserGreeting';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="py-4 px-8 flex justify-between items-center bg-dark-secondary shadow-md">
      <Link to="/" className="flex items-center space-x-2">
        <FaLaptopCode className="text-neon-blue text-2xl" />
        <h1 className="text-2xl font-mono font-bold text-neon-blue">
          CyberSec Club
        </h1>
      </Link>
      <nav className="space-x-4 font-mono flex items-center">
        <Link to="/" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Home
        </Link>
        <Link to="/theory" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Theory
        </Link>
        <Link to="/labs" className="text-text-light hover:text-neon-blue transition-colors duration-200">
          Labs
        </Link>
        {isAuthenticated ? (
          <>
            <UserGreeting />
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-4 py-2 rounded-md bg-neon-blue text-dark-background hover:bg-neon-green transition-colors duration-200">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;