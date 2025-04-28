"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidasiSBUN = () => {
  const [sbUs, setSbUs] = useState<any[]>([]); // State untuk menyimpan data SBU yang pending
  const [activeSbUs, setActiveSbUs] = useState<any[]>([]); // State untuk menyimpan data SBU yang aktif
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [activeTab, setActiveTab] = useState(0);
  const [detailData, setDetailData] = useState<DetailDataType | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredSbUs, setFilteredSbUs] = useState([]);
  const closeModal = () => setDetailData(null);
  

  // Ambil token dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchSbun(searchKeyword);
    }, 300); // debounce 300ms
  
    return () => clearTimeout(delayDebounce);
  }, [searchKeyword]);

  // Fetch data SBU yang pending (Section 1)
  const fetchSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/sbun/all-pending"
      );
      if (response.status === 200) {
        setSbUs(response.data.data || []); // Pastikan response yang diterima sesuai
      } else {
        setError("Gagal memuat data SBU pending.");
      }
    } catch (err: any) {
      if (err.response) {
        // Jika error datang dari server
        setError(
          `Kesalahan: ${
            err.response?.data?.message ||
            "Terjadi kesalahan saat mengambil data."
          }`
        );
      } else {
        // Jika error datang dari jaringan
        setError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchSbun = async (keyword: string) => {
    if (keyword.trim() === "") {
      setFilteredSbUs([]);
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8000/api/sbun/search", {
        params: { keyword },
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const results = response.data;
        setFilteredSbUs(results);
      } else {
        console.warn("Gagal mengambil data:", response.status);
        setFilteredSbUs([]);
      }
    } catch (error: any) {
      console.error("Error saat pencarian:", error);
      setFilteredSbUs([]);
    }
  };
  

  const fetchActiveSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/sbun/active");
      console.log(response.data);
      if (response.status === 200) {
        setActiveSbUs(response.data.data || []); // Pastikan response yang diterima sesuai
      } else {
        setError("Gagal memuat data SBU aktif.");
      }
    } catch (err: any) {
      if (err.response) {
        // Jika error datang dari server
        setError(
          `Kesalahan: ${
            err.response?.data?.message ||
            "Terjadi kesalahan saat mengambil data."
          }`
        );
      } else {
        // Jika error datang dari jaringan
        setError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Approve SBU
  const handleApprove = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menyetujui pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/sbun/${id}/status`, {
          status_diterima: "approve", // Menyetujui SBU
        });
        alert("Pendaftaran berhasil disetujui!");
        fetchSbUs(); // Refresh data setelah approve
        fetchActiveSbUs(); // Refresh data SBU aktif setelah approval
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menyetujui pendaftaran.");
      }
    }
  };

  // Reject SBU
  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    if (confirm("Apakah Anda yakin ingin menolak pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/sbun/${id}/status`, {
          status_diterima: "rejected", // Menolak SBU
          komentar, // Menambahkan komentar jika ditolak
        });
        alert("Pendaftaran berhasil ditolak.");

        // Menghapus item yang ditolak dari state sbUs
        setSbUs((prevSbUs) => prevSbUs.filter((sbu) => sbu.id !== id));

        // Refresh data SBU yang pending
        fetchActiveSbUs(); // Refresh data setelah reject
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menolak pendaftaran.");
      }
    }
  };

  // Download SBU
  const handleDownload = async (registrationId: number, userId: number, klasifikasiId: number, subKlasifikasiId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sbun/download/${registrationId}`,
        {
          responseType: "blob",
        }
      );
  
      // Membuat URL untuk file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
  
      // Nama file sesuai dengan format yang diinginkan
      const filename = `${userId}_${klasifikasiId}_${subKlasifikasiId}_sbun.zip`;
  
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengunduh file.");
    }
  };
  
  
  useEffect(() => {
    fetchSbUs(); // Ambil SBU pending
    fetchActiveSbUs(); // Ambil SBU yang sudah disetujui
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Validasi SBU Non Konstruksi</h1>
      {/* Tabs */}
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
  
      {/* SECTION: Pending */}
      {activeTab === 0 && (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">SBU Pending</h2>

    {loading && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}

    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {["No", "Nama Perusahaan", "Nama Direktur", "Alamat", "klasifikasi","sub klasifikasi", "kode sbu", "Tanggal Daftar", "Aksi"].map((head) => (
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
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{sbu.nama_perusahaan}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_direktur}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.alamat_perusahaan}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_klasifikasi || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.nama_sub_klasifikasi || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.sbu_code || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sbu.created_at || "-"}</td>
                <td className="px-4 py-3 text-center space-y-2">
                <button
                    onClick={() => {
                      if (confirm("Yakin ingin menyetujui SBU ini?")) {
                        handleApprove(sbu.id);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() => handleReject(sbu.id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-white text-sm font-medium rounded-lg shadow-md transition transform hover:scale-105"
                    style={{ backgroundColor: "#BE3D2A" }}
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() =>handleDownload(
                    sbu.id, 
                    sbu.nama_perusahaan, 
                    sbu.nama_klasifikasi, 
                    sbu.nama_sub_klasifikasi 
                  )
                  }
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                >
                  Unduh File
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center py-5 text-gray-500 dark:text-gray-400">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
  
      {/* SECTION: Aktif */}
      {activeTab === 1 && (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">SBU Aktif</h2>

    {loading && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {/* Input Pencarian */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Cari berdasarkan nama perusahaan, direktur, atau kode SBU..."
        className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring focus:border-blue-400 transition"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>

    {/* Tabel Data */}
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {["No", "Nama Perusahaan", "Nama Direktur", "Alamat", "Kode SBU", "Klasifikasi", "Sub Klasifikasi","Tanggal Diterima","Sampai Dengan", "Status", "Aksi"].map((head) => (
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
        <tbody className="divide-y divide-gray-200 text-sm text-gray-700 dark:text-gray-300">
          {(searchKeyword ? filteredSbUs : activeSbUs).length > 0 ? (
            (searchKeyword ? filteredSbUs : activeSbUs).map((sbu: any, index: number) => (
              <tr key={sbu.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{sbu.nama_perusahaan}</td>
                <td className="px-4 py-3">{sbu.nama_direktur}</td>
                <td className="px-4 py-3">{sbu.alamat_perusahaan}</td>
                <td className="px-4 py-3">{sbu.sbu_code}</td>     
                <td className="px-4 py-3">{sbu.nama_klasifikasi}</td>
                <td className="px-4 py-3">{sbu.nama_sub_klasifikasi}</td>
                <td className="px-4 py-3">{sbu.tanggal_diterima}</td>
                <td className="px-4 py-3">{sbu.expired_at}</td>
                <td className="px-4 py-3 capitalize">{sbu.status_aktif}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setDetailData(sbu)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition transform hover:scale-105"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                Tidak ada data SBU aktif.
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
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-2 text-blue-600 text-center">Detail SBU Non Konstruksi</h3>
        <h4 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white text-center">
          {detailData.nama_perusahaan}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700 dark:text-gray-200">
          <div><strong>ID:</strong></div>
          <div>{detailData.id}</div>
    
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
          <div>{detailData.expired_at}</div>
    
          <div><strong>Status:</strong></div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                detailData.status_aktif === "active" ? "bg-green-600" : "bg-red-600"
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
</div>
  ); 
};

export default ValidasiSBUN;
