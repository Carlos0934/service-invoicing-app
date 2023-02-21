import db, { Invoice } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";

import { Column } from "../common/Table";

import { z } from "zod";
import { ZodSchema } from "zod/lib";

import { TextInput } from "../inputs/TextInput";
import { AutoCompleteInput } from "../inputs/AutocompleteInput";
import { Formatter } from "../../utils/formatter";
import { ModuleView } from "../common/ModuleView";
import { ItemsTableInput } from "../inputs/ItemsTableInput";
import { ArrowDownTrayIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Modal } from "../common/Modal";
import { InvoiceDocument } from "../documents/InvoiceDocument";
import { PDFViewer } from "@react-pdf/renderer";
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
  lines: [
    {
      itemId: 0,
      quantity: 1,
      price: 0,
    },
  ],
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
    getter: (item) =>
      Formatter.formatCurrency(
        item.lines.reduce((acc, line) => acc + line.price * line.quantity, 0)
      ),
  },
];
export const Invoices = () => {
  const { data } = useTableQuery(db.customers);
  const [invoiceToPrint, setInvoiceToPrint] = useState<number | undefined>();
  return (
    <>
      <Modal
        open={!!invoiceToPrint}
        onClose={() => setInvoiceToPrint(undefined)}
      >
        <PDFViewer className=" h-[750px] w-[500px]">
          <InvoiceDocument invoiceId={invoiceToPrint} />
        </PDFViewer>
      </Modal>
      <ModuleView
        title="Invoices"
        schema={schema}
        defaultValues={defaultValues}
        getFormTitle={(data) =>
          data.id ? `Invoice #${Formatter.formatCode(data.id)}` : "New Invoice"
        }
        table={db.invoices}
        columns={columns}
        actions={(data) => (
          <button
            className="btn  text-gray-400 hover:text-gray-500 "
            onClick={() => setInvoiceToPrint(data.id)}
          >
            <PrinterIcon className="h-5 w-5 " />
          </button>
        )}
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
    </>
  );
};
