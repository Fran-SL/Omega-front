// Script de prueba para Google OAuth
// Ejecutar en la consola del navegador para probar la configuración

console.log('🔧 Iniciando pruebas de Google OAuth...');

// Verificar variables de entorno
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log('📋 Client ID configurado:', clientId ? '✅ Sí' : '❌ No');

if (!clientId || clientId === 'your_google_client_id_here') {
  console.error('❌ Error: Google Client ID no está configurado correctamente');
  console.log('💡 Solución: Configura REACT_APP_GOOGLE_CLIENT_ID en tu archivo .env');
} else {
  console.log('✅ Client ID parece válido');
}

// Verificar si Google SDK está cargado
console.log('📦 Google SDK cargado:', window.google ? '✅ Sí' : '❌ No');

if (window.google) {
  console.log('🔍 Versión del SDK:', window.google.accounts ? 'Nueva (accounts)' : 'Antigua');
  
  if (window.google.accounts) {
    console.log('✅ Google Accounts API disponible');
    console.log('🔧 Funciones disponibles:');
    console.log('  - id.initialize:', typeof window.google.accounts.id.initialize);
    console.log('  - id.prompt:', typeof window.google.accounts.id.prompt);
    console.log('  - oauth2.initTokenClient:', typeof window.google.accounts.oauth2.initTokenClient);
  }
}

// Verificar conexión al backend
fetch('http://localhost:4000/auth/google', {
  method: 'OPTIONS'
})
.then(response => {
  console.log('🌐 Backend disponible:', response.ok ? '✅ Sí' : '❌ No');
  console.log('📡 CORS configurado:', response.headers.get('access-control-allow-origin') ? '✅ Sí' : '❌ No');
})
.catch(error => {
  console.error('❌ Error conectando al backend:', error.message);
  console.log('💡 Asegúrate de que el backend esté ejecutándose en http://localhost:4000');
});

console.log('✅ Pruebas completadas. Revisa los resultados arriba.');
