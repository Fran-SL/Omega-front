const Modal = ({
  showModal,
  toggleModal,
  onConfirm,
  loading,
  title = "Confirmar acción",
  message = "¿Estás seguro de que deseas realizar esta acción? Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={toggleModal}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-2xl hover:bg-gray-200"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`py-3 px-4 rounded-2xl shadow-md ${
              loading
                ? "bg-white text-sgreen py-2 px-4 border border-sgreen rounded-2xl transition duration-300 ease-in-out"
                : "bg-sgreen text-white py-2 px-4 border-2 border-green-500 rounded-2xl shadow-inner-green hover:shadow-inner-hgreen transition duration-300 ease-in-out"
            }`}
            disabled={loading}
          >
            {loading ? "Procesando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
