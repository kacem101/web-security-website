import React from 'react';
import ModuleCard from './ModuleCard';

const ModuleList = () => {
  // Mock data for your modules
  const modules = [
    {
      id: 1,
      title: 'Web Fundamentals',
      description: 'Learn the basics of HTTP, browsers, and how websites work.',
      link: '/theory/web-fundamentals',
    },
    {
      id: 2,
      title: 'Cross-Site Scripting (XSS)',
      description: 'An in-depth look at XSS vulnerabilities and how to prevent them.',
      link: '/theory/xss',
    },
    {
      id: 3,
      title: 'SQL Injection (SQLi)',
      description: 'Discover how to exploit and defend against SQL Injection attacks.',
      link: '/theory/sqli',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
      {modules.map(module => (
        <ModuleCard 
          key={module.id} 
          title={module.title} 
          description={module.description} 
          link={module.link} 
        />
      ))}
    </div>
  );
};

export default ModuleList;