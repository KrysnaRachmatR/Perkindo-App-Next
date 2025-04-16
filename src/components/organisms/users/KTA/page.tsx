"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

// Definisikan tipe untuk KTA
interface KtaProps {
  hasKTA: boolean;
  status_diterima: string | null; // status bisa "approve", "pending", "rejected", atau null
  komentar: string | null;
}

// Tipe data untuk opsi select
interface KabupatenOption {
  id: number;
  nama: string;
}

interface RekeningOption {
  id: number;
  nama_bank: string;
  nomor_rekening: string;
}

const KtaLayout = ({ hasKTA, status_diterima, komentar }: KtaProps) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(hasKTA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [kabupatenOptions, setKabupatenOptions] = useState<KabupatenOption[]>([]);
  const [rekeningOptions, setRekeningOptions] = useState<RekeningOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false); // State untuk menampilkan formulir

  // Base URL untuk API
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Mendapatkan data kabupaten dan rekening jika form registrasi ditampilkan
    if (isRegistering) {
      fetchDataOptions();
    }
  }, [isRegistering]);

  // Function untuk fetch data options (kabupaten dan rekening)
  const fetchDataOptions = async () => {
    setIsLoading(true);
    try {
      // Menggunakan Promise.all untuk fetch data paralel
      const [kabupatenResponse, rekeningResponse] = await Promise.all([
        axios.get(`${API_URL}/kota-kabupaten`),
        axios.get(`${API_URL}/rek`)
      ]);

      setKabupatenOptions(kabupatenResponse.data);
      setRekeningOptions(rekeningResponse.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
      setErrorMessage("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    const formData = new FormData(event.currentTarget);
    
    try {
      // Dapatkan token dari localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      
      const response = await axios.post(
        `${API_URL}/kta`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        // Setelah berhasil submit, update status berdasarkan respons dari server
        if (response.data.status === "approve") {
          setIsRegistered(true);
        }
      } else {
        setErrorMessage(response.data.message || "Terjadi kesalahan saat mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Pendaftaran gagal. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menampilkan formulir pendaftaran
  const handleRegisterClick = () => {
    setIsRegistering(true);
    setErrorMessage(null);
  };

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">KTA</h1>
      <p className="text-[10px] tracking-wide -mt-1">Detail KTA</p>

      {/* Tampilkan error message jika ada */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mt-3">
          {errorMessage}
        </div>
      )}

      {/* Jika sedang loading */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Jika tidak sedang proses registrasi, tampilkan status KTA */}
      {!isRegistering && (
        <>
          {/* Cek apakah status_diterima kosong atau null */}
          {!status_diterima || status_diterima === "" ? (
            <div className="flex flex-col items-center mt-8">
              <Image
                src="/images/oops.png"
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
                onClick={handleRegisterClick}
                className="bg-black text-white text-center py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition-colors"
                disabled={isLoading}
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
                  <p className="text-2xl font-bold text-red-600">{komentar || "Pendaftaran ditolak"}</p>
                  <p className="mt-2 text-[15px] tracking-wide">
                    Silahkan Melakukan Pendaftaran Lagi Dengan Data yang Valid
                  </p>

                  <button
                    onClick={handleRegisterClick}
                    className="bg-black text-white text-center py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition-colors"
                    disabled={isLoading}
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
      {isRegistering && (
        isSubmitted ? (
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
                  required
                >
                  <option value="">Pilih Rekening</option>
                  {rekeningOptions.map((rekening) => (
                    <option key={rekening.id} value={rekening.id}>
                      {rekening.nama_bank} - {rekening.nomor_rekening}
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
                  className="w-full text-black p-2 rounded-md focus:outline-none border border-gray-300"
                  required
                >
                  <option value="">Pilih Kabupaten</option>
                  {kabupatenOptions.map((kabupaten) => (
                    <option key={kabupaten.id} value={kabupaten.id}>
                      {kabupaten.nama}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="bg-gray-300 text-black rounded-md mt-4 p-2 flex-1"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-black text-white rounded-md mt-4 p-2 flex-1 hover:bg-gray-800 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
              </div>
            </form>
          </div>
        )
      )}
    </>
  );
};

export default KtaLayout;