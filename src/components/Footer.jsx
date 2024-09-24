import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importa los iconos
import Logo from '../assets/Logo.svg';

const Footer = () => {
  return (
    <footer className="bg-sgreen text-white py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Logo and Social Media */}
          <div className="flex flex-col items-center"> {/* Asegura que todo esté centrado en pantallas pequeñas y grandes */}
            <img src={Logo} alt="Logotipo de Relojería y Joyería OMEGA" className="w-64 h-auto mb-6" />
            <div className="flex space-x-6 justify-center"> {/* Centra los iconos debajo del logo */}
              <a href="#" aria-label="Facebook">
                <FaFacebook size={40} className="hover:text-gray-400 transition-colors duration-300" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram size={40} className="hover:text-gray-400 transition-colors duration-300" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin size={40} className="hover:text-gray-400 transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navegar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Inicio</a></li>
              <li><a href="#" className="hover:underline">Citas</a></li>
              <li><a href="#" className="hover:underline">Servicios</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Acerca de</a></li>
            </ul>
          </div>

          {/* Column 3: Information and Subscribe */}
          <div>
            <h3 className="font-semibold mb-4">Suscribir</h3>
            <p className="mb-4">
              Únete a nuestro boletín para estar al día de las novedades y lanzamientos.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="p-2 rounded-xl border-none text-sgreen"
              />
              <button className="bg-sgreen border border-white text-white px-4 py-2 rounded-xl hover:bg-bgreen transition-colors duration-300 ml-4">
                Suscribir
              </button>
            </form>
            <p className="text-xs mt-2">
              Al suscribirte, aceptas nuestra <a href="#" className="hover:underline">Política de Privacidad</a> y das tu consentimiento para recibir actualizaciones.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 Todos los derechos reservados</p>
          <nav className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Política de Privacidad</a>
            <a href="#" className="hover:underline">Términos de Servicio</a>
            <a href="#" className="hover:underline">Configuración de Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
