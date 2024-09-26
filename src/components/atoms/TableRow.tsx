import React from "react";

type TableRowProps = {
  data: string[];
};

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tr className="bg-green-200 text-black">
      {data.map((item, index) => (
        <td key={index} className="p-2 border border-blue-500 text-center">
          {item}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
