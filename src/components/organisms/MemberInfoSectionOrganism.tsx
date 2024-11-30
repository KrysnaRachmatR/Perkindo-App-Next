"use client"; // Harus di bagian paling atas

import { useState, useEffect } from "react";
import axios from "axios";

const MemberInfoSectionOrganism = () => {
  const [infoItems, setInfoItems] = useState<string[]>([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/layanan/member_info"
        );
        setInfoItems(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#161D6F] text-white flex flex-col lg:flex-row">
      {/* Kolom kiri */}
      <div className="lg:w-1/2 flex items-center justify-center text-center py-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold space-y-2">
            <span className="block">Informasi</span>
            <span className="block">Kartu Tanda</span>
            <span className="block">Anggota</span>
          </h2>
        </div>
      </div>

      {/* Kolom kanan */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end py-10">
        <div className="bg-white text-black p-6 w-full max-w-2xl flex flex-col items-start lg:items-end">
          <ol className="space-y-4">
            {infoItems.length === 0 ? (
              <p className="text-gray-500">Tidak ada data yang tersedia.</p>
            ) : (
              infoItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start border-b border-gray-300 pb-4 last:border-none"
                >
                  <div className="bg-yellow-500 text-black rounded-full flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] mr-4">
                    {index + 1}
                  </div>
                  <p className="text-sm md:text-base mt-2">{item}</p>
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default MemberInfoSectionOrganism;
