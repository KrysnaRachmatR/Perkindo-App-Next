"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SbuNonKonstruksi = () => {
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
      const response = await axios.get(
        "http://localhost:8000/api/sbu-non-konstruksi",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
          },
        }
      );
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
      ? `http://localhost:8000/api/sbu-non-konstruksi/${editId}`
      : "http://localhost:8000/api/sbu-non-konstruksi";
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
        await axios.delete(
          `http://localhost:8000/api/sbu-non-konstruksi/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
            },
          }
        );
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
    <div className="mx-auto max-w-7xl ">
      <div className="flex">
        <div className="flex-grow bg-gray-100 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">
              CRUD Anggota Non-Konstruksi
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            <form
              onSubmit={handleSubmit}
              className="mb-6 bg-white p-4 rounded shadow-md dark:bg-boxdark dark:text-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">No</label>
                  <input
                    type="text"
                    name="no"
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.no}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Nama Badan Usaha
                  </label>
                  <input
                    type="text"
                    name="nama_badan_usaha"
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.kode_sbu}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Tanggal Masa Berlaku
                  </label>
                  <input
                    type="date"
                    name="tanggal_masa_berlaku"
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.tanggal_masa_berlaku}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Sampai Dengan
                  </label>
                  <input
                    type="date"
                    name="sampai_dengan"
                    className="w-full rounded border-2 border-[#A0AEC0] bg-transparent px-4 py-3 text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.sampai_dengan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full sm:w-auto p-2 bg-blue-500 text-white rounded"
              >
                {isSubmitting ? "Processing..." : editId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="mt-4 w-full text-white sm:w-auto ml-0 sm:ml-2 p-2 bg-red rounded"
                onClick={resetForm}
              >
                Cancel
              </button>
            </form>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-boxdark dark:text-white">
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
                        <td className="border px-4 py-2">
                          {item.nama_badan_usaha}
                        </td>
                        <td className="border px-4 py-2">{item.alamat}</td>
                        <td className="border px-4 py-2">{item.direktur}</td>
                        <td className="border px-4 py-2">{item.kode_sbu}</td>
                        <td className="border px-4 py-2">
                          {item.tanggal_masa_berlaku}
                        </td>
                        <td className="border px-4 py-2">
                          {item.sampai_dengan}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded mb-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SbuNonKonstruksi;
