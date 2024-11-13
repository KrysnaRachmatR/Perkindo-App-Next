import Image from "next/image";

export default async function Profile() {
  const res = await fetch("http://localhost:8000/api/profile", {
    cache: "no-store",
  });

  // Periksa apakah respons sukses
  if (!res.ok) {
    console.error("Failed to fetch data:", res.status, res.statusText);
    return (
      <div>
        <Navbar />
        <p>Error fetching data. Please try again later.</p>
        <Footer />
      </div>
    );
  }

  const profileData = await res.json();

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative w-full h-[33rem]">
        <Image
          src={profileData.header_image || '/images/default.jpg'}
          alt="Konstruksi bangunan di Kalimantan Barat"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
            {profileData.title || "Konten tidak tersedia. Silakan coba lagi nanti."}
          </p>
        </div>
      </div>

      {/* Konten ke-1&2 */}
      <div className="relative w-full bg-slate-200 flex-grow">
        {/* Konten 1 */}
        <div className="relative w-full bg-slate-200 flex items-center justify-center" style={{ minHeight: "20rem" }}>
          <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto p-8 md:p-12 lg:p-16 bg-[#161D6F] rounded-none lg:rounded-2xl mt-8">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
              {profileData.section1 || "Konten tidak tersedia. Silakan coba lagi nanti."}
            </p>
          </div>
        </div>

        {/* Konten 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 p-0 mt-8">
          {/* Visi */}
          <div className="bg-white text-black p-8 md:p-16 text-base md:text-lg leading-relaxed">
            <h1 className="font-bold text-lg md:text-2xl">VISI</h1>
            <p className="mt-4">{profileData.visi || "Konten tidak tersedia. Silakan coba lagi nanti."}</p>
          </div>

          {/* Misi */}
          <div className="bg-white text-black p-8 md:p-16 text-base md:text-lg leading-relaxed">
            <h1 className="font-bold text-lg md:text-2xl">MISI</h1>
            <ul className="list-disc mt-4 pl-5">
              {profileData.misi ? profileData.misi.map((item, index) => (
                <li key={index}>{item}</li>
              )) : <li>Konten tidak tersedia. Silakan coba lagi nanti.</li>}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
