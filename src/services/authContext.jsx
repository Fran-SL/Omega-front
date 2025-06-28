import { createContext, useState, useEffect } from "react";

// Decodificador JWT simple (sin validación de firma)
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa desde localStorage si existe, si no desde sessionStorage, si no null
  const getInitialUser = () => {
    const local = localStorage.getItem("user");
    if (local) return JSON.parse(local);
    const session = sessionStorage.getItem("user");
    if (session) return JSON.parse(session);
    // Si no hay user pero hay token, decodifica el JWT
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        // Ajusta los campos según tu backend
        return {
          usuario_id: decoded.usuario_id || decoded.userId || decoded.id,
          nombre: decoded.nombre || decoded.name,
          email: decoded.email,
          rol_id: decoded.rol_id || decoded.role,
          foto_perfil_url: decoded.foto_perfil_url || decoded.picture,
          token: token,
        };
      }
    }
    return null;
  };
  const getInitialToken = () => {
    return (
      localStorage.getItem("token") || sessionStorage.getItem("token") || null
    );
  };

  const [user, setUser] = useState(getInitialUser());
  const [token, setToken] = useState(getInitialToken());

  useEffect(() => {
    // Si hay datos en localStorage, los mantiene
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  const loginUser = (userData, persist = true) => {
    const id = userData.usuario_id || userData.userId;
    if (!id) {
      console.error("El usuario_id no está presente en la respuesta.");
      return;
    }
    // Guarda en localStorage por defecto (persistente)
    if (persist) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", userData.token);
    }
    setUser(userData);
    setToken(userData.token);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
