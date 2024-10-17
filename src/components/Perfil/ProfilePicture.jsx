import React, { useState } from 'react';

const ProfilePicture = ({ profilePic, setProfilePic, prevProfilePic, setPrevProfilePic }) => {
  // Validación de archivo y optimización de previsualización
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Convertir a MB

      // Validaciones
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
        alert('Solo se permiten archivos JPEG o PNG.');
        return;
      }
      if (fileSize > 2) {
        alert('El tamaño máximo permitido es de 2 MB.');
        return;
      }

      // Guardar la imagen anterior por si el usuario quiere revertir
      setPrevProfilePic(profilePic);
      const fileURL = URL.createObjectURL(file);
      setProfilePic(fileURL);

      // Revocar la URL cuando ya no sea necesaria
      return () => URL.revokeObjectURL(fileURL);
    }
  };

  // Función para eliminar la foto de perfil y volver al ícono predeterminado
  const removeProfilePic = () => {
    setProfilePic(null);
  };

  // Función para revertir la foto de perfil anterior
  const revertProfilePic = () => {
    setProfilePic(prevProfilePic);
  };

  return (
    <div className="flex flex-col items-center mb-10 mt-4 sm:mt-8 md:mt-12 lg:mt-16">
      {/* Contenedor de la imagen de perfil */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-200 rounded-full flex items-center justify-center shadow-lg relative group">
        {profilePic ? (
          <img src={profilePic} alt="Foto de perfil" className="w-full h-full object-cover rounded-full" />
        ) : (
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Ícono de perfil predeterminado"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
        <label
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
          aria-label="Cambiar foto de perfil"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          Cambiar foto
        </label>
      </div>
      {/* Botón para eliminar la foto de perfil */}
      {profilePic && (
        <button
          onClick={removeProfilePic}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          aria-label="Eliminar foto de perfil"
        >
          Eliminar foto de perfil
        </button>
      )}
      {/* Botón para revertir cambios */}
      {prevProfilePic && (
        <button
          onClick={revertProfilePic}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
          aria-label="Revertir a la foto de perfil anterior"
        >
          Revertir cambios
        </button>
      )}
    </div>
  );
};

export default ProfilePicture;
