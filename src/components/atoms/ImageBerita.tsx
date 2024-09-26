"use client";
import React from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component

interface ImageAtomProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ImageAtom({
  src,
  alt,
  width,
  height,
  className,
}: ImageAtomProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
