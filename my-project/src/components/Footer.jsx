import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 Todos los derechos reservados</p>
        <nav className="flex justify-center space-x-4">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
          <a href="#">Configuración de Cookies</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
