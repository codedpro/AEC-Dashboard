import React from "react";

interface ProgressBarToastProps {
  message: string;
  progress: number;
}

const ProgressBarToast: React.FC<ProgressBarToastProps> = ({ message, progress }) => {
  return (
    <div className="fixed top-0 right-0 m-4 bg-gray-800 text-white p-4 rounded">
      <p>{message}</p>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              Task in Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-teal-600">
              {`${progress}%`}
            </span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200">
          <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarToast;
