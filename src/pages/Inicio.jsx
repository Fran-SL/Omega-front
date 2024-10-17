import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Inicio/Hero';
import Informacion from '../components/Inicio/Informacion';
import Servicios from '../components/Inicio/Servicios';
import Testimonios from '../components/Inicio/Testimonios';

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
