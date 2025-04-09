import ButtonWithTextMolecule from "../molecules/ButtonWithTextMolecule";
import GaleriText from "../molecules/GaleriTextHeader";

const GaleriSectionOrganism = () => (
  <section
    className="w-full bg-[#161D6F] flex items-center justify-center flex-col text-center text-white p-6 md:p-12 lg:p-24"
    style={{ height: "40rem" }}
  >
    <GaleriText />
    {/* <ButtonWithTextMolecule text="Pelajari Lebih Lanjut" /> */}
  </section>
);

export default GaleriSectionOrganism;
