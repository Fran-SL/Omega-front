import { useState, useCallback } from 'react';
import { 
  setupGoogleOneTap, 
  showGooglePopup, 
  authenticateWithGoogle, 
  decodeGoogleJWT,
  isGoogleAuthAvailable
} from '../services/googleAuthService';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleResponse = useCallback(async (response, onSuccess, onError) => {
    setLoading(true);
    setError(null);

    try {
      let userData = null;
      
      if (response.credential) {
        // Respuesta de One Tap - decodificar JWT
        const decoded = decodeGoogleJWT(response.credential);
        if (decoded) {
          userData = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            google_id: decoded.sub
          };
        }
      } else if (response.userInfo) {
        // Respuesta de popup OAuth
        userData = {
          email: response.userInfo.email,
          name: response.userInfo.name,
          picture: response.userInfo.picture,
          google_id: response.userInfo.id
        };
      }

      if (!userData) {
        throw new Error('No se pudo obtener información del usuario');
      }

      // Enviar al backend para autenticación
      const authResult = await authenticateWithGoogle(
        response.credential, 
        response.userInfo
      );

      // Llamar callback de éxito
      if (onSuccess) {
        onSuccess(authResult);
      }

      return authResult;

    } catch (err) {
      console.error('Error en autenticación con Google:', err);
      setError(err.message);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async (onSuccess, onError) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar si Google Auth está configurado
      if (!isGoogleAuthAvailable()) {
        throw new Error('Google Auth no está configurado. Contacta al administrador.');
      }

      // Intentar mostrar Google One Tap o popup
      const response = await showGooglePopup();
      return await handleGoogleResponse(response, onSuccess, onError);

    } catch (err) {
      console.error('Error al iniciar sesión con Google:', err);
      const errorMessage = err.message.includes('configurado') 
        ? 'Google Auth no está configurado correctamente'
        : 'Error al conectar con Google. Inténtalo de nuevo.';
      
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleGoogleResponse]);

  const initializeOneTap = useCallback(async (onSuccess, onError) => {
    try {
      await setupGoogleOneTap((response) => {
        handleGoogleResponse(response, onSuccess, onError);
      });
    } catch (err) {
      console.error('Error al inicializar Google One Tap:', err);
      setError('Error al inicializar Google Auth');
    }
  }, [handleGoogleResponse]);

  return {
    loading,
    error,
    signInWithGoogle,
    initializeOneTap,
    clearError: () => setError(null),
    isAvailable: isGoogleAuthAvailable()
  };
};
