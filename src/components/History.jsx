import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Historia from '../assets/Historia.svg';

const HistoriaSection = () => {
  const historiaRef = useRef(null);

  // Configuración del scroll y progreso
  const { scrollYProgress } = useScroll({
    target: historiaRef,
    offset: ["start start", "end start"]
  });

  // Animaciones del título
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  // Texto dividido palabra por palabra para animación
  const text = "Desde 1948, Relojería y Joyería Omega de Talca ha ofrecido joyas y relojes de alta calidad, junto con servicios técnicos especializados, convirtiéndonos en un referente de confianza en la región del Maule. Nuestra misión es brindar productos y servicios de joyería y relojería de excelente calidad, con atención personalizada y soluciones integrales que acompañen a nuestros clientes en momentos especiales. En “OMEGA” queremos ser la joyería y relojería líder en la región, reconocida por la calidad, exclusividad y confianza, innovando continuamente para satisfacer a nuestros clientes.";
  const words = text.split(" ");

  // Animación para cada palabra del texto
  const opacityArray = words.map((_, index) =>
    useTransform(scrollYProgress, [0.2 + index / (words.length * 5), 0.3 + index / (words.length * 5)], [0, 1])
  );
  const yArray = words.map((_, index) =>
    useTransform(scrollYProgress, [0.2 + index / (words.length * 5), 0.3 + index / (words.length * 5)], [20, 0])
  );

  // Animación de la polaroid
  const polaroidOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const polaroidY = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);
  const polaroidRotate = useTransform(scrollYProgress, [0.6, 0.7], [-5, 0]);

  // Ocultar el texto cuando la polaroid empieza a aparecer
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);

  return (
    <section
      ref={historiaRef}
      className="relative min-h-[300vh] flex items-center justify-center font-ibm px-4 md:px-8 lg:px-16"
      style={{
        backgroundColor: "#006B0B" // Fondo principal
      }}
    >
      {/* Franjas de 20px de altura */}
      <div className="absolute top-0 left-0 w-full h-10 bg-[#C1F6C6]" />
      <div className="absolute top-10 left-0 w-full h-10 bg-[#49B854]" />

      {/* Contenedor principal sticky */}
      <div className="sticky top-0 mt-40 h-screen flex flex-col items-center justify-center space-y-16 md:space-y-32 lg:space-y-64">
        
        {/* Título central */}
        <motion.h3
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-3xl md:text-4xl lg:text-5xl text-left max-w-xl font-bold text-white"
        >
          Nuestra Historia, Misión y Visión
        </motion.h3>

        {/* Texto de descripción con animación palabra por palabra */}
        <motion.p
          style={{ opacity: textOpacity }}
          className="text-xl md:text-2xl lg:text-3xl max-w-4xl text-left text-white sticky top-1/4 transform -translate-y-1/5"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              style={{ opacity: opacityArray[index], y: yArray[index] }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Imagen estilo Polaroid con animación */}
        <motion.div
          style={{ opacity: polaroidOpacity, y: polaroidY, rotate: polaroidRotate }}
          className="flex justify-center sticky top-1/3 transform -translate-y-1/3"
        >
          <div className="bg-white p-4 rounded-2xl shadow-2xl">
            <img src={Historia} alt="Historia" className="w-60 h-auto md:w-80 lg:w-[24rem]" />
            <p className="text-center text-black text-sm md:text-lg lg:text-xl mt-2">OMEGA año 1948</p>
          </div>
        </motion.div>

        {/* Espaciador final */}
        <div className="h-[150vh]"></div>
      </div>
    </section>
  );
};

export default HistoriaSection;
