import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaImages,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state untuk dropdown

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { title: "Dashboard", href: "/admin", icon: <FaTachometerAlt /> },
    { title: "Berita", href: "/admin/list/berita", icon: <FaNewspaper /> },
    { title: "Galeri", href: "/admin/anggota", icon: <FaImages /> },
    { title: "Agenda", href: "/admin/list/agenda", icon: <FaCalendarAlt /> },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="fixed inset-y-0 flex-wrap items-center justify-between w-full p-4 my-4 overflow-y-auto antialiased transition-transform duration-200 bg-gray-900 border-0 shadow-lg max-w-64 ease-nav-brand z-50 rounded-2xl">
      <div className="flex items-center justify-center border-b border-gray-700 mb-4">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <span className="ml-2 text-2xl font-bold text-white">Perkindo</span>
      </div>

      <div className="flex-grow">
        <ul className="flex flex-col pl-0 mb-0">
          {menuItems.map((item) => (
            <li className="w-full mt-1" key={item.title}>
              <Link
                href={item.href}
                className="flex items-center p-3 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}

          {/* Dropdown untuk Anggota */}
          <li className="w-full mt-1">
            <button
              onClick={toggleDropdown}
              className="flex items-center p-3 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors w-full"
            >
              <FaUsers className="text-xl" />
              <span className="ml-3">Anggota</span>
              <span
                className={`ml-auto transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <FaQuestionCircle className="text-xl" />
              </span>
            </button>

            {/* Dropdown with smooth animation */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                href="/admin/anggota/sbu-konstruksi"
                className="flex items-center p-2 hover:bg-gray-700 text-white text-sm"
              >
                <FaUsers className="text-xl" />
                <span className="ml-3">SBU-Konstruksi</span>
              </Link>
              <Link
                href="/admin/anggota/sbu-non-konstruksi"
                className="flex items-center p-2 hover:bg-gray-700 text-white text-sm"
              >
                <FaUsers className="text-xl" />
                <span className="ml-3">SBU-Non-Konstruksi</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <button
          onClick={onLogout}
          className="flex items-center p-3 mt-auto hover:bg-gray-700 text-white"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
