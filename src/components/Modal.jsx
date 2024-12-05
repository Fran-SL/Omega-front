const Modal = ({ 
  showModal, 
  toggleModal, 
  onConfirm, 
  loading, 
  title = "Confirmar acción", 
  message = "¿Estás seguro de que deseas realizar esta acción? Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={toggleModal}
            className="bg-white border border-sgreen text-sgreen py-2 px-4 rounded-2xl hover:bg-sgreen/30"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-sgreen text-white py-2 px-4 rounded-2xl hover:bg-bgreen"
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

  