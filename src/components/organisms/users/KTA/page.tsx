"use client";
import { useRef, useState, useEffect } from "react";

const KtaLayout = () => {
  const canvasRef = useRef(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [ktaData, setKtaData] = useState({
    nama: "Halo Dek",
    tanggal: "01 Jan 2024 - 31 Des 2025",
    alamat: "123-456-7890",
    email: "hello@reallygreatsite.com",
  });

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const background = new Image();
    background.src = "/images/bg-kta.png";

    background.onload = () => {
      // Draw background image
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      // Header
      ctx.fillStyle = "#000000";
      ctx.font = "bold 28px Arial";
      ctx.textAlign = "center";
      ctx.fillText("KARTU TANDA ANGGOTA", canvas.width / 2, 40);

      // Nama Perusahaan
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#004d7a";
      ctx.textAlign = "left";
      ctx.fillText("PT. WONG TULUS", 30, 80);

      // Garis horizontal pemisah
      ctx.strokeStyle = "#004d7a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 90);
      ctx.lineTo(canvas.width - 30, 90);
      ctx.stroke();

      // Teks data anggota (Detail Informasi)
      ctx.fillStyle = "#000000";
      ctx.font = "14px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Nama Direktur: ${ktaData.nama}`, 30, 130);
      ctx.fillText(`Masa Berlaku: ${ktaData.tanggal}`, 30, 160);
      ctx.fillText(`Email: ${ktaData.email}`, 30, 190);
      ctx.fillText(`Nomor Telepon: ${ktaData.alamat}`, 30, 220);

      // Lingkaran untuk foto profil di sisi kanan
      ctx.beginPath();
      const photoX = canvas.width - 100; // Posisi X foto
      ctx.arc(photoX, 180, 75, 0, 2 * Math.PI); // Lingkaran foto
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#004d7a";
      ctx.stroke();

      // Gambar berita.png pada foto profil
      const img = new Image(); // Membuat objek gambar baru
      img.src = "/images/logo.png"; // Ganti dengan path ke gambar yang diinginkan

      img.onload = () => {
        // Menggambar gambar berita.png di dalam lingkaran
        ctx.save(); // Menyimpan status canvas
        ctx.beginPath();
        ctx.arc(photoX, 180, 75, 0, 2 * Math.PI); // Lingkaran untuk memotong gambar
        ctx.clip(); // Memotong gambar sesuai lingkaran

        // Menggambar gambar dengan ukuran lebih kecil
        const imgSize = 120; // Ukuran gambar yang lebih kecil
        ctx.drawImage(
          img,
          photoX - imgSize / 2,
          180 - imgSize / 2,
          imgSize,
          imgSize
        ); // Ukuran gambar yang disesuaikan
        ctx.restore(); // Mengembalikan status canvas
      };

      // Tombol Status "AKTIF"
      ctx.fillStyle = "#16A34A";
      ctx.fillRect(30, canvas.height - 50, 80, 30);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("AKTIF", 70, canvas.height - 30);
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [ktaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKtaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const downloadKTA = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "Kartu_Tanda_Anggota.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <h1 className="font-bold tracking-wider text-xl">KTA</h1>
      <p className="text-[10px] tracking-wide -mt-1">Detail KTA</p>
      <div className="flex flex-col items-center p-4">
        <h1 className="font-bold text-2xl mb-4">Kartu Tanda Anggota</h1>

        {/* Canvas untuk KTA */}
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className="shadow-lg rounded-lg mb-4"
        ></canvas>

        {/* Tombol Aksi */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            Edit Data
          </button>
          <button
            onClick={downloadKTA}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800"
          >
            Download Kartu
          </button>
        </div>

        {/* Form Edit Data */}
        {showEditForm && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              name="nama"
              value={ktaData.nama}
              onChange={handleChange}
              placeholder="Nama Direktur"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="tanggal"
              value={ktaData.tanggal}
              onChange={handleChange}
              placeholder="Masa Berlaku"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="alamat"
              value={ktaData.alamat}
              onChange={handleChange}
              placeholder="Nomor Telepon"
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              value={ktaData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default KtaLayout;
