// Servicio para Google Sign-In
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Cargar Google SDK
export const loadGoogleSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google) {
        resolve(window.google);
      } else {
        reject(new Error('Google SDK failed to load'));
      }
    };
    
    script.onerror = () => reject(new Error('Error loading Google SDK'));
    document.head.appendChild(script);
  });
};

// Inicializar Google Sign-In
export const initializeGoogleSignIn = async (callback) => {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not configured');
  }

  await loadGoogleSDK();
  
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: callback
  });
};

// Mostrar popup de Google
export const showGooglePopup = async () => {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not configured');
  }

  await loadGoogleSDK();
  
  return new Promise((resolve, reject) => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: resolve
    });
    
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Usar OAuth popup como fallback
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(tokenResponse.error));
              return;
            }
            
            // Obtener info del usuario
            fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`)
              .then(res => res.json())
              .then(userInfo => {
                resolve({
                  credential: null,
                  userInfo: userInfo,
                  accessToken: tokenResponse.access_token
                });
              })
              .catch(reject);
          }
        });
        
        client.requestAccessToken();
      }
    });
  });
};

// Enviar al backend
export const authenticateWithGoogle = async (googleResponse) => {
  try {
    console.log('Enviando a backend:', googleResponse);
    const response = await fetch(`${API_URL}/usuarios/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credential: googleResponse.credential,
        userInfo: googleResponse.userInfo
      }),
    });
    console.log('Respuesta backend:', response);
    if (!response.ok) {
      // Intentar leer el mensaje de error del backend
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg += ': ' + (errorData.message || JSON.stringify(errorData));
      } catch {}
      throw new Error(errorMsg);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Decodificar JWT de Google
export const decodeGoogleJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};
