import db, { Customer } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";

import { Column } from "../common/Table";

import { z } from "zod";
import { ZodSchema } from "zod/lib";

import { TextInput } from "../inputs/TextInput";
import { AutoCompleteInput } from "../inputs/AutocompleteInput";
import { Formatter } from "../../utils/formatter";
import { ModuleView } from "../common/ModuleView";
import { TextareaInput } from "../inputs/TextareaInput";

const schema: ZodSchema<Customer> = z.object({
  id: z.number().optional(),
  name: z.string(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  }),
  phone: z.string().optional(),
});

const defaultValues: Customer = {
  id: undefined,
  name: "",
  address: {
    street: "",
    city: "",
    state: "",
  },
  phone: "",
};

const columns: Column<Customer>[] = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Address",
    getter: (item) => Formatter.formatAddress(item.address),
  },
];

export const Customers = () => {
  return (
    <ModuleView
      title="Customers"
      schema={schema}
      defaultValues={defaultValues}
      getFormTitle={(data) =>
        data.id
          ? `Customer Id: ${Formatter.formatCode(data.id)}`
          : "New Customer"
      }
      table={db.customers}
      columns={columns}
    >
      <section className="col-span-3 ">
        <h4 className="font-semibold mb-2 text-lg">Customer data</h4>
        <div className="grid grid-cols-3 gap-5">
          <TextInput label="Name" name="name" />
          <TextInput label="Phone" name="phone" type={"tel"} />
        </div>
      </section>

      <section className="mt-4  col-span-3 border-t pt-2">
        <h5 className="font-semibold mb-2 text-lg">Address</h5>
        <div className="grid grid-cols-3 gap-5">
          <TextInput label="City" name="address.city" />
          <TextInput label="State" name="address.state" />
          <div className="col-span-2">
            <TextareaInput label="Street" name="address.street" />
          </div>
        </div>
      </section>
    </ModuleView>
  );
};
