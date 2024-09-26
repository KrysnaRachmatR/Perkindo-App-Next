import React from "react";
import TableRow from "../atoms/TableRow";

type TableBodyProps = {
  rows: string[][];
};

const TableBody: React.FC<TableBodyProps> = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <TableRow key={index} data={row} />
      ))}
    </tbody>
  );
};

export default TableBody;
