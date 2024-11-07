import React from 'react';
import HeroSection from '../components/Hero';
import HistoriaSection from '../components/History';
import ServiciosSection from '../components/Services';
import TestimoniosSection from '../components/Testimonials';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HistoriaSection />
      <ServiciosSection />
      <TestimoniosSection />
    </div>
  );
};

export default Home;
