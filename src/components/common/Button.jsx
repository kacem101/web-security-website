// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`px-6 py-2 rounded-md font-mono font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;