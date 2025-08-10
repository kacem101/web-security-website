// src/components/common/Layout.jsx
import React from 'react';
import Header from './Header'; 

const Layout = ({ children }) => {
  return (
    <div className="font-sans bg-dark-background text-text-light min-h-screen">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;