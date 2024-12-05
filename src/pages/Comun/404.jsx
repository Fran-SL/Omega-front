import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import galaxy from '../../assets/greengalaxy.jpg'; // Asegúrate de que la ruta sea correcta

const NotFoundPage = () => {
  return (
    <div className="flex flex-col font-ibm items-center justify-center min-h-screen bg-white text-center p-6">
      {/* Texto "Oops!" con imagen de fondo personalizada */}
      <motion.h1
        className="text-9xl font-extrabold text-transparent bg-clip-text"
        style={{
          backgroundImage: `url(${galaxy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Oops!
      </motion.h1>
      
      {/* Mensaje "404 - PAGE NOT FOUND" */}
      <motion.h2
        className="text-2xl font-bold text-gray-800 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        404 - Página no Encontrada
      </motion.h2>
      
      {/* Descripción */}
      <motion.p
        className="text-gray-600 mt-2 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Es posible que la página que está buscando se haya eliminado, haya cambiado de nombre o no esté disponible temporalmente.
      </motion.p>
      
      {/* Botón para volver al inicio */}
      <Link to="/">
        <motion.button
          className="mt-6 bg-sgreen text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner-green hover:shadow-inner-hgreen transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ir al Inicio
        </motion.button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
