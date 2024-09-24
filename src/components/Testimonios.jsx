import React from 'react';

const Testimonios = () => {
  return (
    <section className="bg-sgreen text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Testimonios de Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Marco Cofré', 'Urbano Rojas', 'Néstor Useche'].map((cliente, index) => (
            <div key={index} className="p-4 bg-green-800 rounded-lg">
              <p className="text-xl mb-2">{cliente}</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-400 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
