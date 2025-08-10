import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <div className="relative text-center py-20 md:py-40">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold font-mono text-neon-green mb-4"
      >
        Welcome, Future Hacker!
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-text-gray mb-8"
      >
        Start your journey into web security.
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button className="bg-neon-blue text-dark-background hover:bg-neon-green hover:text-dark-background">
          Explore the Labs
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;