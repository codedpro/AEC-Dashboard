import React, { ChangeEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  maxImages: number;
  title: string;
  onImagesUpload: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages,
  title,
  onImagesUpload,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImagesArray = Array.from(files);

      if (selectedImages.length + selectedImagesArray.length > maxImages) {
      } else {
        setSelectedImages([...selectedImages, ...selectedImagesArray]);
        onImagesUpload([...selectedImages, ...selectedImagesArray]);
      }
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    onImagesUpload(updatedImages);
  };

  return (
    <div className="mb-4 ml-2">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700 text-sm font-bold mt-2">
          {title}
        </label>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            multiple 
            onChange={handleImageUpload}
          />
          <span className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer block mt-2">
            Choose File
          </span>
        </label>
      </div>
      {selectedImages.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-700 text-sm">Image Previews:</p>
          <div className="flex flex-wrap">
            <AnimatePresence>
              {selectedImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="m-2 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    width={100}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.button
                    type="button"
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => handleImageRemove(index)}
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoClose />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
