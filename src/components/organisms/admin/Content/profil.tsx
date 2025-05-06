"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileAdminPage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    section1: "",
    visi: "",
    misi: [],
  });
  const [headerImage, setHeaderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Mendapatkan data profile dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile");
        if (response.data.success) {
          setProfile(response.data.data);
          setFormData({
            title: response.data.data.title,
            section1: response.data.data.section1,
            visi: response.data.data.visi,
            misi: response.data.data.misi || [],
          });
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setMessage("Gagal mendapatkan data profil.");
      }
    };

    fetchProfile();
  }, []);

  const getToken = () => localStorage.getItem("token");

  // Mengelola perubahan pada form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Mengelola perubahan pada input misi
  const handleMisiChange = (index, e) => {
    const { value } = e.target;
    const updatedMisi = [...formData.misi];
    updatedMisi[index] = value;
    setFormData({
      ...formData,
      misi: updatedMisi,
    });
  };

  // Menambahkan item misi baru
  const handleAddMisi = () => {
    setFormData({
      ...formData,
      misi: [...formData.misi, ""], // Menambahkan item baru dengan nilai kosong
    });
  };

  // Mengelola perubahan gambar
  const handleImageChange = (e) => {
    setHeaderImage(e.target.files[0]);
  };

  // Mengirim data untuk diperbarui di backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setMessage("Anda harus login untuk melakukan tindakan ini.");
      return;
    }

    setLoading(true);

    // Membuat objek data untuk dikirim
    const dataToSend = {
      title: formData.title,
      section1: formData.section1,
      visi: formData.visi,
      misi: formData.misi, // Kirim misi sebagai array
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/${profile.id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Pastikan content-type adalah 'application/json'
          },
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setProfile(response.data.data); // Update profile setelah berhasil
      } else {
        setMessage("Gagal memperbarui profil. Pastikan data sudah benar.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }

    // Jika ada gambar yang diupload dan sebelumnya sudah ada gambar di database, hapus gambar lama
    if (headerImage) {
      const formDataImage = new FormData();
      formDataImage.append("header_image", headerImage);

      try {
        // Hapus gambar lama jika ada
        if (profile.header_image) {
          await axios.delete(
            `http://localhost:8000/api/profile/${profile.id}/delete-image`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // Mengirim gambar baru
        const responseImage = await axios.put(
          `http://localhost:8000/api/profile/${profile.id}`,
          formDataImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Pastikan menggunakan multipart/form-data untuk upload file
            },
          }
        );

        if (responseImage.data.success) {
          setMessage("Gambar berhasil diperbarui.");
          setProfile(responseImage.data.data); // Update profile setelah berhasil
        } else {
          setMessage("Gagal memperbarui gambar.");
        }
      } catch (error) {
        console.error("Error updating image:", error);
        setMessage("Gagal memperbarui gambar. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8 md:px-16 lg:px-24">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Edit Profile</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      {profile ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1">
              <label className="block text-lg font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-lg font-medium text-gray-700">Section 1</label>
              <textarea
                name="section1"
                value={formData.section1}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-lg font-medium text-gray-700">Visi</label>
              <textarea
                name="visi"
                value={formData.visi}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">Misi</label>
            {formData.misi.map((misi, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={misi}
                  onChange={(e) => handleMisiChange(index, e)}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMisi}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Tambah Misi
            </button>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-500">Loading profile data...</p>
      )}
    </div>
  );
};

export default ProfileAdminPage;
