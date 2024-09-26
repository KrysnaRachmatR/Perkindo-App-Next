"use client";
import React, { useState } from "react";
import ImageAtom from "../atoms/ImageBerita";
import TextBerita from "../atoms/TextBerita";
import PopupBerita from "../molecules/PopupBerita"; // Import Popup for card

interface CardBeritaProps {
  imageSrc: string;
  category: string;
  title: string;
  source: string;
  time: string;
}

export default function CardBerita({
  imageSrc,
  category,
  title,
  source,
  time,
}: CardBeritaProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <ImageAtom src={imageSrc} alt={title} width={400} height={300} />
      <div className="p-4">
        <TextBerita content={category} className="text-xs text-red-500" />
        <TextBerita content={title} className="mt-2 text-lg font-bold" />
        <TextBerita
          content={`${source} • ${time}`}
          className="text-sm text-red-500"
        />
        <button
          className="mt-2 text-blue-500"
          onClick={() => setShowPopup(true)}
        >
          Baca Selengkapnya
        </button>
      </div>

      {/* Render Popup when showPopup is true */}
      {showPopup && (
        <PopupBerita
          title={title}
          content="Detail berita yang lebih panjang...."
          source={source}
          imageSrc={imageSrc}
          time={time}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
