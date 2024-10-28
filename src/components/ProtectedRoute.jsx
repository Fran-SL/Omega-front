import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../services/authContext'; // Cambiar a AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Usar useContext para acceder al usuario

  // Si no hay un usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está logueado, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;
