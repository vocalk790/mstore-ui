import React from "react";
import classNames from "classnames";

const Table = ({ columns, data, isLoading = false, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
      <table className="min-w-full bg-white text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-5 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-gray-400">
                로딩 중...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(
                  "hover:bg-blue-50 transition cursor-pointer",
                  onRowClick && "hover:shadow-sm"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-5 py-3 text-gray-800">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
