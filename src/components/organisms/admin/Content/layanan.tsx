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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [memberInfo, setMemberInfo] = useState<string[]>([]); // Data member_info
  const [membershipRequirements, setMembershipRequirements] = useState<
    string[]
  >([]); // Data membership_requirements
  const [memberInfoEditor, setMemberInfoEditor] = useState<string[]>([]); // State untuk editor memberInfo
  const [membershipRequirementsEditor, setMembershipRequirementsEditor] =
    useState<string[]>([]); // State untuk editor membershipRequirements
  const [editorValue, setEditorValue] = useState([]);
  useEffect(() => {
    // Fungsi untuk mengambil data dari berbagai API
    const fetchData = async () => {
      try {
        const types = ["member_info", "membership_requirements"];
        const allData = {};

        for (let type of types) {
          const response = await axios.get(
            `http://localhost:8000/api/layanan/${type}`
          );
          allData[type] = response.data.data; // Menyimpan data berdasarkan type
        }

        // Menyimpan data untuk setiap type di state yang sesuai
        setMemberInfo(allData["member_info"]);
        setMembershipRequirements(allData["membership_requirements"]);
        setMemberInfoEditor(allData["member_info"]); // Menyimpan data untuk editor
        setMembershipRequirementsEditor(allData["membership_requirements"]); // Menyimpan data untuk editor
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (type: string) => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const token = localStorage.getItem("token");

      let currentEditor = [];
      let setEditor;

      if (type === "member_info") {
        currentEditor = memberInfoEditor || [];
        setEditor = setMemberInfoEditor;
      } else if (type === "membership_requirements") {
        currentEditor = membershipRequirementsEditor || [];
        setEditor = setMembershipRequirementsEditor;
      }

      const filteredEditorValue = currentEditor.filter(
        (item) => item.trim() !== ""
      );

      const deletedIndices = currentEditor
        .map((item, idx) => (item.trim() === "" ? idx : null))
        .filter((idx) => idx !== null);

      const newItems = filteredEditorValue.filter(
        (item) => !currentEditor.includes(item) && item.trim() !== ""
      );

      const payload = {
        index: filteredEditorValue.map((_, idx) => idx),
        value: filteredEditorValue,
        deletedIndices: deletedIndices.length > 0 ? deletedIndices : undefined,
        newItems: newItems.length > 0 ? newItems : [],
      };

      console.log("Request Payload:", payload);

      const response = await axios.put(
        `http://localhost:8000/api/layanan/${type}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      setIsSaved(true);

      // Memperbarui data setelah update
      if (type === "member_info") {
        setMemberInfoEditor(filteredEditorValue); // Memperbarui state untuk member_info
      } else if (type === "membership_requirements") {
        setMembershipRequirementsEditor(filteredEditorValue); // Memperbarui state untuk membership_requirements
      }
    } catch (err) {
      setIsLoading(false);
      console.error(
        "Error updating data:",
        err.response ? err.response.data : err
      );
    }
  };

  const handleEditorChange = (index: number, value: string, type: string) => {
    let updatedEditorValue;

    // Tentukan editor value yang akan diubah berdasarkan type
    if (type === "member_info") {
      updatedEditorValue = [...memberInfoEditor];
      updatedEditorValue[index] = value.trim(); // Update item berdasarkan index dan pastikan value sudah ter-trim
      setMemberInfoEditor(updatedEditorValue);
    } else if (type === "membership_requirements") {
      updatedEditorValue = [...membershipRequirementsEditor];
      updatedEditorValue[index] = value.trim(); // Update item berdasarkan index dan pastikan value sudah ter-trim
      setMembershipRequirementsEditor(updatedEditorValue);
    }

    // Log editor value untuk memastikan pembaruan data yang benar
    console.log(`${type} editor updated value:`, updatedEditorValue);
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

  const handleAddItem = (type: string) => {
    if (type === "member_info") {
      // Cegah penambahan item kosong
      if (memberInfoEditor.every((item) => item.trim() !== "")) {
        setMemberInfoEditor([...memberInfoEditor, ""]);
      }
    } else if (type === "membership_requirements") {
      if (membershipRequirementsEditor.every((item) => item.trim() !== "")) {
        setMembershipRequirementsEditor([...membershipRequirementsEditor, ""]);
      }
    }
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
          {memberInfo.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block font-medium text-gray-700">
                {`Item ${index + 1}`}
              </label>
              <textarea
                value={memberInfoEditor[index]} // Menggunakan state yang benar
                onChange={(e) =>
                  handleEditorChange(index, e.target.value, "member_info")
                } // Menambahkan parameter type
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}

          <button
            onClick={() => handleSubmit("member_info")}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            onClick={handleAddItem}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Tambah Item Baru
          </button>

          {/* Indikator loading */}
          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div>
        <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 mt-8 dark:bg-boxdark">
          <p className="mb-2 font-semibold">Persyaratan Kartu Tanda Anggota</p>
          {/* Menampilkan setiap item dalam array dengan input */}
          {membershipRequirements.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block font-medium text-gray-700">
                {`Item ${index + 1}`}
              </label>
              <textarea
                value={membershipRequirementsEditor[index]} // Menggunakan state yang benar
                onChange={(e) =>
                  handleEditorChange(
                    index,
                    e.target.value,
                    "membership_requirements"
                  )
                } // Menambahkan parameter type
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}

          <button
            onClick={() => handleSubmit("membership_requirements")}
            className="mt-[4rem] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>

          {isLoading && (
            <p className="mt-4 text-blue-500">
              Menyimpan data, harap tunggu...
            </p>
          )}
        </div>
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
