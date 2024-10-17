import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

// Componente para el modal
const Modal = ({ showModal, onClose }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Contraseña Actualizada</h2>
        <p>Su contraseña se ha actualizado correctamente.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-sgreen text-white py-2 px-4 rounded hover:bg-green-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [step, setStep] = useState(1); // Controla el paso (1: correo, 2: restablecer contraseña)
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Hook para redireccionar

  // Función para verificar la seguridad de la contraseña
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Débil');
    } else if (password.length < 10) {
      setPasswordStrength('Moderada');
    } else {
      setPasswordStrength('Fuerte');
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el correo con el enlace de restablecimiento.
    console.log('Enviar enlace de restablecimiento a:', email);
    setStep(2); // Cambiamos al paso 2 para restablecer la contraseña
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Lógica para restablecer la contraseña.
    if (newPassword === confirmPassword) {
      console.log('Contraseña restablecida:', newPassword);
      setShowModal(true); // Mostramos el modal de confirmación
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/login'); // Redirigimos al usuario a la página de login
  };

  return (
    <div className="min-h-screen bg-sgreen flex flex-col justify-center items-center">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-96 mx-auto mt-4">
        {step === 1 && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Restablecer contraseña</h2>
            <p className="text-center text-sm text-gray-600 mb-4">
              Ingrese su correo electrónico para recibir un enlace de restablecimiento de contraseña.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ingrese su correo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-sgreen text-white w-full py-2 rounded-xl hover:bg-green-800 transition duration-300"
                >
                  Enviar enlace
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Restablecer su contraseña</h2>
            <form onSubmit={handlePasswordSubmit}>
              {/* Nueva contraseña */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nueva contraseña</label>
                <input
                  type="password"
                  placeholder="Ingrese nueva contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    checkPasswordStrength(e.target.value); // Verificamos la seguridad de la contraseña
                  }}
                  required
                />
                {/* Mostramos la seguridad de la contraseña */}
                {newPassword && (
                  <p className={`text-sm mt-1 ${passwordStrength === 'Débil' ? 'text-red-600' : passwordStrength === 'Moderada' ? 'text-yellow-600' : 'text-green-600'}`}>
                    Seguridad: {passwordStrength}
                  </p>
                )}
              </div>

              {/* Confirmar nueva contraseña */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar contraseña</label>
                <input
                  type="password"
                  placeholder="Repita su nueva contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-sgreen text-white w-full py-2 rounded-xl hover:bg-green-800 transition duration-300"
                >
                  Restablecer contraseña
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Modal para confirmar que la contraseña ha sido actualizada */}
      <Modal showModal={showModal} onClose={closeModal} />
    </div>
  );
};

export default ResetPassword;
