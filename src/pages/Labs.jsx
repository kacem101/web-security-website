import React from 'react';
import LabCard from '../components/labs/LabCard';

const Labs = () => {
  // Mock data for your labs
  const labs = [
    {
      id: 1,
      title: 'Lab 1: Basic XSS',
      description: 'Find and exploit a reflected Cross-Site Scripting vulnerability.',
      link: '/labs/xss-1',
    },
    {
      id: 2,
      title: 'Lab 2: SQLi Login Bypass',
      description: 'Bypass a vulnerable login form using a basic SQL Injection attack.',
      link: '/labs/sqli-1',
    },
    {
      id: 3,
      title: 'Lab 3: Broken Authentication',
      description: 'Manipulate predictable session IDs to take over another user\'s account.',
      link: '/labs/auth-1',
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold font-mono text-neon-blue mb-4">
        Practice Labs
      </h1>
      <p className="text-xl text-text-gray mb-8">
        Put your skills to the test with our hands-on challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {labs.map(lab => (
          <LabCard 
            key={lab.id} 
            title={lab.title} 
            description={lab.description} 
            link={lab.link} 
          />
        ))}
      </div>
    </div>
  );
};

export default Labs;