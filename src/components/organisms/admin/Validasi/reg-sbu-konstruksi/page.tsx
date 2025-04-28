"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

type DetailDataType = any; // Ganti sesuai struktur data detail jika ada

const ValidasiSBUS = () => {
  const [sbUs, setSbUs] = useState<any[]>([]); // Data SBU pending
  const [activeSbUs, setActiveSbUs] = useState<any[]>([]); // Data SBU aktif
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [activeTab, setActiveTab] = useState(0); // Tab aktif (0: pending, 1: aktif)
  const [detailData, setDetailData] = useState<DetailDataType | null>(null); // Data detail
  const [searchKeyword, setSearchKeyword] = useState(""); // Kata kunci pencarian
  const [filteredSbUs, setFilteredSbUs] = useState<any[]>([]); // Hasil pencarian
  const closeModal = () => setDetailData(null);

  // Set token dari localStorage ke header default axios
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Debounce pencarian SBU
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchSbus(searchKeyword);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchKeyword]);

  // Ambil data SBU pending
  const fetchSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/sbus/pending");
      if (response.status === 200) {
        setSbUs(response.data.data || []);
      } else {
        setError("Gagal memuat data SBU pending.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data."
      );
    } finally {
      setLoading(false);
    }
  };

  // Ambil data SBU aktif
  const fetchActiveSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/sbus/active");
      if (response.status === 200) {
        setActiveSbUs(response.data.data || []);
      } else {
        setError("Gagal memuat data SBU aktif.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Terjadi kesalahan saat mengambil data."
      );
    } finally {
      setLoading(false);
    }
  };

  // Cari SBU berdasarkan keyword
  const searchSbus = async (keyword: string) => {
    if (keyword.trim() === "") {
      setFilteredSbUs([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/sbus/search", {
        params: { keyword },
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        setFilteredSbUs(response.data || []);
      } else {
        console.warn("Gagal mengambil data:", response.status);
        setFilteredSbUs([]);
      }
    } catch (err: any) {
      console.error("Error saat pencarian:", err);
      setFilteredSbUs([]);
    }
  };

  // Setujui pendaftaran SBU
  const handleApprove = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menyetujui pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/sbus/${id}/status`, {
          status_diterima: "approve",
        });
        alert("Pendaftaran berhasil disetujui!");
        fetchSbUs();
        fetchActiveSbUs();
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menyetujui pendaftaran.");
      }
    }
  };

  // Tolak pendaftaran SBU
  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    if (confirm("Apakah Anda yakin ingin menolak pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/sbus/${id}/status`, {
          status_diterima: "rejected",
          komentar,
        });
        alert("Pendaftaran berhasil ditolak.");
        setSbUs((prev) => prev.filter((sbu) => sbu.id !== id));
        fetchActiveSbUs();
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menolak pendaftaran.");
      }
    }
  };

  // Unduh file SBU
  const handleDownload = async (
    registrationId: number,
    userId: number,
    klasifikasiId: number,
    subKlasifikasiId: number
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sbus/download/${registrationId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `${userId}_${klasifikasiId}_${subKlasifikasiId}_sbus.zip`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengunduh file.");
    }
  };

  // Jalankan saat komponen pertama kali dimuat
  useEffect(() => {
    fetchSbUs();
    fetchActiveSbUs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Validasi SBU Konstruksi</h1>
  
      {/* Tabs */}
      <div className="flex mb-3 space-x-4">
        {["Pending", "Aktif"].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            disabled={loading}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === idx
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
  
      {/* Section: Pending */}
      {activeTab === 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">SBU Pending</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
  
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {["No", "Nama Perusahaan", "Nama Direktur", "Alamat" ,"kode sbu", "klasifikasi", "sub klasifikasi", "Tanggal Daftar", "Aksi"].map((head) => (
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
                {sbUs.length > 0 ? (
                  sbUs.map((sbu, index) => (
                    <tr key={sbu.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3">{sbu.nama_perusahaan}</td>
                      <td className="px-4 py-3">{sbu.nama_direktur}</td>
                      <td className="px-4 py-3">{sbu.alamat_perusahaan}</td>
                      <td className="px-4 py-3">{sbu.sbu_code || "-"}</td>
                      <td className="px-4 py-3">{sbu.nama_klasifikasi || "-"}</td>
                      <td className="px-4 py-3">{sbu.nama_sub_klasifikasi || "-"}</td>
                      <td className="px-4 py-3">{sbu.created_at || "-"}</td>
                      
                      <td className="px-4 py-3 text-center space-y-2">
                        <button
                          onClick={() => confirm("Yakin ingin menyetujui SBU ini?") && handleApprove(sbu.id)}
                          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition transform hover:scale-105"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleReject(sbu.id)}
                          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition transform hover:scale-105"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleDownload(sbu.id, sbu.nama_perusahaan, sbu.nama_klasifikasi, sbu.nama_sub_klasifikasi)}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                        >
                          Unduh File
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-5 text-gray-500">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
  
      {/* Section: Aktif */}
      {activeTab === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">SBU Aktif</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
  
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan nama perusahaan, direktur, atau kode SBU..."
              className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 focus:ring focus:border-blue-400 transition"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
  
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {["No", "Nama Perusahaan", "Nama Direktur", "Alamat", "Kode SBU", "Klasifikasi", "Sub Klasifikasi","Tanggal Diterima","Sampai Dengan", "Status", "Aksi"].map((head) => (
                    <th key={head} className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${head === "Aksi" ? "text-center" : "text-left"}`}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {(searchKeyword ? filteredSbUs : activeSbUs).length > 0 ? (
                  (searchKeyword ? filteredSbUs : activeSbUs).map((sbu, index) => (
                    <tr key={sbu.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{sbu.nama_perusahaan}</td>
                      <td className="px-4 py-3">{sbu.nama_direktur}</td>
                      <td className="px-4 py-3">{sbu.alamat_perusahaan}</td>
                      <td className="px-4 py-3">{sbu.sbu_code}</td>
                      <td className="px-4 py-3">{sbu.nama_klasifikasi}</td>
                      <td className="px-4 py-3">{sbu.nama_sub_klasifikasi}</td>
                      <td className="px-4 py-3">{sbu.created_at}</td>
                      <td className="px-4 py-3">{sbu.expired_at}</td>
                      <td className="px-4 py-3 capitalize">{sbu.status_aktif}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setDetailData(sbu)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition transform hover:scale-105"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-4 py-5 text-center text-sm text-gray-500">Tidak ada data SBU aktif.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  
          {/* Modal Detail */}
          {detailData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
                >
                  ✕
                </button>
                <h3 className="text-xl font-bold mb-2 text-blue-600">Detail SBU Konstruksi</h3>
                <h4 className="text-lg font-semibold mb-4">{detailData.nama_perusahaan}</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>ID:</strong> {detailData.id}</p>
                  <p><strong>Nama Direktur:</strong> {detailData.nama_direktur}</p>
                  <p><strong>Alamat:</strong> {detailData.alamat_perusahaan}</p>
                  <p><strong>Tanggal Diterima:</strong> {detailData.tanggal_diterima}</p>
                  <p><strong>Klasifikasi:</strong> {detailData.nama_klasifikasi}</p>
                  <p><strong>Sub Klasifikasi:</strong> {detailData.nama_sub_klasifikasi}</p>
                  <p><strong>Rekening:</strong> {detailData.nama_rekening}</p>
                  <p><strong>Tanggal Expired:</strong> {detailData.expired_at}</p>
                  <p><strong>Status:</strong> {detailData.status_aktif === "active" ? "Aktif" : "Tidak Aktif"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default ValidasiSBUS;
