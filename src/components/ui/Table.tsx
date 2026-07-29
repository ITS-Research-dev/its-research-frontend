import { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
}

export default function Table<T>({
  columns,
  data,
  emptyText = "Data tidak tersedia",
}: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-6 py-4 text-left text-sm font-semibold text-text"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-description"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-border hover:bg-background"
                >
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className="px-6 py-4 text-sm text-text"
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
