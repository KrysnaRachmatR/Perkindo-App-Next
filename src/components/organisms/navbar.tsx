"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const pathname = usePathname(); // Menggunakan pathname dari usePathname
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFade(false);
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  const getLinkClassName = (path) =>
    `text-white hover:bg-white hover:text-black rounded-lg px-3 py-2 ${
      pathname === path ? "border-b-2 border-yellow-500" : ""
    }`;

  const toggleDropdown = () => {
    setFade(!isDropdownOpen);
    setIsDropdownOpen((prev) => !prev);
  };

  const isContactPage = pathname === "/contact";
  const isLayananPage = pathname === "/layanan";
  const isAgendaPage = pathname === "/agenda";
  const isBeritaPage = pathname === "/news";

  const handleMouseEnter = () => {
    setFade(true);
    setIsDropdownOpen(true);
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    setFade(false);
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
    setHideTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  return (
    <nav
      className={`${
        scroll ? "bg-blue-900 shadow-md" : "bg-transparent"
      } fixed w-full z-20 top-0 left-0 transition-colors duration-300`}
      style={
        isContactPage || isLayananPage || isAgendaPage || isBeritaPage
          ? { backgroundColor: "#161D6F" }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-10 w-10 md:h-14 md:w-14 ml-4"
              />
              <div className="flex flex-col items-center ml-2 md:ml-4">
                <span className="text-white font-bold text-lg md:text-2xl tracking-[0.3rem]">
                  PERKINDO
                </span>
                <p className="text-white text-[0.6rem] md:text-[0.7rem] text-center">
                  Persatuan Konsultan Indonesia
                </p>
              </div>
            </a>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="/" className={getLinkClassName("/")}>
              Beranda
            </a>
            <a href="/profile" className={getLinkClassName("/profile")}>
              Profil
            </a>
            <a href="/galeri" className={getLinkClassName("/galeri")}>
              Galeri
            </a>

            {/* Dropdown Berita */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-white flex hover:bg-white hover:text-black rounded-lg px-3 py-2 items-center">
                <span>Berita</span>
                <span className="ml-2 text-xs">
                  {isDropdownOpen ? (
                    <img
                      src="./images/chevron-up.svg"
                      alt="Up Arrow"
                      className="h-4 w-4"
                    />
                  ) : (
                    <img
                      src="./images/chevron-down (1).svg"
                      alt="Down Arrow"
                      className="h-4 w-4 filter invert"
                    />
                  )}
                </span>
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute left-0 w-64 bg-white rounded-md shadow-lg z-50 transition-opacity duration-200 ease-in-out ${
                    fade ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ top: "calc(100% + 22px)" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid white",
                    }}
                  />
                  <div className="grid grid-cols-1 gap-2 p-4 bg-white -mt-[0.1px]">
                    <a
                      href="/news"
                      className="block text-[#6f6e6e] hover:text-[#161D6F] hover:font-bold"
                    >
                      Berita
                    </a>
                    <a
                      href="/agenda"
                      className="block text-[#6f6e6e] hover:text-[#161D6F] hover:font-bold"
                    >
                      Agenda
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/layanan" className={getLinkClassName("/layanan")}>
              Layanan
            </a>
            <a href="/anggota" className={getLinkClassName("/anggota")}>
              Anggota
            </a>
            <a href="/contact" className={getLinkClassName("/contact")}>
              Kontak
            </a>
            <a
              href={pathname === "/login" ? "/logout" : "/login"} // Menyesuaikan dengan pathname
              className="bg-yellow-500 text-[#161D6F] px-4 py-2 rounded"
            >
              {pathname === "/login" ? "Logout" : "Login"}
            </a>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none mr-6 mt-1"
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
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#161D6F]`}>
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
              href="/layanan"
              className="text-white block hover:bg-white hover:text-black rounded-lg px-3 py-2"
            >
              Layanan
            </a>
            <a
              href="/anggota"
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
            <a
              href={pathname === "/login" ? "/logout" : "/login"}
              className="bg-yellow-500 text-[#161D6F] block text-center px-4 py-2 rounded"
            >
              {pathname === "/login" ? "Logout" : "Login"}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
