import React from 'react';

const ProfileFields = ({ user, editMode, handleChange, errors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
      <div>
        <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={user.nombre}
          readOnly={!editMode}
          onChange={handleChange}
          className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-2xl bg-gray-100 text-gray-600 focus:outline-none text-base sm:text-lg"
        />
      </div>
      <div>
        <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={user.apellido}
          readOnly={!editMode}
          onChange={handleChange}
          className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-2xl bg-gray-100 text-gray-600 focus:outline-none text-base sm:text-lg"
        />
      </div>
      <div>
        <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Correo</label>
        <input
          type="email"
          name="correo"
          value={user.correo}
          readOnly={!editMode}
          onChange={handleChange}
          className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-2xl bg-gray-100 text-gray-600 focus:outline-none text-base sm:text-lg"
        />
        {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
      </div>
      <div>
        <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={user.telefono}
          readOnly={!editMode}
          onChange={handleChange}
          className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-2xl bg-gray-100 text-gray-600 focus:outline-none text-base sm:text-lg"
        />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
      </div>
    </div>
  );
};

export default ProfileFields;
