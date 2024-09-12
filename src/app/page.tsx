"use client"; // Menandakan bahwa ini adalah Client Component

import { useState, useEffect } from "react";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";
import Card from "@/components/molecules/card";
import ContentSection from "@/components/molecules/contentSection";

const backgroundImages = [
  "/images/konstruksi.jpg",
  "/images/konstruksi2.jpg",
  "/images/konstruksi3.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = backgroundImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % backgroundImages.length;
        return backgroundImages[nextIndex];
      });
    }, 3000); // Ganti gambar setiap 3 detik

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
          width: "99,9vw",
          position: "relative", // Agar bisa di-scroll bersama konten
          opacity: 1,
          transition: "background-image 2s ease-in-out", // Transisi halus saat gambar berganti
        }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-start h-full pl-1">
          <div className="text-left">
            <h1 className="text-white text-4xl font-bold mb-1">
              Persatuan Konsultan Indonesia
              <br />
              Kalimantan Barat
            </h1>
            <p className="text-white text-lg border-l-[6px] border-[#CCEABB] backdrop-blur-lg bg-white/10 px-4 py-1 inline-block rounded-lg">
              Asosiasi Perusahaan Konsultan Perencana dan Pengawas
            </p>
            <div className="mt-[10px]">
              <button className="bg-[#161D6F]  text-white px-6 py-1 rounded-[10px]">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Pelayanan */}
      <div className="bg-[#161D6F] text-white py-16 px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">
            Pelayanan
            <br />
            Persatuan Konsultan Indonesia
          </h1>
        </div>
        <div className="text-left space-y-4">
          <p className="text-lg">
            Organisasi PERKINDO sebagai organisasi Nirlaba tentu mempunyai
            keterbatasan ruang gerak dalam melayani kebutuhan anggotanya, baik
            dari segi kapasitas sumber daya tenaga dan pendanaan untuk dapat
            secara cepat memenuhi kebutuhan anggota yang tersebar di seluruh
            Indonesia. Sadar akan hal tersebut dan untuk mendapatkan solusi
            penyelesaian yang saling menguntungkan, maka DPP PERKINDO Bersama
            DPD di seluruh Indonesia berembug untuk memutuskan membentuk
            Jejaring anak organisasi yang ditugaskan untuk menjalanlan roda
            organisasi dalam lingkup tugas yang khusus guna melayani kebutuhan
            anggota secara cepat, terukur dan murah seperti :
          </p>
          <p className="text-lg">
            1. Melayani penerimaan anggota baru dan peningkatan klasifikasi
            anggota yang sudah terdaftar.
          </p>
          <p className="text-lg">
            2. Melayani dan melakukan pelatihan serta pembinaan para anggota
            untuk meningkatkan profesionalisme dan kemampuan dalam melaksanakan
            tugas-tugas sesuai keilmuan dibidangnya masing masing.
          </p>
          <p className="text-lg">
            3. Melayani Pembuatan Pembuatan Berbagai Macam Sertifikat untuk:
            Sertifikat Badan Usaha, Pembuatan Sertifikat Kompetensi (SKK)
          </p>
          <p className="text-lg">
            4. Melayani pembentukan tempat tempat Pelayanan anggota yang
            membutuhkan peningkatan Kompetensi yaitu Tempat Uji Kompetensi
            (TUK).
          </p>
          <p className="text-lg mt-4">
            Untuk melakukan hal tersebut di atas, maka PERKINDO membentuk /
            mendirikan Sayap /Anak Organisasi yaitu LSBU PT. SERBUJAKONS (PT.
            Sertifikat Badan Usaha Jasa Konsultansi), Asosiasi Profesi
            PERTAHKINDO (Persatuan Tenaga Ahli Konsultan Indonesia), dan PT. LSP
            PERTAHKINDO KONSTRUKSI NASIONAL (LSP PERTAKONAS).
          </p>
        </div>
      </div>

      {/* Menu Galeri */}
      <div className="flex flex-wrap justify-center gap-8 p-8">
      <Card
        imageSrc="/images/konstruksi3.jpg"
        title="Card Title 1"
        caption="Card Caption 1"
      />
      <Card
        imageSrc="/images/konstruksi3.jpg"
        title="Card Title 2"
        caption="Card Caption 2"
      />
      <Card
        imageSrc="/images/konstruksi3.jpg"
        title="Card Title 2"
        caption="Card Caption 2"
      />

    </div>

      <div>
        <ContentSection />
      </div>

      {/* Konten lainnya jika ada */}

      <Footer />
    </>
  );
}
