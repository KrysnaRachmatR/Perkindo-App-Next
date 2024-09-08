"use client"; // Menandakan bahwa ini adalah Client Component

import { useState, useEffect } from "react";
import Navbar from "@/components/organisms/navbar";

const backgroundImages = [
  "/images/konstruksi.jpg",
  "/images/konstruksi2.jpg",
  "/images/konstruksi3.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = backgroundImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % backgroundImages.length;
        return backgroundImages[nextIndex];
      });
    }, 3000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Memastikan background menutupi seluruh layar
          width: "100vw",
          position: 'absolute',
          top: 0,
          left:0,
          opacity:1,
          transition: 'background-image 1s ease-in-out', // Transisi halus saat gambar berganti
        }}
      >
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Selamat Datang di PERKINDO</h1>
        </div>
      </div>
      <div className="bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Konten Utama</h2>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
          </p>
          <p className="text-lg mb-4">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor suscipit, eget rhoncus libero bibendum. Nulla condimentum turpis sed augue feugiat, id scelerisque mauris venenatis.
          </p>
          <p className="text-lg mb-4">
            Ut tristique purus nec augue fermentum, sed tincidunt felis lacinia. Nunc id ultrices libero. Integer ut erat magna. Sed tempus massa et libero gravida, non gravida turpis auctor. Nam eget mauris nec augue sodales auctor ut non ligula. Aliquam erat volutpat. Phasellus sit amet ipsum arcu. In nec ipsum mauris. Aliquam erat volutpat.
          </p>
          <p className="text-lg mb-4">
            Mauris facilisis, urna at fermentum sagittis, orci sapien bibendum risus, nec maximus metus magna vel nisl. Vestibulum euismod, purus nec congue luctus, metus odio pharetra libero, ut condimentum arcu justo sit amet metus. Fusce viverra, orci sit amet sollicitudin sodales, purus odio tristique dolor, nec scelerisque dolor erat nec urna. Vivamus vulputate lorem vitae magna vestibulum, sed pellentesque justo pharetra.
          </p>
          <div className="h-96"></div> {/* Tambahkan ruang kosong untuk memastikan scroll */}
        </div>
      </div>
    </>
  );
}
