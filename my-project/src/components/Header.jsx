import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <img src="/assets/logo.png" alt="Logo Omega" className="h-10 inline-block" />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
            <li><Link to="/citas" className="hover:text-gray-300">Citas</Link></li>
            <li><Link to="/servicios" className="hover:text-gray-300">Servicios</Link></li>
            <li><Link to="/blog" className="hover:text-gray-300">Blog</Link></li>
            <li><Link to="/acerca" className="hover:text-gray-300">Acerca de</Link></li>
          </ul>
        </nav>
        <div>
          <Link to="/login" className="bg-white text-green-700 px-4 py-2 rounded-md mr-2">Iniciar Sesión</Link>
          <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md">Registrarse</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
