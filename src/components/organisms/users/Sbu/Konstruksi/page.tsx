"use client";
import Image from "next/image";
import { useState } from "react";

const KonstruksiLayout = () => {
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

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">SBU Konstruksi</h1>
      <p className="text-[10px] tracking-wide -mt-1">Detail SBU Konstruksi</p>

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
            Pendaftaran SBU Kontruksi
          </h2>
          <p className="text-[10px] tracking-wide -mt-4 mb-5">
            Isi formulir untuk pendaftaran SBU Konstruksi
          </p>
          <hr className="w-full border-t-2 border-gray-300" />

          <form className="w-full max-w-none grid grid-cols-2 gap-4 mt-5">
            {/* Kolom Kiri - Dokumen Administrasi Badan Usaha */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-black font-semibold text-lg mb-2">
                * DOKUMEN ADMINISTRASI BADAN USAHA
              </h3>

              <label className="text-black text-sm font-medium " htmlFor="NIB">
                NIB
              </label>
              <input
                type="text"
                id="NIB"
                name="NIB"
                className="w-full p-2 rounded-md focus:outline-none border-black border-2"
                placeholder="Masukkan NIB"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4 "
                htmlFor="web"
              >
                Web Perusahaan
              </label>
              <input
                type="text"
                id="web"
                name="web"
                className="w-full p-2 rounded-md focus:outline-none border-black border-2"
                placeholder="Masukkan Web Perusahaan"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="KTAAsosiasi"
              >
                Scan Warna Kartu Tanda Anggota Asosisiasi (yang masih berlaku)
              </label>
              <input
                type="file"
                id="KTAAsosiasi"
                name="KTAAsosiasi"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="AktePerusahaan"
              >
                Scan Warna Akte Pendirian Perusahaan
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
                Scan Warna Akte Perubahan Perusahaan
              </label>
              <input
                type="file"
                id="AktePerubahan"
                name="AktePerubahan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
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
                htmlFor="SKMenkumhamKBLI2020"
              >
                Scan SK Menkumham (KBLI 2020)
              </label>
              <input
                type="file"
                id="SKMenkumhamKBLI2020"
                name="SKMenkumhamKBLI2020"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWP"
              >
                Scan Warna NPWP Perusahaan
              </label>
              <input
                type="file"
                id="NPWP"
                name="NPWP"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="Stempel"
              >
                Contoh Stempel Perusahaan
              </label>
              <input
                type="file"
                id="Stempel"
                name="Stempel"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="Direktur"
              >
                Foto PJBU/Direktur
              </label>
              <input
                type="file"
                id="Direktur"
                name="Direktur"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom Kanan - Dokumen Tenaga Kerja Konstruksi */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-black font-semibold text-lg mb-2">
                * DOKUMEN TENAGA KERJA KONSTRUKSI
              </h3>

              <label
                className="text-black text-sm font-medium"
                htmlFor="ktpPengurus"
              >
                Scan KTP Pengurus Badan Usaha
              </label>
              <input
                type="file"
                id="ktpPengurus"
                name="ktpPengurus"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWPPengurus"
              >
                Scan NPWP Pengurus Badan Usaha
              </label>
              <input
                type="file"
                id="NPWPPengurus"
                name="NPWPPengurus"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="PJTBU"
              >
                SKK PJTBU
              </label>
              <input
                type="file"
                id="PJTBU"
                name="PJTBU"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="PJSKBU"
              >
                PJSKBU
              </label>
              <input
                type="file"
                id="PJSKBU"
                name="PJSKBU"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="KTPTenagaAhli"
              >
                Scan Warna KTP Tenaga Ahli
              </label>
              <input
                type="file"
                id="KTPTenagaAhli"
                name="KTPTenagaAhli"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="NPWPTenagaAhli"
              >
                Scan NPWP Tenaga Ahli
              </label>
              <input
                type="file"
                id="NPWPTenagaAhli"
                name="NPWPTenagaAhli"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="IjazahTenagaAhli"
              >
                Scan Warna Ijazah Tenaga Ahli
              </label>
              <input
                type="file"
                id="IjazahTenagaAhli"
                name="IjazahTenagaAhli"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom untuk foto formulir */}
            <div className="col-span-2 md:col-span-1 mt-4">
              <h3 className="text-black font-semibold text-lg mb-2">
                * DOKUMEN PENJUALAN TAHUNAN
              </h3>
              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="spk"
              >
                Scan Kontrak Kerja/ SPK/ Adendum Kontrak (jika ada)
              </label>
              <input
                type="file"
                id="spk"
                name="spk"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="BAST"
              >
                Scan BAST
              </label>
              <input
                type="file"
                id="BAST"
                name="BAST"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="PerjanjianKSO"
              >
                Scan Surat Perjanjian KSO (jika ada)
              </label>
              <input
                type="file"
                id="PerjanjianKSO"
                name="PerjanjianKSO"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="Pajak"
              >
                Scan Faktur Pajak
              </label>
              <input
                type="file"
                id="Pajak"
                name="Pajak"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
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
            <p className="text-sm text-gray-700 mb-4 mt-2">
              Berikut adalah persyaratan yang perlu dipenuhi untuk mendaftar{" "}
              <b>SBU KONSTRUKSI</b>
            </p>
            <div className="mb-4">
              <strong className="font-semibold">
                DOKUMEN ADMINISTRASI BADAN USAHA
              </strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>
                SCAN WARNA KARTU TANDA ANGGOTA ASOSIASI Yang Masih Berlaku
              </li>
              <li>SCAN WARNA AKTE PENDIRIAN PERUSAHAAN dan SK MENKUMHAM</li>
              <li>
                SCAN WARNA AKTE PERUBAHAN PERUSAHAAN dan SK MENKUMHAM (KBLI
                2020)
              </li>
              <li>SCAN WARNA NPWP PERUSAHAAN</li>
              <li>NIB (NOMOR INDUK BERUSAHA)</li>
              <li>Contoh Stample Perusahaan</li>
              <li>Email, No. Telpon Perusahaan yang aktif</li>
              <li>Website Perusahaan (Jika Ada)</li>
              <li>Foto PJBU/Direktur</li>
            </ul>

            <div className="mb-4">
              <strong className="font-semibold">
                DOKUMEN PENJUALAN TAHUNAN
              </strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Scan Kontrak Kerja/SPK/Adendum Kontrak (jika ada)</li>
              <li>Scan Surat Perjanjian KSO (jika ada)</li>
              <li>Scan BAST</li>
              <li>Scan Faktur pajak</li>
            </ul>

            <div className="mb-4">
              <strong className="font-semibold">
                DOKUMEN KEMAMPUAN KEUANGAN
              </strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Scan KTP dan NPWP Pemilik saham</li>
              <li>Neraca Keuangan Badan Usaha</li>
              <li>Laporan KAP (untuk klasifikasi M,B,S)</li>
            </ul>

            <div className="mb-4">
              <strong className="font-semibold">
                DOKUMEN TENAGA KERJA KONSTRUKSI
              </strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Scan KTP dan NPWP Pengurus Badan Usaha</li>
              <li>NSKK PJTBU dan PJSKBU</li>
              <li>Scan Warna KTP tenaga ahli</li>
              <li>Scan Warna NPWP tenaga ahli</li>
              <li>Scan Warna Ijazah tenaga ahli</li>
            </ul>

            <div className="mb-4">
              <strong className="font-semibold">DOKUMEN SNM</strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Sertifikat ISO 9001:2015 (klasifikasi M,B,S)</li>
              <li>Dokumen SMM (klasifikasi K,M,B,S)</li>
              <li>Dokumen Rencana Mutu Kontrak (klasifikasi K,M,B,S)</li>
              <li>Surat Pernyataan Pemenuhan Komitmen Penyelenggaraan SMM</li>
            </ul>

            <div className="mb-4">
              <strong className="font-semibold">DOKUMEN SMAP</strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-2 ml-4">
              <li>Sertifikat ISO 37001:2016 (klasifikasi K,M,B,S)</li>
              <li>Dokumen SMAP (klasifikasi K,M,B,S)</li>
              <li>Surat Pernyataan Pemenuhan Komitmen Penyelenggaraan SMAP</li>
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

export default KonstruksiLayout;
