"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname untuk mendeteksi halaman aktif
import styles from "@/components/organisms/navbar.module.css";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Dapatkan path saat ini

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClassName = (path: string) =>
    `text-white hover:bg-white hover:text-black rounded-lg px-3 py-2 ${
      pathname === path ? "border-b-2 border-yellow-500" : ""
    }`;

  return (
    <nav
      className={`${styles.navbar} ${
        scroll ? styles.navbarColored : styles.navbarTransparent
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="/images/logo.png" alt="logo" className="h-14 w-14" />
              <span className="text-white font-bold text-2xl ml-4">
                PERKINDO
                <br />
                <p className="text-sm">Persatuan Konsultan Indonesia</p>
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {" "}
            {/* Adjusted spacing */}
            <a href="/" className={getLinkClassName("/")}>
              Beranda
            </a>
            <a href="/profile" className={getLinkClassName("/profile")}>
              Profil
            </a>
            <a href="/galeri" className={getLinkClassName("/galeri")}>
              Galeri
            </a>
            <a href="/news" className={getLinkClassName("/news")}>
              Berita
            </a>
            <a href="/services" className={getLinkClassName("/services")}>
              Layanan
            </a>
            <a href="/members" className={getLinkClassName("/members")}>
              Anggota
            </a>
            <a href="/contact" className={getLinkClassName("/contact")}>
              Kontak
            </a>
            <button className="bg-yellow-500 text-[#161D6F] px-4 py-2 rounded">
              Login
            </button>{" "}
            {/* Replaced login link with button */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Beranda
              </a>
              <a
                href="/profile"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Profil
              </a>
              <a
                href="/galeri"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Galeri
              </a>
              <a
                href="/news"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Berita
              </a>
              <a
                href="/services"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Layanan
              </a>
              <a
                href="/members"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Anggota
              </a>
              <a
                href="/contact"
                className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
              >
                Kontak
              </a>
              <button className="bg-yellow-500 text-[#161D6F] block px-4 py-2 rounded">
                Login
              </button>{" "}
              {/* Replaced login link with button */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
