"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextBerita from "../atoms/TextBerita";
import CardBerita from "../molecules/CardBerita";

export default function LatestBeritaSection() {
  const [beritas, setBeritas] = useState([]);
  const [latestBerita, setLatestBerita] = useState(null);

  useEffect(() => {
    // Fetch data dari backend
    const fetchBeritas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        const allBeritas = response.data;

        // Urutkan data berdasarkan ID atau waktu terbaru (pastikan sesuai dengan backend)
        const sortedBeritas = allBeritas.sort((a, b) => b.id - a.id);

        // Ambil berita terbaru dan sisanya
        setLatestBerita(sortedBeritas[0]);
        setBeritas(sortedBeritas.slice(1)); // Ambil semua kecuali data terbaru
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBeritas();
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between items-center">
        <TextBerita content="Berita Terakhir" className="text-2xl font-bold" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {beritas.map((berita) => (
          <CardBerita
            key={berita.id}
            imageSrc={`http://localhost:8000/storage/${berita.image}`} // Sesuaikan path
            category={berita.category || "Uncategorized"} // Pastikan category ada
            title={berita.title}
            source="Sumber Tidak Diketahui" // Tambahkan jika sumber tersedia
            time="Tidak Tersedia" // Tambahkan jika waktu tersedia
          />
        ))}
      </div>
    </section>
  );
}
