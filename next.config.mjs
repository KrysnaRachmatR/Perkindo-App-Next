/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "scontent.cdninstagram.com", // tambahkan host ini
      "instagram.fsub21-1.fna.fbcdn.net",
      "localhost", // tambahkan host ini
      // Anda dapat menambahkan lebih banyak host di sini sesuai kebutuhan
    ],
  },
};
export default nextConfig;
