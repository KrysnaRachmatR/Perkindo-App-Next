"use client";

import Image from "next/image";
import { useState } from "react";

type CardData = {
  imageSrc: string;
  title: string;
  caption: string;
};

type CardProps = {
  cards: CardData[];
};

const Card: React.FC<CardProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<CardData | null>(null);

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

  const visibleCardsCount = 3;

  return (
    <div className="relative flex items-center justify-center w-full">
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-300 text-[#161D6F] rounded-full p-2 m-4"
        >
          Prev
        </button>
      )}

      <div className="overflow-hidden w-full max-w-[1100px] h-[600px]  p-4">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / visibleCardsCount
            }%)`,
            transition: "transform 0.5s ease-in-out",
            willChange: "transform",
            gap: "15px",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[calc(100%/${visibleCardsCount})] transition-transform duration-300`}
              style={{ margin: 0 }}
            >
              <div
                className={`bg-[#161D6F] rounded-sm overflow-hidden w-[350px] h-auto text-white relative ${
                  index === currentIndex
                    ? "scale-105 opacity-100"
                    : "scale-90 opacity-50"
                }`}
                style={{
                  boxShadow: "10px 10px rgba(0, 0, 0, 2)",
                }}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div className="pt-[20px] pb-4 px-4">
                  <h2 className="text-base sm:text-lg font-bold mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    {card.caption}
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-white text-[#161D6F] px-4 py-1 rounded-md text-sm sm:text-base mb-3"
                      onClick={() => handleOpenModal(card)}
                    >
                      Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex < cards.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-300 text-[#161D6F] rounded-full p-2 m-4"
        >
          Next
        </button>
      )}

      {isModalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-[1000px] w-full dark:bg-boxdark">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-white"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Detail Galeri
            </h2>
            <div className="flex  gap-4">
              <div className="relative w-[85%] h-[500px]">
                <Image
                  src={modalContent.imageSrc}
                  alt={modalContent.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <p className="w-1/2 text-gray-600 dark:text-gray-300">
                {modalContent.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
