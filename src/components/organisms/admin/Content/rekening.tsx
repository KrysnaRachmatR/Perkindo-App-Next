"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rekening() {
  const [rekening, setRekening] = useState([]);
  const [formData, setFormData] = useState({
    nama_bank: "",
    nomor_rekening: "",
    atas_nama: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentRekening, setCurrentRekening] = useState(null);
  const token = localStorage.getItem("token"); // Ganti dengan token yang sesuai

  // Ambil semua rekening tujuan
  const fetchRekening = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rek", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRekening(response.data);
    } catch (error) {
      console.error("Error fetching rekening:", error);
    }
  };

  useEffect(() => {
    fetchRekening();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Tambahkan rekening tujuan baru
  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update data rekening
      try {
        const updatedData = { ...formData };
        // Hanya mengirimkan field yang diubah
        for (const key in updatedData) {
          if (updatedData[key] === "") {
            delete updatedData[key]; // Hapus field yang kosong
          }
        }

        const response = await axios.put(
          `http://localhost:8000/api/rek/${currentRekening.id}`,
          updatedData, // Mengirimkan hanya field yang berubah
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Update Response:", response); // Debugging: Cek respons
        if (response.status === 200) {
          setEditMode(false);
          setCurrentRekening(null);
          alert("Rekening berhasil diupdate");
        }
      } catch (error) {
        console.error("Error updating rekening:", error);
        alert("Gagal mengupdate rekening");
      }
    } else {
      // Tambah data rekening baru
      try {
        const response = await axios.post(
          "http://localhost:8000/api/rek",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Create Response:", response); // Debugging: Cek respons
        if (response.status === 201) {
          alert("Rekening berhasil ditambahkan");
        }
      } catch (error) {
        console.error("Error creating rekening:", error);
        alert("Gagal menambahkan rekening");
      }
    }

    setFormData({ nama_bank: "", nomor_rekening: "", atas_nama: "" });
    fetchRekening();
  };

  // Edit rekening
  const handleEdit = (rekening) => {
    setFormData({
      nama_bank: rekening.nama_bank,
      nomor_rekening: rekening.nomor_rekening,
      atas_nama: rekening.atas_nama,
    });
    setEditMode(true);
    setCurrentRekening(rekening); // Menyimpan rekening yang sedang diedit
  };

  // Hapus rekening
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/rek/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRekening();
    } catch (error) {
      console.error("Error deleting rekening:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rekening Tujuan</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
        <div className="mb-4">
          <label htmlFor="nama_bank" className="block text-gray-700">
            Nama Bank
          </label>
          <input
            type="text"
            id="nama_bank"
            name="nama_bank"
            value={formData.nama_bank}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nomor_rekening" className="block text-gray-700">
            Nomor Rekening
          </label>
          <input
            type="text"
            id="nomor_rekening"
            name="nomor_rekening"
            value={formData.nomor_rekening}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="atas_nama" className="block text-gray-700">
            Atas Nama
          </label>
          <input
            type="text"
            id="atas_nama"
            name="atas_nama"
            value={formData.atas_nama}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          {editMode ? "Update Rekening" : "Tambah Rekening"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Daftar Rekening Tujuan</h2>
      <div className="space-y-4">
        {rekening.map((rek) => (
          <div
            key={rek.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{rek.nama_bank}</h3>
              <p>{rek.nomor_rekening}</p>
              <p>{rek.atas_nama}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(rek)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(rek.id)}
                className="px-4 py-2 bg-red text-white rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
