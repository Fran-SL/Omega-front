import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const handleRegister = (data) => {
    console.log('Registrar nuevo usuario:', data);
    // Aquí puedes integrar la lógica de registro con tu backend o servicio.
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm title="Registrarse" onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default Register;
