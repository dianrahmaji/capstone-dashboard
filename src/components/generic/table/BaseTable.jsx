function TableRow({ colSpan, type = "empty" }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
      >
        {type === "empty" ? (
          <div className="flex items-center justify-center italic opacity-50">
            table is empty
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg
              className="mx-3 h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="white"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path
                className="opacity-50"
                fill="black"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </td>
    </tr>
  );
}

function BaseTable({ header, loading, empty, children }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {header.map((h) => (
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                        key={h}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {loading ? (
                    <TableRow colSpan={header.length + 1} type="loading" />
                  ) : empty ? (
                    <TableRow colSpan={header.length + 1} type="empty" />
                  ) : (
                    children
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseTable;
