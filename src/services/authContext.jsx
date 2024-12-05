import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Token en el estado

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('token');
    console.log('Token desde sessionStorage:', savedToken); // Verifica el token
    setToken(savedToken);
    const tokenExpiration = parseInt(sessionStorage.getItem('tokenExpiration'), 10); // Convertir a número

    if (savedUser && savedToken && tokenExpiration) {
      const now = new Date().getTime();
      if (now < tokenExpiration) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken); // Configurar el token
      } else {
        logoutUser(); // Si el token ha expirado, cerrar sesión
      }
    }
  }, []);

  const loginUser = (userData) => {
    console.log('Datos del usuario recibidos durante el login:', userData);

    const userWithProfileImage = {
      ...userData,
      foto_perfil_url: userData.foto_perfil_url || null,
    };

    const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hora de expiración
    sessionStorage.setItem('user', JSON.stringify(userWithProfileImage));
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
    setUser(userWithProfileImage);
    setToken(userData.token); // Guardar el token
  };

  const logoutUser = () => {
    sessionStorage.clear(); // Limpiar todo el sessionStorage relacionado con el usuario
    setUser(null);
    setToken(null); // Limpiar el token
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
