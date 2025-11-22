import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import type { Tax } from '../types';

interface TableProps {
  data: Tax[];
  onEdit: (tax: Tax) => void;
}

const columnHelper = createColumnHelper<Tax>();

export default function Table({ data, onEdit }: TableProps) {
  const columns: ColumnDef<Tax, any>[] = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <div className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-semibold text-gray-900">
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('country', {
      header: 'Country',
      cell: (info) => (
        <div className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-600">
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="px-6 py-4 whitespace-nowrap text-right">
          <button
            onClick={() => onEdit(info.row.original)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Edit"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden shadow-sm ring-1 ring-gray-200 rounded-xl bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50/80 transition-all duration-150 ease-in-out group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-16 bg-white">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-sm font-medium text-gray-900">No data available</p>
          <p className="mt-1 text-sm text-gray-500">Taxes will appear here once loaded</p>
        </div>
      )}
    </div>
  );
}

