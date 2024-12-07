import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const TestimoniosSection = () => {
  // Hook para detectar si la sección está en el viewport
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // La animación se activa cuando el 20% del elemento es visible
  });

  const navigate = useNavigate(); // Hook para redirigir

  const handleVerMasResenas = () => {
    navigate("/testimonials"); // Redirige a ManageTestimonials
  };

  return (
    <section
      ref={ref}
      className="flex flex-col font-ibm items-center justify-center py-16 px-8 min-h-screen bg-sgreen text-white"
    >
      {/* Título con animación de aparición solo cuando está en el viewport */}
      <motion.h3
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Testimonios de Clientes
      </motion.h3>

      {/* Descripción con animación de aparición y retraso */}
      <motion.p
        className="text-xl max-w-2xl mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        Descubre lo que nuestros clientes tienen que decir
      </motion.p>

      {/* Contenedor de testimonios con animación de aparición */}
      <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        <TestimonioItem
          name="Marco Cofré"
          rating={5}
          comment="Lorem ipsum dolor sit amet..."
          delay={0.5}
          inView={inView}
        />
        <TestimonioItem
          name="Urbano Rojas"
          rating={5}
          comment="Lorem ipsum dolor sit amet..."
          delay={0.7}
          inView={inView}
        />
        <TestimonioItem
          name="Néstor Useche"
          rating={5}
          comment="Lorem ipsum dolor sit amet..."
          delay={0.9}
          inView={inView}
        />
      </div>

      {/* Botón "Ver más reseñas" */}
      <motion.button
        className="mt-12 px-6 py-3 bg-sgreen text-white border border-white font-bold text-lg rounded-2xl hover:bg-bgreen transition-colors"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
        onClick={handleVerMasResenas} // Redirige al hacer clic
      >
        Ver más reseñas
      </motion.button>
    </section>
  );
};

const TestimonioItem = ({ name, rating, comment, delay, inView }) => (
  <motion.div
    className="bg-sgreen text-white p-8 rounded-lg max-w-md flex flex-col items-start"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
  >
    <h4 className="font-semibold text-xl">{name}</h4>
    <div className="text-yellow-500 text-lg">{"★".repeat(rating)}</div>
    <p className="text-sm">{comment}</p>
  </motion.div>
);

export default TestimoniosSection;
