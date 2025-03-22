"use client";
import React from "react";
import TextBerita from "../atoms/TextBerita";
import Image from "next/image";

interface PopupBeritaProps {
  title: string;
  content: string;
  time: string;
  imageSrc: string;
  onClose: () => void;
}

export default function PopupBerita({
  title,
  content,
  time,
  imageSrc,
  onClose,
}: PopupBeritaProps) {
  // Batasi caption hanya 10 kalimat, jika lebih tambahkan fitur scroll
  const sentences = content.split(".");
  const limitedContent = sentences.slice(0, 10).join(".") + (sentences.length > 10 ? "." : "");
  const isScrollable = sentences.length > 10;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0">
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md max-w-lg w-full max-h-[70vh] overflow-hidden relative">
        {/* Tombol Close */}
        <button
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Gambar */}
        <div className="mb-3 flex justify-center">
          <div className="w-full max-w-[400px] h-[200px] sm:h-[250px] overflow-hidden flex justify-center">
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={250}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Informasi Berita */}
        {/* <TextBerita content={time} className="text-xs sm:text-sm text-red-500" /> */}
        {/* <TextBerita content={title} className="text-base sm:text-lg font-bold mb-2 text-left" /> */}

        {/* Konten Berita (Scroll jika panjang) */}
        <div className={`overflow-y-auto text-gray-600 leading-relaxed ${isScrollable ? "max-h-32 sm:max-h-40" : ""}`}>
          <TextBerita content={limitedContent} />
        </div>
      </div>
    </div>
  );
}
