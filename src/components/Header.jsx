import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo.svg';

const DropdownMenu = ({ items, isOpen }) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} pl-6 pt-1`}>
      {items.map((item, index) => (
        <Link key={index} to={item.path} className="block text-white py-1 hover:bg-bgreen">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const UserDropdown = ({ onLogout }) => {
  return (
    <div className="bg-sgreen text-white rounded-b-2xl shadow-lg py-4 absolute right-0 mt-2 w-48 z-10">
      <Link
        to="/profile"
        className="flex items-center px-4 py-2 text-sm hover:bg-bgreen"
      >
        <FontAwesomeIcon icon={faCog} className="mr-2" /> Actualizar datos
      </Link>
      <hr className="border-bgreen mx-4" />
      <button
        onClick={onLogout}
        className="flex items-center px-4 py-2 text-sm hover:bg-bgreen w-full text-left"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Cerrar Sesión
      </button>
    </div>
  );
};

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [subMenuOpen, setSubMenuOpen] = useState({ citas: false, servicios: false }); // Estado para submenús desplegables en responsive
  const dropdownRef = useRef(null);

  const user = {
    name: 'Usuario',
    profilePicture: null,
  };

  const menuItems = {
    citas: [{ name: "Consultar Citas", path: "/citas" }, { name: "Agendar Citas", path: "/citas" }],
    servicios: [{ name: "Reparaciones", path: "/servicios" }, { name: "Eventos y Talleres", path: "/servicios/eventos-talleres" }, 
        { name: "Grabados y Personalizados", path: "/servicios" }]
  };

  // Cerrar el menú al hacer clic fuera del menú de usuario
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleSubMenu = (menuName) => {
    setSubMenuOpen(prevState => ({ ...prevState, [menuName]: !prevState[menuName] }));
  };

  return (
    <header className="bg-sgreen text-white py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo alineado completamente a la izquierda */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={Logo} alt="Logotipo de Relojería y Joyería OMEGA" className="w-24 h-auto md:w-20 cursor-pointer" />
          </Link>
        </div>

        {/* Menú centrado en toda la pantalla para pantallas grandes */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="inline-flex space-x-4 items-center text-sm">
            {/* Enlace directo para "Inicio", "Blog", y "Acerca", sin desplegable */}
            <li className="flex items-center">
              <Link
                to="/"
                className="rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-bgreen"
              >
                Inicio
              </Link>
            </li>

            {/* Menú con dropdowns para Citas y Servicios con hover en modo normal */}
            {Object.keys(menuItems).map(menuName => (
              <li key={menuName} className="relative group flex items-center">
                <button
                  className="rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-bgreen"
                >
                  {menuName.charAt(0).toUpperCase() + menuName.slice(1)}
                </button>
                <div className="bg-sgreen rounded-b-2xl shadow-lg py-3 absolute top-full left-0 w-48 z-10 hidden group-hover:block">
                  {menuItems[menuName].map((item, index) => (
                    <Link key={index} to={item.path} className="block px-3 py-2 text-sm text-white hover:bg-bgreen">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}

            <li className="flex items-center">
              <Link
                to="/blog"
                className="rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-bgreen"
              >
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/acerca"
                className="rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-bgreen"
              >
                Acerca
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <button
          className="md:hidden flex items-center text-white ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-5 h-5" />
        </button>

        {/* Menú desplegable en pantallas pequeñas */}
        {menuOpen && (
          <nav className="md:hidden absolute top-full right-0 left-0 w-full bg-sgreen z-20">
            <ul className="flex flex-col space-y-3 p-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="block text-white px-4 py-2 hover:bg-bgreen rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              {Object.keys(menuItems).map(menuName => (
                <li key={menuName}>
                  <button
                    className="block text-white px-4 py-2 hover:bg-bgreen rounded w-full text-left"
                    onClick={() => toggleSubMenu(menuName)}
                  >
                    {menuName.charAt(0).toUpperCase() + menuName.slice(1)}
                  </button>
                  <DropdownMenu items={menuItems[menuName]} isOpen={subMenuOpen[menuName]} />
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="block text-white px-4 py-2 hover:bg-bgreen rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/acerca"
                  className="block text-white px-4 py-2 hover:bg-bgreen rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Acerca
                </Link>
              </li>
              {/* Separación visual entre los enlaces y el perfil */}
              <hr className="border-bgreen my-2" />
              <li>
                <Link
                  to="/profile"
                  className="block text-white px-4 py-2 hover:bg-bgreen rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Ver Perfil
                </Link>
              </li>
              <li>
                <button
                  className="block text-white px-4 py-2 hover:bg-bgreen w-full text-left rounded"
                  onClick={() => {
                    setMenuOpen(false);
                    console.log('Cerrar sesión');
                  }}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Menú desplegable del usuario con clic */}
        <div className="flex-shrink-0 relative" ref={dropdownRef}>
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm">Bienvenido, {user.name}</span>
            {/* Círculo como marcador de posición para la foto de perfil */}
            <div
              className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {/* Iniciales del usuario en lugar de una imagen */}
              <span className="text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
            {/* Menú desplegable del usuario */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3">
                <UserDropdown onLogout={() => console.log('Logout')} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
