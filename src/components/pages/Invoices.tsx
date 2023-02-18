import { Tab } from "@headlessui/react";
import classNames from "classnames";
import db, { Invoice } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";
import { ask } from "@tauri-apps/api/dialog";
import { Column, Table } from "../common/Table";
import { TabView } from "../common/TabView";
import { z } from "zod";
import { ZodSchema } from "zod/lib";
import { Form } from "../common/Form";
import { useState } from "react";
import { TextInput } from "../inputs/TextInput";
import { AutoCompleteInput } from "../inputs/AutocompleteInput";
import { useTableDelete, useTableUpsert } from "../../hooks/useTableUpsert";
import { Formatter } from "../../utils/formatter";
import { ModuleView } from "../common/ModuleView";
import { ItemsTableInput } from "../inputs/ItemsTableInput";
const schema: ZodSchema<Invoice> = z.object({
  id: z.number().optional(),
  date: z.string(),
  customerId: z.coerce.number().optional(),
  createdAt: z.string().optional(),
  salesPerson: z.string().optional(),
  jobDescription: z.string().optional(),
  paymentTerms: z.string().optional(),
  dueDate: z.string().optional(),
  lines: z.array(
    z.object({
      itemId: z.number(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

const defaultValues: Invoice = {
  id: undefined,
  createdAt: undefined,
  customerId: undefined,
  date: "",
  salesPerson: undefined,
  jobDescription: undefined,
  paymentTerms: undefined,
  dueDate: undefined,
  lines: [],
};
const columns: Column<Invoice>[] = [
  {
    header: "Date",
    getter: (item) => Formatter.formatDate(item.date),
  },
  {
    header: "Client ID",
    accessor: "customerId",
  },
  {
    header: "Job Description",
    accessor: "jobDescription",
  },
  {
    header: "Due Date",
    getter: (item) => Formatter.formatDate(item.dueDate),
  },
  {
    header: "Total",
  },
];
export const Invoices = () => {
  const { data } = useTableQuery(db.customers);
  return (
    <ModuleView
      title="Invoices"
      schema={schema}
      defaultValues={defaultValues}
      getFormTitle={(data) =>
        data.id ? `Invoice #${Formatter.formatCode(data.id)}` : "New Invoice"
      }
      table={db.invoices}
      columns={columns}
    >
      <section className="col-span-3">
        <h4 className="font-semibold mb-2 text-lg">Invoice data</h4>
        <div className="grid grid-cols-3 gap-5">
          <TextInput label="Date" name="date" type={"date"} />
          <TextInput label="SalesPerson" name="salesPerson" />
          <TextInput label="Payment Terms" name="paymentTerms" />
          <TextInput label="Due Date" name="dueDate" type={"date"} />
          <TextInput label="Job Description" name="jobDescription" />
          <AutoCompleteInput
            data={data || []}
            label="Customer"
            name="customerId"
            getLabel={(item) => item.name}
            getValue={(item) => item.id}
          />
        </div>
      </section>

      <section className="col-span-3 ">
        <h4 className="font-semibold mb-2 text-lg"> Lines</h4>
        <div className="grid grid-cols-3 gap-5">
          <ItemsTableInput />
        </div>
      </section>
    </ModuleView>
  );
};
