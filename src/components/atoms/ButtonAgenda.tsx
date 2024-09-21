import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        isActive ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"
      } hover:bg-purple-500`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
