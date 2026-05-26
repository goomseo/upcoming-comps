import Card from "./Card";
import DataTable from "./DataTable";

const columns = [
  { header: "#", accessor: "rank" },
  { header: "Person", accessor: "person" },
  { header: "Solves", accessor: "solves" },
  { header: "Attempts", accessor: "attempts" },
];

export default function Rankings() {
  return (
    <Card>
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Fun Rankings
      </h2>
      <DataTable
        title="Most Completed Solves"
        columns={columns}
        rows={[]}
        emptyText="Coming soon..."
      />
    </Card>
  );
}
