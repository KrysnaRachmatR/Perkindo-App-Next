"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/admin/Menu"; 
import Navbar from "@/components/admin/Navbar"; 

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [konstruksiCount, setKonstruksiCount] = useState(0);
  const [nonKonstruksiCount, setNonKonstruksiCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect ke halaman login jika token tidak ada
        return;
      }

      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    }
  };

  // Fetch counts for SBU-Konstruksi and SBU-Non-Konstruksi
  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch SBU-Konstruksi count
      const konstruksiResponse = await axios.get("http://localhost:8000/api/sbu-konstruksi/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKonstruksiCount(konstruksiResponse.data.count);

      // Fetch SBU-Non-Konstruksi count
      const nonKonstruksiResponse = await axios.get("http://localhost:8000/api/sbu-non-konstruksi/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNonKonstruksiCount(nonKonstruksiResponse.data.count);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  // UseEffect untuk fetching data saat halaman dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserData();
    }
    fetchCounts();
  }, [router]);

  // Logika logout
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

  // Jika user belum terautentikasi, return null
  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      <div className="flex-grow bg-gray-100">
        {/* Navbar */}
        <Navbar user={user} onLogout={handleLogout} />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: SBU-Konstruksi */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105">
              <h2 className="text-4xl font-bold mb-2">{konstruksiCount}</h2>
              <p className="text-gray-600">SBU-Konstruksi</p>
            </div>

            {/* Card 2: SBU-Non-Konstruksi */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105">
              <h2 className="text-4xl font-bold mb-2">{nonKonstruksiCount}</h2>
              <p className="text-gray-600">SBU-Non-Konstruksi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
