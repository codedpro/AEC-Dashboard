import React from 'react';

interface MyProgressBarProps {
  progress: number;
}

const MyProgressBar: React.FC<MyProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-8 bg-gray-200 rounded-md overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {progress}%
      </span>
    </div>
  );
};

export default MyProgressBar;
