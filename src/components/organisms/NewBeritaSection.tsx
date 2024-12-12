"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageAtom from "../atoms/ImageBerita";
import TextBerita from "../atoms/TextBerita";
import ButtonBerita from "../atoms/TombolBerita";
import PopupBerita from "../molecules/PopupBerita";

export default function NewBeritaSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [latestBerita, setLatestBerita] = useState(null);

  // Ambil data berita terbaru
  useEffect(() => {
    const fetchLatestBerita = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        const allBerita = response.data;

        // Ambil berita terbaru berdasarkan ID (atau `created_at` jika ada)
        const terbaru = allBerita.reduce((prev, current) => {
          return prev.id > current.id ? prev : current; // Perbandingan ID
        });

        setLatestBerita(terbaru);
      } catch (error) {
        console.error("Error fetching berita:", error);
      }
    };

    fetchLatestBerita();
  }, []);

  if (!latestBerita) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-10 bg-gray-100 pt-24">
      <ImageAtom
        src={`http://localhost:8000/storage/${latestBerita.image}`} // Sesuaikan path storage
        alt={latestBerita.title}
        width={650}
        height={400}
        className="rounded-lg"
      />
      <div className="flex flex-col justify-center">
        <TextBerita content="Berita Terbaru" className="text-red-500" />
        <TextBerita
          content={latestBerita.title}
          className="text-3xl font-bold mt-4"
        />
        <TextBerita
          content={latestBerita.caption}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <PopupBerita
            title={latestBerita.title}
            content={latestBerita.caption}
            source="Sumber Tidak Diketahui" // Tambahkan jika sumber tersedia
            time="Tidak Tersedia" // Tambahkan jika waktu tersedia
            imageSrc={`http://localhost:8000/storage/${latestBerita.image}`} // Sesuaikan path storage
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}
