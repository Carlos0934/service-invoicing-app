import React, { useId, useMemo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { InvoiceDocument } from "../documents/InvoiceDocument";
import { Customer, Invoice, Item } from "../../config/db";
const invoice: Invoice = {
  id: 1,
  customerId: 1,
  date: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  lines: [
    {
      itemId: 1,
      quantity: 1,
      price: 3,
    },
    {
      itemId: 2,
      quantity: 2,
      price: 10,
    },
  ],
  createdAt: new Date().toISOString(),
  jobDescription: "Job Description",
  paymentTerms: "Payment Terms",
  salesPerson: "Sales Person",
};

const customer: Customer = {
  id: 1,
  name: "Customer Name",
  phone: "123456789",
  address: {
    street: "Street",
    city: "City",
    state: "State",
  },
};

const items: Item[] = [
  {
    id: 1,
    name: "Item 1",
    price: 3,
  },
  {
    id: 2,
    name: "Item 2",
    price: 10,
  },
];

export const Dashboard = () => {
  const id = useMemo(() => Math.random(), []);
  return (
    <PDFViewer className="w-full h-full" key={id}>
      <InvoiceDocument invoice={invoice} items={items} customer={customer} />
    </PDFViewer>
  );
};
