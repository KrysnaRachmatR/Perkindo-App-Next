"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function LayananKonten() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [infoItems, setInfoItems] = useState<string[]>([]);
  const [editorValue, setEditorValue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/layanan/member_info"
        );
        setInfoItems(response.data.data);

        // Menyusun informasi ke dalam format teks untuk inputan biasa
        setEditorValue(response.data.data); // Set nilai editorValue langsung dengan data array
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowConfirmation(false); // Hide confirmation after clicking OK

    try {
      const token = localStorage.getItem("token");

      // Assuming editorValue is an array of strings, split into `index` and `value`
      const payload = {
        index: editorValue.map((_, idx) => idx), // Mapping to create an array of indices
        value: editorValue, // Use the original array as values
      };

      console.log("Request Payload:", payload); // Log the payload to check its structure

      const response = await axios.put(
        "http://localhost:8000/api/layanan/member_info", // Ensure this is the correct endpoint
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      setIsSaved(true); // Show success dialog
    } catch (err) {
      setIsLoading(false);
      console.error(
        "Error updating data:",
        err.response ? err.response.data : err
      );
    }
  };

  const handleEditorChange = (index: number, value: string) => {
    const updatedEditorValue = [...editorValue];
    updatedEditorValue[index] = value; // Update item berdasarkan index
    setEditorValue(updatedEditorValue);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setIsLoading(true);

    // Simulasi proses penyimpanan data
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
    }, 2000); // 2 detik sebagai contoh loading
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      if (index < editorValue.length - 1) {
        setCurrentIndex(index + 1);
      }
    } else if (e.key === "Backspace" && editorValue[index] === "") {
      if (index > 0) {
        setCurrentIndex(index - 1);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleOk = () => {
    setIsSaved(false);
  };

  const handleAddItem = () => {
    // Menambah item kosong baru ke dalam array
    setEditorValue([...editorValue, ""]);
  };

  return (
    <>
      <p className="text-3xl font-bold text-black mb-6 dark:text-white">
        KONTEN LAYANAN
      </p>
      <div className="relative">
        <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 dark:bg-boxdark">
          <p className="mb-2 font-semibold">Informasi Kartu Tanda Anggota</p>

          {/* Menampilkan setiap item dalam array dengan input */}
          {editorValue.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block font-medium text-gray-700">
                {`Item ${index + 1}`}
              </label>
              <textarea
                value={item}
                onChange={(e) => handleEditorChange(index, e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
          

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>

          {/* Indikator loading */}
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div>
        {/* <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 mt-8 dark:bg-boxdark">
          <p className="mb-2 font-semibold">Persyaratan Kartu Tanda Anggota</p>
          <RichTextEditor onChange={handleEditorChange} value={content} />

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>

          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div> */}
        {/* <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 mt-8 dark:bg-boxdark">
          <p className=" font-semibold">Persyaratan SBU Konstruksi</p>
          <p className="mb-2">Dokumen Administrasi Badan Usaha</p>
          <RichTextEditor onChange={handleEditorChange} value={content} />

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}

          <p className="mt-8">Dokumen Penjualan Tahunan</p>
          <div className="mt-2">
            <RichTextEditor onChange={handleEditorChange} value={content} />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}

          <p className="mt-8">Dokumen Kemampuan Keuangan</p>
          <div className="mt-2">
            <RichTextEditor onChange={handleEditorChange} value={content} />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}

          <p className="mt-8">Dokumen Tenaga Kerja Konstruksi</p>
          <div className="mt-2">
            <RichTextEditor onChange={handleEditorChange} value={content} />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}

          <p className="mt-8">Dokumen SNM</p>
          <div className="mt-2">
            <RichTextEditor onChange={handleEditorChange} value={content} />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}

          <p className="mt-8">Dokumen SMAP</p>
          <div className="mt-2">
            <RichTextEditor onChange={handleEditorChange} value={content} />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>

          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div> */}
        {/* <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 mt-8 dark:bg-boxdark">
          <p className="mb-2 font-semibold">Persyaratan SBU Non Konstruksi</p>
          <RichTextEditor onChange={handleEditorChange} value={content} />

          <button
            onClick={handleSubmit}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>

          
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div> */}
      </div>

      {/* Dialog Konfirmasi */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4">
              Apakah data yang Anda isi sudah benar?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className=" px-4 py-2 bg-red text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Berhasil Disimpan */}
      {isSaved && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4 text-green-600">
              Data berhasil disimpan!
            </p>
            <button
              onClick={handleOk}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
