import Dexie, { Table } from "dexie";

export interface Entity {
  id?: number;
  createdAt?: string;
}

export interface Customer extends Entity {
  name: string;
}

export interface Invoice extends Entity {
  customerId: number;
  date: string;
}

export class AppDatabase extends Dexie {
  customers: Table<Customer, number>;
  invoices: Table<Invoice, number>;
  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      customers: "++id,name",
      invoices: "++id,customerId,code",
    });
    this.customers = this.table("customers");
    this.invoices = this.table("invoices");

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
