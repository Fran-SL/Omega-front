import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaUser, FaSignOutAlt } from 'react-icons/fa';

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu, user, handleLogout }) => {
  const [isCitasOpen, setIsCitasOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);

  return (
    isMobileMenuOpen && (
      <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-20 shadow-lg rounded-b-2xl font-playfair">

        <nav className="flex flex-col space-y-2 py-4 text-center border-b-2 border-gray-200">
          <Link to="/" className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300" onClick={toggleMobileMenu}>
            Inicio
          </Link>

          <div className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300 cursor-pointer" onClick={() => setIsCitasOpen(!isCitasOpen)}>
            <span className="flex justify-center items-center space-x-1">
              <span>Citas</span>
              <FaAngleDown className={`${isCitasOpen ? 'rotate-180' : ''} transition-transform`} />
            </span>
            {isCitasOpen && (
              <div className="flex flex-col space-y-1 mt-2">
                <Link to="/citas/consulta" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Consulta
                </Link>
                <Link to="/citas/reservas" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Reservas
                </Link>
                <Link to="/citas/historial" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Historial
                </Link>
              </div>
            )}
          </div>

          <div className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300 cursor-pointer" onClick={() => setIsServiciosOpen(!isServiciosOpen)}>
            <span className="flex justify-center items-center space-x-1">
              <span>Servicios</span>
              <FaAngleDown className={`${isServiciosOpen ? 'rotate-180' : ''} transition-transform`} />
            </span>
            {isServiciosOpen && (
              <div className="flex flex-col space-y-1 mt-2">
                <Link to="/servicios/medicos" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Servicios Médicos
                </Link>
                <Link to="/servicios/emergencias" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Emergencias
                </Link>
                <Link to="/servicios/especializados" className="text-sgreen hover:bg-gray-200 py-2 px-4 rounded transition duration-300" onClick={toggleMobileMenu}>
                  Servicios Especializados
                </Link>
              </div>
            )}
          </div>

          <Link to="/blog" className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300" onClick={toggleMobileMenu}>
            Blog
          </Link>
          <Link to="/acerca" className="text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300" onClick={toggleMobileMenu}>
            Quiénes Somos
          </Link>
        </nav>

        <div className="py-4 text-center">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex justify-center items-center text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300 w-full"
                onClick={toggleMobileMenu}
              >
                <FaUser className="mr-2" /> Ver Perfil
              </Link>
              <button
                className="flex justify-center items-center text-sgreen hover:bg-gray-200 py-2 rounded transition duration-300 w-full"
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                <FaSignOutAlt className="mr-2" /> Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 py-2 px-2 rounded-2xl hover:border-sgreen hover:text-sgreen transition w-full block text-center"
                onClick={toggleMobileMenu}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-sgreen text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner-green hover:shadow-inner-hgreen transition duration-300 ease-in-out w-full block text-center"
                onClick={toggleMobileMenu}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default MobileMenu;
