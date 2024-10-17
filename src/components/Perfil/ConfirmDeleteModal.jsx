import React from 'react';

const ConfirmDeleteModal = ({ showModal, onClose, onConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmar eliminación</h2>
        <p className="text-gray-700 mb-6">
          ¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 text-lg text-sgreen border-2 border-sgreen bg-white rounded-2xl hover:bg-sgreen/10 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-3 text-lg bg-sgreen text-white rounded-2xl hover:bg-bgreen transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
