"use client";
import React, { useState } from "react";
import ImageAtom from "../atoms/ImageBerita";
import TextBerita from "../atoms/TextBerita";
import ButtonBerita from "../atoms/TombolBerita";
import PopupBerita from "../molecules/PopupBerita";

export default function NewBeritaSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-10 bg-gray-100 pt-24">
      <ImageAtom
        src="/images/konstruksi2.jpg"
        alt="coba-coba"
        width={650}
        height={400}
        className="rounded-lg"
      />
      <div className="flex flex-col justify-center">
        <TextBerita content="Movies • 4 min read" className="text-red-500" />
        <TextBerita
          content="Agus lan Jono Gelut Perkoro Wedokan Chapter:99"
          className="text-3xl font-bold mt-4"
        />
        <TextBerita
          content="Amergo ngonangi wedokane metu ambek lanang liyo...."
          className="mt-2 text-gray-600"
        />
        <div>
          <ButtonBerita
            label="Baca Selengkapnya"
            className="text-[#161D6F] items-start mt-2 font-bold"
            onClick={() => setShowPopup(true)}
          />
        </div>
      </div>

      {/* Render Popup jika showPopup bernilai true */}
      {showPopup && (
        <PopupBerita
          title="Agus lan Jono Gelut Perkoro Wedokan Chapter:99"
          content="Amergo ngonangi wedokane metu ambek lanang liyo...."
          source="Ngarang Dewe"
          time="30 Dino"
          imageSrc="/images/konstruksi2.jpg" // Menambahkan gambar untuk popup
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
