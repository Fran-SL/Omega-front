import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const handleLogin = (data) => {
    console.log('Iniciar sesión con:', data);
    // Aquí puedes integrar la lógica de autenticación con tu backend o servicio.
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm title="Iniciar Sesión" onSubmit={handleLogin} isLogin={true} />
    </div>
  );
};

export default Login;
