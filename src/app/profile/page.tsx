import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative w-full h-[33rem]">
        <Image
          src="/images/konstruksi2.jpg"
          alt="Konstruksi bangunan di Kalimantan Barat"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
            Tentang PERKINDO KALBAR
          </p>
        </div>
      </div>

      {/* Konten ke-1&2 */}
      <div className="relative w-full bg-slate-200 flex-grow">
        {/* Konten 1 */}
        <div
          className="relative w-full bg-slate-200 flex items-center justify-center"
          style={{ minHeight: "20rem" }}
        >
          <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto p-8 md:p-12 lg:p-16 bg-[#161D6F] rounded-none lg:rounded-2xl mt-8">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
              Pada Maret 2007, terbentuk Dewan Pengurus Daerah PERKINDO Provinsi
              Kalimantan Barat, dengan lokasi awal di Jalan Putri Dara Nante. Di
              masa awal berdirinya, PERKINDO Kalbar menghadapi berbagai
              tantangan internal seperti kurangnya fasilitas, minimnya sumber
              daya manusia, serta dominasi perusahaan kecil dengan kualifikasi
              rendah yang sulit bersaing. Namun, melalui kerja keras, PERKINDO
              Kalbar kini berkembang dengan 35 pengurus dan 184 perusahaan
              anggota.
            </p>
          </div>
        </div>

        {/* Konten 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 p-0 mt-8">
          {/* Gambar Visi */}
          <div className="relative h-64 md:h-auto md:order-1">
            <Image
              src="/images/konstruksi3.jpg"
              alt="Gambar Konstruksi"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          {/* Visi */}
          <div className="bg-white text-black p-8 md:p-16 text-base md:text-lg leading-relaxed md:order-2">
            <h1 className="font-bold text-lg md:text-2xl">VISI</h1>
            <p className="mt-4">
              Terwujudnya Anggota PERKINDO yang profesional, mandiri dan berdaya
              saing dalam peran serta pada pembangunan nasional berkelanjutan.
            </p>
          </div>

          {/* Gambar Misi */}
          <div className="relative h-64 md:h-auto md:order-4">
            <Image
              src="/images/konstruksi4.jpg"
              alt="Gambar Konstruksi Lain"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          {/* Misi */}
          <div className="bg-white text-black p-8 md:p-16 text-base md:text-lg leading-relaxed md:order-3">
            <h1 className="font-bold text-lg md:text-2xl">MISI</h1>
            <ul className="list-disc mt-4 pl-5">
              <li>
                Memperkokoh persatuan dan kesatuan serta meningkatkan kemitraan
                antar Anggota.
              </li>
              <li>Menjunjung tinggi etika, moral profesi konsultan.</li>
              <li>
                Membangun kemandirian dan menciptakan jaringan pasar serta
                melayani dan melindungi kepentingan Anggota.
              </li>
              <li>Meningkatkan profesionalisme dan daya saing konsultan.</li>
              <li>
                Meningkatkan pertumbuhan usaha jasa konsultansi seluruh Anggota.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
