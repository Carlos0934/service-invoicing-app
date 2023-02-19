import db, { Item } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";

import { Column } from "../common/Table";

import { z } from "zod";
import { ZodSchema } from "zod/lib";

import { TextInput } from "../inputs/TextInput";
import { AutoCompleteInput } from "../inputs/AutocompleteInput";
import { Formatter } from "../../utils/formatter";
import { ModuleView } from "../common/ModuleView";
import { TextareaInput } from "../inputs/TextareaInput";

const schema: ZodSchema<Item> = z.object({
  id: z.number().optional(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string().optional(),
});

const defaultValues: Item = {
  id: undefined,
  name: "",
  price: 0,
  description: undefined,
};

const columns: Column<Item>[] = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Price",
    getter: (item) => Formatter.formatCurrency(item.price),
  },
];

export const Products = () => {
  return (
    <ModuleView
      title="Items"
      schema={schema}
      defaultValues={defaultValues}
      getFormTitle={(data) =>
        data.id ? `Item Id: ${Formatter.formatCode(data.id)}` : "New Item"
      }
      table={db.items}
      columns={columns}
    >
      <section className="col-span-3 ">
        <h4 className="font-semibold mb-2 text-lg">Item data</h4>
        <div className="grid grid-cols-3 gap-5">
          <TextInput label="Name" name="name" />
          <TextInput label="Price" name="price" type="number" />
        </div>
        <div className="mt-3 ">
          <TextareaInput label="Description" name="description" />
        </div>
      </section>
    </ModuleView>
  );
};
