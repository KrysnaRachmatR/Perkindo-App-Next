"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

type CardData = {
  id: number;
  imageSrc: string;
  title: string;
  caption: string;
};

const Card: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<CardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/galeri");
        const mappedData = response.data.data.map((item: any) => ({
          id: item.id,
          imageSrc: `http://localhost:8000/storage/${item.gambar}`, // Menggunakan item.gambar dari API
          title: item.judul,
          caption: item.caption,
        }));
        setCards(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOpenModal = (content: CardData) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Tombol prev */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 bg-gray-700 text-white hover:bg-gray-900 transition-all 
          px-3 py-2 sm:px-4 sm:py-3 rounded-full text-base sm:text-lg shadow-md"
        >
          ⬅
        </button>
      )}

      {/* Kontainer kartu */}
      <div className="overflow-hidden w-full max-w-[1100px] h-[600px] p-4">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            willChange: "transform",
            gap: "15px",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] bg-[#161D6F] rounded-lg overflow-hidden text-white shadow-lg"
            >
              <div className="relative w-full h-[400px] flex items-center justify-center">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  className="object-contain max-h-full rounded-lg"
                  unoptimized
                />
              </div>
              <div className="pt-[20px] pb-4 px-4">
                <h2 className="text-base sm:text-lg font-bold mb-2">{card.title}</h2>
                {/* Caption dipotong jika lebih dari 100 karakter */}
                <p className="text-gray-200 mb-4 text-sm sm:text-base">
                {card.caption.length > 50 ? card.caption.substring(0, 50) + "..." : card.caption}
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-white text-[#161D6F] px-4 py-1 rounded-md text-sm sm:text-base mb-3 hover:bg-gray-200 transition"
                    onClick={() => handleOpenModal(card)}
                  >
                    Selengkapnya
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol next */}
      {currentIndex < cards.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 bg-gray-700 text-white hover:bg-gray-900 transition-all 
          px-3 py-2 sm:px-4 sm:py-3 rounded-full text-base sm:text-lg shadow-md"
        >
          ➡
        </button>
      )}

     {/* Modal dengan animasi */}
<AnimatePresence>
  {isModalOpen && modalContent && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-[95%] sm:max-w-[800px] w-full dark:bg-boxdark"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Tombol close diperbesar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-white text-3xl"
          onClick={handleCloseModal}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 dark:text-white text-center">
          Detail Galeri
        </h2>

        {/* Layout responsif */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-[60%] h-[250px] sm:h-[400px] flex items-center justify-center">
            <Image
              src={modalContent.imageSrc}
              alt={modalContent.title}
              fill
              className="object-contain rounded-lg"
              unoptimized
            />
          </div>
          <p className="w-full sm:w-1/2 text-gray-600 dark:text-gray-300 text-center sm:text-left">
            {modalContent.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Card;
