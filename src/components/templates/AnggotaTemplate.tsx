"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AnggotaSectionHeader from "../organisms/AnggotaHeaderOrganism";
import DataTable from "../organisms/DataTable";

interface DataRow {
  no: string;
  nama_badan_usaha: string;
  alamat: string;
  direktur: string;
  kode_sbu: string;
  tanggal_masa_berlaku: string;
  sampai_dengan: string;
}

const MainTemplateAnggota: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const headers = [
    "No.",
    "Nama Badan Usaha",
    "Alamat",
    "Direktur",
    "Kode SBU",
    "Tanggal Masa Berlaku",
    "Sampai Dengan",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/detail/all-user"
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const transformedRows = rows.map((row) => [
    row.no,
    row.nama_badan_usaha,
    row.alamat,
    row.direktur,
    row.kode_sbu,
    row.tanggal_masa_berlaku,
    row.sampai_dengan,
  ]);

  return (
    <div>
      <AnggotaSectionHeader />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Data Badan Usaha</h1>
        <DataTable headers={headers} rows={transformedRows} />
      </div>
    </div>
  );
};

export default MainTemplateAnggota;
