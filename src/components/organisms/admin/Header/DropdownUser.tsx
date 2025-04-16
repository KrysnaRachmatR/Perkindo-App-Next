"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ClickOutside from "../Sidebar/ClickOutside";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [adminRole, setAdminRole] = useState("Administrator");

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      try {
        const data = JSON.parse(stored); // Ambil seluruh response
        const user = data.user; // Ambil bagian user
        setAdminName(user?.name || "Admin");
        setAdminRole(user?.role || "Administrator");
      } catch (error) {
        console.error("Failed to parse admin data:", error);
      }
    }
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 focus:outline-none"
      >
        {/* Text */}
        <div className="hidden lg:block text-right">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {adminName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {adminRole}
          </p>
        </div>

        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
          <Image
            src="/images/BADAN LAYANAN USAHA (2).png"
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
      </button>
    </ClickOutside>
  );
};

export default DropdownUser;
