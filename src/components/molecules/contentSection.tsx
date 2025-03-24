"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Berita {
  id: number;
  title: string;
  caption: string;
  image: string;
  time: string;
}

const ContentSection: React.FC = () => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        console.log("Data API:", response.data);

        const sortedData = response.data.sort(
          (a: Berita, b: Berita) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setBerita(sortedData);
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="bg-[#161D6F] min-h-screen flex flex-col md:flex-row p-4 md:p-8 gap-6">
      {/* Bagian Kiri - Berita Terbaru */}
      <div className="flex-1 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Informasi PERKINDO</h1>
        <p className="text-md md:text-lg mb-4">Ada apa di PERKINDO?</p>
        {loading ? (
        <div className="animate-pulse space-y-4">
          {/* Skeleton untuk gambar */}
          <div className="w-full h-[200px] md:h-[300px] bg-gray-700 rounded-lg"></div>
          
          {/* Skeleton untuk judul berita */}
          <div className="h-6 w-3/4 bg-gray-600 rounded"></div>

          {/* Skeleton untuk waktu berita */}
          <div className="h-4 w-1/2 bg-gray-500 rounded"></div>

          {/* Skeleton untuk deskripsi berita */}
          <div className="h-4 w-full bg-gray-500 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-500 rounded"></div>
        </div>
      ) : berita.length > 0 ? (
          <div>
            {/* Gambar berita terbaru */}
            <div className="relative w-full h-[200px] md:h-[300px] mb-4 rounded-lg overflow-hidden">
              <Image
                src={`http://localhost:8000/storage/${berita[0].image}`}
                alt={berita[0].title}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-lg md:text-xl font-semibold">{berita[0].title}</h2>
            <p className="text-gray-300 text-xs md:text-sm">{berita[0].time}</p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">{berita[0].caption}</p>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada berita tersedia.</p>
        )}
      </div>

      {/* Bagian Kanan - Berita Lama */}
      {berita.length > 1 && (
        <div className="w-full md:w-[400px] h-auto md:h-[500px] border-l-[5px] md:border-l-[13px] border-[#98DED9] p-4 bg-white text-black rounded-lg">
          <h2 className="text-lg md:text-xl font-bold mb-4">Berita Lainnya</h2>

          {/* Jika lebih dari 5 berita lama, aktifkan scroll */}
          <div className={`space-y-3 overflow-y-auto ${berita.length > 6 ? "h-[420px]" : "h-auto"}`}>
            {berita.slice(1).map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-300 pb-2 cursor-pointer hover:text-blue-500 transition duration-300"
                onClick={() => router.push(`/news/`)}
              >
                <h3 className="text-sm md:text-md font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm">{item.time}</p>
                <p className="text-gray-400 text-xs md:text-sm truncate">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
