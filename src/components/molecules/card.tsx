"use client";

import Image from 'next/image';

type CardProps = {
  imageSrc: string;
  title: string;
  caption: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, title, caption }) => {
  return (
    <div className="bg-[#161D6F] rounded-[15px] shadow-lg overflow-hidden w-[300px] h-[500px] text-white relative transition-transform transform hover:scale-105 hover:animate-slide-down">
      <div className="absolute top-[30px] left-[25px] w-[250px] h-[180px]">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-[15px]"
        />
      </div>
      <div className="pt-[210px] pb-4 px-4"> {/* Adjust padding to position content below the image */}
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-200 mb-4">{caption}</p>
        <div className="flex justify-center mt-12"> {/* Margin top 50px */}
          <button className="bg-white text-[#161D6F] px-4 py-1 rounded-[20px]">
            Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
