import ButtonWithTextMolecule from "@/components/molecules/ButtonWithTextMolecule";

const addAgenda = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tambah Agenda</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <ButtonWithTextMolecule text="Tambah Agenda" route="/admin/list/agenda" />
        </div>
      </div>
    </div>
  );
};

export default addAgenda;
