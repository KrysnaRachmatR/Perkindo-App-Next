"use client";
import React from "react";
import TextBerita from "../atoms/TextBerita";
import Image from "next/image"; // Menggunakan Image dari Next.js

interface PopupBeritaProps {
  title: string;
  content: string;
  source: string;
  time: string;
  imageSrc: string; // Menambahkan properti imageSrc
  onClose: () => void;
}

export default function PopupBerita({
  title,
  content,
  time,
  imageSrc, // Menggunakan imageSrc
  onClose,
}: PopupBeritaProps) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>

        {/* Menambahkan gambar */}
        <div className="mb-4">
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <TextBerita content={` ${time}`} className="text-sm text-red-500" />

        <TextBerita content={title} className="text-2xl font-bold mb-2" />
        <TextBerita content={content} className="mb-4 text-gray-600" />
      </div>
    </div>
  );
}
