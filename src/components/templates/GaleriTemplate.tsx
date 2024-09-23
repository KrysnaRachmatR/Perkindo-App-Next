import Image from "next/image";
import GaleriSectionOrganism from "../organisms/GaleriHeaderOrganism";

const MainTemplateGaleri = () => (
  <div>
    <GaleriSectionOrganism />
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
  </div>
);

export default MainTemplateGaleri;
