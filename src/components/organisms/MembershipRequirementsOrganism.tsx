import ButtonWithTextMolecule from "../molecules/ButtonWithTextMolecule";

const MembershipRequirements = () => {
  const requirements = [
    "Surat Pengantar pindah domisili dari PERKINDO sebelumnya",
    "Kartu Tanda Anggota sebelumnya",
    "Akta Pendirian / Akta Perubahan Terakhir ( sesuai KBLI 2020 ) SK Kemenhumham",
    "NPWP Perusahaan",
    "NIB (Berbasis Resiko)",
    "Data PJBU (Penanggung Jawab Badan Usaha) melampirkan E-KTP, NPWP, FOTO dan No. HP",
    "Data Pengurus / Pemegang Saham melampirkan E-KTP dan NPWP",
    "Data Pengurus / Pemegang Saham melampirkan E-KTP dan NPWP",
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-whitep-6 rounded-lg h-auto md:h-[40rem] py-10  max-w-6xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Kolom kiri */}
          <div className="space-y-4 flex flex-col justify-center">
            {requirements.slice(0, 4).map((requirement, index) => (
              <div
                key={index}
                className="border-4 border-[#161D6F] p-4 rounded"
              >
                <p className="text-lg md:text-xl">{`${
                  index + 1
                }. ${requirement}`}</p>
              </div>
            ))}
          </div>

          {/* Kolom tengah */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-center text-3xl md:text-4xl font-bold space-y-2">
              <span className="block">PERSYARATAN</span>
              <span className="block">KARTU TANDA</span>
              <span className="block">ANGGOTA</span>
            </h1>
            <ButtonWithTextMolecule text="Daftar Anggota" route="/login" />
          </div>

          {/* Kolom kanan */}
          <div className="space-y-4 flex flex-col justify-center">
            {requirements.slice(4).map((requirement, index) => (
              <div
                key={index + 4}
                className="border-4 border-[#161D6F] p-4 rounded"
              >
                <p className="text-lg md:text-xl">{`${
                  index + 5
                }. ${requirement}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRequirements;
