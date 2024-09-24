import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ title, onSubmit }) => {
  const [name, setName] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    onSubmit({ name, apellidoPaterno, apellidoMaterno, email, password, telefono, direccion });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-6">{title}</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Campos de nombre, apellido paterno y apellido materno */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido Paterno"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
            required
          />
          {/* Campo de correo electrónico */}
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Campo de teléfono */}
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          {/* Campo de dirección */}
          <input
            type="text"
            placeholder="Dirección"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        {/* Campo de contraseña y confirmación con botón de mostrar/ocultar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Mostrar error si las contraseñas no coinciden */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Botón de envío para registrar */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="bg-sgreen text-white w-full py-2 rounded-xl hover:bg-green-800 transition duration-300"
          >
            Registrarse
          </button>
        </div>

        {/* Link para iniciar sesión si ya tienes cuenta */}
        <div className="text-center mt-4">
          <span className="text-gray-600">¿Ya tienes una cuenta?</span>
          <Link to="/login" className="text-sgreen hover:underline ml-2">
            Iniciar Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
