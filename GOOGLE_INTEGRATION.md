# Google Sign-In - Configuración Rápida

## ✅ Estado actual
- Frontend configurado y listo
- Backend endpoint esperado: `POST /auth/google`
- Variables de entorno configuradas (corregidas para Vite)

## 🔧 Variables de entorno (.env)
```env
VITE_GOOGLE_CLIENT_ID=tu_google_client_id_aqui
VITE_API_URL=http://localhost:4000
```

## 🔧 Cómo funciona

1. **Botón de Google**: Aparece en `/login`
2. **Al hacer clic**: Abre popup de Google OAuth
3. **Envía al backend**: `POST /auth/google` con los datos de Google
4. **Respuesta esperada**:
```json
{
  "token": "jwt_token",
  "usuario_id": "user_id",
  "nombre": "User Name",
  "foto_perfil_url": "picture_url",
  "rol_id": 1
}
```

## 🚀 Para probar
1. Ve a http://localhost:5173/login
2. Haz clic en "Iniciar sesión con Google"
3. El popup de Google debería aparecer
4. Los datos se envían automáticamente al backend

## 📝 Archivos principales
- `src/services/googleAuthService.jsx` - Lógica de Google OAuth
- `src/hooks/useGoogleAuth.jsx` - Hook para manejar estados
- `src/pages/Usuario/Login.jsx` - Página de login con botón

¡Ya está todo integrado y listo para funcionar!
