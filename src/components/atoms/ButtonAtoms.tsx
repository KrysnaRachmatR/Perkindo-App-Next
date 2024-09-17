const ButtonAtom = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => (
  <button
    className="bg-yellow-500 text-black px-4 py-2 rounded"
    onClick={onClick}
  >
    {text}
  </button>
);

export default ButtonAtom;
