import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-gray-300 rounded-full h-4">
    <div
      className="bg-blue-500 h-4 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
