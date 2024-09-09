const ReportTable = () => {
  const data = [
    {
      id: 1,
      description: "Basic Design",
      weight: "1.00%",
      baseline: "12.00%",
      actual: "6.00%",
    },
  ];

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
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border p-2">{item.id}</td>
            <td className="border p-2">{item.description}</td>
            <td className="border p-2">{item.weight}</td>
            <td className="border p-2">{item.baseline}</td>
            <td className="border p-2">{item.actual}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ReportTable };
