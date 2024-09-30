"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Menu";
import Navbar from "@/components/admin/Navbar";
import axios from "axios";


const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [KonstruksiCount, setSbuKonstruksiCount] = useState(0);
  const [NonKonstruksiCount, setSbuNonKonstruksiCount] = useState(0);
  const router = useRouter();

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if token is not found
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
      setSbuKonstruksiCount(konstruksiResponse.data.count);

      // Fetch SBU-Non-Konstruksi count
      const nonKonstruksiResponse = await axios.get("http://localhost:8000/api/sbu-non-konstruksi/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSbuNonKonstruksiCount(nonKonstruksiResponse.data.count);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserData();
    }
    fetchCounts(); // Fetch counts for SBU data
  }, [router]);

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

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-grow bg-gray-100">
        <Navbar user={user} />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1: SBU-Konstruksi */}
            <div className="bg-white shadow-md rounded p-6 text-center">
              <h2 className="text-4xl font-bold mb-2">{KonstruksiCount}</h2>
              <p className="text-gray-600">SBU-Konstruksi</p>
            </div>

            {/* Card 2: SBU-Non-Konstruksi */}
            <div className="bg-white shadow-md rounded p-6 text-center">
              <h1 className="text-4xl font-bold mb-2">{NonKonstruksiCount}</h1>
              <p className="text-gray-600">SBU-Non-Konstruksi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
