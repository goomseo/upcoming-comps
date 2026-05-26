function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="text-xs uppercase tracking-[0.18em] text-slate-500 ">
        {columns.map((column) => (
          <th key={column.header} className="whitespace-nowrap px-3 py-2">
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableCell({ column, row, columnIndex }) {
  const cellValue = column.render ? column.render(row) : row[column.accessor];
  const isFirstCell = columnIndex === 0;

  return (
    <td
      key={column.accessor}
      className={`whitespace-nowrap px-3 py-2 text-slate-700 ${
        isFirstCell ? "relative" : ""
      }`}>
      {isFirstCell && row.hoverText ? (
        <div className="absolute left-8 -top-8 z-10 hidden rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg ring-1 ring-white/20 group-hover:block">
          {row.hoverText}
        </div>
      ) : null}
      {cellValue}
    </td>
  );
}

function TableRow({ row, columns, rowIndex }) {
  return (
    <tr
      key={row.key ?? rowIndex}
      className="group relative rounded-xl bg-white transition hover:bg-slate-100">
      {columns.map((column, columnIndex) => (
        <TableCell
          key={column.accessor}
          column={column}
          row={row}
          columnIndex={columnIndex}
        />
      ))}
    </tr>
  );
}

export default function DataTable({
  title,
  columns,
  rows,
  emptyText = "No rows available.",
}) {
  const hasRows = rows.length > 0;

  return (
    <div className="w-full max-w-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {title && (
        <h3 className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between text-xl font-semibold text-slate-900 ">
          {title}
        </h3>
      )}

      <div className="overflow-x-auto w-full max-w-full rounded-xl bg-slate-50 px-2 ">
        <table className="min-w-full w-full border-separate border-spacing-y-2 text-left text-sm">
          <TableHeader columns={columns} />
          <tbody>
            {!hasRows ? (
              <tr>
                <td
                  className="whitespace-nowrap px-4 py-8 text-center text-slate-500 "
                  colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={row.key ?? rowIndex}
                  row={row}
                  columns={columns}
                  rowIndex={rowIndex}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
