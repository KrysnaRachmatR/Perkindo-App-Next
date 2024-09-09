import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";

export default function Galeri() {
  return (
    <>
      <Navbar />
      {/* Header */}
      <div
        className="w-full bg-[#161D6F]  flex items-center justify-center flex-col text-center "
        style={{ height: "40rem" }}
      >
        <h1 className="text-[#C7FFD8] text-3xl font-bold mb-10">
          GALERI KEGIATAN
        </h1>
        <h2
          className="text-white text-2xl font-bold mb-4 "
          style={{ width: "30rem" }}
        >
          PERSATUAN KONSULTAN INDONESIA KALIMANTAN BARAT
        </h2>
        <p className="text-white text-lg " style={{ width: "34rem" }}>
          Temukan momen berharga dari setiap kegiatan kami di Galeri Kegiatan.
          Setiap gambar menyimpan cerita, dedikasi, dan semangat kebersamaan
          yang menginspirasi.
        </p>
        <button className="text-black bg-[#C7FFD8] rounded-lg mt-8 p-2 text-sm hover:font-bold">
          Selengkapnya
        </button>
      </div>
      {/* Konten */}
      <div
        className="bg-slate-100 flex justify-center items-center"
        style={{ height: "50rem" }}
      >
        <div className="grid grid-cols-3 gap-4 ">
          <div className="col-span-3 grid grid-cols-3 gap-4  ">
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
            <div className="bg-black p-28 gap-4 w-96"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
