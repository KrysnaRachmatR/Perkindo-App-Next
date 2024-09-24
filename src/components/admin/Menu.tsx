import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ onLogout }) => {
  const [user, setUser] = useState(null);

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
    { title: "Anggota", href: "/admin/anggota", icon: "/images/agenda.png" },
  ];

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
      </div>
      <button onClick={onLogout} className="flex items-center p-3 mt-auto hover:bg-gray-700">
        <Image src="/images/logout.png" alt="Logout" width={24} height={24} />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
