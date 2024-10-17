import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Google from '../../assets/google.png';
import Label from '../ElementosUI/Label'; // Importa el componente Label
import Button from '../ElementosUI/Button1'; // Importa el componente Button

const RegisterForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit({ email, password, telefono, direccion });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96 mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-2">Regístrate</h2>
      <p className="text-center text-sm text-gray-600 mb-4">
        {step === 1
          ? 'Por favor, introduzca sus datos para registrarse'
          : 'Opcionalmente, puedes agregar tu teléfono y dirección ahora o hacerlo después.'}
      </p>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            {/* Campo de email */}
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

            {/* Campo de contraseña */}
            <div className="mb-4">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
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

            {/* Confirmación de contraseña */}
            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirmar Contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Botón para avanzar al paso 2 */}
            <div className="flex justify-center mb-4">
              <Button
                type="submit"
                className="bg-sgreen text-white w-full hover:bg-green-800"
              >
                Registrarse
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Campo de teléfono opcional */}
            <div className="mb-4">
              <Label htmlFor="telefono">Teléfono (Opcional)</Label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-gray-500">+56</span>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="9 XXXX XXXX"
                  className="w-full pl-16 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={telefono}
                  onChange={(e) => setTelefono(formatPhone(e.target.value))}
                />
              </div>
            </div>

            {/* Campo de dirección opcional */}
            <div className="mb-4">
              <Label htmlFor="direccion">Dirección (Opcional)</Label>
              <input
                id="direccion"
                type="text"
                placeholder="Dirección"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

            {/* Botón para completar o saltar */}
            <div className="flex justify-between">
              <Button
                type="button"
                className="bg-gray-300 text-gray-700 w-1/3 hover:bg-gray-400"
                onClick={() => onSubmit({ email, password })}
              >
                Saltar
              </Button>
              <Button
                type="submit"
                className="bg-sgreen text-white w-1/3 hover:bg-green-800"
              >
                Completar
              </Button>
            </div>
          </>
        )}
      </form>

      {step === 1 && (
        <>
          {/* Línea divisoria */}
          <div className="relative my-4 flex items-center justify-center">
            <hr className="border-gray-300 w-1/3" />
            <span className="text-gray-500 mx-2">O</span>
            <hr className="border-gray-300 w-1/3" />
          </div>

          {/* Botón de Google */}
          <div className="flex justify-center mb-4">
            <Button className="flex items-center justify-center bg-gray-100 border border-gray-300 w-full hover:bg-gray-200">
              <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
              Registrar con Google
            </Button>
          </div>

          {/* Texto para iniciar sesión */}
          <div className="text-center mt-4">
            <span className="text-gray-600">¿Ya tienes una cuenta?</span>
            <Link to="/login" className="text-sgreen hover:underline ml-2">
              Iniciar Sesión
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
