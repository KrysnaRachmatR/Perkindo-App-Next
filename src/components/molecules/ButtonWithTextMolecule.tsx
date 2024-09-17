import ButtonAtom from "../atoms/ButtonAtoms";

const ButtonWithTextMolecule = ({ text }: { text: string }) => (
  <div className="text-center">
    <ButtonAtom text={text} />
  </div>
);

export default ButtonWithTextMolecule;
