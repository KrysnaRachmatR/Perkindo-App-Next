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
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
  };

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

      <div className="overflow-hidden w-[1200px]">
        <div
          className="flex justify-center gap-8 w-full transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * 300}px + 250px))`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`transition-transform duration-300 transform ${
                index === currentIndex
                  ? "scale-105 opacity-100"
                  : "scale-90 opacity-50"
              }`}
              style={{ flex: "0 0 auto", width: "300px" }}
            >
              <div className="bg-[#161D6F] rounded-[15px] shadow-lg overflow-hidden w-full h-auto text-white relative transition-transform transform ">
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
                    {card.title}{" "}
                  </h2>
                  <p className="text-gray-200 mb-4 text-sm sm:text-base">
                    {card.caption}{" "}
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
