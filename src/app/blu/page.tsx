'use client';

import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from "@/components/organisms/footer";

// Komponen Umum
const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-4xl font-bold text-center mb-12 ${className}`}>
    {children}
  </h2>
);

// Komponen Header
const Header = () => (
  <header className="relative text-white text-center py-24 md:py-32 bg-gradient-to-r from-[#27b1d0] via-[#004c84] to-[#2883c1] overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/images/konstruksi.jpg" 
        alt="Background"
        className="object-cover w-full h-full opacity-20"
      />
      <div className="bg-gradient-to-r from-[#27b1d0] via-[#004c84] to-[#2883c1] opacity-70 absolute inset-0" />
    </div>

    <div className="relative z-10 flex justify-center">
      <img 
        src="/images/BADAN LAYANAN USAHA (2).png" 
        alt="Logo BLU" 
        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-lg"
      />
    </div>

    <div className="relative z-10 container mx-auto px-4 mt-8">
      <h1 className="text-4xl md:text-6xl font-bold tracking-wide leading-tight mb-6 animate-pulse">
        Badan Layanan Usaha
      </h1>
      <p className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
        Badan Layanan Usaha (BLU) Mitra Usaha hadir menjadi solusi untuk membantu kebutuhan legalitas konstruksi maupun non-konstruksi perusahaan.
      </p>
      
      <div className="mt-12 flex justify-center space-x-4">
        <a href="mailto:perkindokalbar@gmail.com" className="bg-white text-blue-900 rounded-full py-3 px-6 text-lg transition duration-300 hover:bg-blue-100 flex items-center shadow-lg transform hover:scale-105">
          <Mail className="mr-2" /> Email Kami
        </a>
        <a href="#services" className="text-white border border-white rounded-full py-3 px-6 text-lg transition duration-300 hover:bg-white hover:text-blue-900 flex items-center shadow-lg transform hover:scale-105">
          Layanan Kami <ArrowRight className="ml-2" />
        </a>
      </div>
    </div>
  </header>
);

// Komponen Sejarah
const History = () => (
  <section className="py-16 bg-gray-50 relative">
    <div className="absolute inset-0">
      <img
        src="/images/konstruksi4.jpg" 
        alt="Sejarah BLU"
        className="object-cover w-full h-full opacity-10"
      />
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 transform transition duration-500 hover:scale-105">
        <SectionTitle>Badan Layanan Usaha (BLU)<br /> Mitra Usaha</SectionTitle>
        <p className="text-lg leading-relaxed text-gray-700 mb-4">
          Badan Layanan Usaha (BLU) merupakan Badan Usaha yang dibentuk 
          oleh DPD Perkindo Kalimantan Barat sebagai penunjang pendapatan organisasi. 
          BLU difokuskan pada kegiatan layanan bagi para badan usaha (BU) dalam
          mengurus Sertifikasi, Perizinan, Legalitas, Pelatihan maupun lainnya.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mb-4">
          Berdirinya Badan Layanan Usaha (BLU) didasarkan atas perubahan
          sistem permohonan sertifikasi badan usaha yang semula ke LPJK dialihkan 
          ke Lembaga Sertifikasi sehingga Asosiasi kehilangan pendapatan dan anggota 
          merasa kesulitan untuk memproses SBU. 
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Maka dari perubahan tersebut, 
          Perkindo memiliki keinginan untuk terus menunjukkan dedikasi yang tinggi 
          dalam membantu Anggota DPD Perkindo Kalimantan Barat khususnya dan 
          umumnya perusahaan Jasa Konstruksi maupun Non Konstruksi dalam memenuhi 
          kebutuhan perusahaannya.
        </p>
      </div>
    </div>
  </section>
);

// Komponen Visi dan Misi
const VisionMission = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <SectionTitle>Visi dan Misi</SectionTitle>
      <div className="flex flex-wrap justify-around">
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">Visi</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Menjadi lembaga layanan yang kredibel, independen, dan obyektif serta diterima pasar nasional.
            </li>
            <li>
              Mewujudkan eksistensi dan konsistensi perusahaan secara berkelanjutan di dalam sertifikasi pengelolaan dan  legalitas badan usaha.
            </li>
            <li>
              Menjadi badan layanan yang bergerak di bidang jasa usaha yang handal, profesional, bertanggung jawab dan memberikan hasil yang berdaya guna.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">Misi</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Memberikan jasa layanan terbaik, efektif, dan optimal.</li>
            <li>Memberikan jasa veriﬁkasi legalitas badan usaha di bidang jasa konsultan yang mengutamakan kecepatan dan ketepatan dengan mengedepankan profesionalisme.</li>
            <li>Menjadi penyedia jasa layanan yang diakui karena kualitas layanan yang konsisten dan kepuasan pelanggan yang tinggi.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Komponen Layanan
const ServiceCard = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform hover:scale-105">
    <div className="mb-4">
      <img src={icon} alt={title} className="w-16 h-16 mx-auto animate-spin-slow" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
  </div>
);

const Services = () => {
  const services = [
    { icon: '/images/certificate (1).png', title: 'Sertifikat Badan Usaha (SBU)' },
    { icon: '/images/certificate.png', title: 'Sertifikat Keahlian Kerja (SKK)' },
    { icon: '/images/medal.png', title: 'Legalitas dan Izin Usaha' },
    { icon: '/images/training-course.png', title: 'Pelatihan' },
    { icon: '/images/protecting.png', title: 'Pembetulan Data OSS' },
    { icon: '/images/medical-certificate.png', title: 'Sertifikat Kompetensi Bidang K3 - BNSP' },
    { icon: '/images/training-course.png', title: 'Sertifikasi Kelistrikan - DJK BNSP' },
    { icon: '/images/certificate (1).png', title: 'Sertifikasi Ketenagakerjaan' },
    { icon: '/images/online-learning.png', title: 'Sertifikasi Alat Disnaker' },
    { icon: '/images/diploma.png', title: 'Sertifikasi ISO-KAN dan BSN' },
    { icon: '/images/folder (1).png', title: 'Penyusuan Dokumen SMAP' },
    { icon: '/images/box.png', title: 'Merchandise' }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-r from-[#27b1d0] via-[#004c84] to-[#2883c1]">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-white">Layanan Kami</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponen Struktur Organisasi
const ProfileCard = ({ name, position, email, phone }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="p-6">
      <User className="mx-auto text-blue-900 mb-4" size={50} />
      <h3 className="text-2xl font-semibold mb-2 text-blue-900">{name}</h3>
      <p className="text-lg font-medium text-gray-700 mb-4">{position}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p><Mail className="inline-block mr-2" /> {email}</p>
        <p><Phone className="inline-block mr-2" /> {phone}</p>
      </div>
    </div>
  </div>
);

const DivisionSection = ({ title, members }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="mb-8">
      <button
        className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg shadow-md text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-semibold">{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <ProfileCard key={index} {...member} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrganizationStructure = () => {
  const structure = {
    direkturUtama: {
      name: "Muhammad Fauzi, S.T.",
      position: "Direktur Utama",
      email: "example@example.com",
      phone: "+62 812-3456-7890"
    },
    generalManager: {
      name: "Ir. Ikdam Nurul Khalik, S.T, M. Ling.",
      position: "General Manager",
      email: "example@example.com",
      phone: "+62 812-3456-7891"
    },
    divisions: [
      {
        name: "Divisi Teknis",
        members: [
          { name: "Ferry Pratama, S.T.", position: "Kepala Divisi Konstruksi", email: "andi@example.com", phone: "+62 812-3456-7892" },
          { name: "Berma Septiyanda, S.T.", position: "Staff Konstruksi", email: "budi@example.com", phone: "+62 812-3456-7893" },
          { name: "Dedi Himawan, S.T.", position: "Staff Konstruksi", email: "budi@example.com", phone: "+62 812-3456-7893" }

        ]
      },
      {
        name: "Divisi Keuangan",
        members: [
          { name: "Dini Awaliah, S.T.", position: "Kepala Divisi Non-Konstruksi", email: "citra@example.com", phone: "+62 812-3456-7894" },
        ]
      },
      {
        name: "Divisi Pemasaran",
        members: [
          { name: "Ir. Novan Anugrah, S.T.", position: "Kepala Divisi Pemasaran", email: "novan@example.com", phone: "+62 812-3456-7896" },
          { name: "Ir. Sri Widyawati, S.T.", position: "Staff Pemasaran", email: "rini@example.com", phone: "+62 812-3456-7897" }
        ]
      },
      {
        name: "Divisi Operasional Umum",
        members: [
          { name: "Juliani Okta Farida, S.Kom.", position: "Kepala Divisi Operasional Umum", email: "yuda@example.com", phone: "+62 812-3456-7898" },
          { name: "Leissa Effendy, S.P.", position: "Staff Operasional", email: "wina@example.com", phone: "+62 812-3456-7899" }
        ]
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center">
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>Struktur Organisasi</SectionTitle>

        {/* Direktur Utama */}
        <div className="text-center mb-8">
          <ProfileCard {...structure.direkturUtama} />
        </div>

        {/* General Manager */}
        <div className="text-center mb-12">
          <ProfileCard {...structure.generalManager} />
        </div>

        {/* Divisi */}
        <div>
          {structure.divisions.map((division, index) => (
            <DivisionSection key={index} title={division.name} members={division.members} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponen Footer

// Komponen Utama
const OrganizationPage = () => (
  <>
    <Header />
    <History />
    <VisionMission />
    <Services />
    <OrganizationStructure />
    <Footer />
  </>
);

export default OrganizationPage;
