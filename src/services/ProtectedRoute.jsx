import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../services/authContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirigir al login si el usuario no está autenticado
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol_id)) {
    // Redirigir al inicio si el rol no es permitido
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
