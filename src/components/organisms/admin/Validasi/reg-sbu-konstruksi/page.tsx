"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidasiSBUS = () => {
  const [sbUs, setSbUs] = useState<any[]>([]); // State untuk menyimpan data SBU yang pending
  const [activeSbUs, setActiveSbUs] = useState<any[]>([]); // State untuk menyimpan data SBU yang aktif
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [activeTab, setActiveTab] = useState(0);
  const [detailData, setDetailData] = useState<number | null>(null);
  const closeModal = () => setDetailData(null);

  // Ambil token dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch data SBU yang pending (Section 1)
  const fetchSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/sbus/pending");
      if (response.status === 200) {
        setSbUs(response.data.data || []); // Pastikan response yang diterima sesuai
      } else {
        setError("Gagal memuat data SBU pending.");
      }
    } catch (err: any) {
      if (err.response) {
        // Jika error datang dari server
        setError(`Kesalahan: ${err.response?.data?.message || "Terjadi kesalahan saat mengambil data."}`);
      } else {
        // Jika error datang dari jaringan
        setError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveSbUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/sbus/active");
      console.log(response.data)
      if (response.status === 200) {
        setActiveSbUs(response.data.data || []); // Pastikan response yang diterima sesuai
      } else {
        setError("Gagal memuat data SBU aktif.");
      }
    } catch (err: any) {
      if (err.response) {
        // Jika error datang dari server
        setError(`Kesalahan: ${err.response?.data?.message || "Terjadi kesalahan saat mengambil data."}`);
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
        await axios.put(`http://localhost:8000/api/sbus/${id}/status`, {
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
      await axios.put(`http://localhost:8000/api/sbus/${id}/status`, {
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
  const handleDownload = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sbus/${userId}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `SBU_${userId}.zip`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();

      link.parentNode?.removeChild(link);
      alert("File berhasil diunduh!");
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
      <h1 className="text-2xl font-bold mb-4">Validasi SBU Konstruksi</h1>
      <div className="flex mb-3">
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

      {/* Section 1: Pending SBU */}
      <div className={activeTab !== 0 ? 'hidden':'block'}>
        <h2 className="text-xl font-semibold mb-2">SBU Pending</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">No</th>
              <th className="border border-gray-200 px-4 py-2">Nama Perusahaan</th>
              <th className="border border-gray-200 px-4 py-2">Nama Direktur</th>
              <th className="border border-gray-200 px-4 py-2">Alamat</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sbUs.length > 0 ? (
              sbUs.map((sbu: any, index: number) => (
                <tr key={sbu.id}>
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.nama_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.nama_direktur}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.alamat_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.status_diterima}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleApprove(sbu.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sbu.id)}
                      className="bg-red text-white px-4 py-2 rounded mr-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDownload(sbu.user_id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  Tidak ada data SBU pending.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section 2: Active SBU */}
      <div className={activeTab !== 1 ? 'hidden':'block'}>
        <h2 className="text-xl font-semibold mb-2">SBU Aktif</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">No</th>
              <th className="border border-gray-200 px-4 py-2">Nama Perusahaan</th>
              <th className="border border-gray-200 px-4 py-2">Nama Direktur</th>
              <th className="border border-gray-200 px-4 py-2">Alamat</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeSbUs.length > 0 ? (
              activeSbUs.map((sbu: any, index: number) => (
                <tr key={sbu.id}>
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.nama_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.nama_direktur}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.alamat_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{sbu.status_aktif}</td>
                  <button 
                    onClick={() => setDetailData(sbu)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 ml-2 mt-2 mb-2 text-center rounded">
                    Detail
                  </button>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  Tidak ada data SBU aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
         {/* Modal Detail */}
        {detailData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-2xl w-[500px] relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
              <h3 className="text-2xl font-extrabold mb-4">Detail SBU Non Konstruksi <br/> {detailData.nama_perusahaan}</h3>
              <div className="space-y-4">
                <p><strong>ID :</strong> {detailData.id}</p>
                <p><strong>Nama Perusahaan :</strong> {detailData.nama_perusahaan}</p>
                <p><strong>Nama Direktur :</strong> {detailData.nama_direktur}</p>
                <p><strong>Alamat :</strong> {detailData.alamat_perusahaan}</p>
                <p><strong>Tanggal Diterima :</strong> {detailData.tanggal_diterima}</p>
                <p><strong>Klasifikasi :</strong> {detailData.nama_klasifikasi || '-'}</p>
                <p><strong>Sub Klasifikasi :</strong> {detailData.nama_sub_klasifikasi || '-'}</p>
                <p><strong>Rekening :</strong> {detailData.nama_rekening || '-'}</p>
                <p><strong>Tanggal Expired :</strong> {detailData.tanggal_diterima}</p>
                <p><strong>Tanggal Expired :</strong> {detailData.expired_at}</p>
                <p><strong>Status :</strong> {detailData.status_aktif === 'active' ? 'Aktif' : 'Tidak Aktif'}</p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-110">
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidasiSBUS;
