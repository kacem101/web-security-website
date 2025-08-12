import React from 'react';
import { motion } from 'framer-motion';
import LabCategory from '../components/common/LabCategory';

const Labs = () => {
  return (
    <div className="min-h-screen bg-dark-background text-text-light p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-mono font-bold text-neon-blue mb-8 text-center">
          Hands-on Labs
        </h2>
        <p className="text-xl text-text-gray mb-12 text-center">
          Select a category to begin your hands-on experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LabCategory
            title="Cross-Site Scripting (XSS)"
            description="Exploit and defend against vulnerabilities that allow an attacker to inject malicious scripts into a website."
            to="/labs/xss"
          />
          <LabCategory
            title="SQL Injection"
            description="Learn how to bypass security measures by injecting malicious SQL statements into web forms."
            to="/labs/sql-injection"
          />
          {/* Add more categories here as needed */}
        </div>
      </motion.div>
    </div>
  );
};

export default Labs;