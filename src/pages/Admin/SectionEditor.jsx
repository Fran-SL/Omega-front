const SectionEditor = ({ section, onUpdate, onRemove }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      onUpdate({ ...section, [name]: value });
    };
  
    return (
      <div className="mb-4 p-4 border font-ibm border-gray-300 rounded-lg">
        <div className="mb-2">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
          <input
            type="text"
            name="subtitle"
            value={section.subtitle}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
          <textarea
            name="content"
            value={section.content}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            rows="4"
            required
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:underline"
        >
          Eliminar Sección
        </button>
      </div>
    );
  };
  
  export default SectionEditor;
  