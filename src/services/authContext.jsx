import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('token');
    const tokenExpiration = parseInt(sessionStorage.getItem('tokenExpiration'), 10); // Asegurar que sea un entero

    if (savedUser && savedToken && tokenExpiration) {
      const now = new Date().getTime();
      if (now < tokenExpiration) {
        setUser(JSON.parse(savedUser));
      } else {
        logoutUser(); // Si el token ha expirado, cerrar sesión
      }
    }
  }, []);

  const loginUser = (userData) => {
    console.log('Datos del usuario recibidos durante el login:', userData); // Verificar que foto_perfil_url llegue correctamente
  
    const userWithProfileImage = {
      ...userData,
      foto_perfil_url: userData.foto_perfil_url || null
    };
  
    const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hora de expiración
    sessionStorage.setItem('user', JSON.stringify(userWithProfileImage));
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString()); // Guardar como string para consistencia
    setUser(userWithProfileImage);
  };

  const logoutUser = () => {
    sessionStorage.clear(); // Limpiar todo el sessionStorage relacionado con el usuario
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
