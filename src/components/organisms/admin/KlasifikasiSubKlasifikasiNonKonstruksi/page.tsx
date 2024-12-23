"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const KlasifikasiSubKlasifikasiNonKons = () => {
  const [klasifikasis, setKlasifikasis] = useState([]);
  const [namaKlasifikasi, setNamaKlasifikasi] = useState("");
  const [namaSubKlasifikasi, setNamaSubKlasifikasi] = useState("");
  const [sbuCode, setSbuCode] = useState("");
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data Klasifikasi
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/non-konstruksi/klasifikasis")
      .then((response) => {
        const klasifikasis = response.data.data;
        if (Array.isArray(klasifikasis)) {
          setKlasifikasis(klasifikasis);
        } else {
          console.error("Data klasifikasis tidak dalam format yang diharapkan");
        }
      })
      .catch((error) => {
        console.error("Error fetching klasifikasis:", error);
      });
  }, []);

  // Handle submit Klasifikasi
  const handleSubmitKlasifikasi = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/non-konstruksi/klasifikasis",
        {
          nama: namaKlasifikasi, // Data yang akan dikirim
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Header diatur di parameter ketiga
          },
        }
      );

      alert("Klasifikasi berhasil ditambahkan!");
      setNamaKlasifikasi("");
      window.location.reload(); // Reload untuk memperbarui daftar klasifikasi
    } catch (error) {
      console.error("Error adding klasifikasi:", error);
      alert("Gagal menambah klasifikasi.");
    }
  };

  // Handle submit SubKlasifikasi
  const handleSubmitSubKlasifikasi = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    const token = localStorage.getItem("token");

    if (!selectedKlasifikasi) {
      alert("Pilih klasifikasi terlebih dahulu.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/non-konstruksi/klasifikasis/${selectedKlasifikasi}/sub-klasifikasis`,
        {
          klasifikasi_id: selectedKlasifikasi,
          nama: namaSubKlasifikasi,
          sbu_code: sbuCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("SubKlasifikasi berhasil ditambahkan!");
      setNamaSubKlasifikasi("");
      setSbuCode("");
    } catch (error) {
      console.error("Error adding subklasifikasi:", error);
      alert("Gagal menambah subklasifikasi.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Manajemen Klasifikasi & SubKlasifikasi Non Konstruksi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Tambah Klasifikasi */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tambah Klasifikasi</h2>
          <form onSubmit={handleSubmitKlasifikasi}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama Klasifikasi
              </label>
              <input
                type="text"
                className="mt-1 block w-full h-10 p-2 rounded-md border-black border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={namaKlasifikasi}
                onChange={(e) => setNamaKlasifikasi(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Simpan
            </button>
          </form>
        </div>

        {/* Form Tambah SubKlasifikasi */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tambah SubKlasifikasi</h2>
          <form onSubmit={handleSubmitSubKlasifikasi}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pilih Klasifikasi
              </label>
              <select
                className="mt-1 block w-full h-10 p-2 rounded-md border-black border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedKlasifikasi}
                onChange={(e) => setSelectedKlasifikasi(e.target.value)} // Hanya set state
                required
              >
                <option value="">-- Pilih Klasifikasi --</option>
                {klasifikasis.map((klasifikasi) => (
                  <option key={klasifikasi.id} value={klasifikasi.id}>
                    {klasifikasi.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama SubKlasifikasi
              </label>
              <input
                type="text"
                className="mt-1 block w-full h-10 p-2 rounded-md border-black border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={namaSubKlasifikasi}
                onChange={(e) => setNamaSubKlasifikasi(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Kode SBU
              </label>
              <input
                type="text"
                className="mt-1 block w-full h-10 p-2 rounded-md border-black border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={sbuCode}
                onChange={(e) => setSbuCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KlasifikasiSubKlasifikasiNonKons;
