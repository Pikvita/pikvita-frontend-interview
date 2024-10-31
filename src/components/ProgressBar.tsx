import React from "react";

//Interface: Defines the property required by the component
interface ProgressBarProps {
  progress: number;
}

//ProgressBar takes in a progress prop and displays it as a filled portion of a horizontal bar.
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (

  //Wrapper div: Serves as the outer container of the progress bar
  <div className="w-full bg-gray-300 rounded-full h-4">

    {/* Represents the filled portion of the progress bar, showing the current progress. */}
    <div
      className="bg-blue-500 h-4 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
