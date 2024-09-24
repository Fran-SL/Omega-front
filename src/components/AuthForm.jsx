import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({ title, onSubmit, isLogin }) => {
  // Estado para el email, contraseña y mostrar/ocultar contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  // Cambiar entre mostrar y ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96">
      <h2 className="text-center text-xl font-semibold mb-6">{title}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campo de entrada para el correo */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo de entrada para la contraseña con botón de mostrar/ocultar */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 text-sm text-sgreen"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {/* Opciones de "Recuérdame" y "Olvidé la contraseña" */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Recuérdame
          </label>
          <Link to="/forgot-password" className="text-sgreen hover:underline">
            Olvidé la contraseña
          </Link>
        </div>

        {/* Botón de envío para iniciar sesión */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="bg-sgreen text-white w-full py-2 rounded-xl hover:bg-green-800 transition duration-300"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrar'}
          </button>
        </div>

        {/* Texto de "No tienes cuenta" */}
        {isLogin && (
          <div className="text-center mt-4">
            <span className="text-gray-600">¿No tienes una cuenta?</span>
            <Link to="/register" className="text-sgreen hover:underline ml-2">
              Regístrate
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
