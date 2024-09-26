"use client";
import React from "react";

interface TextAtomProps {
  content: string;
  className?: string;
}

export default function TextBerita({ content, className }: TextAtomProps) {
  return <p className={className}>{content}</p>;
}
