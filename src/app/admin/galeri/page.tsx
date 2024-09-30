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
      setGaleri(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Handle input teks dan file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setFormData({ ...formData, gambar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit (create/update)
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const token = localStorage.getItem("token");
  const data = new FormData();
  
  // Ambil data judul dan caption dari formData
  data.append("judul", formData.judul);
  data.append("caption", formData.caption);

  // Hanya tambahkan gambar jika ada gambar baru yang dipilih
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
        Authorization: `Bearer ${token}`,
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


  // Handle edit form
  const handleEdit = (id) => {
  const galeriToEdit = galeri.find((item) => item.id === id);
  if (galeriToEdit) {
    setFormData({
      judul: galeriToEdit.judul,
      caption: galeriToEdit.caption,
      gambar: null, // Ini untuk menjaga agar gambar tetap ada di server
    });
    setEditId(id);
  }
};


  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:8000/api/galeri/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  // Reset form
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="main-content p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Galeri</h1>

        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow rounded">
          <input
            type="text"
            name="judul"
            placeholder="Judul"
            value={formData.judul}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <textarea
            name="caption"
            placeholder="Caption"
            value={formData.caption}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            type="file"
            name="gambar"
            onChange={handleChange}
            className="mb-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>

        <div className="galeri-list">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caption</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {galeri.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.caption}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.gambar && (
                      <img
                        src={`http://localhost:8000/storage/${item.gambar}`}
                        alt={item.judul}
                        width={100}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleEdit(item.id)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGaleriPage;
