"use client";

import Image from 'next/image';

type CardProps = {
  imageSrc: string;
  title: string;
  caption: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, title, caption }) => {
  return (
    <div className="bg-[#161D6F] rounded-[15px] shadow-lg overflow-hidden w-full sm:w-[300px] h-auto text-white relative transition-transform transform hover:scale-105 hover:animate-slide-down">
      <div className="relative w-full h-[180px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-t-[15px]"
        />
      </div>
      <div className="pt-[180px] pb-4 px-4"> {/* Adjust padding to position content below the image */}
        <h2 className="text-base sm:text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-200 mb-4 text-sm sm:text-base">{caption}</p>
        <div className="flex justify-center mt-4"> {/* Margin top 4px */}
          <button className="bg-white text-[#161D6F] px-4 py-1 rounded-[20px] text-sm sm:text-base">
            Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
