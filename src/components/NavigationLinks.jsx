import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa'; // Importar el ícono

const NavigationLinks = () => {
  const [isCitasOpen, setIsCitasOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);

  const citasRef = useRef(null);
  const serviciosRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera del área
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
    <nav className="hidden md:flex justify-center space-x-4 text-base">
      {/* Enlace de navegación */}
      <Link to="/" className="text-sgreen text-lg hover:bg-gray-200 py-2 px-6 rounded-2xl transition duration-300">
        Inicio
      </Link>

      {/* Dropdown de Citas */}
      <div className="relative dropdown-menu" ref={citasRef}>
        <button
          className="text-sgreen text-lg hover:bg-gray-200 py-2 px-6 rounded-2xl transition duration-300 flex items-center space-x-2"
          onClick={() => setIsCitasOpen((prev) => !prev)}
          aria-expanded={isCitasOpen}
        >
          <span>Citas</span>
          <FaAngleDown />
        </button>

        {isCitasOpen && (
          <div
            className="absolute left-0 min-w-full bg-white border-2 border-gray-200 rounded-b-2xl z-20 transition-all duration-300 ease-in-out overflow-hidden"
          >
            <Link to="/citas/consulta" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Consulta
            </Link>
            <Link to="/citas/reservas" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Reservas
            </Link>
            <Link to="/citas/historial" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Historial
            </Link>
          </div>
        )}
      </div>

      {/* Dropdown de Servicios */}
      <div className="relative dropdown-menu" ref={serviciosRef}>
        <button
          className="text-sgreen text-lg hover:bg-gray-200 py-2 px-6 rounded-2xl transition duration-300 flex items-center space-x-2"
          onClick={() => setIsServiciosOpen((prev) => !prev)}
          aria-expanded={isServiciosOpen}
        >
          <span>Servicios</span>
          <FaAngleDown />
        </button>

        {isServiciosOpen && (
          <div
            className="absolute left-0 min-w-full bg-white border-2 border-gray-200 rounded-b-2xl z-20 transition-all duration-300 ease-in-out overflow-hidden"
          >
            <Link to="/servicios/medicos" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Servicios Médicos
            </Link>
            <Link to="/servicios/emergencias" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Emergencias
            </Link>
            <Link to="/servicios/especializados" className="block px-4 py-2 text-sgreen hover:bg-gray-200">
              Servicios Especializados
            </Link>
          </div>
        )}
      </div>

      {/* Resto de enlaces */}
      <Link to="/blog" className="text-sgreen text-lg hover:bg-gray-200 py-2 px-6 rounded-2xl transition duration-300">
        Blog
      </Link>
      <Link to="/acerca" className="text-sgreen text-lg hover:bg-gray-200 py-2 px-6 rounded-2xl transition duration-300">
        Quiénes Somos
      </Link>
    </nav>
  );
};

export default NavigationLinks;
