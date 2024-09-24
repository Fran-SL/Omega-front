import React from 'react';

const Servicios = () => {
  const servicios = [
    {
      titulo: 'Venta de Relojes y Joyas',
      descripcion: 'Descubre nuestra colección de relojes y joyas únicos y elegantes.',
      imagen: '/assets/servicio1.png',
    },
    {
      titulo: 'Personalización de Joyas',
      descripcion: 'Crea joyas únicas que reflejen tu estilo y personalidad.',
      imagen: '/assets/servicio2.png',
    },
    {
      titulo: 'Reparación de Relojes',
      descripcion: 'Restauramos tus relojes favoritos para que funcionen como nuevos.',
      imagen: '/assets/servicio3.png',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Servicios exclusivos para Ti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div key={index} className="p-4">
              <img src={servicio.imagen} alt={servicio.titulo} className="h-32 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{servicio.titulo}</h3>
              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;
