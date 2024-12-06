import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../services/authContext';
import EditTestimonialModal from './EditTestimonialModal'; // Importar el modal

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStars, setFilterStars] = useState(null);
  const [filterOwn, setFilterOwn] = useState(false); // Filtro de reseñas propias
  const [currentPage, setCurrentPage] = useState(1); // Paginación
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado del modal
  const [selectedTestimonial, setSelectedTestimonial] = useState(null); // Testimonio seleccionado para editar
  const { token, user } = useContext(AuthContext); // Obtenemos el token y el usuario
  const navigate = useNavigate();
  const testimonialsPerPage = 5;

  // Función para obtener testimonios
  const fetchTestimonials = async (stars, isOwn, page = 1) => {
    setError('');
    setLoading(true);
    try {
      let url = `http://localhost:4000/testimonios?limit=${testimonialsPerPage}&page=${page}`;
      if (stars) {
        url += `&stars=${stars}`;
      }
      if (isOwn) {
        url += `&usuario_id=${user.usuario_id}`; // Filtrar por el usuario autenticado
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los testimonios');
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
    fetchTestimonials(filterStars, filterOwn, currentPage);
  }, [filterStars, filterOwn, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Editar reseña
  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true); // Abrir el modal
  };

  // Eliminar reseña
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/testimonios/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reseña.');
      }

      setTestimonials((prev) => prev.filter((testimonial) => testimonial.testimonio_id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Guardar cambios en la reseña
  const handleSave = async (id, updatedTestimonial) => {
    try {
      const response = await fetch(`http://localhost:4000/testimonios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTestimonial),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios.');
      }

      const data = await response.json();
      // Actualiza la lista de testimonios con la nueva reseña
      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.testimonio_id === id ? { ...testimonial, ...data } : testimonial
        )
      );
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="py-12 bg-white font-ibm">
      <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Gestionar Reseñas</h1>

        {/* Filtros */}
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <select
              value={filterStars || ''}
              onChange={(e) => setFilterStars(e.target.value || null)}
              className="py-1 px-3 text-sm border-2 rounded-lg bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            >
              <option value="">Filtrar por Estrellas</option>
              <option value="5">★★★★★ (5 estrellas)</option>
              <option value="4">★★★★☆ (4 estrellas)</option>
              <option value="3">★★★☆☆ (3 estrellas)</option>
              <option value="2">★★☆☆☆ (2 estrellas)</option>
              <option value="1">★☆☆☆☆ (1 estrella)</option>
            </select>

            <button
              onClick={() => setFilterOwn(!filterOwn)}
              className={`py-2 px-4 text-sm border-2 rounded-lg ${
                filterOwn
                  ? 'bg-sgreen text-white border-green-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {filterOwn ? 'Ver Todas las Reseñas' : 'Ver Solo Mis Reseñas'}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando testimonios...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron testimonios.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.testimonio_id}
                className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-medium text-gray-700">
                  {`${testimonial.nombre || 'Anónimo'} ${testimonial.apellido_paterno || ''} ${testimonial.apellido_materno || ''}`}
                </h3>
                <p className="text-gray-600 text-xs">
                  {"★".repeat(testimonial.estrellas || 0)}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {testimonial.contenido || "Sin contenido disponible"}
                </p>
                <p className="text-gray-500 text-xs">
                  Fecha: {new Date(testimonial.fecha_creacion).toLocaleDateString()}
                </p>

                {/* Mostrar botones de edición y eliminación solo para las reseñas propias */}
                {testimonial.usuario_id === user.usuario_id && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="bg-blue-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.testimonio_id)}
                      className="bg-red-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Paginación */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-2 px-4 text-sm border-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-sgreen text-white border-green-500 hover:bg-green-600'
            }`}
          >
            Anterior
          </button>
          <span className="text-lg text-gray-700">Página {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={testimonials.length <= testimonialsPerPage}
            className={`py-2 px-4 text-sm border-2 rounded-lg ${
              testimonials.length <= testimonialsPerPage
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-sgreen text-white border-green-500 hover:bg-green-600'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal para editar la reseña */}
      <EditTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonialData={selectedTestimonial}
        onSave={handleSave}
      />
    </section>
  );
};

export default ManageTestimonials;
