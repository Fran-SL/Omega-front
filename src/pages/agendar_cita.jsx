import React, { useState } from "react";

const AgendaCitas = () => {
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleAgendar = () => {
    alert(`Cita agendada para ${fecha} a las ${hora} para el servicio ${servicio}.`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Agendar Cita</h1>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Información de la cita */}
          <div className="flex-1 border-r border-gray-300 pr-4">
            <h2 className="text-lg font-semibold text-green-600 mb-4">Selecciona una fecha y hora</h2>
            <p className="text-gray-600">
              Selecciona una fecha y hora para agendar tu cita de mantenimiento o reparación.
            </p>
          </div>

          {/* Formulario */}
          <div className="flex-1">
            <div className="space-y-4">
              {/* Servicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Servicio</label>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Reparación">Reparación</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="9:00 am - 9:30 am">9:00 am - 9:30 am</option>
                  <option value="9:30 am - 10:00 am">9:30 am - 10:00 am</option>
                  <option value="10:00 am - 10:30 am">10:00 am - 10:30 am</option>
                  <option value="10:30 am - 11:00 am">10:30 am - 11:00 am</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  rows="4"
                  placeholder="Descripción breve de la cita"
                />
              </div>

              {/* Botón Agendar */}
              <div className="text-right">
                <button
                  onClick={handleAgendar}
                  className="bg-green-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-800 transition"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaCitas;
