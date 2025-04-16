"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState<any[]>([]);
  const [activeKTAs, setActiveKTAs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
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
    if (!userId) {
      alert("ID user tidak valid.");
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:8000/api/kta/download/${userId}`, // 🔥 FIXED: Template string JS
        {
          responseType: "blob", // ⬅ penting agar bisa download binary file (ZIP)
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement("a");
      link.href = url;
  
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? decodeURIComponent(
            contentDisposition.split("filename=")[1]?.replace(/"/g, "")
          )
        : `KTA_${userId}.zip`;
  
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      alert("File berhasil diunduh!");
    } catch (err: any) {
      console.error("Gagal mengunduh file:", err?.response || err);
      alert("Gagal mengunduh file. Silakan periksa server atau koneksi Anda.");
    }
  };
  
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    if (!file || !ktaId || !token) return;

    const formData = new FormData();
    formData.append("kta_file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/kta/upload/${ktaId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Validasi KTA</h1>
  
      {/* Tab Selector */}
      <div className="flex mb-3 space-x-4">
        <button
          onClick={() => setActiveTab(0)}
          disabled={loading}
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
          disabled={loading}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 1
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Aktif
        </button>
      </div>
  
      {/* Pending Tab */}
      {activeTab === 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">KTA Pending</h2>
  
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
  
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {["No", "Nama Perusahaan", "Nama Direktur", "Email", "Alamat", "Kota / Kabupaten", "Aksi"].map((head) => (
                    <th
                      key={head}
                      className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        head === "Aksi" ? "text-center" : "text-left"
                      }`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ktas.length > 0 ? (
                  ktas.map((kta, index) => (
                    <tr key={kta.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{kta.nama_perusahaan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_direktur}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.alamat_perusahaan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.kota_kabupaten}</td>
                      <td className="px-4 py-3 text-center space-y-2">
                        <button
                          onClick={() => handleApprove(kta.id)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-md transition transform hover:scale-105"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleReject(kta.id)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 text-white text-sm font-medium rounded-lg shadow-md transition transform hover:scale-105"
                          style={{ backgroundColor: "#BE3D2A" }}
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleDownload(kta.user_id)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                        >
                          Unduh File
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
  
      {/* Aktif Tab */}
      {activeTab === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">KTA Aktif</h2>
  
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
  
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {["No", "Nama Perusahaan", "Nama Direktur", "Alamat", "Email","Status","Aksi",].map((head) => (
                    <th
                      key={head}
                      className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        head === "Aksi" ? "text-center" : "text-left"
                      }`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeKTAs.length > 0 ? (
                  activeKTAs.map((kta, index) => (
                    <tr key={kta.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{kta.nama_perusahaan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_direktur}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.alamat_perusahaan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.status_aktif}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDownload(kta.user_id)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                        >
                          Unduh
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data
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
