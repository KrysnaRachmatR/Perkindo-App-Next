// pages/admin/anggota.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Menu";
import axios from "axios";

const AdminAnggotaPage = () => {
  const [anggota, setAnggota] = useState([]);
  const [formData, setFormData] = useState({
    no: "",
    nama_badan_usaha: "",
    alamat: "",
    direktur: "",
    kode_sbu: "",
    tanggal_masa_berlaku: "",
    sampai_dengan: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch anggota data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Dapatkan token dari localStorage
    if (!token) {
      router.push("/login"); // Redirect ke halaman login jika token tidak ada
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/sbu-konstruksi", {
        headers: {
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      });
      console.log("Fetched data:", response.data);
      setAnggota(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token"); // Pastikan token ada di setiap request

    const url = editId
      ? `http://localhost:8000/api/sbu-konstruksi/${editId}`
      : "http://localhost:8000/api/sbu-konstruksi";
    const method = editId ? "put" : "post";

    try {
      console.log("Sending data:", formData);
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      });
      console.log("Response from API:", response.data);
      alert(editId ? "Data updated successfully" : "Data created successfully");
      resetForm();
      fetchData(); // Refetch the data
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError(
        error.response ? error.response.data.message : "Failed to save data"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const anggotaToEdit = anggota.find((item) => item.id === id);
    if (anggotaToEdit) {
      setFormData({
        no: anggotaToEdit.no,
        nama_badan_usaha: anggotaToEdit.nama_badan_usaha,
        alamat: anggotaToEdit.alamat,
        direktur: anggotaToEdit.direktur,
        kode_sbu: anggotaToEdit.kode_sbu,
        tanggal_masa_berlaku: anggotaToEdit.tanggal_masa_berlaku,
        sampai_dengan: anggotaToEdit.sampai_dengan,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); // Pastikan token ada di setiap request
    if (confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:8000/api/sbu-konstruksi/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
          },
        });
        alert("Data deleted successfully");
        setAnggota(anggota.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
        setError("Failed to delete data");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      no: "",
      nama_badan_usaha: "",
      alamat: "",
      direktur: "",
      kode_sbu: "",
      tanggal_masa_berlaku: "",
      sampai_dengan: "",
    });
    setEditId(null);
  };

  const handleLogout = async () => {
    try {
      // Call the backend to log out
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  return (
    <div className="flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">CRUD Anggota Konstruksi</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">No</label>
                <input
                  type="text"
                  name="no"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nama Badan Usaha</label>
                <input
                  type="text"
                  name="nama_badan_usaha"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.nama_badan_usaha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Direktur</label>
                <input
                  type="text"
                  name="direktur"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.direktur}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Kode SBU</label>
                <input
                  type="text"
                  name="kode_sbu"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.kode_sbu}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tanggal Masa Berlaku</label>
                <input
                  type="date"
                  name="tanggal_masa_berlaku"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.tanggal_masa_berlaku}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Sampai Dengan</label>
                <input
                  type="date"
                  name="sampai_dengan"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.sampai_dengan}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
              {isSubmitting ? "Processing..." : editId ? "Update" : "Create"}
            </button>
            <button type="button" className="mt-4 ml-2 p-2 bg-gray-300 rounded" onClick={resetForm}>
              Cancel
            </button>
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Nama Badan Usaha</th>
                  <th className="border px-4 py-2">Alamat</th>
                  <th className="border px-4 py-2">Direktur</th>
                  <th className="border px-4 py-2">Kode SBU</th>
                  <th className="border px-4 py-2">Tanggal Masa Berlaku</th>
                  <th className="border px-4 py-2">Sampai Dengan</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {anggota.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.no}</td>
                    <td className="border px-4 py-2">{item.nama_badan_usaha}</td>
                    <td className="border px-4 py-2">{item.alamat}</td>
                    <td className="border px-4 py-2">{item.direktur}</td>
                    <td className="border px-4 py-2">{item.kode_sbu}</td>
                    <td className="border px-4 py-2">{item.tanggal_masa_berlaku}</td>
                    <td className="border px-4 py-2">{item.sampai_dengan}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(item.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnggotaPage;
