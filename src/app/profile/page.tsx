import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative w-full" style={{ height: "33rem" }}>
        <Image
          src="/images/konstruksi2.jpg"
          alt="Main Image Profile"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold">Tentang PERKINDO KALBAR</p>
        </div>
      </div>

      {/* Konten ke-1&2 */}
      <div className="relative w-full bg-slate-200 flex-grow">
        {/* Konten 1 */}
        <div
          className="relative w-full bg-slate-200"
          style={{ height: "40rem" }}
        >
          <div
            className="absolute h-72 p-16 bg-[#161D6F] rounded-2xl"
            style={{
              width: "48rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="text-white">
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
        <div className="grid grid-cols-2 ">
          <div className="col-span-2 grid grid-cols-2 ">
            <div className="bg-white text-black p-28 text-lg">
              <h1 className="font-bold">VISI</h1>
              <p className="mt-4">
                Terwujudnya Anggota PERKINDO yang profesional, mandiri dan
                berdaya saing dalam peran serta pada pembangunan nasional
                berkelanjutan
              </p>
            </div>
            <div className="bg-white relative">
              <Image
                src="/images/konstruksi3.jpg"
                alt="Main Image Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2">
            <div className="bg-white relative">
              <Image
                src="/images/konstruksi3.jpg"
                alt="Main Image Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="bg-white text-black p-28 text-lg">
              <h1 className="font-bold">MISI</h1>
              <ul className="list-disc mt-4 pl-5">
                <li>
                  Memperkokoh persatuan dan kesatuan serta meningkatkan
                  kemitraan antar Anggota
                </li>
                <li>Menjunjung tinggi etika, moral profesi konsultan.</li>
                <li>
                  Membangun kemandirian dan menciptakan jaringan pasar serta
                  melayani dan melindungi kepentingan Anggota.
                </li>
                <li>Meningkatkan profesionalisme dan daya saing konsultan.</li>
                <li>
                  Meningkatkan pertumbuhan usaha jasa konsultansi seluruh
                  Anggota.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
