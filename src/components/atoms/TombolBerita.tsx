"use client";
import React from "react";

interface ButtonAtomsProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function ButtonBerita({
  label,
  onClick,
  className,
}: ButtonAtomsProps) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
