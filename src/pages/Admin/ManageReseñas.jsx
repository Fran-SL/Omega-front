import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../services/authContext';

const AdminManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // Token del contexto

  // Función para obtener reseñas pendientes
  const fetchPendingTestimonials = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/testimonios/pendientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar los testimonios.');
      }

      const data = await response.json();
      setTestimonials(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTestimonials();
  }, []);

  // Función para confirmar una reseña
  const handleConfirm = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/testimonios/${id}/aceptar`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al confirmar la reseña.');
      }

      // Actualiza la lista eliminando la reseña confirmada
      setTestimonials((prev) => prev.filter((testimonial) => testimonial.testimonio_id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Función para cancelar una reseña
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/testimonios/${id}/rechazar`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la reseña.');
      }

      // Actualiza la lista eliminando la reseña cancelada
      setTestimonials((prev) => prev.filter((testimonial) => testimonial.testimonio_id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Variantes de animación para las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <section className="py-12 bg-white font-ibm">
      <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Gestionar Reseñas Pendientes
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Cargando testimonios...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No hay testimonios pendientes.</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0 },
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.testimonio_id}
                  className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
                  variants={cardVariants}
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {`${testimonial.nombre || "Anónimo"} ${testimonial.apellido_paterno || ""} ${testimonial.apellido_materno || ""}`}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {"★".repeat(testimonial.estrellas || 0)}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                    {testimonial.contenido || "Sin contenido disponible"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Fecha:{" "}
                    {testimonial.fecha_creacion
                      ? new Date(testimonial.fecha_creacion).toLocaleDateString()
                      : "Sin fecha"}
                  </p>

                  {/* Botones de acción */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleConfirm(testimonial.testimonio_id)}
                      className="bg-green-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleReject(testimonial.testimonio_id)}
                      className="bg-red-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    >
                      Rechazar
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default AdminManageTestimonials;
