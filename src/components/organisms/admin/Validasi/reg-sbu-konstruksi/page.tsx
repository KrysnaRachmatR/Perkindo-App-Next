"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "@/components/atoms/ToastAlert";
import { useConfirm } from "@/hooks/useConfirm";
import { API_URL } from "@/hooks/ApiConfig";
import { Check, X, Download, Eye } from "lucide-react";

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
  const [toast, setToast] = useState(null);
    const { confirm, Modal } = useConfirm();

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
      const response = await axios.get(`${API_URL}/sbus/pending`);
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
      const response = await axios.get(`${API_URL}/sbus/active`);
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
    // if (keyword.trim() === "") {
    //   setFilteredSbUs([]);
    //   return;
    // }

    // try {
    //   const response = await axios.get(`${API_URL}/sbus/search`, {
    //     params: { keyword },
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     setFilteredSbUs(response.data || []);
    //   } else {
    //     console.warn("Gagal mengambil data:", response.status);
    //     setFilteredSbUs([]);
    //   }
    // } catch (err: any) {
    //   console.error("Error saat pencarian:", err);
    //   setFilteredSbUs([]);
    // }


    const filtered = activeSbUs.filter((sbun) => {
      const perusahaan = sbun.nama_perusahaan?.toLowerCase() || '';
      const direktur = sbun.nama_direktur?.toLowerCase() || '';
      const codeSbu = sbun.sbu_code?.toLowerCase() || '';
  
      return (
        perusahaan.includes(keyword.toLowerCase()) ||
        direktur.includes(keyword.toLowerCase()) ||
        codeSbu.includes(keyword.toLowerCase())
      );
    });
  
    setFilteredSbUs(filtered);
  };

  // Setujui pendaftaran SBU
  const handleApprove = async (id: number) => {
    const confirmed = await confirm("confirm", "Apakah Anda yakin ingin menyetujui pendaftaran ini?");
    if (confirmed) {
      try {
        await axios.put(`${API_URL}/sbus/${id}/status`, {
          status_diterima: "approve",
        });
        setToast({
          message: "Pendaftaran berhasil disetujui!",
          type: "success", // bisa: success, error, warning, info
        });
        fetchSbUs();
        fetchActiveSbUs();
      } catch (err: any) {
        setToast({
          message: err.response?.data?.message || "Gagal menyetujui pendaftaran.",
          type: "error", // bisa: success, error, warning, info
        });
      }
    }
  };

  // Tolak pendaftaran SBU
  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    const confirmed = await confirm("delete", "Apakah Anda yakin ingin menolak pendaftaran ini?");
    if (confirmed) {
      try {
        await axios.put(`${API_URL}/sbus/${id}/status`, {
          status_diterima: "rejected",
          komentar,
        });
        setToast({
          message: "Pendaftaran berhasil ditolak.",
          type: "success", // bisa: success, error, warning, info
        });
        setSbUs((prev) => prev.filter((sbu) => sbu.id !== id));
        fetchActiveSbUs();
      } catch (err: any) {
        setToast({
          message: err.response?.data?.message || "Gagal menolak pendaftaran.",
          type: "error", // bisa: success, error, warning, info
        });
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
        `${API_URL}/sbus/download/${registrationId}`,
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
      setToast({
        message: err.response?.data?.message || "Gagal mengunduh file.",
        type: "error", // bisa: success, error, warning, info
      });
    }
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
  

  // Jalankan saat komponen pertama kali dimuat
  useEffect(() => {
    fetchSbUs();
    fetchActiveSbUs();
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
  
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-md">
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
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 text-center">{index + 1}.</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_direktur}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.alamat_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.sbu_code || "-"}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_klasifikasi || "-"}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_sub_klasifikasi || "-"}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{sbu.created_at ? formatDate(sbu.created_at) : "-"}</td>
                      
                      <td className="px-2 py-3 text-gray-700 dark:text-gray-300 text-center space-y-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleApprove(sbu.id)}
                            className="p-2 rounded-md border border-green-500 text-green-600 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4"/>
                          </button>
                          <button
                            onClick={() => handleReject(sbu.id)}
                            className="mx-2 p-2 rounded-md border border-red-500 text-rose-600 hover:bg-rose-50"
                          >
                            <X className="w-4 h-4"/>
                          </button>
                          <button
                            onClick={() => handleDownload(sbu.id, sbu.nama_perusahaan, sbu.nama_klasifikasi, sbu.nama_sub_klasifikasi)}
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
  
      {/* Section: Aktif */}
      {activeTab === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">SBU Aktif</h2>
  
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari nama perusahaan/direktur/kode SBU"
              className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 focus:ring focus:border-blue-400 transition"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
  
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-md">
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
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 text-center">{index + 1}.</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_direktur}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.alamat_perusahaan}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.sbu_code}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_klasifikasi}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_sub_klasifikasi}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDate(sbu.created_at)}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{formatDate(sbu.expired_at)}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 capitalize text-center">{sbu.status_aktif}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 text-center">
                        <button
                          onClick={() => setDetailData(sbu)}
                          className="p-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4"/>
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
  
          {/* Modal Detail */}
          {detailData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative dark:bg-gray-900">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-2 text-blue-600 text-center">Detail SBU Non Konstruksi</h3>
                <h4 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white text-center">
                  {detailData.nama_perusahaan}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700 dark:text-gray-200">
                  {/* <div><strong>ID:</strong></div>
                  <div>{detailData.id}</div> */}
            
                  <div><strong>Nama Perusahaan:</strong></div>
                  <div>{detailData.nama_perusahaan}</div>
            
                  <div><strong>Nama Direktur:</strong></div>
                  <div>{detailData.nama_direktur}</div>
            
                  <div><strong>Alamat:</strong></div>
                  <div>{detailData.alamat_perusahaan}</div>
            
                  <div><strong>Tanggal Diterima:</strong></div>
                  <div>{detailData.tanggal_diterima}</div>
            
                  <div><strong>Klasifikasi:</strong></div>
                  <div>{detailData.nama_klasifikasi || "-"}</div>
            
                  <div><strong>Sub Klasifikasi:</strong></div>
                  <div>{detailData.nama_sub_klasifikasi || "-"}</div>

                  <div><strong>Kode SBU:</strong></div>
                  <div>{detailData.sbu_code || "-"}</div>
            
                  <div><strong>Rekening Bayar:</strong></div>
                  <div>{detailData.nama_rekening|| "-"}</div>

                  <div><strong>Nomor Rekening:</strong></div>
                  <div>{detailData.nomor_rekening|| "-"}</div>
            
                  <div><strong>Tanggal Expired:</strong></div>
                  <div>{formatDate(detailData.expired_at)}</div>
            
                  <div><strong>Status:</strong></div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                        detailData.status_aktif === "active" ? "bg-green-600" : "bg-rose-600"
                      }`}
                    >
                      {detailData.status_aktif === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {Modal}
    </div>
  );
  
};

export default ValidasiSBUS;
