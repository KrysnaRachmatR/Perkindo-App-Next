import React from "react";
import TableHeader from "../atoms/TableHeader";
import TableBody from "../molecules/TableBody";

type DataTableProps = {
  headers: string[];
  rows: string[][];
};

const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full table-auto border-collapse bg-white">
        <TableHeader headers={headers} />
        <TableBody rows={rows} />
      </table>
    </div>
  );
};

export default DataTable;
