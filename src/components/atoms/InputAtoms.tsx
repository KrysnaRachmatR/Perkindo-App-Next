const InputAtom = ({
  placeholder = "Enter text here",
  value,
  onChange,
  type = "text",
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border border-gray-300 rounded px-4 py-2"
  />
);

export default InputAtom;
