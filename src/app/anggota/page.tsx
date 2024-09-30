"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer"; // Pastikan ini Footer bukan Navbar

const SbuKonstruksiTable = () => {
  const [sbuKonstruksi, setSbuKonstruksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sbu-konstruk");
        setSbuKonstruksi(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="min-h-screen flex flex-col justify-between">
        <div className="container mx-auto px-4 sm:px-8 py-8">
          <div className="overflow-x-auto">
            <div className="min-w-full shadow-lg overflow-hidden rounded-lg border-b border-gray-200">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nama Badan Usaha
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Direktur
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kode SBU
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tanggal Masa Berlaku
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sampai Dengan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sbuKonstruksi.map((sbu, index) => (
                    <tr key={sbu.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {index + 1}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.nama_badan_usaha}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.alamat}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.direktur}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.kode_sbu}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.tanggal_masa_berlaku}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {sbu.sampai_dengan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default SbuKonstruksiTable;
