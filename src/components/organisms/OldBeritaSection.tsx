"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextBerita from "../atoms/TextBerita";
import CardBerita from "../molecules/CardBerita";

export default function LatestBeritaSection() {
  const [beritas, setBeritas] = useState([]);
  const [latestBerita, setLatestBerita] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    const fetchBeritas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        const allBeritas = response.data;
        const sortedBeritas = allBeritas.sort((a, b) => b.id - a.id);

        setLatestBerita(sortedBeritas[0]);
        setBeritas(sortedBeritas.slice(1));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBeritas();
  }, []);

  return (
    <section className="p-6">
      <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl max-w-sm w-full animate-fadeInScale">
        <TextBerita content="Berita Terakhir" className="text-2xl font-bold" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {beritas.map((berita) => (
          <CardBerita
            key={berita.id}
            imageSrc={`http://localhost:8000/storage/${berita.image}`}
            title={berita.title}
            content={berita.caption}
            time={formatDate(berita.created_at)}
          />
        ))}
      </div>
    </section>
  );
}
