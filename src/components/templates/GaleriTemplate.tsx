"use client";

import GaleriSectionOrganism from "../organisms/GaleriHeaderOrganism";
import { useEffect, useState } from "react";

const MainTemplateGaleri = () => {
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/galeri");
        if (!response.ok) {
          throw new Error("Failed to fetch media");
        }
        const data = await response.json();
        setMedia(data.data); // Menyimpan data ke state 'media'
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, []);

  const openModal = (item) => {
    setSelectedMedia(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <GaleriSectionOrganism />
      <div className="bg-slate-100 py-8" style={{ minHeight: "50rem" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(media || []).map((item) => (
              <div
              key={item.id}
              className="relative group cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-black/50"
              onClick={() => openModal(item)}
             >            
                <div className="p-0 h-64 flex items-center justify-center">
                  {item.media_type === "VIDEO" ? (
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
                      src={`http://localhost:8000/storage/${item.gambar}`} // Perbaiki URL
                      alt={item.caption || "Galeri"}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md transition-all duration-500 ease-in-out group-hover:bg-opacity-70 group-hover:translate-y-0 translate-y-4">
                      <span className="text-white text-sm md:text-xl lg:text-sm font-bold z-10 max-w-full w-full break-words">
                        {(() => {
                          const caption = item.caption || "Gambar";
                          const maxWords = 5;
                          const words = caption.split(" ");
                          return words.length > maxWords
                            ? words.slice(0, maxWords).join(" ") + " ..."
                            : caption;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white p-4 rounded-lg max-w-5xl flex relative">
            {/* Gambar di sebelah kiri */}
            <div className="w-1/2 p-4">
              {selectedMedia.media_type === "VIDEO" ? (
                <video
                  className="w-full h-auto"
                  controls
                  src={selectedMedia.media_url}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  className="w-full h-auto object-cover mx-auto"
                  src={`http://localhost:8000/storage/${selectedMedia.gambar}`} // Perbaiki URL gambar modal
                  alt={selectedMedia.caption || "Galeri"}
                />
              )}
            </div>

            {/* Caption di sebelah kanan */}
            <div className="w-1/2 p-4 mr-8 overflow-y-auto max-h-[80vh] flex flex-col justify-between">
              <p className="text-base mb-4">
                {selectedMedia.caption || "Gambar"}
              </p>
            </div>

            {/* Close Button (X) */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-3 text-xl font-bold text-gray-700 hover:text-red-600"
            >
              &times; {/* Simbol X */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTemplateGaleri;
