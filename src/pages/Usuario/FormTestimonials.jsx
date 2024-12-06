import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/authContext';

const FormTestimonials = () => {
  const [contenido, setContenido] = useState('');
  const [estrellas, setEstrellas] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext); // Obtenemos el token del contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      // Realizamos la solicitud al backend para crear la reseña
      const response = await fetch('http://localhost:4000/testimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contenido, estrellas }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar la reseña.');
      }

      // Mostrar mensaje de éxito y redirigir al listado
      setSuccess(true);
      setTimeout(() => navigate('/testimonials/manage'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="py-12 bg-white font-ibm">
      <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Crear Nueva Reseña</h1>

        {/* Mensajes de error y éxito */}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-center text-green-500 mb-4">
            Reseña creada exitosamente. Redirigiendo...
          </p>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md max-w-lg mx-auto"
        >
          {/* Contenido de la reseña */}
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

          {/* Calificación */}
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

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-sgreen text-white py-2 px-4 rounded-lg shadow-inner-green hover:shadow-inner-hgreen transition duration-300"
          >
            Enviar Reseña
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormTestimonials;
