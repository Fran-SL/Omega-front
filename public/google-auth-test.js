// Script de prueba para Google OAuth - Versión mejorada
// Ejecutar en la consola del navegador para probar la configuración

console.log('🔧 Iniciando pruebas completas de Google OAuth...');

// Función para verificar configuración
function verificarConfiguracion() {
  console.log('\n📋 VERIFICANDO CONFIGURACIÓN...');
  
  // Verificar variables de entorno
  const clientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log('Client ID:', clientId ? '✅ Configurado' : '❌ No configurado');
  
  if (clientId && clientId !== 'your_google_client_id_here') {
    console.log('📝 Client ID:', clientId.substring(0, 20) + '...');
  } else {
    console.error('❌ Error: Google Client ID no válido');
    return false;
  }
  
  return true;
}

// Función para verificar Google SDK
function verificarGoogleSDK() {
  console.log('\n📦 VERIFICANDO GOOGLE SDK...');
  
  if (!window.google) {
    console.error('❌ Google SDK no cargado');
    console.log('� Cargando Google SDK...');
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ Google SDK cargado exitosamente');
      verificarGoogleSDK();
    };
    document.head.appendChild(script);
    return false;
  }
  
  console.log('✅ Google SDK cargado');
  
  if (window.google.accounts) {
    console.log('✅ Google Accounts API disponible');
    console.log('� Funciones disponibles:');
    console.log('  - id.initialize:', typeof window.google.accounts.id?.initialize);
    console.log('  - id.prompt:', typeof window.google.accounts.id?.prompt);
    console.log('  - oauth2.initTokenClient:', typeof window.google.accounts.oauth2?.initTokenClient);
    return true;
  }
  
  return false;
}

// Función para verificar backend
async function verificarBackend() {
  console.log('\n🌐 VERIFICANDO BACKEND...');
  
  try {
    const response = await fetch('http://localhost:4000/auth/google', {
      method: 'OPTIONS'
    });
    
    console.log('Backend status:', response.status);
    console.log('Backend disponible:', response.ok ? '✅ Sí' : '❌ No');
    
    const corsHeader = response.headers.get('access-control-allow-origin');
    console.log('CORS configurado:', corsHeader ? '✅ Sí' : '❌ No');
    
    if (corsHeader) {
      console.log('CORS origin:', corsHeader);
    }
    
  } catch (error) {
    console.error('❌ Error conectando al backend:', error.message);
    console.log('💡 Asegúrate de que el backend esté ejecutándose en http://localhost:4000');
  }
}

// Función para probar Google Auth
async function probarGoogleAuth() {
  console.log('\n🧪 PROBANDO GOOGLE AUTH...');
  
  if (!window.google || !window.google.accounts) {
    console.error('❌ No se puede probar: Google SDK no disponible');
    return;
  }
  
  const clientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  try {
    // Inicializar Google Auth
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        console.log('✅ Callback de Google funcionando:', response);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    
    console.log('✅ Google Auth inicializado correctamente');
    
    // Probar One Tap
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log('ℹ️ One Tap no mostrado:', notification.getNotDisplayedReason());
      }
      if (notification.isSkippedMoment()) {
        console.log('ℹ️ One Tap omitido:', notification.getSkippedReason());
      }
      if (notification.isDismissedMoment()) {
        console.log('ℹ️ One Tap cerrado:', notification.getDismissedReason());
      }
    });
    
  } catch (error) {
    console.error('❌ Error en Google Auth:', error);
  }
}

// Ejecutar todas las pruebas
async function ejecutarPruebas() {
  console.log('🚀 INICIANDO PRUEBAS COMPLETAS...\n');
  
  const configOk = verificarConfiguracion();
  if (!configOk) return;
  
  const sdkOk = verificarGoogleSDK();
  if (!sdkOk) {
    console.log('⏳ Esperando a que se cargue el SDK...');
    return;
  }
  
  await verificarBackend();
  await probarGoogleAuth();
  
  console.log('\n✅ PRUEBAS COMPLETADAS');
  console.log('💡 Si todo está ✅, el botón de Google debería funcionar');
}

// Ejecutar pruebas
ejecutarPruebas();
