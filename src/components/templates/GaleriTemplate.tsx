"use client";

import GaleriSectionOrganism from "../organisms/GaleriHeaderOrganism";
import { useEffect, useState } from "react";

const MainTemplateGaleri = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/instagram/media'); // URL API untuk mendapatkan media
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }
        const data = await response.json();
        setMedia(data.data); // Sesuaikan dengan struktur respons Anda
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <GaleriSectionOrganism />
      <div className="bg-slate-100 py-8" style={{ minHeight: "50rem" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative group">
                <div className="p-4 sm:p-6 lg:p-8 h-64 flex items-center justify-center">
                  {item.media_type === 'VIDEO' ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      src={item.media_url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      src={item.media_url} // Ganti dengan URL media dari Instagram
                      alt={item.caption || "Galeri"} // Gunakan caption jika ada
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md group-hover:bg-opacity-75 transition-all duration-500 ease-in-out p-2">
                      <span className="text-white text-sm md:text-xl lg:text-sm font-bold z-10 max-w-full w-full break-words">
                        {item.caption || "Gambar"} {/* Tampilkan caption */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTemplateGaleri;
