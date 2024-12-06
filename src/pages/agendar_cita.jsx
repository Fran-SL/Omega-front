import React, { useState } from "react";

const AgendaCitas = () => {
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleAgendar = async () => {
    if (!servicio || !fecha || !hora || !descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Combinar fecha y hora para el formato ISO
    const fechaHora = new Date(`${fecha}T${hora.split(" ")[0]}`).toISOString();

    const data = {
      fecha_hora: fechaHora,
      servicio_id: parseInt(servicio), // Asegúrate de que `servicio` sea un ID numérico
      estado_id: 1, // Estado inicial, puedes cambiar esto si lo necesitas
      notas: descripcion,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Cita agendada correctamente.");
        console.log(result);
        // Reiniciar formulario
        setServicio("");
        setFecha("");
        setHora("");
        setDescripcion("");
      } else {
        const error = await response.json();
        alert(`Error al agendar cita: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al agendar la cita. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Agendar Cita</h1>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Información de la cita */}
          <div className="flex-1 border-r border-gray-300 pr-4">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Selecciona una fecha y hora
            </h2>
            <p className="text-gray-600">
              Selecciona una fecha y hora para agendar tu cita de mantenimiento
              o reparación.
            </p>
          </div>

          {/* Formulario */}
          <div className="flex-1">
            <div className="space-y-4">
              {/* Servicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Servicio
                </label>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="1">Consulta</option>
                  <option value="2">Reparación</option>
                  <option value="3">Mantenimiento</option>
                </select>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500
                  focus:border-green-500"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="09:00:00">9:00 am - 9:30 am</option>
                  <option value="09:30:00">9:30 am - 10:00 am</option>
                  <option value="10:00:00">10:00 am - 10:30 am</option>
                  <option value="10:30:00">10:30 am - 11:00 am</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
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
                  className={`${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  } text-white py-2 px-4 rounded-lg shadow-md transition`}
                  disabled={loading}
                >
                  {loading ? "Agendando..." : "Agendar"}
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
