import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg'; 

const DropdownMenu = ({ items }) => {
  return (
    <div className="bg-sgreen rounded-b-2xl shadow-lg py-3 absolute">
      {items.map((item, index) => (
        <Link key={index} to={item.path} className="block px-3 py-3 text-sm text-white hover:bg-bgreen">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = {
    inicio: [],
    citas: [{ name: "Consultar Citas", path: "/citas" }, { name: "Agendar Citas", path: "/citas" }],
    servicios: [{ name: "Reparaciones", path: "/servicios" }, { name: "Cambios de Batería", path: "/servicios" }, 
        { name: "Ajuste de Reloj Automatico", path: "/servicios" },{ name: "Pulidos", path: "/servicios" }],
    blog: [{ name: "Últimas noticias", path: "/blog" }, { name: "Archivos", path: "/blog" }],
    acerca: [{ name: "Quiénes somos", path: "/acerca" }, { name: "Localización", path: "/acerca" }]
  };

  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  return (
    <header className="bg-sgreen text-white py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo alineado completamente a la izquierda */}
        <div className="flex-shrink-0">
          <img src={Logo} alt="Logotipo de Relojería y Joyería OMEGA" className="w-24 h-auto" />
        </div>

        {/* Menú centrado en toda la pantalla */}
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="inline-flex space-x-4">
            {Object.keys(menuItems).map(menuName => (
              <li key={menuName} className="relative">
                <button
                  className="rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-bgreen"
                  onClick={() => toggleMenu(menuName)}
                >
                  {menuName.charAt(0).toUpperCase() + menuName.slice(1)}
                </button>
                {activeMenu === menuName && <DropdownMenu items={menuItems[menuName]} />}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botones alineados completamente a la derecha */}
        <div className="flex-shrink-0">
          <Link
            to="/login"
            className="bg-sgreen border border-white text-white px-4 py-3 rounded-2xl mr-2 hover:bg-bgreen transition-colors duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="bg-white border border-sgreen text-sgreen px-4 py-3 rounded-2xl hover:bg-bgreen hover:text-white transition-colors duration-300"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
