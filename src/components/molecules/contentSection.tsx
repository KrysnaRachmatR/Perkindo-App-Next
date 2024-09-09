"use client";

import Image from 'next/image';

const ContentSection: React.FC = () => {
  return (
    <div className="bg-[#161D6F] min-h-screen flex flex-row p-8 gap-8">
      {/* Content on the left */}
      <div className="flex-1 text-white">
        <h1 className="text-3xl font-bold mb-4">Informasi PERKINDO</h1>
        <p className="text-lg mb-4">Ada apa di PERKINDO?</p>
        <div className="relative w-full h-[223px] mb-4">
          <Image
            src="/images/konstruksi3.jpg"
            alt="Gambar Utama"
            fill
            className="rounded-lg"
          />
        </div>
        <p className="text-gray-200">DPD Perkindo Kalimantan Barat melakukan audiensi bersama Bidang Jasa Konstruksi Dinas Pekerjaan Umum dan Penataan Ruang Provinsi Kalimantan Barat.</p>
      </div>

      {/* News section on the right */}
      <div className="w-[400px] h-[500px] border-l-[13px] border-[#98DED9] p-4 bg-white text-black rounded-lg">
        <h2 className="text-xl font-bold mb-4">Berita Terbaru</h2>
        <div className="space-y-3">
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-md font-semibold">Peresmian Jembatan Kaliurang</h3>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-md font-semibold">Akselerasi Pelayanan pada Anggota, Layanan PERKINDO Transisi ke Digital</h3>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-md font-semibold">Pengurus KADIN Indonesia melakukan kunjungan ke DPP PERKINDO</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
