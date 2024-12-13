"use client";
import Image from "next/image";
import { useState } from "react";

const NonKonstruksiLayout = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setIsRegistered(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const klasifikasi = [
    { value: "", label: "Pilih..." },
    { value: "kontrak_kerja", label: "Kontrak Kerja" },
    { value: "spk", label: "SPK" },
    { value: "adendum_kontrak", label: "Adendum Kontrak" },
  ];

  const subKlasifikasi = [
    { value: "", label: "Pilih..." },
    { value: "bast_1", label: "BAST 1" },
    { value: "bast_2", label: "BAST 2" },
    { value: "bast_3", label: "BAST 3" },
  ];

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">SBU Non-Konstruksi</h1>
      <p className="text-[10px] tracking-wide -mt-1">
        Detail SBU Non-Konstruksi
      </p>

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
            Oh No !!! Anda Belum Terdaftar
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
        <div
          className="w-full bg-[#ffff] h-auto flex flex-col rounded-md mt-10 p-6"
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.10)" }}
        >
          <h2 className="text-black font-semibold text-xl mb-4">
            Pendaftaran SBU Non-Kontruksi
          </h2>
          <p className="text-[10px] tracking-wide -mt-4 mb-5">
            Isi formulir untuk pendaftaran SBU Non-Konstruksi
          </p>
          <hr className="w-full border-t-2 border-gray-300" />

          <form className="w-full max-w-none grid grid-cols-2 gap-4 mt-5">
            {/* Kolom Kiri - Dokumen Administrasi Badan Usaha */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="AktePerusahaan"
              >
                Scan Warna Akte Perusahaan
              </label>
              <input
                type="file"
                id="AktePerusahaan"
                name="AktePerusahaan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="AktePerubahan"
              >
                Scan Warna Akte Perubahan (jika ada)
              </label>
              <input
                type="file"
                id="AktePerubahan"
                name="AktePerubahan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="SKMenkumham"
              >
                Scan SK Menkumham
              </label>
              <input
                type="file"
                id="SKMenkumham"
                name="SKMenkumham"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWPPerusahaan"
              >
                Scan NPWP Perusahaan
              </label>
              <input
                type="file"
                id="NPWPPerusahaan"
                name="NPWPPerusahaan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="KTPPengurus"
              >
                Scan KTP Pengurus (yang tercantum diAkte)
              </label>
              <input
                type="file"
                id="KTPPengurus"
                name="KTPPengurus"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWPPengurus"
              >
                Scan NPWP Pengurus (yang tercantum diAkte)
              </label>
              <input
                type="file"
                id="NPWPPengurus"
                name="NPWPPengurus"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom Kanan - Dokumen Tenaga Kerja Konstruksi */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-black text-sm font-medium"
                htmlFor="Direktur"
              >
                Foto Direktur
              </label>
              <input
                type="file"
                id="Direktur"
                name="Direktur"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="IzinPerusahaan"
              >
                Scan Izin Perusahaan
              </label>
              <input
                type="file"
                id="IzinPerusahaan"
                name="IzinPerusahaan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="IjazahPenanggungJawab"
              >
                Scan Ijazah Penanggung Jawab
              </label>
              <input
                type="file"
                id="IjazahPenanggungJawab"
                name="IjazahPenanggungJawab"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWPPenanggungJawab"
              >
                Scan NPWP Penanggung Jawab
              </label>
              <input
                type="file"
                id="NPWPPenanggungJawab"
                name="NPWPPenanggungJawab"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="KTPPenanggungJawab"
              >
                Scan KTP Penanggung Jawab
              </label>
              <input
                type="file"
                id="KTPPenanggungJawab"
                name="KTPPenanggungJawab"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom untuk foto formulir */}
            <div className="col-span-2 md:col-span-1 mt-4">
              <h3 className="text-black font-semibold text-lg mb-2">
                * DATA LAINNYA
              </h3>

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="klasifikasi"
              >
                Klasifikasi
              </label>
              <select
                id="klasifikasi"
                name="klasifikasi"
                className="w-full text-black p-2 rounded-md focus:outline-none border-black border-2"
              >
                {klasifikasi.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label
                className="text-black text-sm font-medium mt-4 "
                htmlFor="subKlasifikasi"
              >
                Sub Klasifikasi
              </label>
              <select
                id="subKlasifikasi"
                name="subKlasifikasi"
                className="w-full text-black p-2 rounded-md focus:outline-none border-black border-2"
                required
              >
                {subKlasifikasi.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Kolom untuk tombol kirim */}
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-[#333A48] text-white rounded-md mt-4 p-2 w-full"
              >
                Kirim Pendaftaran
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Persyaratan */}
      {showModal && (
        <div
          className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white mt-[5%] p-6  w-[90%] h-[80%] max-w-md   ml-[20%] relative animate-fadeIn overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Persyaratan Pendaftaran</h2>
            <hr className="w-full border-t-2 border-gray-300" />
            <p className="text-sm text-gray-700 mb-4 mt-9">
              Berikut adalah persyaratan yang perlu dipenuhi untuk mendaftar{" "}
              <b>SBU NON-KONSTRUKSI</b>
            </p>

            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Akte Perusahaan</li>
              <li>Akte Perubahan (jika ada)</li>
              <li>SK Menkumham</li>
              <li>NPWP Perusahaan</li>
              <li>KTP dan NPWP Pengurus yang tercantum di Akte</li>
              <li>Izin Perusahaan</li>
              <li>Foto Direktur</li>
              <li>Ijazah, KTP, NPWP penanggung jawab SBU setiap bidang SBU</li>
            </ul>

            <p className="text-sm text-gray-700 mb-4 font-bold mt-4">
              * Harap Persiapkan Semua Persyaratan Terlebih Dahulu Sebelum
              Mendaftar, Jika Semua Persyaratan Telah Siap Silahkan Lanjutkan
              Pendaftaran Dengan Menekan Tombol Di Bawah Ini.
            </p>

            <button
              onClick={handleModalConfirm}
              className="bg-black text-white rounded-md px-4 py-2 mx-auto block "
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NonKonstruksiLayout;
