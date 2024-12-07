import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../services/authContext";
import FormCita from "./FormCitas"; // Para crear una cita
import ModalCita from "./ModalCita"; // Para editar una cita
import Modal from "../../components/Modal";

const ManageCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [deletingCitaId, setDeletingCitaId] = useState(null);
  const { token } = useContext(AuthContext);

  // Función para obtener las citas
  const fetchCitas = async () => {
    try {
      const response = await fetch("http://localhost:4000/citas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "No autorizado. Por favor, inicia sesión nuevamente."
          );
        }
        throw new Error("Error al obtener las citas.");
      }

      const data = await response.json();
      setCitas(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchCitas solo si el token está disponible
  useEffect(() => {
    if (token) {
      fetchCitas();
    }
  }, [token]);

  // Verificar si la cita es cancelable (48 horas antes)
  const esCancelable = (fechaHora) => {
    const ahora = new Date();
    const diferenciaHoras = (new Date(fechaHora) - ahora) / (1000 * 60 * 60); // Diferencia en horas
    return diferenciaHoras >= 48; // Devuelve true si falta más de 48 horas
  };

  // Manejar eliminación de cita
  const handleDelete = async () => {
    if (!deletingCitaId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/citas/${deletingCitaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la cita.");
      }

      setCitas((prev) =>
        prev.filter((cita) => cita.cita_id !== deletingCitaId)
      );
      setDeletingCitaId(null);
      setIsDeleteModalOpen(false); // Cerrar el modal después de eliminar
    } catch (error) {
      console.error("Error en handleDelete:", error.message);
      alert(error.message); // Mostrar el error al usuario
    }
  };

  // Manejar guardado después de editar una cita
  const handleSaveEdit = async (id, updatedCita) => {
    try {
      const response = await fetch(`http://localhost:4000/citas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCita),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar la cita.");
      }

      const data = await response.json();

      // Actualizar la lista de citas en el frontend
      setCitas((prev) =>
        prev.map((cita) => (cita.cita_id === id ? { ...cita, ...data } : cita))
      );

      setIsEditModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      alert(error.message);
    }
  };

  if (!token && loading) {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  return (
    <section className="py-12 bg-white font-ibm">
      <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Gestionar Citas
        </h1>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-sgreen text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner-green hover:shadow-inner-hgreen transition duration-300 ease-in-out"
          >
            Crear Nueva Cita
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando citas...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : citas.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron citas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {citas.map((cita) => (
              <motion.div
                key={cita.cita_id}
                className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-medium text-gray-700">
                  Cita para {cita.nombre_servicio}
                </h3>
                <p className="text-md font-normal text-blue-600 mt-2">
                  {cita.nombre_estado}
                </p>
                <p className="text-gray-600 text-sm">
                  Fecha: {new Date(cita.fecha_hora).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Hora: {new Date(cita.fecha_hora).toLocaleTimeString()}
                </p>
                <p className="text-gray-500 text-xs">
                  {cita.notas || "Sin notas"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => {
                      setSelectedCita(cita);
                      setIsEditModalOpen(true);
                    }}
                    className="bg-sgreen text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner-green hover:shadow-inner-hgreen transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setDeletingCitaId(cita.cita_id);
                      setIsDeleteModalOpen(true);
                      setSelectedCita(cita);
                    }}
                    className="bg-white text-sgreen py-2 px-4 border border-sgreen rounded-2xl transition duration-300 ease-in-out"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para eliminar cita */}
      <Modal
        showModal={isDeleteModalOpen}
        toggleModal={() => setIsDeleteModalOpen(false)}
        onConfirm={
          esCancelable(selectedCita?.fecha_hora)
            ? handleDelete
            : () => setIsDeleteModalOpen(false)
        }
        loading={false}
        title="Eliminar Cita"
        message={
          esCancelable(selectedCita?.fecha_hora)
            ? "¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer."
            : "No puedes cancelar esta cita porque faltan menos de 48 horas. Si necesitas ayuda, contáctanos."
        }
        confirmText={
          esCancelable(selectedCita?.fecha_hora) ? "Eliminar" : "Cerrar"
        }
        cancelText="Cancelar"
      />

      {/* Modal para crear cita */}
      <FormCita
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={fetchCitas}
      />

      {/* Modal para editar cita */}
      <ModalCita
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        citaData={selectedCita}
        onSave={handleSaveEdit}
      />
    </section>
  );
};

export default ManageCitas;
