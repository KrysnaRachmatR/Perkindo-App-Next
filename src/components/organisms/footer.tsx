"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F7F8] text-white py-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between">
        {/* Left Section: Logo and Text */}
        <div className="flex flex-col items-center justify-center mb-8 lg:mb-0">
          <div className="flex items-center mb-4">
            {/* Logo */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={111}
              className="mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-black">PERKINDO</h1>
              <p className="text-sm text-black mt-0">
                Persatuan Konsultan Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Center Section: Quick Links */}
        <div className="mb-8 lg:mb-0 text-black">
          <h2 className="text-lg font-bold mb-4">Tautan Cepat</h2>
          <ul className="space-y-2 text-black">
            <li>
              <Link href="/" className=" hover:text-gray-400">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/profil" className=" hover:text-gray-400">
                Profil
              </Link>
            </li>
            <li>
              <Link href="/galeri" className="hover:text-gray-400">
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-400">
                Berita
              </Link>
            </li>
            <li>
              <Link href="/agenda" className="hover:text-gray-400">
                Agenda
              </Link>
            </li>
            <li>
              <Link href="/layanan" className="hover:text-gray-400">
                Layanan
              </Link>
            </li>
            <li>
              <Link href="/members" className="hover:text-gray-400">
                Anggota
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        {/* Section Kanan: Alamat & Social Media */}
        <div className="text-black">
          <h2 className="text-lg font-bold mb-4">Alamat</h2>
          <div className="flex items-center mb-4">
            {/* Icon Address */}
            <Image
              src="/images/location.png"
              alt="Location Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-sm">
              Jalan Alianyang Gg. Rahayu Ruko No. 21 <br /> Sungai bangkong,
              Kalimantan <br /> Barat 78116
            </p>
          </div>
          <div className="flex items-center mb-4">
            {/* Icon Address */}
            <Image
              src="/images/contact.png"
              alt="Location Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-sm">Perkindo Call - 123456</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-8 h-8 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="/images/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-8 h-8 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-8 h-8 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="/images/linkedin.png"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
