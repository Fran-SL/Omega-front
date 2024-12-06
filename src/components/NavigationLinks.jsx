import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';

const NavigationLinks = () => {
  const [isCitasOpen, setIsCitasOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);

  const citasRef = useRef(null);
  const serviciosRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (citasRef.current && !citasRef.current.contains(e.target)) {
        setIsCitasOpen(false);
      }
      if (serviciosRef.current && !serviciosRef.current.contains(e.target)) {
        setIsServiciosOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex space-x-4 text-gray-700">
      {/* Enlace "Inicio" */}
      <Link to="/" className="hover:text-sgreen transition duration-300">
        Inicio
      </Link>

      {/* Menú desplegable para "Citas" */}
      <div className="relative" ref={citasRef}>
        <button
          onClick={() => setIsCitasOpen(!isCitasOpen)}
          className="flex items-center hover:text-sgreen transition duration-300"
        >
          Citas <FaAngleDown className="ml-1" />
        </button>
        {isCitasOpen && (
          <div className="absolute top-full mt-2 bg-white/90 backdrop-blur-md border border-sgreen/10 rounded-b-2xl shadow-lg w-auto text-gray-700">
            <Link to="/agendar-cita" className="block px-4 py-2 hover:text-sgreen rounded-t-md">Agendar Cita</Link>
            <Link to="/ver-cita" className="block px-4 py-2 hover:text-sgreen rounded-b-md">Ver Citas</Link>
          </div>
        )}
      </div>

      {/* Menú desplegable para "Servicios" */}
      <div className="relative" ref={serviciosRef}>
        <button
          onClick={() => setIsServiciosOpen(!isServiciosOpen)}
          className="flex items-center hover:text-sgreen transition duration-300"
        >
          Servicios <FaAngleDown className="ml-1" />
        </button>
        {isServiciosOpen && (
          <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-md border border-sgreen/10 rounded-b-2xl shadow-lg w-auto text-gray-700">
            <Link to="/servicios/personalizacion" className="block px-4 py-2 hover:text-sgreen rounded-t-md">Personalizacion</Link>
            <Link to="/servicios/reparacion" className="block px-4 py-2 hover:text-sgreen rounded-b-md">Reparacion</Link>
            <Link to="/faq" className="block px-4 py-2 hover:text-sgreen rounded-b-md">Preguntas Frecuentes</Link>
          </div>
        )}
      </div>

      {/* Otros enlaces */}
      <Link to="/blog" className="hover:text-sgreen transition duration-300">
        Blog
      </Link>
      <Link to="/about" className="hover:text-sgreen transition duration-300 whitespace-nowrap">
        Quiénes Somos
      </Link>
    </nav>
  );
};

export default NavigationLinks;
