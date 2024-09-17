const MemberInfoSectionOrganism = () => {
  const infoItems = [
    "Kelengkapan Lokasi/Tempat Usaha (Tanda & Alamat KTA SESUAI SK)",
    "Akta Pendirian",
    "NIB (Nomor Induk Berusaha)",
    "Data K/L yang menggangu, sesuai ketentuan di dalam undang-undang",
    "Data Pengurus Terlampir dalam bukti KTP dan NPWP",
    "Rekomendasi/sertifikat Kompetensi",
  ];

  return (
    <section className="bg-[#161D6F] text-white flex flex-col lg:flex-row">
      {/* Kolom kiri */}
      <div className="lg:w-1/2 flex items-center justify-center text-center py-10 ">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold space-y-2">
            <span className="block">Informasi</span>
            <span className="block">Kartu Tanda</span>
            <span className="block">Anggota</span>
          </h2>
        </div>
      </div>

      {/* Kolom kanan */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end py-10">
        <div className="bg-white text-black p-6 w-full max-w-2xl flex flex-col items-start lg:items-end">
          <ol className="space-y-4">
            {infoItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start border-b border-gray-300 pb-4 last:border-none"
              >
                <div className="bg-yellow-500 text-black rounded-full flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] mr-4">
                  {index + 1}
                </div>
                <p className="text-sm md:text-base">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default MemberInfoSectionOrganism;
