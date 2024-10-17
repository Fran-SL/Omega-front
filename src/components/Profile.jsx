import React, { useState } from 'react';
import ConfirmDeleteModal from '../components/Perfil/ConfirmDeleteModal';
import FeedbackMessage from '../components/Perfil/FeedbackMessage';
import ProfilePicture from '../components/Perfil/ProfilePicture';
import ProfileFields from '../components/Perfil/ProfileFields';

const Perfil = () => {
  const [user, setUser] = useState({
    nombre: 'John',
    apellido: 'Doe',
    correo: 'john.doe@example.com',
    telefono: '123-456-7890',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [prevProfilePic, setPrevProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errors, setErrors] = useState({ correo: '', telefono: '' });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === 'correo') {
      const correoValido = /\S+@\S+\.\S+/.test(value);
      setErrors({ ...errors, correo: correoValido ? '' : 'Correo inválido' });
    } else if (name === 'telefono') {
      const telefonoValido = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);
      setErrors({ ...errors, telefono: telefonoValido ? '' : 'Teléfono inválido (formato: 123-456-7890)' });
    }
  };

  const handleSave = () => {
    if (!errors.correo && !errors.telefono) {
      setFeedbackMessage('Cambios guardados correctamente');
      setShowFeedback(true);
      setEditMode(false);
    } else {
      setFeedbackMessage('Hay errores en los datos');
      setShowFeedback(true);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    setFeedbackMessage('Cuenta eliminada con éxito');
    setShowFeedback(true);
  };

  const closeFeedback = () => setShowFeedback(false);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Imagen de perfil */}
      <ProfilePicture
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        prevProfilePic={prevProfilePic}
        setPrevProfilePic={setPrevProfilePic}
      />

      {/* Contenedor de información del perfil */}
      <div className="bg-white mb-4 border border-gray-300 rounded-2xl p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <ProfileFields user={user} editMode={editMode} handleChange={handleChange} errors={errors} />

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg bg-sgreen text-white rounded-2xl hover:bg-bgreen hover:shadow-lg transition duration-300"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg bg-sgreen text-white rounded-2xl hover:bg-bgreen hover:shadow-lg transition duration-300"
            >
              Editar
            </button>
          )}
          <button
            onClick={handleDelete}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg border-2 border-sgreen text-sgreen rounded-2xl hover:bg-sgreen/10 hover:text-bgreen hover:shadow-lg transition duration-300"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>

      {/* Modales */}
      <ConfirmDeleteModal
        showModal={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      <FeedbackMessage
        message={feedbackMessage}
        showMessage={showFeedback}
        onClose={closeFeedback}
      />
    </div>
  );
};

export default Perfil;
