// components/atoms/Dropdown.js
const Dropdown = ({ options, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="p-2 bg-white border border-gray-300 rounded-md"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
