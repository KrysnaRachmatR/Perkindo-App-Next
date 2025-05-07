"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Toast from "@/components/atoms/ToastAlert";
import { useConfirm } from "@/hooks/useConfirm";
import { API_URL } from "@/hooks/ApiConfig";
import { Check, X, Download, Eye } from "lucide-react";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState<any[]>([]);
  const [activeKTAs, setActiveKTAs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredKta, setFilteredKta] = useState([]);
  
  const [toast, setToast] = useState(null);
    const { confirm, Modal } = useConfirm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchKTAs();
      fetchActiveKTAs();
    }
  }, []);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
        searchActiveKta(searchKeyword);
      }, 300); // debounce 300ms
    
      return () => clearTimeout(delayDebounce);
  }, [searchKeyword]);

  const fetchKTAs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/kta/all-pending`);
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
      const response = await axios.get(`${API_URL}/kta`);
      setActiveKTAs(response.data.data || []);
    } catch (err: any) {
      setError("Terjadi kesalahan saat mengambil data KTA aktif.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    const no_kta = prompt("Masukkan Nomor KTA (Bebas diisi):");
    const confirmed = await confirm("confirm", "Apakah Anda yakin ingin Menerima pendaftaran ini?");
    if (confirmed) {
      try {
        await axios.put(`${API_URL}/kta/approve/${id}`, {
          status_diterima: "approve",
          no_kta,
        });
        setToast({
          message: "Pendaftaran berhasil diterima.",
          type: "success", // bisa: success, error, warning, info
        });
        fetchKTAs();
      } catch (err: any) {
        setToast({
          message: "Gagal menerima pendaftaran.",
          type: "error", // bisa: success, error, warning, info
        });
      }
    }
  };

  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    const confirmed = await confirm("delete", "Apakah Anda yakin ingin menolak pendaftaran ini?");
    if (confirmed) {
      try {
        await axios.put(`${API_URL}/kta/approve/${id}`, {
          status_diterima: "rejected",
          komentar,
        });
        setToast({
          message: "Pendaftaran berhasil ditolak.",
          type: "success", // bisa: success, error, warning, info
        });
        fetchKTAs();
      } catch (err: any) {
        setToast({
          message: "Gagal menolak pendaftaran.",
          type: "error", // bisa: success, error, warning, info
        });
      }
    }
  };

  const handleDownload = async (userId: number) => {
    try {
      const response = await axios.get(`${API_URL}/kta/download/${userId}`, {
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
      setToast({
        message: "File berhasil diunduh!",
        type: "success", // bisa: success, error, warning, info
      });
    } catch (err: any) {
      console.error("Gagal mengunduh file:", err);
      setToast({
        message: "Gagal mengunduh file",
        type: "error", // bisa: success, error, warning, info
      });
    }
  };

  // 🔍 Filter berdasarkan pencarian untuk tab Pending
  // const filteredKTAs = ktas.filter(
  //   (kta) =>
  //     kta.nama_perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.nama_direktur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.email?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // 🔍 Filter berdasarkan pencarian untuk tab Aktif
  // const filteredActiveKTAs = activeKTAs.filter(
  //   (kta) =>
  //     kta.nama_perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.nama_direktur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     kta.email?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const searchActiveKta = (keyword: string) => {
    const filtered = activeKTAs.filter((ktaAc) => {
      const perusahaan = ktaAc.nama_perusahaan?.toLowerCase() || '';
      const direktur = ktaAc.nama_direktur?.toLowerCase() || '';
      const email = ktaAc.email?.toLowerCase() || '';
  
      return (
        perusahaan.includes(keyword.toLowerCase()) ||
        direktur.includes(keyword.toLowerCase()) ||
        email.includes(keyword.toLowerCase())
      );
    });
  
    setFilteredKta(filtered);
  };
  
  const formatDate = (rawDate: string): string => {
    // Periksa dan perbaiki jika format ISO memiliki 6 digit milidetik
    let fixedDate = rawDate;
  
    if (/T\d{2}:\d{2}:\d{2}\.\d{6}z?/i.test(rawDate)) {
      // Potong ke 3 digit milidetik dan tambahkan "Z" jika perlu
      fixedDate = rawDate.replace(/(\.\d{3})\d+z?$/i, "$1Z");
    }
  
    const date = new Date(fixedDate);
  
    if (isNaN(date.getTime())) return "Tanggal tidak valid";
  
    return date
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .replace(" ", ", ");
  };

  // hapus nanti
  useEffect(() => {
    fetchKTAs(); 
    fetchActiveKTAs(); 
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}


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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">KTA Aktif</h2>
          <div className="mb-4">
          </div>

          <div className="overflow-x-auto border border-slate-200  rounded-xl shadow-md">
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
                {ktas.length > 0 ? (
                  ktas.map((kta, index) => (
                    <tr key={kta.id}>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 text-center">{index + 1}.</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_direktur}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.email}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.alamat_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.kota_kabupaten}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDate(kta.created_at)}</td>
                      <td className="px-2 py-3 text-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleApprove(kta.id)}
                            className="p-2 rounded-md border border-green-500 text-green-600 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4"/>
                          </button>
                          <button
                            onClick={() => handleReject(kta.id)}
                            className="mx-2 p-2 rounded-md border border-red-500 text-rose-600 hover:bg-rose-50"
                          >
                            <X className="w-4 h-4"/>
                          </button>
                          <button
                            onClick={() => handleDownload(kta.user_id)}
                            className="p-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Download className="w-4 h-4"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="text-rose-500">{error}</p>
                      ) : (
                        <p>Belum ada data</p>
                      )}
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">KTA Pending</h2>
          <div className="mb-4">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari nama perusahaan/direktur/email"
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200  rounded-xl shadow-md">
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
                {(searchKeyword ? filteredKta : activeKTAs).length > 0 ? (
                  (searchKeyword ? filteredKta : activeKTAs).map((kta: any, index: number) => (
                    <tr key={kta.id}>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 text-center">{index + 1}.</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.nama_direktur}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.email}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.alamat_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.kota_kabupaten}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{kta.no_kta}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDate(kta.tanggal_diterima)}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDate(kta.expired_at)}</td>
                      <td className="px-2 py-2 text-center">
                        <button
                          onClick={() => handleDownload(kta.user_id)}
                          className="p-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <Download className="w-4 h-4"/>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="text-rose-500">{error}</p>
                      ) : (
                        <p>Belum ada data</p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {Modal}
    </div>
  );
};

export default ValidasiKTA;
