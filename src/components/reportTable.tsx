import React from "react";
import { Detail } from "../services/articles"; // Make sure 'Detail' is correctly imported

type ReportTableProps = {
  detail: Detail;
};

const ReportTable: React.FC<ReportTableProps> = ({ detail }) => {
  return (
    <table className="w-full mt-4 text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 text-blue-500">
          <th className="border p-2">#</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Weight Factor</th>
          <th className="border p-2">Baseline</th>
          <th className="border p-2">Actual</th>
        </tr>
      </thead>
      <tbody>
        <tr key={detail.id} className="hover:bg-gray-50">
          <td className="border p-2">{detail.id}</td>
          <td className="border p-2">{detail.discipline}</td>
          <td className="border p-2">{detail.weight_factor} kg</td>
          <td className="border p-2">{detail.area}</td>
          <td className="border p-2">{detail.delivery_site}</td>
        </tr>
      </tbody>
    </table>
  );
};

export { ReportTable };
