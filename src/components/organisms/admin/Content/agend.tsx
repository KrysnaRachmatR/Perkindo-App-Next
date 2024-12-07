"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const AgendaPage = () => {
  const [agendas, setAgendas] = useState<any[]>([]);
  const [newAgenda, setNewAgenda] = useState({
    date: "",
    title: "",
    caption: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mengambil data agenda dari API
  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/agenda");
        setAgendas(response.data);
      } catch (err) {
        console.error("Error fetching agendas:", err);
      }
    };
    fetchAgendas();
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAgenda({ ...newAgenda, [name]: value });
  };

  // Fungsi untuk menambahkan agenda dengan token autentikasi
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Mulai proses loading

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to add an agenda.");
      setIsLoading(false); // Matikan loading jika terjadi error
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/agenda",
        newAgenda,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgendas([...agendas, response.data.agenda]);
      setNewAgenda({ date: "", title: "", caption: "" });
      setError("");
      setIsSaved(true); // Tampilkan notifikasi berhasil
    } catch (err) {
      setError("Failed to create agenda. Please try again.");
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  const handleOk = () => {
    setIsSaved(false); // Sembunyikan notifikasi keberhasilan
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>

      {/* Form untuk menambah agenda */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-white shadow-md rounded-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={newAgenda.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newAgenda.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              name="caption"
              value={newAgenda.caption}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Agenda
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Indikator loading */}
      {isLoading && (
        <p className="mt-4 text-blue-500">Menyimpan data, harap tunggu...</p>
      )}

      {/* Notifikasi berhasil */}
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

      {/* Tabel agenda */}
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Caption
            </th>
          </tr>
        </thead>
        <tbody>
          {agendas.map((agenda) => (
            <tr key={agenda.id} className="border-t border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-800">{agenda.date}</td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {agenda.title}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {agenda.caption}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgendaPage;
