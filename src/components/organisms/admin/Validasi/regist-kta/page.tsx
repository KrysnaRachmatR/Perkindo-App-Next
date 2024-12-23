"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState<any[]>([]); // State untuk menyimpan data KTA yang pending
  const [activeKTAs, setActiveKTAs] = useState<any[]>([]); // State untuk menyimpan data KTA yang aktif
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [activeTab, setActiveTab] = useState(0);
  const [detailData, setDetailData] = useState<number | null>(null);
  const closeModal = () => setDetailData(null);
  const [ktaId, setKtaId] = useState(null);
  const fileInputRef = useRef(null); // Mengacu pada input file

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
      const response = await axios.get(
        "http://localhost:8000/api/kta/all-pending"
      );
      if (response.status === 200) {
        setKtas(response.data.data || []); // Pastikan response yang diterima sesuai
      } else {
        setError("Gagal memuat data KTA pending.");
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
      const response = await axios.get(
        `http://localhost:8000/api/download-kta/${userId}`,
        {
          responseType: "blob",
        }
      );

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

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ktaId) {
      alert("ID KTA tidak ditemukan. Silakan coba lagi.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("kta_file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/kta/upload-kta/${ktaId}`,
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
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat mengunggah file."
      );
    } finally {
      setLoading(false);
    }
  };

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

      {/* Section 1: Pending KTA */}
      <div className={activeTab != 0 ? "hidden" : "block"}>
        <h2 className="text-xl font-semibold mb-2">KTA Pending</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">No</th>
              <th className="border border-gray-200 px-4 py-2">
                Nama Perusahaan
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Nama Direktur
              </th>
              <th className="border border-gray-200 px-4 py-2">Alamat</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ktas.length > 0 ? (
              ktas.map((kta: any, index: number) => (
                <tr key={kta.id}>
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.nama_perusahaan}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.nama_direktur}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.alamat_perusahaan}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleApprove(kta.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(kta.id)}
                      className="bg-red text-white px-4 py-2 rounded mr-2"
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
      <div className={activeTab != 1 ? "hidden" : "block"}>
        <h2 className="text-xl font-semibold mb-4">KTA Aktif</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">No</th>
              <th className="border border-gray-200 px-4 py-2">
                Nama Perusahaan
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Nama Direktur
              </th>
              <th className="border border-gray-200 px-4 py-2">Alamat</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeKTAs.length > 0 ? (
              activeKTAs.map((kta: any, index: number) => (
                <tr key={kta.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 text-center px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.nama_perusahaan}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.nama_direktur}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.alamat_perusahaan}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {kta.status_aktif}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => setDetailData(kta)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Detail
                    </button>
                    {/* Button untuk upload file */}
                    <button
                      className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded ml-2 ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-indigo-700"
                      }`}
                      onClick={() => {
                        setKtaId(kta.id); // Set KTA ID
                        handleButtonClick(); // Memanggil fungsi handleButtonClick
                      }}
                      disabled={loading}
                    >
                      {loading ? "Uploading..." : "Upload KTA"}
                    </button>

                    {/* Input file (disembunyikan) */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  Tidak ada KTA yang aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Detail */}
        {detailData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-2xl w-[500px] relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
              <h3 className="text-2xl font-extrabold mb-4">
                Detail KTA {detailData.nama_perusahaan}
              </h3>
              <div className="space-y-4">
                <p>
                  <strong>ID :</strong> {detailData.id}
                </p>
                <p>
                  <strong>Nama Perusahaan :</strong>{" "}
                  {detailData.nama_perusahaan}
                </p>
                <p>
                  <strong>Nama Direktur :</strong> {detailData.nama_direktur}
                </p>
                <p>
                  <strong>Alamat :</strong> {detailData.alamat_perusahaan}
                </p>
                <p>
                  <strong>Tanggal Diterima :</strong>{" "}
                  {detailData.tanggal_diterima}
                </p>
                <p>
                  <strong>Tanggal Expired :</strong> {detailData.expired_at}
                </p>
                <p>
                  <strong>Kota/Kabupaten :</strong> {detailData.kota_kabupaten}
                </p>
                <p>
                  <strong>Status :</strong> {detailData.status_aktif}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-110"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidasiKTA;
