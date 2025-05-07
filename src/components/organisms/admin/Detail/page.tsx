"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, ShieldCheck, User2 } from "lucide-react";

const UserDetailTable = () => {
  // kamu bisa taruh state dan useEffect di sini nanti
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    // contoh kalau mau fetch data pakai axios nanti
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/detail/");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-6">

      {/* <h1 className="text-2xl font-bold mb-4 text-center">MAINTENCE PROCESS</h1> */}
      {loading && (
        <p className="text-center text-gray-500">Sedang memuat data...</p>
      )}




      <h2 className="text-2xl font-bold mb-6">Detail User</h2>

      {/* Section atas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu Profil */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <img
            src="/images/default-avatar.jpg"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Krisna Rachmat</h3>
          <p className="text-sm text-gray-500">Administrator</p>
          <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">
            Aktif
          </span>
        </div>

        {/* Info Akun */}
        <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
          <h4 className="text-md font-semibold mb-4">Informasi Akun</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">krisna@email.com</p>
            </div>
            <div>
              <p className="text-gray-500">No. Telepon</p>
              <p className="font-medium">+62 812 3456 7890</p>
            </div>
            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium">Admin</p>
            </div>
            <div>
              <p className="text-gray-500">Tanggal Pendaftaran</p>
              <p className="font-medium">12 Januari 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Tambahan */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h4 className="text-md font-semibold mb-4">Informasi Tambahan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Alamat</p>
            <p className="font-medium">Jl. Melati No. 123, Jakarta</p>
          </div>
          <div>
            <p className="text-gray-500">Terakhir Login</p>
            <p className="font-medium">07 Mei 2025 - 14:32 WIB</p>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6 flex gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-blue-700">
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-700">
          <Trash2 className="w-4 h-4" /> Hapus
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          <ShieldCheck className="w-4 h-4" /> Nonaktifkan
        </button>
      </div>
    </div>
  );
};

export default UserDetailTable;
