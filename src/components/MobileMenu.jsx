import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);
  const [isOtrosOpen, setIsOtrosOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "servicios") {
      setIsServiciosOpen((prev) => !prev);
      setIsOtrosOpen(false); // Cierra el otro menú si está abierto
    } else if (dropdown === "otros") {
      setIsOtrosOpen((prev) => !prev);
      setIsServiciosOpen(false); // Cierra el otro menú si está abierto
    }
  };

  const closeMenus = () => {
    setIsServiciosOpen(false);
    setIsOtrosOpen(false);
    toggleMobileMenu(); // Cierra el menú móvil
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    isMobileMenuOpen && (
      <div
        ref={menuRef}
        className="md:hidden absolute top-16 left-0 right-0 bg-white z-20 shadow-lg rounded-b-2xl font-playfair"
      >
        <nav className="flex flex-col space-y-2 py-4 text-center border-b-2 border-gray-200">
          {/* Enlace Inicio */}
          <Link
            to="/"
            className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300"
            onClick={closeMenus}
          >
            Inicio
          </Link>

          {/* Enlace Citas */}
          <Link
            to="/citas"
            className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300"
            onClick={closeMenus}
          >
            Citas
          </Link>

          {/* Menú desplegable Servicios */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("servicios")}
              className="flex justify-center items-center space-x-1 text-sgreen w-full py-2 hover:bg-gray-200 transition duration-300"
            >
              <span>Servicios</span>
              <FaAngleDown
                className={`${
                  isServiciosOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
            {isServiciosOpen && (
              <ul className="flex flex-col bg-gray-100 border-t border-gray-300 space-y-1">
                <li>
                  <Link
                    to="/servicios/personalizacion"
                    className="text-sgreen py-2 px-4 hover:bg-gray-200 transition duration-300"
                    onClick={closeMenus}
                  >
                    Personalización
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios/eventos"
                    className="text-sgreen py-2 px-4 hover:bg-gray-200 transition duration-300"
                    onClick={closeMenus}
                  >
                    Eventos
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Menú desplegable Otros */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("otros")}
              className="flex justify-center items-center space-x-1 text-sgreen w-full py-2 hover:bg-gray-200 transition duration-300"
            >
              <span>Otros</span>
              <FaAngleDown
                className={`${
                  isOtrosOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
            {isOtrosOpen && (
              <ul className="flex flex-col bg-gray-100 border-t border-gray-300 space-y-1">
                <li>
                  <Link
                    to="/reseñas"
                    className="text-sgreen py-2 px-4 hover:bg-gray-200 transition duration-300"
                    onClick={closeMenus}
                  >
                    Reseñas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sgreen py-2 px-4 hover:bg-gray-200 transition duration-300"
                    onClick={closeMenus}
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-sgreen py-2 px-4 hover:bg-gray-200 transition duration-300"
                    onClick={closeMenus}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Enlace Quiénes Somos */}
          <Link
            to="/about"
            className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300"
            onClick={closeMenus}
          >
            Quiénes Somos
          </Link>
        </nav>
      </div>
    )
  );
};

export default MobileMenu;
