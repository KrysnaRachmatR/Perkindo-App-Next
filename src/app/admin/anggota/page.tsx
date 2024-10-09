"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaUsers, FaTrash, FaEdit } from "react-icons/fa";

const AnggotaPage = () => {
  const [anggota, setAnggota] = useState([]);

  // Fetch data anggota
  const fetchAnggota = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/anggota", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnggota(response.data);
    } catch (error) {
      console.error("Error fetching anggota:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/anggota/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAnggota(); // Refresh daftar anggota
      } catch (error) {
        console.error("Error deleting anggota:", error);
      }
    }
  };

  useEffect(() => {
    fetchAnggota();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Daftar Anggota</h1>
      <Link href="/admin/anggota/create" className="btn btn-primary mb-4">
        Tambah Anggota
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Kode SBU</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {anggota.map((anggota) => (
            <tr key={anggota.id}>
              <td className="border px-4 py-2">{anggota.name}</td>
              <td className="border px-4 py-2">{anggota.kode_sbu}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/anggota/${anggota.id}`} className="mr-2">
                  <FaEdit className="text-blue-500" />
                </Link>
                <button onClick={() => handleDelete(anggota.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnggotaPage;
