import Dexie, { Table } from "dexie";

export interface Entity {
  id?: number;
  createdAt?: string;
}

export interface Customer extends Entity {
  name: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
  phone?: string;
}

export interface Item extends Entity {
  name: string;
  description?: string;
  price?: number;
}
export interface Invoice extends Entity {
  customerId?: number;
  date: string;
  salesPerson?: string;
  jobDescription?: string;
  dueDate?: string;
  paymentTerms?: string;
  lines: {
    itemId: number;
    price: number;
    quantity: number;
  }[];
}

export class AppDatabase extends Dexie {
  customers: Table<Customer, number>;
  invoices: Table<Invoice, number>;
  items: Table<Item, number>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      customers: "++id,name,address.street,address.city,address.state,phone",
      invoices:
        "++id,customerId,code,date,salesPerson,jobDescription,dueDate,paymentTerms,lines",
      items: "++id,name,description,price",
    });
    this.customers = this.table("customers");
    this.invoices = this.table("invoices");
    this.items = this.table("items");

    this.setupHooks();
  }

  private setupHooks() {
    for (const table of [this.customers, this.invoices]) {
      table.hook("creating", (primKey, obj, transaction) => {
        obj.createdAt = new Date().toISOString();
      });
    }
  }
}
const db = new AppDatabase();
export default db;
