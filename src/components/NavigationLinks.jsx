import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';

const NavigationLinks = React.memo(() => {
  const [isCitasOpen, setIsCitasOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);
  const location = useLocation();

  const citasRef = useRef(null);
  const serviciosRef = useRef(null);
  const firstLinkRef = useRef(null);

  const closeMenus = useCallback(() => {
    setIsCitasOpen(false);
    setIsServiciosOpen(false);
  }, []);

  useEffect(() => {
    // Cierra los menús cuando cambia la ubicación
    closeMenus();
  }, [location, closeMenus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (citasRef.current && !citasRef.current.contains(e.target)) {
        setIsCitasOpen(false);
      }
      if (serviciosRef.current && !serviciosRef.current.contains(e.target)) {
        setIsServiciosOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenus]);

  // Mueve el foco al primer enlace del menú cuando se abre
  useEffect(() => {
    if (isCitasOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isCitasOpen]);

  // Función para renderizar menús desplegables
  const renderDropdownMenu = (isOpen, setIsOpen, ref, links) => (
    <ul
      ref={ref}
      className={`absolute top-full mt-2 bg-white/90 backdrop-blur-md border border-sgreen/10 rounded-b-2xl shadow-lg w-auto text-gray-700 transition-all duration-300 transform origin-top ${
        isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
      }`}
      role="menu"
    >
      {links.map((link, index) => (
        <li key={index} role="none">
          <Link
            to={link.to}
            role="menuitem"
            ref={index === 0 ? firstLinkRef : null}
            tabIndex={isOpen ? 0 : -1}
            className="block px-4 py-2 hover:text-sgreen"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
  

  return (
    <nav aria-label="Primary Navigation" className="flex space-x-4 text-gray-700">
      {/* Enlace "Inicio" */}
      <Link to="/" className="hover:text-sgreen transition duration-300">
        Inicio
      </Link>

      {/* Menú desplegable para "Citas" */}
      <div className="relative" ref={citasRef}>
        <button
          onClick={() => setIsCitasOpen(!isCitasOpen)}
          aria-expanded={isCitasOpen}
          aria-controls="citas-menu"
          aria-haspopup="menu"
          className="flex items-center hover:text-sgreen transition duration-300"
        >
          Citas <FaAngleDown className="ml-1" />
        </button>
        {renderDropdownMenu(isCitasOpen, setIsCitasOpen, citasRef, [
          { to: "/citas/nueva", label: "Agendar Cita" },
          { to: "/citas/historial", label: "Historial" },
        ])}
      </div>

      {/* Menú desplegable para "Servicios" */}
      <div className="relative" ref={serviciosRef}>
        <button
          onClick={() => setIsServiciosOpen(!isServiciosOpen)}
          aria-expanded={isServiciosOpen}
          aria-controls="servicios-menu"
          aria-haspopup="menu"
          className="flex items-center hover:text-sgreen transition duration-300"
        >
          Servicios <FaAngleDown className="ml-1" />
        </button>
        {renderDropdownMenu(isServiciosOpen, setIsServiciosOpen, serviciosRef, [
          { to: "/servicios/personalizacion", label: "Personalización" },
          { to: "/servicios/reparacion", label: "Reparación" },
          { to: "/faq", label: "Preguntas Frecuentes" },
        ])}
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
});

export default NavigationLinks;
