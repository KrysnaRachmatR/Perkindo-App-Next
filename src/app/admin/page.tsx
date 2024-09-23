"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Menu";
import Navbar from "@/components/admin/Navbar";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null; // Prevent rendering until user is available

  return (
    <div className="flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-grow">
        <Navbar user={user} />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          {/* Add additional content for the admin page here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
