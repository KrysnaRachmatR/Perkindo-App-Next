import Link from "next/link";

const ButtonAtom = ({
  text,
  onClick,
  bgColor = "bg-yellow-500", // default color
  textColor = "text-black", // default text color
  size = "px-4 py-2", // default size
  route = "#", // default route
}: {
  text: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  size?: string;
  route?: string;
}) => (
  <Link href={route}>
    <button
      className={`${bgColor} ${textColor} ${size} rounded`}
      onClick={onClick}
    >
      {text}
    </button>
  </Link>
);

export default ButtonAtom;
