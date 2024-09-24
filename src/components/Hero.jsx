import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Encuentra la joya perfecta para ti</h1>
      <p className="text-lg text-gray-600 mb-8">
        Descubre nuestra amplia selección de relojes y joyas de alta calidad que se adaptan a tu estilo y personalidad.
      </p>
      <img src="/assets/anillo.png" alt="Anillo" className="mx-auto h-64" />
    </section>
  );
};

export default HeroSection;
