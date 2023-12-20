import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FileInputProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ files, onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      onChange([...files, ...filesArray]); 
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    onChange(updatedFiles);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <label
          htmlFor="fileInput"
          className="block text-white text-center text-sm font-medium bg-gray-700  px-3 py-2 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-500"
        >
          Upload Images
        </label>
      </div>
      <div className="mt-2">
        <AnimatePresence>
          {files.map((file, fileIndex) => (
            <motion.div
              key={fileIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center mb-2 bg-gray-700 text-white rounded-lg shadow-md p-3"
            >
              <div className="flex items-center">
                <div className="w-32 h-20 flex items-center justify-center mr-2 rounded-lg overflow-hidden border">
                  <motion.img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="truncate w-32">
                  {file ? file.name : "Unknown File"}
                </p>{" "}
              </div>
              <button
                onClick={() => handleRemoveFile(fileIndex)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileInput;
