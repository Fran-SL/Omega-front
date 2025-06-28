import { useState, useCallback } from 'react';
import { 
  showGooglePopup, 
  authenticateWithGoogle, 
  decodeGoogleJWT,
  initializeGoogleSignIn
} from '../services/googleAuthService';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Mostrar popup de Google
      const googleResponse = await showGooglePopup();
      
      // Procesar respuesta
      let userData = null;
      if (googleResponse.credential) {
        // JWT token
        const decoded = decodeGoogleJWT(googleResponse.credential);
        userData = {
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          google_id: decoded.sub
        };
      } else if (googleResponse.userInfo) {
        // OAuth userInfo
        userData = googleResponse.userInfo;
      }

      // Enviar al backend
      const authResult = await authenticateWithGoogle(googleResponse);
      
      setLoading(false);
      return authResult;

    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const initializeOneTap = useCallback(async (onSuccess) => {
    try {
      await initializeGoogleSignIn((response) => {
        // Procesar respuesta automáticamente
        const decoded = decodeGoogleJWT(response.credential);
        if (decoded && onSuccess) {
          authenticateWithGoogle(response)
            .then(onSuccess)
            .catch(err => setError(err.message));
        }
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    loading,
    error,
    signInWithGoogle,
    initializeOneTap,
    clearError: () => setError(null),
    isAvailable: !!import.meta.env.VITE_GOOGLE_CLIENT_ID
  };
};
