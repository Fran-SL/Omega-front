import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCog } from 'react-icons/fa';
import userImageDefault from '../assets/userdefect.png';

const UserMenu = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const profileImage = user?.foto_perfil_url ? user.foto_perfil_url : userImageDefault;

  return (
    <div className="relative flex items-center space-x-2">
      <span className="text-sgreen font-greatvibes text-xm">Bienvenido, {user.nombre}</span>
      <img
        src={profileImage}
        alt="User"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={toggleMenu}
      />
      {/* Menú desplegable animado */}
      <div
        className={`mt-4 absolute right-0 top-full w-48 bg-white rounded-2xl border-2 border-gray-200 z-20 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-200 hover:text-sgreen cursor-pointer flex items-center space-x-2"
            onClick={() => navigate('/profile')}
          >
            <FaCog className="text-sgreen" />
            <span className="text-sgreen">Ver perfil</span>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-200 hover:text-sgreen border-t-2 border-gray-200 rounded-b-2xl cursor-pointer flex items-center space-x-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-sgreen" />
            <span className="text-sgreen">Cerrar Sesión</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
