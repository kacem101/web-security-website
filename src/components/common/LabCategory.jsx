import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LabCategory = ({ title, description, to }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-dark-secondary p-6 rounded-lg shadow-md border-2 border-transparent hover:border-neon-blue transition-all duration-300 cursor-pointer"
    >
      <Link to={to}>
        <h3 className="text-3xl font-mono font-bold text-neon-blue mb-2">
          {title}
        </h3>
        <p className="text-text-gray text-lg">{description}</p>
      </Link>
    </motion.div>
  );
};

export default LabCategory;