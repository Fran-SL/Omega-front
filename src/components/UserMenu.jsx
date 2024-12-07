import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import userImageDefault from "../assets/userdefect.png";

const UserMenu = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const profileImage = user?.foto_perfil_url
    ? user.foto_perfil_url
    : userImageDefault;

  // Cierra el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative flex items-center space-x-2" ref={menuRef}>
      <span className="text-sgreen font-greatvibes text-xm">
        Bienvenido, {user.nombre}
      </span>
      <img
        src={profileImage}
        alt="User"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={0}
      />
      <div
        className={`absolute right-0 top-full w-48 bg-white rounded-2xl border-2 border-gray-200 z-20 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
        role="menu"
      >
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-200 hover:text-sgreen cursor-pointer flex items-center space-x-2"
            onClick={() => navigate("/profile")}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            <FaCog className="text-sgreen" />
            <span className="text-sgreen">Ver perfil</span>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-200 hover:text-sgreen border-t-2 border-gray-200 rounded-b-2xl cursor-pointer flex items-center space-x-2"
            onClick={handleLogout}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
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
