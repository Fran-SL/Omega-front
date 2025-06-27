const API_URL = 'http://localhost:4000'; // Cambiar a HTTPS en producción 

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data.message || 'Ocurrió un error';
    throw new Error(error);
  }
  return data;
};

// Registro de usuario
export const register = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/register`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Inicio de sesión
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const userData = await handleResponse(response); // Procesa la respuesta
    console.log("Datos del usuario recibidos desde el backend:", userData); // Log para verificar
    return userData; // Devuelve todos los campos, incluyendo usuario_id
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

// Obtener token desde localStorage o sessionStorage
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
};

// Obtener perfil
export const getProfile = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('Token no encontrado');
  }

  try {
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw error;
  }
};

// Actualizar perfil
export const updateProfile = async (profileData) => {
  const token = getToken();
  if (!token) {
    throw new Error('Token no encontrado');
  }

  let options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: null,
  };

  if (profileData instanceof FormData) {
    options.body = profileData;
    // No se debe establecer 'Content-Type' para FormData, el navegador lo hace automáticamente
  } else {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(profileData);
  }

  try {
    const response = await fetch(`${API_URL}/usuarios/perfil`, options);
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }
};

// Eliminar Cuenta
export const deleteAccount = async () => {
  const token = getToken();
  console.log('Token obtenido para eliminación:', token ? 'Token presente' : 'Token ausente');
  
  if (!token) {
    throw new Error('Token no encontrado');
  }

  try {
    console.log('Enviando petición DELETE a:', `${API_URL}/usuarios/perfil`);
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta recibida:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    throw error;
  }
};
