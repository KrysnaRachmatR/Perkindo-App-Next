"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidasiSBUN = () => {
  const [sbunRegistrastion, setSbunRegistration] = useState<any[]>([]);
  const [activeSbunRegistration, setActiveSbunRegistration] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [detailData, setDetailData] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch data based on the selected tab (pending, rejected, active)
  const fetchSbunRegistration = async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/api/sbun/all-${status}`, {
        params: { status }
      });
      if (response.status === 200) {
        if (status === "pending") {
          setSbunRegistration(response.data.data || []);
        } else {
          setActiveSbunRegistration(response.data.data || []);
        }
      } else {
        setError("Gagal memuat data SBUN.");
      }
    } catch (err: any) {
      if (err.response) {
        setError(`Kesalahan: ${err.response?.data?.message || "Terjadi kesalahan saat mengambil data."}`);
      } else {
        setError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }

  };
  const handleApprove = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menyetujui pendaftaran ini?")) {
      try {
        await axios.put(`http://localhost:8000/api/sbun/${id}/status`, {
          status_diterima: "approve", // Menyetujui KTA
        });
        fetchSbunRegistration("pending"); // Refresh data setelah approve
        alert("Pendaftaran berhasil disetujui!");
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
          await axios.put(`http://localhost:8000/api/sbun/${id}/status`, {
            status_diterima: "rejected", // Menolak KTA
            komentar, // Menambahkan komentar jika ditolak
          });
          fetchSbunRegistration("pending"); // Refresh data setelah reject
          alert("Pendaftaran berhasil ditolak.");
        } catch (err: any) {
          alert(err.response?.data?.message || "Gagal menolak pendaftaran.");
        }
      }
  };

  useEffect(() => {
    if (activeTab === 0) {
      fetchSbunRegistration("pending");
    } else {
      fetchSbunRegistration("active");
    }
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // Function to download SBUN documents as a ZIP
  const handleDownload = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sbun/${userId}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `SBU Non Konstruksi_${userId}.zip`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();

      link.parentNode?.removeChild(link);
      alert("File berhasil diunduh!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengunduh file.");
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="tabs">
        <button
          disabled={loading}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 0
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          onClick={() => handleTabChange(0)}
        >
          Pending
        </button>
        <button
          disabled={loading}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 1
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          onClick={() => handleTabChange(1)}
        >
          Active
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="registration-list mt-4">
        {(activeTab === 0 ? sbunRegistrastion : activeTab === 1 ? activeSbunRegistration : []).map((registration) => (
          <div key={registration.id} className="registration-card p-4 border rounded-md shadow-sm mb-4">
            <h3 className="font-bold">{registration.nama_perusahaan}</h3>
            <p><strong>Alamat:</strong> {registration.alamat_perusahaan}</p>
            <p><strong>Email:</strong> {registration.email}</p>
            <p><strong>Status:</strong> {registration.status_diterima}</p>
            <p><strong>Nomor HP:</strong> {registration.nomor_hp_penanggung_jawab}</p>
            {registration.status_diterima === "rejected" && registration.komentar && (
              <p><strong>Komentar:</strong> {registration.komentar}</p>
            )}
            <button
              className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
              onClick={() => handleDownload(registration.id)}
            >
              Download Documents
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidasiSBUN;
