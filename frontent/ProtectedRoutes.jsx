import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './src/context/AuthContext';

function hasPermission(user, requiredRoles) {
  if (!user || requiredRoles.length === 0) {
    return false;
  }

  const userRoles = user.rol.split(', '); // Asegúrate de tener un espacio después de la coma

  return requiredRoles.some((role) => userRoles.includes(role));
}

function ProtectedRoutes({ roles, children }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Verifica si el usuario tiene permisos para acceder a la ruta
  if (hasPermission(user, roles)) {
    return <Outlet />;
  } else {
    return <Navigate to="/upgrade" replace />;
  }
}

export default ProtectedRoutes;


