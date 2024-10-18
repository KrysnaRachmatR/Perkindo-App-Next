"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SbuKonstruksi = () => {
  const [anggota, setAnggota] = useState([]);
  const [formData, setFormData] = useState({
    no: "",
    nama_badan_usaha: "",
    alamat: "",
    direktur: "",
    kode_sbu: "",
    tanggal_masa_berlaku: "",
    sampai_dengan: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch anggota data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Dapatkan token dari localStorage
    if (!token) {
      router.push("/login"); // Redirect ke halaman login jika token tidak ada
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/sbu-konstruksi",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
          },
        }
      );
      console.log("Fetched data:", response.data);
      setAnggota(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token"); // Pastikan token ada di setiap request

    const url = editId
      ? `http://localhost:8000/api/sbu-konstruksi/${editId}`
      : "http://localhost:8000/api/sbu-konstruksi";
    const method = editId ? "put" : "post";

    try {
      console.log("Sending data:", formData);
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      });
      console.log("Response from API:", response.data);
      alert(editId ? "Data updated successfully" : "Data created successfully");
      resetForm();
      fetchData(); // Refetch the data
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError(
        error.response ? error.response.data.message : "Failed to save data"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const anggotaToEdit = anggota.find((item) => item.id === id);
    if (anggotaToEdit) {
      setFormData({
        no: anggotaToEdit.no,
        nama_badan_usaha: anggotaToEdit.nama_badan_usaha,
        alamat: anggotaToEdit.alamat,
        direktur: anggotaToEdit.direktur,
        kode_sbu: anggotaToEdit.kode_sbu,
        tanggal_masa_berlaku: anggotaToEdit.tanggal_masa_berlaku,
        sampai_dengan: anggotaToEdit.sampai_dengan,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); // Pastikan token ada di setiap request
    if (confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:8000/api/sbu-konstruksi/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
          },
        });
        alert("Data deleted successfully");
        setAnggota(anggota.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
        setError("Failed to delete data");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      no: "",
      nama_badan_usaha: "",
      alamat: "",
      direktur: "",
      kode_sbu: "",
      tanggal_masa_berlaku: "",
      sampai_dengan: "",
    });
    setEditId(null);
  };

  const handleLogout = async () => {
    try {
      // Call the backend to log out
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //Klasifikas Start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Contoh data klasifikasi (bisa diganti dengan data dari API atau state)
  const klasifikasiOptions = [
    "Konstruksi Bangunan",
    "Konstruksi Jalan",
    "Konstruksi Jembatan",
  ];

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  // Data Klasifikasi
  const [data, setData] = useState([
    {
      klasifikasi: "Konstruksi Bangunan",
      subKlasifikasi: [
        { name: "Bangunan Gedung", code: "KB-001" },
        { name: "Bangunan Industri", code: "KB-002" },
        { name: "Bangunan Komersial", code: "KB-003" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jalan",
      subKlasifikasi: [
        { name: "Jalan Raya", code: "KJ-004" },
        { name: "Jalan Tol", code: "KJ-005" },
        { name: "Jalan Pedesaan", code: "KJ-006" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jembatan",
      subKlasifikasi: [
        { name: "Jembatan Gantung", code: "KJM-007" },
        { name: "Jembatan Beton", code: "KJM-008" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jembatan",
      subKlasifikasi: [
        { name: "Jembatan Gantung", code: "KJM-007" },
        { name: "Jembatan Beton", code: "KJM-008" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jembatan",
      subKlasifikasi: [
        { name: "Jembatan Gantung", code: "KJM-007" },
        { name: "Jembatan Beton", code: "KJM-008" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jembatan",
      subKlasifikasi: [
        { name: "Jembatan Gantung", code: "KJM-007" },
        { name: "Jembatan Beton", code: "KJM-008" },
      ],
    },
    {
      klasifikasi: "Konstruksi Jembatan",
      subKlasifikasi: [
        { name: "Jembatan Gantung", code: "KJM-007" },
        { name: "Jembatan Beton", code: "KJM-008" },
      ],
    },
  ]);

  //Pencarian
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      const klasifikasiMatch = item.klasifikasi
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const subKlasifikasiMatch = item.subKlasifikasi.some(
        (sub) =>
          sub.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          sub.code.toLowerCase().includes(lowerCaseSearchTerm)
      );
      return klasifikasiMatch || subKlasifikasiMatch;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  //Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <p className="text-3xl font-bold text-black mb-6 dark:text-white">
        SBU KONSTRUKSI
      </p>
      <div className="relative">
        <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 dark:bg-boxdark">
          <p className="mb-8 text-2xl font-bold text-black text-center dark:text-white">
            KLASIFIKASI KONSTRUKSI
          </p>
          <div className="flex gap-4 mb-6">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleOpenModal("klasifikasi")}
            >
              Tambah Klasifikasi
            </button>

            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleOpenModal("sub-klasifikasi")}
            >
              Tambah Sub Klasifikasi
            </button>
            <input
              type="text"
              placeholder="Cari Klasifikasi, Sub Klasifikasi, atau Kode"
              value={searchTerm}
              className="ml-auto px-4 py-2 rounded border-2 border-[#A0AEC0] bg-transparent text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 dark:bg-boxdark dark:text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r">No.</th>
                  <th className="py-2 px-4 border-b border-r">Klasifikasi</th>
                  <th className="py-2 px-4 border-b border-r">
                    Sub Klasifikasi
                  </th>
                  <th className="py-2 px-4 border-b">Kode Sub Klasifikasi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => {
                    const subKlasifikasiCount = item.subKlasifikasi.length;
                    return item.subKlasifikasi.map((subItem, subIndex) => (
                      <tr
                        key={`${index}-${subIndex}`}
                        className="hover:bg-gray-100"
                      >
                        {subIndex === 0 ? (
                          <>
                            <td
                              className="py-2 px-4 border-b border-r text-center"
                              rowSpan={subKlasifikasiCount}
                            >
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td
                              className="py-2 px-4 border-b border-r text-center"
                              rowSpan={subKlasifikasiCount}
                            >
                              {item.klasifikasi}
                            </td>
                          </>
                        ) : null}
                        <td className="py-2 px-4 border-b border-r">
                          {subItem.name}
                        </td>
                        <td className="py-2 px-4 border-b">{subItem.code}</td>
                      </tr>
                    ));
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 dark:text-white"
                    >
                      Hasil tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav aria-label="Pagination">
              <ul className="flex items-center space-x-1">
                <li>
                  <button
                    className={`px-3 py-1 border rounded ${
                      currentPage === 1
                        ? "bg-gray-300 dark:text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500 border-blue-500"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={`px-3 py-1 border rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 dark:text-white"
                        : "bg-white "
                    }`}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-boxdark">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-white"
                onClick={handleCloseModal}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4 dark:text-white">
                {modalContent === "klasifikasi"
                  ? "Tambah Klasifikasi"
                  : "Tambah Sub Klasifikasi"}
              </h2>

              <form>
                {modalContent === "klasifikasi" && (
                  <div className="mb-4 dark:">
                    <label
                      htmlFor="klasifikasi"
                      className="block text-gray-700 font-medium mb-2 dark:text-white"
                    >
                      Nama Klasifikasi
                    </label>
                    <input
                      type="text"
                      id="klasifikasi"
                      name="klasifikasi"
                      className="w-full px-4 py-2 rounded border-2 border-[#A0AEC0] bg-transparent text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Masukkan nama klasifikasi"
                    />
                  </div>
                )}

                {modalContent === "sub-klasifikasi" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="selectKlasifikasi"
                        className="block text-gray-700 font-medium mb-2 dark:text-white"
                      >
                        Pilih Klasifikasi
                      </label>
                      <select
                        id="selectKlasifikasi"
                        className="w-full px-4 py-2 rounded border-2 border-[#A0AEC0] bg-transparent text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled selected>
                          Pilih klasifikasi
                        </option>
                        {klasifikasiOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="subKlasifikasi"
                        className="block text-gray-700 font-medium mb-2 dark:text-white"
                      >
                        Nama Sub Klasifikasi
                      </label>
                      <input
                        type="text"
                        id="subKlasifikasi"
                        name="subKlasifikasi"
                        className="w-full px-4 py-2 rounded border-2 border-[#A0AEC0] bg-transparent text-gray-500 placeholder:text-gray-400 outline-none transition duration-300 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Masukkan nama sub-klasifikasi"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={handleCloseModal}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="relative mt-10">
        <div className="bg-white h-min-screen rounded-md drop-shadow-md shadow-2 p-4 dark:bg-boxdark">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            Anggota Konstruksi
          </h1>
          {error && <p className="text-red-500 dark:text-white">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white dark:bg-boxdark dark:text-white ">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Nama Badan Usaha</th>
                  <th className="border px-4 py-2">Alamat</th>
                  <th className="border px-4 py-2">Direktur</th>
                  <th className="border px-4 py-2">Kode SBU</th>
                  <th className="border px-4 py-2">Tanggal Masa Berlaku</th>
                  <th className="border px-4 py-2">Sampai Dengan</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {anggota.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.no}</td>
                    <td className="border px-4 py-2">
                      {item.nama_badan_usaha}
                    </td>
                    <td className="border px-4 py-2">{item.alamat}</td>
                    <td className="border px-4 py-2">{item.direktur}</td>
                    <td className="border px-4 py-2">{item.kode_sbu}</td>
                    <td className="border px-4 py-2">
                      {item.tanggal_masa_berlaku}
                    </td>
                    <td className="border px-4 py-2">{item.sampai_dengan}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mb-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default SbuKonstruksi;
