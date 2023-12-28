import { useState } from 'react';
import { upgradeUserRole } from "../api/auth"; 
import { useAuth } from "../context/AuthContext";

function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth(); 

  const handleUpgrade = async () => {
    try {
      setLoading(true);

    
      if (isAuthenticated && user && user.id) {
        const response = await upgradeUserRole(user.id);
        console.log('API Response:', response);
      } else {
        console.error('No se pudo obtener el ID del usuario para la actualización de rol');
        setError('Error al actualizar el rol');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al actualizar el rol');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upgrade Page</h1>
      <button onClick={handleUpgrade} disabled={loading}>
        Upgrade to Pro
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UpgradePage;
