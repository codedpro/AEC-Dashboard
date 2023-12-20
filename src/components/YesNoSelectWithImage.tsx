import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface YesNoSelectWithImageProps {
  label: string;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  onImagesUpload: (images: File[]) => void;
  maxImages: number;
}

const YesNoSelectWithImage: React.FC<YesNoSelectWithImageProps> = ({
  label,
  selectedOption,
  setSelectedOption,
  onImagesUpload,
  maxImages,
}) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);

    if (selectedImages.length + images.length <= maxImages) {
      setImages([...images, ...selectedImages]);
      onImagesUpload([...images, ...selectedImages]);
    } else {
      console.error(`You can upload a maximum of ${maxImages} images.`);
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    onImagesUpload(updatedImages);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
        {label}
      </label>
      <div className="flex">
        <select
          className="flex-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {selectedOption === "" ? (
            <>
              <option value="">Not Selected</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </>
          ) : (
            <>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </>
          )}
        </select>

        <div className="ml-2 flex items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleImageUpload}
            />
            <span className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded cursor-pointer">
              Choose File
            </span>
          </label>
        </div>
      </div>
      {images.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-700 text-sm">Image Previews:</p>
          <div className="flex flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="mr-2 mb-2 relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  width={100}
                />
                <button
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => handleImageRemove(index)}
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YesNoSelectWithImage;
