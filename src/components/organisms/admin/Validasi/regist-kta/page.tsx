"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  // Set default header untuk semua request
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Fetch KTA Data
  const fetchKTAs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/kta");
      setKtas(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal memuat data KTA");
    } finally {
      setLoading(false);
    }
  };

  // Search KTA
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchKTAs();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/kta/search?search=${searchTerm}`
      );
      setKtas(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Data tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  // Approve KTA
  const approveKTA = async (id: number) => {
    try {
      await axios.put(`http://localhost:8000/api/kta/approve/${id}`);
      alert("Berhasil menyetujui KTA");
      fetchKTAs();
    } catch (err: any) {
      alert(`Gagal menyetujui KTA: ${err.response?.data?.message}`);
    }
  };

  // Reject KTA
  const rejectKTA = async (id: number) => {
    const comment = prompt("Masukkan komentar untuk penolakan KTA:");
    if (!comment) {
      alert("Komentar diperlukan untuk penolakan.");
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/kta/reject/${id}`, {
        comment,
      });
      alert("Berhasil menolak KTA");
      fetchKTAs();
    } catch (err: any) {
      alert(`Gagal menolak KTA: ${err.response?.data?.message}`);
    }
  };

  // Download KTA Files
  const downloadKTAFiles = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/download-kta/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `kta_files_${id}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      alert(`Gagal mengunduh berkas: ${err.response?.data?.message}`);
    }
  };

  useEffect(() => {
    fetchKTAs();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Validasi Pendaftaran KTA</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari KTA (Nama Perusahaan, Email, Alamat)"
          className="border p-2 rounded w-full md:w-2/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cari
        </button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Nama Perusahaan</th>
                <th className="border border-gray-300 p-2">Nama Direktur</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Diterima</th>
                <th className="border border-gray-300 p-2">Expired-At</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ktas.map((kta: any) => (
                <tr key={kta.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {kta.user.nama_perusahaan}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {kta.user.nama_direktur}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {kta.user.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {kta.status_diterima || "Pending"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {kta.tanggal_diterima}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {kta.expired_at}
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      onClick={() => approveKTA(kta.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectKTA(kta.id)}
                      className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => downloadKTAFiles(kta.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ValidasiKTA;
