"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AnggotaSectionHeader from "../organisms/AnggotaHeaderOrganism";

interface DataRow {
  id: number;
  nama_perusahaan: string;
  alamat_perusahaan: string;
  nama_direktur: string;
  kode_sbu: string[];
  tanggal_diterima: string;
  masa_berlaku_sampai: string;
}

const MainTemplateAnggota: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/detail");
      
      const transformedData: DataRow[] = response.data.data.map((item: any, index: number) => {
        // Ambil semua kode SBU dari anggota (bisa lebih dari 1)
        const kodeSBUList = item.sbu_codes.length > 0 ? item.sbu_codes : ["N/A"];

        // Pastikan tanggal diterima valid sebelum menghitung masa berlaku
        let masaBerlakuSampai = "-";
        if (item.tanggal_diterima && item.tanggal_diterima !== "N/A") {
          const tanggalDiterima = new Date(item.tanggal_diterima);
          tanggalDiterima.setFullYear(tanggalDiterima.getFullYear() + 3);
          masaBerlakuSampai = tanggalDiterima.toISOString().split("T")[0];
        }

        return {
          id: index + 1,
          nama_perusahaan: item.nama_perusahaan,
          alamat_perusahaan: item.alamat_perusahaan,
          nama_direktur: item.nama_direktur,
          kode_sbu: kodeSBUList,
          tanggal_diterima: item.tanggal_diterima !== "N/A" ? item.tanggal_diterima : "-",
          masa_berlaku_sampai: masaBerlakuSampai,
        };
      });

      setRows(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <AnggotaSectionHeader />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Data Badan Usaha</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 border">No</th>
                <th className="p-3 border">Nama Badan Usaha</th>
                <th className="p-3 border">Alamat</th>
                <th className="p-3 border">Direktur</th>
                <th className="p-3 border">Kode SBU</th>
                <th className="p-3 border">Tanggal Diterima</th>
                <th className="p-3 border">Masa Berlaku Sampai</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) =>
                row.kode_sbu.map((sbu, sbuIndex) => (
                  <tr
                    key={`${row.id}-${sbuIndex}`}
                    className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    {sbuIndex === 0 && (
                      <>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border text-center">{row.id}</td>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border">{row.nama_perusahaan}</td>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border">{row.alamat_perusahaan}</td>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border">{row.nama_direktur}</td>
                      </>
                    )}
                    <td className="p-3 border text-center">{sbu}</td>
                    {sbuIndex === 0 && (
                      <>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border text-center">{row.tanggal_diterima}</td>
                        <td rowSpan={row.kode_sbu.length} className="p-3 border text-center">{row.masa_berlaku_sampai}</td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainTemplateAnggota;
