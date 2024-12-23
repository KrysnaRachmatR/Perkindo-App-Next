"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetailTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil token dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:8000/api/detail/all-user')
      .then((response) => {
        setUsers(response.data.data);  // Set data to state
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        setError(error.message);  // Handle errors
        setLoading(false);  // Stop loading
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">User Details</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b font-medium text-gray-700">Nama Perusahaan</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Nama Direktur</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Nama Penanggung Jawab</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Alamat Perusahaan</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Status KTA</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Tanggal Diterima</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Status SBU Konstruksi</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Status SBU Non Konstruksi</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Klasifikasi SBU</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Sub Klasifikasi SBU</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Klasifikasi SBUN</th>
              <th className="py-3 px-4 border-b font-medium text-gray-700">Sub Klasifikasi SBUN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b">{user.nama_perusahaan}</td>
                <td className="py-4 px-6 border-b">{user.nama_direktur}</td>
                <td className="py-4 px-6 border-b">{user.nama_penanggung_jawab}</td>
                <td className="py-4 px-6 border-b">{user.alamat_perusahaan}</td>
                <td className="py-4 px-6 border-b">{user.status_KTA}</td>
                <td className="py-4 px-6 border-b">{user.tanggal_diterima}</td>
                <td className="py-4 px-6 border-b">{user.status_SBU_Konstruksi}</td>
                <td className="py-4 px-6 border-b">{user.status_SBU_Non_Konstruksi}</td>
                <td className="py-4 px-6 border-b">{user.klasifikasi_sbus.join(', ')}</td>
                <td className="py-4 px-6 border-b">{user.sub_klasifikasi_sbus.join(', ')}</td>
                <td className="py-4 px-6 border-b">{user.klasifikasi_sbun.join(', ')}</td>
                <td className="py-4 px-6 border-b">{user.sub_klasifikasi_sbun.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailTable;
