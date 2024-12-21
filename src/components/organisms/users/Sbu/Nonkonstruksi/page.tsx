"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const NonKonstruksiLayout = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rekeningOptions, setRekeningOptions] = useState<any[]>([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [klasifikasis, setKlasifikasis] = useState([]);
  const [subKlasifikasis, setSubKlasifikasis] = useState([]);
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState("");
  const [selectedSubKlasifikasi, setSelectedSubKlasifikasi] = useState("");
  const [loadingSubKlasifikasis, setLoadingSubKlasifikasis] = useState(false);

  // Fetch data klasifikasi
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/non-konstruksi/klasifikasis")
      .then((response) => {
        console.log(response.data);
        const klasifikasis = response.data.data;

        if (Array.isArray(klasifikasis)) {
          setKlasifikasis(klasifikasis);
        } else {
          console.error("Data klasifikasis tidak dalam format yang diharapkan");
        }
      })
      .catch((error) => {
        console.error("Error fetching klasifikasis:", error);
      });
  }, []);

  // Fetch data sub-klasifikasi berdasarkan klasifikasi yang dipilih
  const handleKlasifikasiChange = (klasifikasiId) => {
    setSelectedKlasifikasi(klasifikasiId);
    setSelectedSubKlasifikasi("");
    setLoadingSubKlasifikasis(true);

    if (klasifikasiId) {
      axios
        .get(
          `http://localhost:8000/api/non-konstruksi/${klasifikasiId}/sub-klasifikasis`
        )
        .then((response) => {
          console.log(response.data);
          const subKlasifikasis = response.data.data;

          if (Array.isArray(subKlasifikasis)) {
            setSubKlasifikasis(subKlasifikasis);
          } else {
            console.error(
              "Data sub-klasifikasis tidak dalam format yang diharapkan"
            );
          }
          setLoadingSubKlasifikasis(false);
        })
        .catch((error) => {
          console.error("Error fetching sub-klasifikasis:", error);
          setLoadingSubKlasifikasis(false);
        });
    } else {
      setSubKlasifikasis([]);
      setLoadingSubKlasifikasis(false);
    }
  };

  useEffect(() => {
    const fetchRekening = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rek");
        setRekeningOptions(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data rekening", error);
      }
    };

    fetchRekening();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/sbun",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Pendaftaran berhasil: " + response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Terjadi kesalahan: " + error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
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

          <form
            className="w-full max-w-none grid grid-cols-2 gap-4 mt-5"
            onSubmit={handleSubmit}
          >
            {/* Kolom Kiri - Dokumen Administrasi Badan Usaha */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-black text-sm font-medium "
                htmlFor="email_perusahaan"
              >
                Email Perusahaan
              </label>
              <input
                type="text"
                id="email_perusahaan"
                name="email_perusahaan"
                className="w-full p-2 rounded-md focus:outline-none border-black border-2"
                placeholder="Masukkan Email Perusahaan"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4 "
                htmlFor="nomor_hp_penanggung_jawab"
              >
                No Hp Penanggung Jawab
              </label>
              <input
                type="text"
                id="nomor_hp_penanggung_jawab"
                name="nomor_hp_penanggung_jawab"
                className="w-full p-2 rounded-md focus:outline-none border-black border-2"
                placeholder="Masukkan No HP Penanggung Jawab"
                pattern="\d{1,12}"
                title="Hanya boleh angka dengan panjang maksimal 11"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="akta_pendirian"
              >
                Scan Warna Akte Pendirian
              </label>
              <input
                type="file"
                id="akta_pendirian"
                name="akta_pendirian"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="npwp_perusahaan"
              >
                Scan NPWP Perusahaan
              </label>
              <input
                type="file"
                id="npwp_perusahaan"
                name="npwp_perusahaan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="ktp_penanggung_jawab"
              >
                Scan KTP Penanggung Jawab
              </label>
              <input
                type="file"
                id="ktp_penanggung_jawab"
                name="ktp_penanggung_jawab"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="ktp_pemegang_saham"
              >
                Scan KTP Pemegang Saham
              </label>
              <input
                type="file"
                id="ktp_pemegang_saham"
                name="ktp_pemegang_saham"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />
            </div>

            {/* Kolom Kanan - Dokumen Tenaga Kerja Konstruksi */}
            <div className="col-span-2 md:col-span-1">
              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="npwp_pemegang_saham"
              >
                Scan NPWP Pemegang Saham
              </label>
              <input
                type="file"
                id="npwp_pemegang_saham"
                name="npwp_pemegang_saham"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="logo_perusahaan"
              >
                Scan Logo Perusahaan
              </label>
              <input
                type="file"
                id="logo_perusahaan"
                name="logo_perusahaan"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <label
                className="text-black text-sm font-medium mt-4"
                htmlFor="bukti_transfer"
              >
                Scan Bukti Transfer
              </label>
              <input
                type="file"
                id="bukti_transfer"
                name="bukti_transfer"
                className="w-full text-black p-2 rounded-md focus:outline-none"
                accept="image/*"
                required
              />

              <div className="col-span-2 md:col-span-1 ">
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

              {/* Dropdown Klasifikasi */}
              <div>
                <label
                  htmlFor="non_konstruksi_klasifikasi_id"
                  style={{ display: "block", margin: "10px 0" }}
                >
                  Pilih Klasifikasi:
                </label>
                <select
                  id="non_konstruksi_klasifikasi_id"
                  name="non_konstruksi_klasifikasi_id"
                  value={selectedKlasifikasi}
                  onChange={(e) => handleKlasifikasiChange(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "20px",
                    borderWidth: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderRadius: "0.375rem",
                  }}
                >
                  <option value="">-- Pilih Klasifikasi --</option>
                  {klasifikasis.map((klasifikasi) => (
                    <option key={klasifikasi.id} value={klasifikasi.id}>
                      {klasifikasi.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Sub-Klasifikasi */}
              <div>
                <label
                  htmlFor="non_konstruksi_sub_klasifikasi_id"
                  style={{ display: "block", margin: "10px 0" }}
                >
                  Pilih Sub-Klasifikasi:
                </label>
                <select
                  id="non_konstruksi_sub_klasifikasi_id"
                  name="non_konstruksi_sub_klasifikasi_id"
                  value={selectedSubKlasifikasi}
                  onChange={(e) => setSelectedSubKlasifikasi(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "20px",
                    borderWidth: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderRadius: "0.375rem",
                  }}
                  disabled={!selectedKlasifikasi || loadingSubKlasifikasis}
                >
                  <option value="">-- Pilih Sub-Klasifikasi --</option>
                  {loadingSubKlasifikasis ? (
                    <option value="">Memuat sub-klasifikasi...</option>
                  ) : (
                    subKlasifikasis.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.nama}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Kolom untuk foto formulir */}
            {/* <div className="col-span-2 md:col-span-1 mt-4">
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
            </div> */}

            {/* Kolom untuk tombol kirim */}
            <div className="col-span-2">
              <button
                type="submit"
                className={`bg-[#333A48] text-white rounded-md mt-4 p-2 w-full${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Daftar Sekarang"}
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
