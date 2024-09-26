"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Menu";
import Navbar from "@/components/admin/Navbar";
import axios from "axios";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if token is not found
        return;
      }
      // Assuming you have an endpoint that returns the authenticated user's data
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserData(); // Fetch user data from backend if not available in localStorage
    }
  }, [router]);

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

  if (!user) return null; // Prevent rendering until user data is available

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-grow bg-gray-100">
        <Navbar user={user} />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <div className="bg-white shadow-md rounded p-6">
            {/* Add additional content or widgets for the dashboard */}
            <p>This is your admin dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;