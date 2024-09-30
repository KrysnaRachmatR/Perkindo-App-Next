import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    { title: "Dashboard", href: "/admin", icon: "/images/dashboard.png" },
    { title: "Berita", href: "/admin/list/berita", icon: "/images/berita.png" },
    { title: "Galeri", href: "/admin/list/galeri", icon: "/images/galeri.png" },
    { title: "Agenda", href: "/admin/list/agenda", icon: "/images/agenda.png" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col bg-gray-800 text-white w-64 min-h-screen">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <span className="ml-2 text-xl font-bold">Perkindo</span>
      </div>
      <div className="flex-grow mt-4">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.title} className="flex items-center p-3 hover:bg-gray-700">
            <Image src={item.icon} alt={item.title} width={24} height={24} />
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}

         {/* Dropdown untuk Anggota */}
        <div className="flex flex-col">
          <button onClick={toggleDropdown} className="flex items-center p-3 hover:bg-gray-700">
            <Image src="/images/management.png" alt="Anggota" width={24} height={24} />
            <span className="ml-3">Anggota</span>
            {/* Menggunakan logo dropdown dari folder public */}
            <Image
              src={isDropdownOpen ? "/images/dropdown.png" : "/images/dropup.png"} // Ganti dengan logo dropdown dari folder public
              alt="Toggle Dropdown"
              width={20}
              height={20}
              className="ml-auto"
            />
          </button>

          {/* Dropdown with smooth animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link href="/admin/anggota/sbu-konstruksi" className="flex items-center p-2 hover:bg-gray-700">
              <Image src="/images/management.png" alt="SBU-Konstruksi" width={20} height={20} />
              <span className="ml-3">SBU-Konstruksi</span>
            </Link>
            <Link href="/admin/anggota/sbu-non-konstruksi" className="flex items-center p-2 hover:bg-gray-700">
              <Image src="/images/management.png" alt="SBU-Non-Konstruksi" width={20} height={20} />
              <span className="ml-3">SBU-Non-Konstruksi</span>
            </Link>
          </div>
        </div>
      </div>

      <button onClick={onLogout} className="flex items-center p-3 mt-auto hover:bg-gray-700">
        <Image src="/images/logout.png" alt="Logout" width={24} height={24} />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;