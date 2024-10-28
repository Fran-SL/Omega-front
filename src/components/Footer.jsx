import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from '../assets/Logo.svg';

const Footer = () => {
  // Variables de estilo
  const styles = {
    backgroundGradient: 'bg-gradient-to-b from-white to-gray-300',
    textColor: 'sgreen',
    iconHoverColor: 'bgreen',
    buttonBackground: 'sgreen',
    buttonHoverBackground: 'bgreen',
    borderColor: 'sgreen',
  };

  return (
    <footer className={`${styles.backgroundGradient} text-${styles.textColor} py-10`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Columna 1: Logo y redes sociales */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="Logotipo de OMEGA" className="w-40 h-auto mb-6" />
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={40} className={`hover:text-${styles.iconHoverColor} transition-colors duration-300`} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={40} className={`hover:text-${styles.iconHoverColor} transition-colors duration-300`} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={40} className={`hover:text-${styles.iconHoverColor} transition-colors duration-300`} />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Navegar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Inicio</a></li>
              <li><a href="#" className="hover:underline">Citas</a></li>
              <li><a href="#" className="hover:underline">Servicios</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Acerca de</a></li>
            </ul>
          </div>

          {/* Columna 3: Suscripción */}
          <div>
            <h3 className="font-semibold mb-4">Suscribirse</h3>
            <p className="mb-4">
              Únete a nuestro boletín para estar al día de las novedades y lanzamientos.
            </p>
            <form className="flex flex-col sm:flex-row items-center sm:items-start">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className={`p-2 rounded-xl border-none text-${styles.textColor} mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto`}
              />
              <button className={`bg-${styles.buttonBackground} border border-${styles.borderColor} text-white px-4 py-2 rounded-xl hover:bg-${styles.buttonHoverBackground} transition-colors duration-300 w-full sm:w-auto`}>
                Suscribirse
              </button>
            </form>
            <p className="text-xs mt-2">
              Al suscribirte, aceptas nuestra <a href="#" className="hover:underline">Política de Privacidad</a> y das tu consentimiento para recibir actualizaciones.
            </p>
          </div>
        </div>

        {/* Parte inferior del footer */}
        <div className={`mt-8 border-t border-${styles.borderColor} pt-4 flex flex-col md:flex-row justify-between items-center`}>
          <p>© 2024 Todos los derechos reservados</p>
          
          {/* Navegación de enlaces legales */}
          <nav className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 mt-4 md:mt-0">
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
