import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import 'flag-icons/css/flag-icons.min.css'; // Para el icono de bandera de Chile

const RegisterForm = ({ title, onSubmit }) => {
  const [step, setStep] = useState(1); // Para manejar el paso actual
  const [loading, setLoading] = useState(false); // Para manejar la animación de carga
  const [name, setName] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Formato del teléfono en tiempo real
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Solo números
    const match = cleaned.match(/^(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  // Verificar requisitos de la contraseña
  const checkPasswordStrength = (password) => {
    const length = password.length >= 6;
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[@$!%*?&#]/.test(password);
    setPasswordChecks({ length, uppercase, number, specialChar });
  };

  // Animación de carga
  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(step + 1);
      setLoading(false);
    }, 500); // Tiempo de espera simulado para la animación de carga
  };

  const prevStep = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(step - 1);
      setLoading(false);
    }, 500); // Tiempo de espera simulado para la animación de carga
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    onSubmit({ name, apellidoPaterno, apellidoMaterno, email, password, telefono, direccion });
  };

  // Cambiar entre mostrar y ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-6">{title}</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          {/* Spinner de carga */}
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="fadeIn flex flex-col">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Apellido Paterno"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                required
              />
              <button
                type="button"
                className="bg-sgreen text-white py-2 rounded-lg hover:bg-green-800 w-3/5 mx-auto"
                onClick={nextStep}
              >
                Siguiente
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fadeIn flex flex-col">
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative mb-4">
                <span className="absolute left-3 top-2">
                  <span className="fi fi-cl mr-2"></span> +56
                </span>
                <input
                  type="tel"
                  placeholder="9 XXXX XXXX"
                  className="w-full pl-20 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={telefono}
                  onChange={(e) => setTelefono(formatPhone(e.target.value))}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Dirección"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-600 w-2/5"
                  onClick={prevStep}
                >
                  Atrás
                </button>
                <button
                  type="button"
                  className="bg-sgreen text-white py-2 rounded-lg hover:bg-green-800 w-2/5"
                  onClick={nextStep}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fadeIn flex flex-col">
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
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
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Requisitos de la contraseña */}
              <div className="mb-4">
                <ul className="text-sm">
                  <li>
                    {passwordChecks.length ? (
                      <FaCheck className="inline text-green-500" />
                    ) : (
                      <FaTimes className="inline text-red-500" />
                    )}
                    &nbsp;Más de 6 caracteres
                  </li>
                  <li>
                    {passwordChecks.uppercase ? (
                      <FaCheck className="inline text-green-500" />
                    ) : (
                      <FaTimes className="inline text-red-500" />
                    )}
                    &nbsp;Al menos una mayúscula
                  </li>
                  <li>
                    {passwordChecks.number ? (
                      <FaCheck className="inline text-green-500" />
                    ) : (
                      <FaTimes className="inline text-red-500" />
                    )}
                    &nbsp;Al menos un número
                  </li>
                  <li>
                    {passwordChecks.specialChar ? (
                      <FaCheck className="inline text-green-500" />
                    ) : (
                      <FaTimes className="inline text-red-500" />
                    )}
                    &nbsp;Al menos un carácter especial (@$!%*?&)
                  </li>
                </ul>
              </div>

              {/* Mostrar error si las contraseñas no coinciden */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-600 w-2/5"
                  onClick={prevStep}
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="bg-sgreen text-white py-2 rounded-lg hover:bg-green-800 w-2/5"
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Link para iniciar sesión si ya tienes cuenta */}
      <div className="text-center mt-4">
        <span className="text-gray-600">¿Ya tienes una cuenta?</span>
        <Link to="/login" className="text-sgreen hover:underline ml-2">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
