import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../services/authContext';
import logo from '../assets/logo.svg';
import googleLogo from '../assets/google.png';

const Login = () => {
  const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar loader

    try {
      const response = await login(formData);
      loginUser({
        nombre: response.nombre,
        token: response.token,
        foto_perfil_url: response.foto_perfil_url // Asegúrate de que esto se incluya
      });      
      navigate('/');
      setError(null);
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false); // Detener loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <img src={logo} alt="Logo" className="absolute top-10 left-15 w-28 h-28" /> {/* Logo en la esquina superior izquierda */}
      
      {loading && <p className="text-center">Cargando...</p>} {/* Loader */}
      {!loading && (
        <div className="bg-white p-8 rounded-2xl  w-full max-w-sm">
          <p className="text-center text-gray-500 mb-4">Introduce tus datos para iniciar sesión</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="correo_electronico" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="correo_electronico"
                value={formData.correo_electronico}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-2xl w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-2xl w-full"
                required
              />
            </div>
            <button type="submit" className="w-full bg-sgreen text-white px-4 py-2 rounded-2xl hover:bg-bgreen transition duration-300">
              Iniciar Sesión
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button className="flex items-center justify-center w-full border border-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-100 transition duration-300">
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
            Iniciar sesión con Google
          </button>
          <p className="text-center text-gray-500 mt-4">
            ¿No tienes una cuenta? <a href="/register" className="text-green-700 hover:underline">Regístrate</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
