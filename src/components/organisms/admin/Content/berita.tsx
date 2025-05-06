"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

const BeritaPage = () => {
  const [beritas, setBeritas] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBerita, setCurrentBerita] = useState<any | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBeritas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBeritas(response.data);
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritas();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setMessage("Gambar harus diunggah");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error adding berita:", error);
      setMessage("Gagal menambahkan berita");
    }
  };

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/berita",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setIsSaved(true);
      setTitle("");
      setCaption("");
      setImage(null);

      // Update daftar berita
      const updatedBeritas = await axios.get(
        "http://localhost:8000/api/berita",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBeritas(updatedBeritas.data);
    } catch (error) {
      console.error("Error adding berita:", error);
      setMessage("Gagal menambahkan berita");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleOk = () => {
    setIsSaved(false);
  };

  const handleShowPopup = (berita: any) => {
    setCurrentBerita(berita);
    setTitle(berita.title);
    setCaption(berita.caption);
    setImage(null); // Biarkan image kosong karena hanya menampilkan data
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentBerita(null);
    setTitle("");
    setCaption("");
    setImage(null); // Reset form ketika menutup popup tanpa menyimpan
  };

  const handleEditBerita = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      if (image) formData.append("image", image as Blob); // hanya tambahkan image jika ada

      const response = await axios.put(
        `http://localhost:8000/api/berita/${currentBerita.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setShowPopup(false);
      setTitle("");
      setCaption("");
      setImage(null);

      const updatedBeritas = await axios.get(
        "http://localhost:8000/api/berita",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBeritas(updatedBeritas.data);
    } catch (error) {
      console.error("Error editing berita:", error);
      setMessage("Gagal mengedit berita");
    }
  };

  const handleShowDetail = (berita: any) => {
    setCurrentBerita(berita);
    setShowDetailPopup(true); // Tampilkan popup detail
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
    setCurrentBerita(null);
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Berita</h1>
  
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Berita Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleConfirm}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            Tambah Berita
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
  
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Berita</h2>
        {beritas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritas.map((berita) => (
              <div
                key={berita.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={`http://localhost:8000/storage/${berita.image}`}
                  alt={berita.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {truncateText(berita.title, 20)}
                  </h3>
                  <p className="text-gray-600 mt-2 cursor-pointer">{truncateText(berita.caption, 20)}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleShowPopup(berita)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleShowDetail(berita)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No berita available</p>
        )}
      </div>
  
      {isLoading && (
        <p className="mt-4 text-center text-blue-500">Loading...</p>
      )}
  
      {showPopup && currentBerita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Berita</h2>
            <form onSubmit={handleEditBerita} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Caption</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={handleClosePopup}
              className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
  
      {showDetailPopup && currentBerita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
            <button
              onClick={handleCloseDetailPopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
  
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detail Berita</h2>
            <h3 className="text-xl font-semibold text-gray-900">{currentBerita.title}</h3>
            <div className="mt-4">
              <img
                src={`http://localhost:8000/storage/${currentBerita.image}`}
                alt={currentBerita.title}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <p className="mt-4 text-gray-700 break-words">{currentBerita.caption}</p>
          </div>
        </div>
      )}
  
      {/* Dialog Konfirmasi */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4 text-gray-700">Apakah data yang Anda isi sudah benar?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition-all duration-300"
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
            <p className="text-lg font-semibold mb-4 text-green-600">Data berhasil disimpan!</p>
            <button
              onClick={handleOk}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300 mt-4"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default BeritaPage;
