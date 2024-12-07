import React, { useState, useEffect } from 'react';

const EditTestimonialModal = ({ isOpen, onClose, testimonialData, onSave }) => {
  const [contenido, setContenido] = useState('');
  const [estrellas, setEstrellas] = useState(5);

  useEffect(() => {
    if (testimonialData) {
      setContenido(testimonialData.contenido || '');
      setEstrellas(testimonialData.estrellas || 5);
    }
  }, [testimonialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTestimonial = {
      contenido,
      estrellas,
    };

    // Llamada al método onSave para actualizar la reseña
    onSave(testimonialData.testimonio_id, updatedTestimonial);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editar Reseña</h2>

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="contenido"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contenido de la reseña
            </label>
            <textarea
              id="contenido"
              name="contenido"
              rows="4"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-sgreen focus:border-sgreen"
              placeholder="Escribe tu reseña aquí..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="estrellas"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Calificación
            </label>
            <select
              id="estrellas"
              name="estrellas"
              value={estrellas}
              onChange={(e) => setEstrellas(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-sgreen focus:border-sgreen"
            >
              <option value="5">★★★★★ (5 estrellas)</option>
              <option value="4">★★★★☆ (4 estrellas)</option>
              <option value="3">★★★☆☆ (3 estrellas)</option>
              <option value="2">★★☆☆☆ (2 estrellas)</option>
              <option value="1">★☆☆☆☆ (1 estrella)</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-sm border-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-sm border-2 rounded-lg bg-sgreen text-white hover:bg-green-600"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonialModal;
