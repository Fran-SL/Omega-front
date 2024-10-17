import React from 'react';

const FeedbackMessage = ({ message, showMessage, onClose }) => {
  if (!showMessage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <p className="text-lg sm:text-xl text-gray-700" aria-live="polite">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full sm:w-auto bg-green-600 text-white py-2 px-4 rounded-2xl hover:bg-green-700 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FeedbackMessage;
