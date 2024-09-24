import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Informacion from '../components/Informacion';
import Servicios from '../components/Servicios';
import Testimonios from '../components/Testimonios';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Informacion />
      <Servicios />
      <Testimonios />
      <Footer />
    </div>
  );
};

export default Home;
