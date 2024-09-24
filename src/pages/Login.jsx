import React from 'react';
import AuthForm from '../components/AuthForm';
import Logo from '../assets/Logo.svg'; // Ajusta la ruta según la ubicación de tu archivo SVG

const Login = () => {
  const handleLogin = (data) => {
    console.log('Iniciar sesión con:', data);
    // Aquí puedes integrar la lógica de autenticación con tu backend o servicio.
  };

  return (
    <div className="min-h-screen bg-sgreen flex flex-col justify-center items-center">
      <div className="text-center mb-2">
        {/* Inserta el logotipo SVG */}
        <img src={Logo} alt="Logotipo de Relojería y Joyería OMEGA" className="w-48 h-auto" />
      </div>
      <AuthForm title="Inicio de sesión" onSubmit={handleLogin} isLogin={true} />
    </div>
  );
};

export default Login;
