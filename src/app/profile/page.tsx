"use client";

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/organisms/navbar';
import Footer from '@/components/organisms/footer';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mengambil data dari API
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile');  // Ganti dengan URL backend Anda
        setProfileData(response.data.data);  // Mengambil data dari response
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>Data profil tidak ditemukan</p>;
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative w-full h-[33rem]">
        <Image
          src={`http://localhost:8000/storage/${profileData.header_image}`} // Menambahkan path lengkap
          alt="Header Image"
          layout="fill"
          objectFit="cover"
          priority/>

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
            {profileData.title || 'Konten tidak tersedia.'}
          </p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="relative w-full bg-slate-200 flex-grow">
        {/* Konten 1 */}
        <div
          className="flex items-center justify-center bg-slate-200"
          style={{ minHeight: '20rem' }}
        >
          <div className="w-full max-w-4xl p-8 md:p-12 lg:p-16 bg-[#161D6F] text-white rounded-lg mt-8">
            <p className="text-sm md:text-base lg:text-lg leading-relaxed">
              {profileData.section1 || 'Konten tidak tersedia.'}
            </p>
          </div>
        </div>

        {/* Konten Visi dan Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 mt-8">
          {/* Visi */}
          <div className="bg-white text-black p-8 rounded-lg">
            <h2 className="font-bold text-lg md:text-2xl">VISI</h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              {profileData.visi || 'Konten tidak tersedia.'}
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white text-black p-8 rounded-lg">
            <h2 className="font-bold text-lg md:text-2xl">MISI</h2>
            <ul className="list-disc mt-4 pl-5">
  {profileData.misi && Array.isArray(profileData.misi) && profileData.misi.length > 0
    ? profileData.misi.map((item, index) => {
        // Menghilangkan tanda kutip di sekitar string jika ada
        const cleanItem = item.replace(/"/g, '');
        return <li key={index}>{cleanItem}</li>;
      })
    : <li>Konten misi tidak tersedia.</li>}
</ul>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
