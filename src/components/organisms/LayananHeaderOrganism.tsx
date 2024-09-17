import ButtonWithTextMolecule from "../molecules/ButtonWithTextMolecule";

const LayananSectionOrganism = () => (
  <section
    className="bg-gray-100 p-8 flex flex-col items-center justify-center text-center"
    style={{ height: "40rem" }}
  >
    <h2 className="text-4xl font-bold mb-4">LAYANAN KAMI</h2>
    <p className="text-xl w-96 mb-6 mt-8">
      Temukan berbagai layanan terbaik kami yang dirancang untuk memenuhi
      kebutuhan Anda dengan solusi yang cepat, mudah, dan terpercaya.
    </p>
    <ButtonWithTextMolecule text="Pelajari Lebih Lanjut" />
  </section>
);

export default LayananSectionOrganism;
