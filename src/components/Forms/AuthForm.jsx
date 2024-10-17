import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Google from '../../assets/google.png';
import Label from '../ElementosUI/Label'; // Importa el componente Label
import Button from '../ElementosUI/Button1'; // Importa el componente Button

const AuthForm = ({ title, onSubmit, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96 mx-auto mt-10">
      {/* Título */}
      <h2 className="text-center text-xl font-semibold mb-2">{isLogin ? 'Bienvenido de nuevo' : 'Regístrate'}</h2>
      <p className="text-center text-sm text-gray-600 mb-2">Por favor, introduzca sus datos para iniciar sesión</p>
      
      <form onSubmit={handleSubmit}>
        {/* Campo de correo con etiqueta reutilizable */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo de contraseña con etiqueta y olvidaste tu contraseña */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="password">Contraseña</Label>
            <Link to="/forgot-password" className="text-sgreen text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2 text-sgreen"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </div>

        {/* Recuérdame */}
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center text-sm font-semibold">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Recuérdame
          </label>
        </div>

        {/* Botón de enviar reutilizable */}
        <div className="flex justify-center mb-2">
          <Button
            type="submit"
            className="bg-sgreen text-white w-full hover:bg-green-800"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrar'}
          </Button>
        </div>

        {/* Línea divisoria */}
        <div className="relative my-2 flex items-center justify-center">
          <hr className="border-gray-300 w-1/3" />
          <span className="text-gray-500 mx-2">O</span>
          <hr className="border-gray-300 w-1/3" />
        </div>

        {/* Botón de Google reutilizable */}
        <div className="flex justify-center mb-4">
          <Button
            className="flex items-center justify-center bg-gray-100 border border-gray-300 w-full hover:bg-gray-200"
          >
            <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
            Iniciar sesión con Google
          </Button>
        </div>

        {/* Texto para registrarse */}
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
