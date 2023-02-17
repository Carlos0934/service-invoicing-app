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
const schema: ZodSchema<Invoice> = z.object({
  id: z.number().optional(),
  date: z.string(),
  customerId: z.coerce.number(),
  createdAt: z.string().optional(),
});

const defaultValues: Invoice = {
  id: undefined,
  createdAt: undefined,
  customerId: 0,
  date: "",
};

export const Invoices = () => {
  const columns: Column<Invoice>[] = [
    {
      header: "Fecha",
      getter: (item) => Formatter.formatDate(item.date),
    },
    {
      header: "Cliente ID",
      accessor: "customerId",
    },
  ];

  return (
    <ModuleView
      title="Facturas"
      schema={schema}
      defaultValues={defaultValues}
      getFormTitle={(data) => `Factura ${data.id}`}
      table={db.invoices}
      columns={columns}
    >
      <TextInput label="Fecha" name="date" type={"date"} />
      <TextInput
        label="Cliente"
        name="customerId"
        list="customers"
        type={"select"}
      />

      <datalist id="customers">
        <option value={1}>Juan</option>
        <option value={2}>Pedro</option>
        <option value={3}>Maria</option>
      </datalist>
    </ModuleView>
  );
};
