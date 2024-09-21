import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-white p-4 shadow-md rounded-lg">{children}</div>;
};

export default Card;
