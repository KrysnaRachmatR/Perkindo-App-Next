import React from "react";

type TableRowProps = {
  data: string[];
  index: number;
};

const TableRow: React.FC<TableRowProps> = ({ data, index }) => {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";

  return (
    <tr className={`${rowClass}`}>
      {data.map((item, index) => (
        <td key={index} className="p-2 border-t border-gray-200 text-center">
          {item}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
