import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

import { useFieldArray, useFormContext } from "react-hook-form";
import db, { Invoice } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";
import { AutoCompleteInput } from "./AutocompleteInput";
import { TextInput } from "./TextInput";

export const ItemsTableInput = () => {
  const { control } = useFormContext<Invoice>();
  const { fields, append, remove, prepend } = useFieldArray<Invoice>({
    control,
    name: "lines",
  });
  const { data } = useTableQuery(db.items);

  return (
    <div className="col-span-3 mt-3 ">
      <button
        type="button"
        className="btn ml-auto block justify-self-end font-bold py-2 px-4 rounded bg-gray-100 shadow-sm hover:bg-gray-200 hover:text-gray-700 transition"
        onClick={() => {
          append({ itemId: 0, price: 0, quantity: 1 });
        }}
      >
        <span className="mr-2">Add Line</span>
        <PlusIcon className="h-6 w-6 inline-block " aria-hidden="true" />
      </button>
      <div className="max-h-52 overflow-y-auto my-2">
        <table className=" w-full  mt-1 border-spacing-2 border-separate ">
          <thead>
            <tr className="text-muted px-4 text-left  py-2 ">
              <th className="">Item</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {fields?.map((item, index) => (
              <tr key={index} className="">
                <td>
                  <AutoCompleteInput
                    name={`lines[${index}].itemId`}
                    data={data || []}
                    placeholder="Select Item"
                    getLabel={(item) => item.name}
                    getValue={(item) => item.id}
                  />
                </td>
                <td>
                  <TextInput type="number" name={`lines[${index}].price`} />
                </td>
                <td>
                  <TextInput type="number" name={`lines[${index}].quantity`} />
                </td>
                <td className=" px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
