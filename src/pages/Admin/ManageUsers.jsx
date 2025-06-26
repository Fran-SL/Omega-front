import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../services/authContext"; // Asegúrate de importar el contexto correctamente
import Modal from "../../components/Modal"; // Importa el modal desde la ruta correspondiente

const ManageUsers = () => {
  const { token } = useContext(AuthContext); // Obtener el token desde el contexto
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    role: "all",
  });

  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [userToDelete, setUserToDelete] = useState(null); // Usuario que se eliminará

  const API_URL = "http://localhost:4000/usuarios"; // URL base

  // Obtener usuarios desde la API
  const fetchUsers = async () => {
    if (!token) {
      setError("No se encontró un token de autenticación.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("nombre", filters.name);
      if (filters.role !== "all") params.append("rol", filters.role);

      const response = await fetch(`${API_URL}/all?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      setUsers(data.data); // El backend devuelve `data` en un objeto
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a la API cuando se actualicen los filtros
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmDelete = async () => {
    if (!token || !userToDelete) {
      setError("No se encontró un token de autenticación o usuario inválido.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${userToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el usuario");

      // Eliminar el usuario de la lista localmente
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.usuario_id !== userToDelete)
      );
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setError("Error al eliminar usuario.");
    } finally {
      setShowModal(false);
    }
  };

  const requestDelete = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 font-ibm bg-white mt-8 mb-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Gestión de Usuarios</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          name="name"
          placeholder="Buscar por nombre o apellido"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos los roles</option>
          <option value="1">Usuario</option>
          <option value="2">Administrador</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-300">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Correo Electrónico</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.usuario_id}
                  className="hover:bg-gray-50 border-b border-gray-300"
                >
                  <td className="px-6 py-3 text-gray-800">{`${user.nombre} ${user.apellido_paterno}`}</td>
                  <td className="px-6 py-3 text-gray-600">{user.correo_electronico}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {user.rol_id === 1 ? "Usuario" : "Administrador"}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => requestDelete(user.usuario_id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-2xl shadow-inner-red hover:shadow-inner-hred transition duration-300 ease-in-out"
                      aria-label={`Eliminar usuario ${user.nombre}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-600 font-medium border-b border-gray-300"
                >
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        showModal={showModal}
        toggleModal={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={false}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default ManageUsers;
