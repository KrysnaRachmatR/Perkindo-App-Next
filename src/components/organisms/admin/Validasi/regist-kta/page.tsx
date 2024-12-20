"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState<any[]>([]); // State untuk menyimpan data KTA yang pending
  const [activeKTAs, setActiveKTAs] = useState<any[]>([]); // State untuk menyimpan data KTA yang aktif
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [activeTab, setActiveTab] = useState(0);
  const [detailData, setDetailData] = useState<number | null>(null);

  // Ambil token dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);



  // Fetch data KTA yang pending (Section 1)
const fetchKTAs = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get("http://localhost:8000/api/kta/all-pending");
    if (response.status === 200) {
      setKtas(response.data.data || []); // Pastikan response yang diterima sesuai
    } else {
      setError("Gagal memuat data KTA pending.");
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

const fetchActiveKTAs = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get("http://localhost:8000/api/kta");
    if (response.status === 200) {
      console.log(response);
      setActiveKTAs(response.data || []); // Pastikan response yang diterima sesuai
    } else {
      setError("Gagal memuat data KTA aktif.");
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


  // Approve KTA
  const handleApprove = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menyetujui pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/kta/approve/${id}`, {
          status_diterima: "approve", // Menyetujui KTA
        });
        alert("Pendaftaran berhasil disetujui!");
        fetchKTAs(); // Refresh data setelah approve
        fetchActiveKTAs(); // Refresh data KTA aktif setelah approval
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menyetujui pendaftaran.");
      }
    }
  };

  // Reject KTA
  const handleReject = async (id: number) => {
    const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
    if (confirm("Apakah Anda yakin ingin menolak pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/kta/approve/${id}`, {
          status_diterima: "rejected", // Menolak KTA
          komentar, // Menambahkan komentar jika ditolak
        });
        alert("Pendaftaran berhasil ditolak.");
        fetchKTAs(); // Refresh data setelah reject
      } catch (err: any) {
        alert(err.response?.data?.message || "Gagal menolak pendaftaran.");
      }
    }
  };

  // Download KTA
  const handleDownload = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/download-kta/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `KTA_${userId}.zip`;

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
    fetchKTAs(); // Ambil KTA pending
    fetchActiveKTAs(); // Ambil KTA yang sudah disetujui
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Validasi KTA</h1>
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
            pending
          </button>
        <button
            onClick={() => setActiveTab(1)}
            disabled ={loading}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 1
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            aktif
          </button>
      </div>

      {/* Section 1: Pending KTA */}
      <div className={activeTab != 0 ? 'hidden':'block'}>
        <h2 className="text-xl font-semibold mb-2">KTA Pending</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">No</th>
              <th className="border border-gray-200 px-4 py-2">Nama Perusahaan</th>
              <th className="border border-gray-200 px-4 py-2">Nama Direktur</th>
              <th className="border border-gray-200 px-4 py-2">Alamat</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ktas.length > 0 ? (
              ktas.map((kta: any, index: number) => (
                <tr key={kta.id}>
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.nama_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.nama_direktur}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.alamat_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleApprove(kta.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(kta.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDownload(kta.user_id)}
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
                  Tidak ada data KTA pending.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section 2: Active KTA */}
      <div className={activeTab != 1 ? 'hidden':'block'}>
        <h2 className="text-xl font-semibold mb-2">KTA Aktif</h2>
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
            {activeKTAs.length > 0 ? (
              activeKTAs.map((kta: any, index:number)  => (
                <tr key={kta.id}>
                  <td className="border border-gray-200 text-center px-4 py-2">{index+1}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.nama_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.nama_direktur}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.alamat_perusahaan}</td>
                  <td className="border border-gray-200 px-4 py-2">{kta.status_aktif}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button onClick={() => setDetailData(index)}>Detail</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  Tidak ada KTA yang aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {activeKTAs.length>0&&detailData!=null?(
          <>
          <span>{activeKTAs[detailData].id}</span>
          <span>{activeKTAs[detailData].nama_perusahaan}</span>
          <span>{activeKTAs[detailData].nama_direktur}</span>
          <span>{activeKTAs[detailData].alamat_perusahaan}</span>
          </>
        ):(<></>)}
      </div>
    </div>
  );
};

export default ValidasiKTA;
