"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState<any[]>([]);
  const [activeKTAs, setActiveKTAs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchKTAs();
      fetchActiveKTAs();
    } else {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
  }, []);

  const fetchKTAs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/kta/all-pending");
      setKtas(response.data.data || []);
    } catch (err: any) {
      setError("Terjadi kesalahan saat mengambil data KTA pending.");
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveKTAs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/kta");
      setActiveKTAs(response.data || []);
    } catch (err: any) {
      setError("Terjadi kesalahan saat mengambil data KTA aktif.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    const no_kta = prompt("Masukkan Nomor KTA (Bebas diisi):");
    if (confirm("Apakah Anda yakin ingin Menerima pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/kta/approve/${id}`, {
          status_diterima: "approve",
          no_kta,
        });
        alert("Pendaftaran berhasil diterima.");
        fetchKTAs();
      } catch (err: any) {
        alert("Gagal menerima pendaftaran.");
      }
    }
  };

  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    if (confirm("Apakah Anda yakin ingin menolak pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/kta/approve/${id}`, {
          status_diterima: "rejected",
          komentar,
        });
        alert("Pendaftaran berhasil ditolak.");
        fetchKTAs();
      } catch (err: any) {
        alert("Gagal menolak pendaftaran.");
      }
    }
  };

  const handleDownload = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kta/download/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? decodeURIComponent(contentDisposition.split("filename=")[1]?.replace(/"/g, ""))
        : `KTA_${userId}.zip`;

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("File berhasil diunduh!");
    } catch (err: any) {
      console.error("Gagal mengunduh file:", err);
      alert("Gagal mengunduh file.");
    }
  };

  // 🔍 Filter berdasarkan pencarian untuk tab Pending
  const filteredKTAs = ktas.filter(
    (kta) =>
      kta.nama_perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kta.nama_direktur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kta.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔍 Filter berdasarkan pencarian untuk tab Aktif
  // const filteredActiveKTAs = activeKTAs.filter(
  //   (kta) =>
  //     kta.nama_perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.nama_direktur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.email?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Validasi KTA</h1>

      {/* Tab Selector */}
      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 0
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 1
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Aktif
        </button>
      </div>

      {/* =================== PENDING TAB =================== */}
      {activeTab === 0 && (
        <div>
          <div className="mb-4">
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "No",
                    "Nama Perusahaan",
                    "Nama Direktur",
                    "Email",
                    "Alamat",
                    "Kota/Kabupaten",
                    "Tanggal Daftar",
                    "Aksi",
                  ].map((head) => (
                    <th key={head} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredKTAs.length > 0 ? (
                  filteredKTAs.map((kta, index) => (
                    <tr key={kta.id}>
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{kta.nama_perusahaan}</td>
                      <td className="px-4 py-2 text-sm">{kta.nama_direktur}</td>
                      <td className="px-4 py-2 text-sm">{kta.email}</td>
                      <td className="px-4 py-2 text-sm">{kta.alamat_perusahaan}</td>
                      <td className="px-4 py-2 text-sm">{kta.kota_kabupaten}</td>
                      <td className="px-4 py-2 text-sm">{kta.created_at}</td>
                      <td className="px-4 py-2 space-y-2">
                        <button
                          onClick={() => handleApprove(kta.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleReject(kta.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleDownload(kta.user_id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                        >
                          Unduh File
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================== AKTIF TAB =================== */}
      {activeTab === 1 && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan nama perusahaan, direktur, atau email"
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "No",
                    "Nama Perusahaan",
                    "Nama Direktur",
                    "Email",
                    "Alamat",
                    "Kota/Kabupaten",
                    "Nomor KTA",
                    "Tanggal Daftar",
                    "Tanggal Expired",
                    "Aksi",
                  ].map((head) => (
                    <th key={head} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActiveKTAs.length > 0 ? (
                  filteredActiveKTAs.map((kta, index) => (
                    <tr key={kta.id}>
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{kta.nama_perusahaan}</td>
                      <td className="px-4 py-2 text-sm">{kta.nama_direktur}</td>
                      <td className="px-4 py-2 text-sm">{kta.email}</td>
                      <td className="px-4 py-2 text-sm">{kta.alamat_perusahaan}</td>
                      <td className="px-4 py-2 text-sm">{kta.kota_kabupaten}</td>
                      <td className="px-4 py-2 text-sm">{kta.no_kta}</td>
                      <td className="px-4 py-2 text-sm">{kta.tanggal_diterima}</td>
                      <td className="px-4 py-2 text-sm">{kta.expired_at}</td>
                      <td className="px-4 py-2 space-y-2">
                        <button
                          onClick={() => handleDownload(kta.user_id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                        >
                          Unduh File
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiKTA;
