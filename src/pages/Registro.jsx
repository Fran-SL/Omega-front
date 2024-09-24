import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Logo from '../assets/Logo.svg';

const Register = () => {
  const handleRegister = (data) => {
    console.log('Registrar nuevo usuario:', data);
    // Aquí puedes integrar la lógica de registro con tu backend o servicio.
  };

return (
    <div className="min-h-screen bg-sgreen flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        {/* Inserta el logotipo SVG */}
        <img src={Logo} alt="Logotipo de Relojería y Joyería OMEGA" className="w-48 h-auto" />
      </div>
      <RegisterForm title="Registrarse" onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default Register;
