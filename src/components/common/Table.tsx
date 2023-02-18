import classNames from "classnames";
import { Entity } from "../../config/db";

export interface Column<T> {
  header: string;
  accessor?: string;
  getter?: (item: T) => string;
  cell?: (item: T) => JSX.Element;
  className?: string;
}

export interface TableProps<T> {
  data?: T[];
  columns: Column<T>[];
}

export const Table = <T extends Entity>({ data, columns }: TableProps<T>) => {
  return (
    <div className="inline-block  w-full overflow-hidden h-[65vh]  bg-gray-100 shadow rounded-lg  overflow-y-auto ">
      <table className="border-collapse w-full   ">
        <thead className="bg-gray-50 border-b text-gray-800 ">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={
                  column.className +
                  " px-3 py-2 text-base font-semibold text-left"
                }
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" shadow rounded-lg relative ">
          {data?.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={classNames(
                    "px-3 py-2  bg-gray-50 border-b text-gray-600 ",
                    column.className
                  )}
                >
                  {column.getter
                    ? column.getter(item)
                    : (item[column.accessor as keyof typeof item] as any)}

                  {column.cell?.(item)}
                </td>
              ))}
            </tr>
          ))}
          {data?.length === 0 && (
            <tr className=" absolute top-0  right-0 left-0  mt-[20%] flex items-center justify-center">
              <td
                colSpan={columns.length}
                className="text-center text-xl font-semibold"
              >
                No hay información
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
