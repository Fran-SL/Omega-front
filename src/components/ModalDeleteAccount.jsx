const ModalDeleteAccount = ({ showModal, toggleModal, handleDeleteAccount, loadingDelete }) => {
    if (!showModal) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
          <p className="mb-4">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={toggleModal}
              className="bg-white border border-sgreen text-sgreen py-2 px-4 rounded-2xl hover:bg-sgreen/30"
              disabled={loadingDelete}
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-sgreen text-white py-2 px-4 rounded-2xl hover:bg-bgreen"
              disabled={loadingDelete}
            >
              {loadingDelete ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalDeleteAccount;
  