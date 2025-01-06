import React from "react";

interface SettingsButtonProps {
  onClick: () => void;
  label: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick, label }) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default SettingsButton;