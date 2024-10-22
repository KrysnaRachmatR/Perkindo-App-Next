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

      <div className="overflow-hidden w-full max-w-[1100px]">
        <div
          className="flex transition-transform duration-300 gap-4"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCardsCount}%)`,
            transition: "transform 0.5s ease-in-out",
            willChange: "transform",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[calc(100%/${visibleCardsCount})] transition-transform duration-300 relative`}
            >
              <div
                className={`bg-[#161D6F] rounded-[15px] shadow-lg overflow-hidden w-full h-auto text-white relative ${
                  index === currentIndex
                    ? "scale-105 opacity-100"
                    : "scale-90 opacity-50"
                }`}
              >
                <div className="relative w-full h-[180px]">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover rounded-t-[15px]"
                  />
                </div>
                <div className="pt-[180px] pb-4 px-4">
                  <h2 className="text-base sm:text-lg font-bold mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    {card.caption}
                  </p>
                  <div className="flex justify-center mt-4">
                    <button className="bg-white text-[#161D6F] px-4 py-1 rounded-[20px] text-sm sm:text-base">
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
    </div>
  );
};

export default Card;
