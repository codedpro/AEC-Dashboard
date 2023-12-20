import React, { useState } from "react";

const CustomCheckboxIcon = ({ checked }) => (
  <svg
    className={`w-5 h-5 ${checked ? "text-red-500" : "text-gray-400"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {checked ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    )}
  </svg>
);

interface MwAntSizeSelectProps {
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
}

const MwAntSizeSelect: React.FC<MwAntSizeSelectProps> = ({
  selectedSizes,
  setSelectedSizes,
}) => {
  const mwAntSizes = ["30", "60", "90", "120"];

  const handleSizeSelection = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        MW Ant Size
      </label>
      <div className="space-x-4">
        {mwAntSizes.map((size) => (
          <label key={size} className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              value={size}
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeSelection(size)}
            />
            <div className="relative flex-shrink-0">
              <div className="w-5 h-5 border rounded-md border-gray-400 bg-white flex items-center justify-center">
                {selectedSizes.includes(size) && (
                  <CustomCheckboxIcon checked={true} />
                )}
              </div>
              <div
                className={`${
                  selectedSizes.includes(size) ? "block" : "hidden"
                } absolute inset-0 bg-red-500 opacity-25 rounded-md`}
              ></div>
            </div>
            <span className="ml-2 text-gray-700">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MwAntSizeSelect;
