import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface SiteIdInputWithImageProps {
  siteId: string;
  setSiteId: (value: string) => void;
  siteIdImage: File | null;
  setSiteIdImage: (image: File | null) => void;
}

const SiteIdInputWithImage: React.FC<SiteIdInputWithImageProps> = ({
  siteId,
  setSiteId,
  siteIdImage,
  setSiteIdImage,
}) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);

    if (selectedImages.length <= 1) {
      setImages(selectedImages);
      setSiteIdImage(selectedImages[0]);
    } else {
      console.error("You can upload a maximum of 1 image for Site ID.");
    }
  };

  const handleImageRemove = () => {
    setImages([]);
    setSiteIdImage(null);
  };

  useEffect(() => {
    if (siteIdImage) {
      setImages([siteIdImage]);
    } else {
      setImages([]);
    }
  }, [siteIdImage]);

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold ml-1 mb-1">
            Site ID
          </label>
          <input
            className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
            type="text"
            placeholder="Site ID"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
          />
        </div>
        <div className="ml-2 mt-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
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
          <p className="text-gray-700 text-sm">Image Preview:</p>
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
                  onClick={handleImageRemove}
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

export default SiteIdInputWithImage;
