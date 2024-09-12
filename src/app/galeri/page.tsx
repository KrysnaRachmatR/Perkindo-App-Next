import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import Image from "next/image";

export default function Galeri() {
  return (
    <>
      <Navbar />
      {/* Header */}
      <div
        className="w-full bg-[#161D6F] flex items-center justify-center flex-col text-center p-6 md:p-12 lg:p-24"
        style={{ height: "40rem" }}
      >
        <h1 className="text-[#C7FFD8] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-10">
          GALERI KEGIATAN
        </h1>
        <h2
          className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4"
          style={{ maxWidth: "90%", width: "30rem" }}
        >
          PERSATUAN KONSULTAN INDONESIA KALIMANTAN BARAT
        </h2>
        <p
          className="text-white text-base md:text-lg lg:text-xl"
          style={{ maxWidth: "90%", width: "34rem" }}
        >
          Temukan momen berharga dari setiap kegiatan kami di Galeri Kegiatan.
          Setiap gambar menyimpan cerita, dedikasi, dan semangat kebersamaan
          yang menginspirasi.
        </p>
      </div>
      {/* Konten */}
      <div className="bg-slate-100 py-8" style={{ minHeight: "50rem" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative group">
              <div className="p-4 sm:p-6 lg:p-8 h-64 flex items-center justify-center">
                <Image
                  src="/images/konstruksi2.jpg"
                  alt="Galeri 1"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md group-hover:bg-opacity-75 transition-all duration-500 ease-in-out p-2">
                    <span className="text-white text-sm md:text-xl lg:text-sm font-bold z-10 max-w-full w-full break-words">
                      Gambar 1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
