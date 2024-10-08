"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Menu";
import axios from "axios";

const AdminGaleriPage = () => {
  const [galeri, setGaleri] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    caption: "",
    gambar: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch gallery data from API
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
      const response = await axios.get("http://localhost:8000/api/galeri", {
        headers: {
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      });
      setGaleri(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setFormData({ ...formData, gambar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  const token = localStorage.getItem("token"); // Pastikan token ada di setiap request

  const data = new FormData();
  data.append("judul", formData.judul);
  data.append("caption", formData.caption);

  // Hanya tambahkan gambar jika ada gambar baru (saat update, gambar bisa kosong jika tidak diubah)
  if (formData.gambar) {
    data.append("gambar", formData.gambar);
  }

  const url = editId
    ? `http://localhost:8000/api/galeri/${editId}`
    : "http://localhost:8000/api/galeri";
  const method = editId ? "put" : "post";

  try {
    await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        "Content-Type": "multipart/form-data",
      },
    });
    alert(editId ? "Data updated successfully" : "Data created successfully");
    resetForm();
    fetchData();
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
    const galeriToEdit = galeri.find((item) => item.id === id);
    if (galeriToEdit) {
      setFormData({
        judul: galeriToEdit.judul,
        caption: galeriToEdit.caption,
        gambar: null,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); // Pastikan token ada di setiap request
    if (confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:8000/api/galeri/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
          },
        });
        alert("Data deleted successfully");
        setGaleri(galeri.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
        setError("Failed to delete data");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      caption: "",
      gambar: null,
    });
    setEditId(null);
  };

  const handleLogout = async () => {
    try {
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
          <h1 className="text-3xl font-bold mb-6">CRUD Galeri</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Judul</label>
                <input
                  type="text"
                  name="judul"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.judul}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Caption</label>
                <textarea
                  name="caption"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.caption}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gambar</label>
                <input
                  type="file"
                  name="gambar"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
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
                  <th className="border px-4 py-2">Judul</th>
                  <th className="border px-4 py-2">Caption</th>
                  <th className="border px-4 py-2">Gambar</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {galeri.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.judul}</td>
                    <td className="border px-4 py-2">{item.caption}</td>
                    <td className="border px-4 py-2">
                      {item.gambar && (
                        <img
                          src={`http://localhost:8000/storage/${item.gambar}`}
                          alt={item.judul}
                          width={100}
                        />
                      )}
                    </td>
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

export default AdminGaleriPage;