const NonKonstruksiRequirements = () => {
  const requirements = [
    "Akte Perusahaan",
    "Akte Perubahan (jika ada)",
    "SK MENKUMHAM",
    "NPWP Perusahaan",
    "KTP dan NPWP pengurus yang tercantum di Akte",
    "Izin Perusahaan",
    "Foto Direktur",
    "Ijazah, KTP, NPWP penanggung jawab SBU setiap bidan SBU",
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-[#161D6F] py-12 md:py-20 px-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-white mb-8">
        PERSYARATAN NON KONSTRUKSI
      </h1>

      <div className="grid grid-cols-1 text-white sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        {requirements.map((requirement, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-lg border border-gray-300 w-full"
          >
            <div className="flex-shrink-0">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-yellow-500 text-black flex items-center justify-center rounded-full font-bold text-sm md:text-lg">
                {index + 1}
              </div>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-sm md:text-base ">{requirement}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonKonstruksiRequirements;
