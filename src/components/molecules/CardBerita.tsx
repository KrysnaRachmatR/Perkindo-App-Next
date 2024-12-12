"use client";
import React, { useState } from "react";
import ImageAtom from "../atoms/ImageBerita";
import TextBerita from "../atoms/TextBerita";
import PopupBerita from "../molecules/PopupBerita"; // Import Popup for card

interface CardBeritaProps {
  imageSrc: string;
  content: string;
  title: string;
  time: string;
}

export default function CardBerita({
  imageSrc,
  content,
  title,
  time,
}: CardBeritaProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <ImageAtom src={imageSrc} alt={title} width={400} height={300} />
      <div className="p-4">
        <TextBerita content={`${time}`} className="text-xs text-red-500" />
        <TextBerita content={title} className="mt-2 text-lg font-bold" />
        <TextBerita content={content} className="text-md text-red-500" />
        <button
          className="mt-2 text-blue-500"
          onClick={() => setShowPopup(true)}
        >
          Baca Selengkapnya
        </button>
      </div>

      {/* Render Popup when showPopup is true */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <PopupBerita
            time={time}
            title={title}
            content={content}
            imageSrc={imageSrc}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}
