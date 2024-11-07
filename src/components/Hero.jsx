import React from 'react';
import { motion } from 'framer-motion';
import Anillos from '../assets/Anillos.svg';

const HeroSection = () => {
  return (
    <section className="flex flex-col font-ibm items-center justify-center text-center py-20 min-h-screen bg-white text-black">
      {/* Título con animación de aparición y desplazamiento desde abajo */}
      <motion.h2
        className="text-5xl font-bold max-w-lg mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Encuentra la <span className="text-gold-effect">Joya</span> perfecta para ti
      </motion.h2>

      {/* Descripción con animación de aparición y desplazamiento desde abajo, con retraso */}
      <motion.p
        className="text-xl max-w-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        Descubre nuestra amplia selección de relojes y joyas de alta calidad que se adaptan a tu estilo y personalidad.
      </motion.p>

      {/* Imagen con animación de rebote */}
      <motion.img
        src={Anillos}
        alt="Anillos"
        className="w-72 h-72"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 120,
        }}
      />
    </section>
  );
};

export default HeroSection;
