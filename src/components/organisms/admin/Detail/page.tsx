"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetailTable = () => {
  // kamu bisa taruh state dan useEffect di sini nanti
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // contoh kalau mau fetch data pakai axios nanti
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/detail/");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">MAINTENCE PROCESS</h1>
      {loading && (
        <p className="text-center text-gray-500">Sedang memuat data...</p>
      )}
    </div>
  );
};

export default UserDetailTable;
