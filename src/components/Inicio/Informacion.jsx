import React from 'react';

const HistoriaMisionVision = () => {
  return (
    <section className="bg-sgreen text-white py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Nuestra Historia, Misión y Visión</h2>
          <p className="text-lg mb-4">
            Desde 1948, Relojería y Joyería Omega de Talca ha ofrecido joyas y relojes de alta calidad,
            junto con servicios técnicos especializados...
          </p>
        </div>
        <div>
          <img src="/assets/tienda.jpg" alt="Historia de la tienda" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HistoriaMisionVision;
