import React from "react";

type TableHeaderProps = {
  headers: string[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead className="bg-blue-700 text-white">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="p-2 border border-blue-500">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
