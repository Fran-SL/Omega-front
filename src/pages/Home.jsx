import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

  // Hacer la petición al backend cuando el componente se cargue
  useEffect(() => {
    const checkConnection = async () => {
        try {
          const response = await fetch('http://localhost:4000/ping');
          const data = await response.json();
          setMessage(data.message);
        } catch (error) {
          console.error('Error connecting to backend:', error); // Esto te dará más detalles
          setMessage('Error connecting to backend');
        }
      };
      

    checkConnection();
  }, []); // Este efecto solo se ejecuta una vez cuando la página carga

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p>Backend says: {message}</p> {/* Muestra el mensaje recibido del backend */}
    </div>
  );
};

export default Home;
