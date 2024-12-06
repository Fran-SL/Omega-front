import React, { useState } from 'react';
import { CloudUpload } from 'react-feather';

const FileUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
      <div
        className={`w-full p-8 border-2 border-dashed rounded-md flex flex-col items-center text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload size={40} className="text-gray-500 mb-4" />
        <p className="text-blue-600 font-medium text-sm">
          Click to upload
        </p>
        <p className="text-gray-500 text-xs">
          or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <div className="mt-4 w-full">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Files Uploaded:
          </h4>
          <ul className="text-sm text-gray-600">
            {files.map((file, index) => (
              <li key={index}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
