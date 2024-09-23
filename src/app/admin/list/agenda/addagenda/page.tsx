"use client";

import InputAtom from "@/components/atoms/InputAtoms";
import ButtonWithTextMolecule from "@/components/molecules/ButtonWithTextMolecule";
import { useState } from "react";

const AddAgenda = () => {
  const [inputValue, setInputValue] = useState(""); // State untuk nilai input

  // Fungsi yang dijalankan saat nilai input berubah
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Memperbarui state dengan nilai input terbaru
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tambah Agenda</h1>
        <ButtonWithTextMolecule
          text="Tambah Agenda"
          route="/admin/list/agenda"
        />
      </div>
      <div>
        <span>Judul</span>
        <InputAtom
          placeholder="Masukkan Judul"
          value={inputValue}
          onChange={handleInputChange}
        />
        <span>Deskripsi</span>
        <InputAtom
          placeholder="Masukkan Judul"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default AddAgenda;
