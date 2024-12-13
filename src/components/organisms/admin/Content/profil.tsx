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

      console.log(response.data);

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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      {profile ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Section 1</label>
            <textarea
              name="section1"
              value={formData.section1}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Visi</label>
            <textarea
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Misi</label>
            {formData.misi.map((misi, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={misi}
                  onChange={(e) => handleMisiChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-lg font-medium">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={handleAddMisi}
              className="bg-green-500 text-white p-2 rounded w-[30%]"
            >
              Tambah Misi
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default ProfileAdminPage;
