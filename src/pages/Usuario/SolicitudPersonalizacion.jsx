import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../services/authContext';

const SolicitudPersonalizacion = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    servicio_id: '',
    detalles: '',
  });
  const [imagenes, setImagenes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('http://localhost:4000/servicios', {
          headers: {
            'x-auth-token': token,
          },
        });
        if (!response.ok) throw new Error('Error al obtener los servicios');
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };

    if (token) fetchServicios();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImagenes(Array.from(e.target.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setImagenes(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !token) {
      setMensaje('Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    const data = new FormData();
    data.append('usuario_id', user.id);
    data.append('servicio_id', formData.servicio_id);
    data.append('detalles', formData.detalles);
    imagenes.forEach((imagen) => data.append('imagenes', imagen));

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/personalizacion', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: data,
      });

      if (!response.ok) throw new Error('Error en la solicitud.');

      const result = await response.json();
      setMensaje('Solicitud enviada con éxito.');
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      setMensaje('Error al enviar la solicitud.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-ibm bg-white mt-8 mb-8 rounded-2xl shadow-md">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">
        Solicitud de Personalización
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Servicio:
          </label>
          <select
            name="servicio_id"
            value={formData.servicio_id}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.servicio_id} value={servicio.servicio_id}>
                {servicio.nombre_servicio}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imágenes (puedes arrastrar y soltar):
          </label>
          <div
            className={`border-dashed border-2 p-6 rounded-md text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagenes.length === 0 ? (
              <p className="text-gray-500">
                Arrastra y suelta tus archivos aquí o haz clic para subirlos.
              </p>
            ) : (
              <ul className="text-gray-600">
                {imagenes.map((file, index) => (
                  <li key={index}>
                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                  </li>
                ))}
              </ul>
            )}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div>
          {uploadProgress > 0 && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner hover:shadow-lg transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
      {mensaje && (
        <div
          className={`mt-4 p-4 text-white rounded-md ${
            mensaje.includes('éxito') ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default SolicitudPersonalizacion;
