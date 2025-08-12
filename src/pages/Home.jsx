import React from 'react';
import HeroSection from '../components/homepage/HeroSection';
import PreviewCard from '../components/homepage/PreviewCard';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container mx-auto">
      <HeroSection />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <PreviewCard 
          title="Theoretical Knowledge"
          description="Build a strong foundation with our comprehensive documentation and guides on web security."
          icon="book"
          link="/theory"
        />
        <PreviewCard 
          title="Practical Labs"
          description="Test your skills in hands-on labs covering a wide range of vulnerabilities."
          icon="flask"
          link="/labs"
        />
      </section>
    </div>
  );
};

export default Home;