import ButtonAtom from "../atoms/ButtonAtoms";

const ButtonWithTextMolecule = ({
  text,
  bgColor,
  textColor,
  size,
  route,
}: {
  text: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  route?: string;
}) => (
  <div className="text-center">
    <ButtonAtom
      text={text}
      bgColor={bgColor}
      textColor={textColor}
      size={size}
      route={route}
    />
  </div>
);

export default ButtonWithTextMolecule;
