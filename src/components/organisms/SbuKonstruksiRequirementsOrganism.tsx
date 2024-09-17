const SbuKonstruksiRequirements = () => {
  const requirements = [
    {
      title: "DOKUMEN ADMINISTRASI BADAN USAHA",
      subMenu: [
        "Scan warna Kartu Tanda Anggota Asosiasi yang masih berlaku",
        "Scan warna Akte Pendirian Perusahaan dan SK MENKUMHAM",
        "Scan warna Akte Perubahan Perusahaan dan SK MENKUMHAM (KBLI 2020)",
        "Scan Warna NPWP Perusahaan",
        "NIB (Nomor Induk Berusaha)",
        "Contoh stample Perusahaan",
        "Email, No. Telepon Perusahaan yang aktif",
        "Website Perushaan (jika ada)",
        "Foto PJBU/Direktur",
      ],
    },
    {
      title: "DOKUMEN PENJUALAN TAHUNAN",
      subMenu: [
        "Scan kontak kerja/SPK/Adendum Kontrak (jika ada)",
        "Scan Surat Pejanjian KSO (jika ada)",
        "Scan BAST",
        "Scan Faktur Pajak",
      ],
    },
    {
      title: "DOKUMEN KEMAMPUAN KEUANGAN",
      subMenu: [
        "Scan KTP dan NPWP pemilik saham",
        "Neraca keuangan badan usaha",
        "Laporan KAP (untuk klasifikasi M, B, S)",
      ],
    },
    {
      title: "DOKUMEN TENAGA KERJA KONSTRUKSI",
      subMenu: [
        "Scan KTP dan NPWP Pengurus Badan Usaha",
        "NSSK PJTBU dan PJSKBU",
        "Scan warna KTP tenaga ahli",
        "Scan warna NPWP tenaga ahli",
        "Scan warna Ijazah tenaga ahli",
      ],
    },
    {
      title: "DOKUMEN SNM",
      subMenu: [
        "Sertifikat ISO 9001:2015 (Klasifikasi M, B, S)",
        "Dokumen SMM (Klasifikasi K, M, B, S",
        "Dokumen Rencana Mutu Kontrak (Klasifikasi K, M, B, S)",
        "Surat pernyataan pemenuhan komitmen penyelenggaraan SMM",
      ],
    },
    {
      title: "DOKUMEN SMAP",
      subMenu: [
        "Sertifikat ISO 37001:2016 (klasifikasi K, M, B, S)",
        "Dokumen SMAP (Klasifikasi K, M, B, S)",
        "Surat pernyataan pemenuhan komitmen penyelenggaraan SMAP",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
      <div className="max-w-4xl w-full p-8">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-12 leading-relaxed">
          PERSYARATAN <br />
          SBU KONSTRUKSI
        </h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((requirement, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-start h-auto text-center font-bold p-4 ${
                index % 2 === 0
                  ? "bg-[#161D6F] text-white"
                  : "border-2 border-[#161D6F]  text-[#161D6F]"
              }`}
            >
              {/* Title berada di tengah */}
              <h2 className="text-lg mb-4 text-center">{requirement.title}</h2>

              {/* Submenu */}
              {requirement.subMenu.length > 0 ? (
                <ol className="text-left list-decimal list-inside space-y-2">
                  {requirement.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="text-sm">
                      {subItem}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-left">Tidak ada dokumen</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SbuKonstruksiRequirements;
