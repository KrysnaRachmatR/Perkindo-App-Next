"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const KtaLayout = ({
  hasKTA,
  status_diterima,
  komentar,
}: {
  hasKTA: boolean;
  status_diterima: string; // status bisa "approve", "pending", atau "rejected"
  komentar: string;
}) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(hasKTA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [kabupatenOptions, setKabupatenOptions] = useState<any[]>([]);
  const [rekeningOptions, setRekeningOptions] = useState<any[]>([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State untuk menampilkan formulir

  useEffect(() => {
    // Mendapatkan data kabupaten dan rekening
    const fetchKabupaten = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/kota-kabupaten"
        );
        setKabupatenOptions(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data kabupaten", error);
      }
    };

    const fetchRekening = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rek");
        setRekeningOptions(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data rekening", error);
      }
    };

    fetchKabupaten();
    fetchRekening();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setIsSubmitted(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/kta",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "approve") {
        setIsAccepted(true);
      } else if (response.data.status === "rejected") {
        setIsRejected(true);
      }
    } catch (error) {
      console.error(
        "Terjadi kesalahan:",
        error.response?.data || error.message
      );
      alert("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  // Fungsi untuk menampilkan formulir pendaftaran
  const handleRegisterClick = () => {
    setIsRegistering(true); // Menampilkan formulir pendaftaran
  };

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">KTA</h1>
      <p className="text-[10px] tracking-wide -mt-1">Detail KTA</p>

      {/* Jika hasKTA true, cek status_diterima */}
      {!isRegistering && (
        <>
          {/* Cek apakah status_diterima kosong atau null */}
          {status_diterima === "" || status_diterima === null ? (
            <div className="flex flex-col items-center mt-8">
              <Image
                src="/images/oops.png" // Ganti dengan path gambar yang sesuai
                alt="KTA Daftar"
                width={300}
                height={300}
                className="mt-2 mb-4"
              />
              <p className="font-semibold text-2xl tracking-wide mt-4">
                Oh No !!! Anda Belum Terdaftar
              </p>
              <p className="text-[14px] mt-1">
                Silahkan lakukan pendaftaran terlebih dahulu
              </p>
              <button
                onClick={handleRegisterClick} // Klik tombol untuk menampilkan formulir
                className="bg-black text-white text-center items-center justify-center w-20 rounded-md mt-4 hover:bg-red"
              >
                Daftar
              </button>
            </div>
          ) : (
            // Jika status_diterima tidak kosong, tampilkan status sesuai nilai status_diterima
            <>
              {/* Jika status diterima adalah "approve", tampilkan teks dan gambar KTA active */}
              {status_diterima === "approve" && (
                <div className="flex flex-col items-center mt-8">
                  <p className="text-2xl font-bold text-green-600">
                    KTA Active
                  </p>
                  <Image
                    src="/images/ktaExample.jpeg"
                    alt="KTA Active"
                    width={300}
                    height={300}
                    className="mt-4"
                  />
                </div>
              )}

              {/* Jika status diterima adalah "pending", tampilkan teks dan gambar KTA masih diproses */}
              {status_diterima === "pending" && (
                <div className="flex flex-col items-center mt-8">
                  <Image
                    src="/images/pending.jpeg"
                    alt="KTA Pending"
                    width={500}
                    height={500}
                    className="mt-4 mb-8"
                  />
                  <p className="text-2xl font-bold">KTA masih diproses...</p>
                </div>
              )}

              {/* Jika status diterima adalah "rejected", tampilkan teks dan gambar KTA ditolak */}
              {status_diterima === "rejected" && (
                <div className="flex flex-col items-center mt-8">
                  <Image
                    src="/images/update.jpg"
                    alt="KTA Rejected"
                    width={300}
                    height={300}
                    className="mt-4 mb-6"
                  />
                  <p className="text-2xl font-bold text-red-600">{komentar}</p>
                  <button
                    onClick={handleRegisterClick} // Klik tombol untuk menampilkan formulir
                    className="bg-black text-white text-center items-center justify-center w-20 rounded-md mt-4 hover:bg-red"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Formulir pendaftaran */}
      {isRegistering &&
        (isSubmitted ? (
          // Section jika data berhasil dikirim
          <div className="w-full bg-[#fffcfc] h-[25rem] flex flex-col items-center justify-center rounded-2xl">
            <Image
              src="/images/pending.jpeg"
              alt="Processing KTA Image"
              width={200}
              height={200}
            />
            <p className="font-semibold text-2xl tracking-wide mt-4">
              KTA Masih Diproses...
            </p>
          </div>
        ) : (
          // Formulir Pendaftaran Anggota
          <div
            className="w-full bg-[#ffff] h-auto flex flex-col rounded-md mt-10 p-6"
            style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.10)" }}
          >
            <h2 className="text-black font-semibold text-xl mb-4">
              Pendaftaran Kartu Tanda Anggota
            </h2>
            <p className="text-[10px] tracking-wide -mt-4 mb-5">
              Isi formulir untuk pendaftaran KTA
            </p>
            <form
              className="w-full max-w-none grid grid-cols-2 gap-4"
              onSubmit={handleFormSubmit}
            >
              {/* Input Foto */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="formulir_permohonan"
                >
                  Foto Formulir Permohonan
                </label>
                <input
                  type="file"
                  id="formulir_permohonan"
                  name="formulir_permohonan"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="pernyataan_kebenaran"
                >
                  Foto Pernyataan Kebenaran
                </label>
                <input
                  type="file"
                  id="pernyataan_kebenaran"
                  name="pernyataan_kebenaran"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="pengesahan_menkumham"
                >
                  Foto Pengesahan MENKUMHAM
                </label>
                <input
                  type="file"
                  id="pengesahan_menkumham"
                  name="pengesahan_menkumham"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="akta_pendirian"
                >
                  Foto Akta Pendirian
                </label>
                <input
                  type="file"
                  id="akta_pendirian"
                  name="akta_pendirian"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="akta_perubahan"
                >
                  Foto Akta Perubahan
                </label>
                <input
                  type="file"
                  id="akta_perubahan"
                  name="akta_perubahan"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="npwp_perusahaan"
                >
                  Foto NPWP Perusahaan
                </label>
                <input
                  type="file"
                  id="npwp_perusahaan"
                  name="npwp_perusahaan"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="surat_domisili"
                >
                  Foto Surat Domisili
                </label>
                <input
                  type="file"
                  id="surat_domisili"
                  name="surat_domisili"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="ktp_pengurus"
                >
                  Foto KTP Pengurus
                </label>
                <input
                  type="file"
                  id="ktp_pengurus"
                  name="ktp_pengurus"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="logo"
                >
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="foto_direktur"
                >
                  Foto Direktur
                </label>
                <input
                  type="file"
                  id="foto_direktur"
                  name="foto_direktur"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              {/* Kolom Kedua - Input Foto */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="npwp_pengurus_akta"
                >
                  Foto NPWP Pengurus Akta
                </label>
                <input
                  type="file"
                  id="npwp_pengurus_akta"
                  name="npwp_pengurus_akta"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="bukti_transfer"
                >
                  Bukti Transfer
                </label>
                <input
                  type="file"
                  id="bukti_transfer"
                  name="bukti_transfer"
                  className="w-full text-black p-2 rounded-md focus:outline-none"
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="rekening_id"
                >
                  Rekening
                </label>
                <select
                  id="rekening_id"
                  name="rekening_id"
                  className="w-full text-black p-2 rounded-md focus:outline-none border-black border-2"
                  required
                >
                  <option value="" disabled selected>
                    Pilih Rekening
                  </option>
                  {rekeningOptions.map((rekening) => (
                    <option key={rekening.id} value={rekening.id}>
                      {rekening.nama_bank}{" "}
                      {/* Sesuaikan dengan properti yang relevan */}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  className="text-black text-sm font-medium"
                  htmlFor="kabupaten_id"
                >
                  Kabupaten
                </label>
                <select
                  id="kabupaten_id"
                  name="kabupaten_id"
                  className="w-full text-black p-2 rounded-md focus:outline-none border-black border-2"
                  required
                >
                  <option value="" disabled selected>
                    Pilih Kabupaten
                  </option>
                  {kabupatenOptions.map((kabupaten) => (
                    <option key={kabupaten.id} value={kabupaten.id}>
                      {kabupaten.nama}{" "}
                      {/* Sesuaikan dengan properti yang relevan */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-black text-white rounded-md mt-4 p-2 w-full"
                >
                  Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        ))}
    </>
  );
};

export default KtaLayout;
