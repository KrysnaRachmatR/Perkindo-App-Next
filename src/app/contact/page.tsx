import Image from "next/image";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-10">
        <h1 className="text-4xl font-bold text-center text-blue-800">Hubungi Perkindo</h1>
        <h1 className="text-3xl font-semibold text-center mb-6">Kalimantan Barat</h1>

        {/* Frame utama untuk map, icon, dan alamat */}
        <div className="w-full max-w-[800px] mx-auto bg-neutral-100 rounded-[40px] shadow-lg p-8 flex flex-col items-center">
          {/* Bagian atas - Map */}
          <div className="w-full h-[350px] mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31696.412126017214!2d109.3179788!3d-0.0356717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59c7a8887ff9%3A0xf88e4395eab99277!2sKalimantan%20Barat!5e0!3m2!1sen!2sid!4v1614108402997!5m2!1sen!2sid"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              className="rounded-[40px] shadow-md"
            ></iframe>
          </div>

          {/* Bagian bawah - Ikon media sosial dan alamat */}
          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            {/* Ikon media sosial */}
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="https://www.instagram.com" className="flex items-center text-lg text-gray-700">
                <div className="w-12 h-12 bg-[#98DED9] rounded-full shadow-md flex items-center justify-center">
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </div>
              </a>
              <a href="https://www.linkedin.com" className="flex items-center text-lg text-gray-700">
                <div className="w-12 h-12 bg-[#C7FFD8] rounded-full shadow-md flex items-center justify-center">
                  <Image
                    src="/images/linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                  />
                </div>
              </a>
              <a href="https://www.facebook.com" className="flex items-center text-lg text-gray-700">
                <div className="w-12 h-12 bg-[#7B9BFD] rounded-full shadow-md flex items-center justify-center">
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </div>
              </a>
            </div>

            {/* Alamat */}
            <div className="flex items-center space-x-2">
              <div className="w-20 h-20 flex items-center justify-center">
                <Image
                  src="/images/location.png" // Ganti dengan nama file ikon alamat yang sesuai
                  alt="Address"
                  width={30}
                  height={30} 
                />
              </div>
              <p className="text-lg font-extrabold text-gray-700">
                Jalan Alianyang Gg. Rahayu Ruko No. 21 <br />Sungai bangkong, Kalimantan Barat 78116
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
