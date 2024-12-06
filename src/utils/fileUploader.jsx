import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import feather from "feather-icons";
import png from "../assets/png-icon.webp";
import jpg from "../assets/jpg-icon.webp";
import svg from "../assets/svg-icon.webp";

const DynamicUploadArea = forwardRef(({ onUpload }, ref) => {
  const [dragActive, setDragActive] = useState(false); // Control del estado de arrastrar y soltar
  const [files, setFiles] = useState([]); // Lista de archivos seleccionados

  // Exponer el método `reset` al componente padre
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFiles([]); // Limpia los archivos
      onUpload([]); // Notifica al padre que la lista está vacía
    },
  }));

  // Ejecutar Feather Icons solo cuando se monta el componente
  useEffect(() => {
    feather.replace(); // Inicializa íconos al montar el componente
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    onUpload([...files, ...droppedFiles]); // Enviar archivos al componente padre
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onUpload([...files, ...selectedFiles]); // Enviar archivos al componente padre
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload(updatedFiles); // Actualizar el componente padre con la nueva lista
  };

  const getFileIcon = (file) => {
    const fileType = file.type;
    if (fileType.includes("png")) {
      return png;
    } else if (fileType.includes("jpg") || fileType.includes("jpeg")) {
      return jpg;
    } else if (fileType.includes("svg")) {
      return svg;
    } else {
      return ""; // Ruta para ícono genérico o manejar tipos no soportados
    }
  };

  return (
    <div className="w-full mt-4">
      <motion.div
        className={`border-2 ${
          dragActive
            ? "border-sgreen bg-green-50"
            : "border-dashed border-gray-300"
        } p-6 rounded-lg text-center cursor-pointer transition relative flex flex-col items-center justify-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload").click()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <i
            data-feather="upload-cloud"
            className="text-sgreen mb-3"
            style={{ width: "36px", height: "36px" }}
          ></i>
          <p className="text-sm text-gray-400">
            <span className="text-sgreen font-medium">Haz clic para subir</span>{" "}
            o arrastra y suelta tus imágenes aquí.
          </p>
          <p className="text-xs text-gray-400">SVG, PNG, JPG o GIF (máx. 5 MB)</p>
        </motion.div>
      </motion.div>

      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="mt-4">
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 border border-gray-300 rounded mb-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center">
                <img
                  src={getFileIcon(file)}
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <div>
                  <p className="text-sm">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="ml-auto text-red-500 hover:text-red-700 flex items-center"
              >
                <i
                  data-feather="trash-2"
                  className="text-red-500"
                  style={{ width: "20px", height: "20px" }}
                ></i>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default DynamicUploadArea;
