"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Galeri = () => {
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

  // Fetch data galeri dari API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/galeri", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setGaleri(response.data.data); // Menyesuaikan dengan struktur respons backend
      }
    } catch (error) {
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

    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("judul", formData.judul);
    data.append("caption", formData.caption);

    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }

    const url = editId
      ? `http://localhost:8000/api/galeri/${editId}`
      : "http://localhost:8000/api/galeri";
    const method = editId ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert(editId ? "Data updated successfully" : "Data created successfully");
        resetForm();
        fetchData(); // Refresh data after submit
      } else {
        setError(response.data.message || "Failed to save data");
      }
    } catch (error) {
      setError("Failed to save data");
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
    const token = localStorage.getItem("token");
    if (confirm("Are you sure you want to delete this data?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/galeri/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          alert("Data deleted successfully");
          setGaleri(galeri.filter((item) => item.id !== id));
        } else {
          setError(response.data.message || "Failed to delete data");
        }
      } catch (error) {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Manage Galeri</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="judul"
            placeholder="Judul"
            value={formData.judul}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="caption"
            placeholder="Caption"
            value={formData.caption}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md"
          />
          <input
            type="file"
            name="gambar"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white rounded-md"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Galeri List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Judul</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Caption</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Gambar</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {galeri.length > 0 ? (
                galeri.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-6 py-4">{item.judul}</td>
                    <td className="px-6 py-4 max-w-xs break-words">{item.caption}</td>
                    <td className="px-6 py-4">
                      {item.gambar ? (
                        <img
                          src={`http://localhost:8000/storage/${item.gambar}`}
                          alt={item.judul}
                          className="w-20 h-20 object-cover"
                        />
                      ) : (
                        <span>No image available</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Galeri;
