import AnggotaSectionHeader from "../organisms/AnggotaHeaderOrganism";
import React from "react";
import DataTable from "../organisms/DataTable";

const MainTemplateAnggota: React.FC = () => {
  const headers = [
    "No.",
    "Nama Badan Usaha",
    "Alamat",
    "Direktur",
    "Kode SBU",
    "Tanggal Masa Berlaku",
  ];
  const rows = [
    [
      "153",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK001",
      "24 April 2024 s/d 23 April 2027",
    ],
    [
      "154",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK003",
      "24 April 2024 s/d 23 April 2027",
    ],
    [
      "154",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK003",
      "24 April 2024 s/d 23 April 2027",
    ],
    [
      "154",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK003",
      "24 April 2024 s/d 23 April 2027",
    ],
    [
      "154",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK003",
      "24 April 2024 s/d 23 April 2027",
    ],
    [
      "154",
      "TAHAND JAYA UTAMA, PT",
      "Jl. DR. Wahidin S...",
      "Herwani, ST",
      "RK003",
      "24 April 2024 s/d 23 April 2027",
    ],
    // Tambahkan data lainnya sesuai gambar
  ];
  return (
    <div>
      <AnggotaSectionHeader />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Data Badan Usaha</h1>
        <DataTable headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default MainTemplateAnggota;
