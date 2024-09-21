import React from "react";
import Image from "next/image";

interface AvatarProps {
  imageUrl: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, alt }) => {
  return <Image src={imageUrl} alt={alt} className="rounded-full w-12 h-12" />;
};

export default Avatar;
