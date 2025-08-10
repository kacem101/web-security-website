import React from 'react';
import { FaFlask } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LabCard = ({ title, description, link }) => {
  return (
    <Link to={link} className="block bg-dark-secondary rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
      <div className="flex items-center space-x-4 mb-4">
        <FaFlask className="text-neon-blue text-4xl" />
        <h3 className="text-2xl font-bold font-mono text-text-light">{title}</h3>
      </div>
      <p className="text-text-gray">{description}</p>
    </Link>
  );
};

export default LabCard;