"use client";
import Image from "next/image";
import { useState } from "react";

const KtaLayout = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistered(true);
  };

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">KTA</h1>
      <p className="text-[10px] tracking-wide -mt-1">Detail KTA</p>

      {!isRegistered ? (
        // Section jika belum memiliki KTA
        <div className="w-full bg-[#fffcfc] h-[25rem] flex flex-col items-center justify-center rounded-2xl">
          <Image
            src="/images/oops-kta.png"
            alt="KTA Image"
            width={200}
            height={200}
          />
          <p className="font-semibold text-2xl tracking-wide mt-4">
            Oh No !!! Anda Belum Mempunyai KTA
          </p>
          <p className="text-[14px] mt-1">
            Silahkan lakukan pendaftaran terlebih dahulu
          </p>
          <button
            onClick={handleRegisterClick}
            className="bg-black text-white text-center items-center justify-center w-20 rounded-md mt-4 h-10 hover:bg-red"
          >
            Daftar
          </button>
        </div>
      ) : (
        // Formulir Pendaftaran Anggota
        <div className="w-full bg-red h-auto flex flex-col items-center rounded-2xl mt-10 p-6">
          <h2 className="text-white font-semibold text-xl mb-4">
            Formulir Pendaftaran Anggota
          </h2>
          <form className="w-full max-w-none grid grid-cols-2 gap-4">
            {/* Kolom Pertama */}
            <div className="col-span-2 md:col-span-1">
              <label className="text-white text-sm font-medium" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 rounded-md focus:outline-none"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="text-white text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded-md focus:outline-none"
                placeholder="Masukkan email"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="text-white text-sm font-medium" htmlFor="phone">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-2 rounded-md focus:outline-none"
                placeholder="Masukkan nomor telepon"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="address"
              >
                Alamat
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full p-2 rounded-md focus:outline-none"
                placeholder="Masukkan alamat lengkap"
                required
              />
            </div>

            {/* Input Foto */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo1"
              >
                Foto Formulir Permohonan
              </label>
              <input
                type="file"
                id="photo1"
                name="photo1"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo2"
              >
                Foto Pernyataan Kebenaran
              </label>
              <input
                type="file"
                id="photo2"
                name="photo2"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo3"
              >
                Foto Pengesahan MENKUMHAM
              </label>
              <input
                type="file"
                id="photo3"
                name="photo3"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo4"
              >
                Foto Akta Pendirian
              </label>
              <input
                type="file"
                id="photo4"
                name="photo4"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo5"
              >
                Foto Akta Perubahan
              </label>
              <input
                type="file"
                id="photo5"
                name="photo5"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo6"
              >
                Foto NPWP Perusahaan
              </label>
              <input
                type="file"
                id="photo6"
                name="photo6"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo7"
              >
                Foto Surat Domisili
              </label>
              <input
                type="file"
                id="photo7"
                name="photo7"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo8"
              >
                Foto KTP Pengurus
              </label>
              <input
                type="file"
                id="photo8"
                name="photo8"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo9"
              >
                Logo
              </label>
              <input
                type="file"
                id="photo9"
                name="photo9"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo10"
              >
                Foto Direktur
              </label>
              <input
                type="file"
                id="photo10"
                name="photo10"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom Kedua - Input Foto */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo11"
              >
                Foto NPWP Pengurus Akta
              </label>
              <input
                type="file"
                id="photo11"
                name="photo11"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                className="text-white text-sm font-medium"
                htmlFor="photo12"
              >
                Bukti Transfer
              </label>
              <input
                type="file"
                id="photo12"
                name="photo12"
                className="w-full text-white p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="bg-white text-black rounded-md mt-4 p-2 w-full"
              >
                Kirim Pendaftaran
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default KtaLayout;
