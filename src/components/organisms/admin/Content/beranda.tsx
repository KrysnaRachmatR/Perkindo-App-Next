"use client";

import { useState } from "react";
import RichTextEditor from "./textEditor";

export default function BerandaKonten() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
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

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleOk = () => {
    setIsSaved(false);
  };

  return (
    <>
      <p className="text-3xl font-bold text-black mb-6 dark:text-white">
        KONTEN BERANDA
      </p>
      <div className="relative">
        <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 dark:bg-boxdark">
          <RichTextEditor onChange={handleEditorChange} value={content} />

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
