import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './src/context/AuthContext';

function hasPermission(user, requiredRoles) {
  if (!user || !requiredRoles.includes(user.rol)) {
    return false;
  }

  return true;
}

function ProtectedRoutes({ roles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    console.log(loading)
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verifica si el usuario tiene permisos para acceder a la ruta
  if (hasPermission(user, roles)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
}

export default ProtectedRoutes;

