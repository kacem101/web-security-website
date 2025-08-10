import React from 'react';
import ModuleList from '../components/theory/ModuleList';

const Theory = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold font-mono text-neon-blue mb-4">
        Theory & Documentation
      </h1>
      <p className="text-xl text-text-gray mb-8">
        Build a strong foundation with our comprehensive guides.
      </p>
      <ModuleList />
    </div>
  );
};

export default Theory;