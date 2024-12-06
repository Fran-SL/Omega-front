import React, { useState } from "react";

const ConsultarCitas = () => {
  const [filtroFecha, setFiltroFecha] = useState(false);
  const [filtroUbicacion, setFiltroUbicacion] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Datos de ejemplo para las citas
  const citas = [
    { id: 1, descripcion: "Motivo y producto relacionado 1", fecha: "2024-12-10", hora: "9:30 am" },
    { id: 2, descripcion: "Motivo y producto relacionado 2", fecha: "2024-12-12", hora: "11:00 am" },
    { id: 3, descripcion: "Motivo y producto relacionado 3", fecha: "2024-12-15", hora: "2:00 pm" },
    { id: 4, descripcion: "Motivo y producto relacionado 4", fecha: "2024-12-20", hora: "4:00 pm" },
  ];

  const abrirModal = (cita) => {
    setCitaSeleccionada(cita);
  };

  const cerrarModal = () => {
    setCitaSeleccionada(null);
  };

  const mostrarModalConfirmacion = () => {
    setMostrarConfirmacion(true);
  };

  const cerrarModalConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  const cancelarCita = () => {
    alert(`La cita con el servicio "${citaSeleccionada.descripcion}" ha sido cancelada.`);
    setMostrarConfirmacion(false);
    cerrarModal();
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-6xl">
        {/* Barra lateral de filtros */}
        <div className="w-1/3 border-r p-6">
          <h2 className="text-lg font-bold text-green-700 mb-4">Consultar Citas</h2>
          <p className="text-gray-600 mb-4">Filtrar por</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Fecha</span>
              </label>
              <input
                type="checkbox"
                checked={filtroFecha}
                onChange={() => setFiltroFecha(!filtroFecha)}
                className="w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Ubicación</span>
              </label>
              <input
                type="checkbox"
                checked={filtroUbicacion}
                onChange={() => setFiltroUbicacion(!filtroUbicacion)}
                className="w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Lista de citas */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {citas.map((cita) => (
              <div
                key={cita.id}
                className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between border border-gray-300"
              >
                <div>
                  <p className="text-gray-700 font-semibold mb-1">{cita.descripcion}</p>
                  <p className="text-sm text-gray-500">Fecha de la cita: {cita.fecha}</p>
                </div>
                <button
                  onClick={() => abrirModal(cita)}
                  className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition"
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal principal */}
      {citaSeleccionada && !mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-green-700 mb-4 text-center">Cita</h2>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold">Servicio</p>
              <input
                type="text"
                value={citaSeleccionada.descripcion}
                readOnly
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold">Fecha</p>
              <input
                type="text"
                value={citaSeleccionada.fecha}
                readOnly
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold">Hora</p>
              <input
                type="text"
                value={citaSeleccionada.hora}
                readOnly
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={mostrarModalConfirmacion}
                className="bg-white border border-green-700 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100"
              >
                Cancelar cita
              </button>
              <button
                onClick={cerrarModal}
                className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800"
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-green-700 mb-4 text-center">Cancelar Cita</h2>
            <p className="text-gray-600 text-center mb-4">
              ¿Desea cancelar su cita? <br />
              Tenga en cuenta que esta decisión no se puede revertir.
            </p>
            <div className="flex justify-between">
              <button
                onClick={cerrarModalConfirmacion}
                className="bg-white border border-green-700 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100"
              >
                Cancelar
              </button>
              <button
                onClick={cancelarCita}
                className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultarCitas;
