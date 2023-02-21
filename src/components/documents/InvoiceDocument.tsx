import { FC } from "react";
import { Customer, Invoice, Item } from "../../config/db";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Formatter } from "../../utils/formatter";
interface Props {
  invoice: Invoice;
  customer: Customer;
  items: Item[];
}
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    padding: "0 10px",
    paddingTop: "5px",
    textAlign: "center",
    borderBottom: "1px solid #969696",
  },
  title: {
    fontSize: 38,
    color: "#969696",
    width: "100%",
  },

  name: {
    fontSize: 18,
    width: "100%",
    fontStyle: "italic",
  },
  headerInfo: {
    display: "flex",
    fontSize: 10,
    color: "#969696",
    flexDirection: "row",
    paddingHorizontal: "80px 30px",
  },
  label: {
    fontSize: 10,
    color: "#969696",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  labelValue: {
    fontSize: 12,
    color: "#000",
  },
  customerAddress: {
    marginTop: "40px",
    fontSize: 18,
    color: "#000",
    fontWeight: "semibold",
  },
  address: {
    fontSize: 20,
    color: "#000",
    marginTop: "8px",
    fontWeight: "heavy",
  },
  table: {
    display: "flex",
    width: "auto",
    flexDirection: "column",
    marginTop: "20px",
    paddingHorizontal: "30px",
  },

  tableHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  tableHeaderItem: {
    border: "1px solid #a6a6a6",
    backgroundColor: "#dadada",
    padding: "5px 0",
    width: "25%",
    margin: "0",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "extrabold",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 10,
    textTransform: "uppercase",
  },
  tableRowItem: {
    border: "1px solid #a6a6a6",
    padding: "5px",
    width: "25%",
    margin: "0",
    fontSize: 9,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "#000",
    marginTop: "20px",
    padding: "0 30px",
  },
});

interface Table<T> {
  headers: {
    key: keyof T | ((item: T) => string);
    label: string;
    width: string;
  }[];
  rows: T[];
}
const Table = <T extends object>({ headers, rows }: Table<T>) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        {headers.map((item) => {
          return (
            <Text
              style={{
                ...styles.tableHeaderItem,
                width: item.width,
              }}
            >
              {item.label}
            </Text>
          );
        })}
      </View>
      <View>
        {rows.map((row, i) => (
          <View
            style={{
              ...styles.tableRow,
              backgroundColor: i % 2 === 0 ? "#fff" : "#f2f2f2",
            }}
          >
            {headers.map((item) => {
              return (
                <Text
                  style={{
                    ...styles.tableRowItem,
                    width: item.width,
                  }}
                >
                  {typeof item.key === "function"
                    ? item.key(row)
                    : (row[item.key] as any)}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export const InvoiceDocument: FC<Props> = ({ invoice, customer, items }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>UNION SERVICE</Text>
          <Text style={styles.title}>INVOICE</Text>
        </View>
        <View style={styles.headerInfo}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "56%",
            }}
          >
            <Text style={styles.address}>365 Ashford ST Brooklyn</Text>
            <Text style={styles.customerAddress}>{customer.name}</Text>

            <Text style={styles.labelValue}>
              {Formatter.formatAddress(customer.address)}
            </Text>

            <Text style={styles.labelValue}>{customer.phone}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "46%",
              marginTop: "46px",
              marginLeft: "56px",
            }}
          >
            <Text style={styles.label}>
              INVOICE NO: <Text style={styles.labelValue}>{invoice.id}</Text>{" "}
            </Text>
            <Text style={styles.label}>
              DATE:{" "}
              <Text style={styles.labelValue}>
                {Formatter.formatDateLong(invoice.date)}
              </Text>{" "}
            </Text>

            <Text style={styles.label}>
              CUSTOMER ID:{" "}
              <Text style={styles.labelValue}>{invoice.customerId}</Text>{" "}
            </Text>
          </View>
        </View>
        <Table
          headers={[
            {
              key: "salesPerson",
              label: "SalesPerson",
              width: "30%",
            },
            {
              key: "job",
              label: "JOB",
              width: "25%",
            },
            {
              key: "paymentTerms",
              label: "PAYMENT TERMS",
              width: "30%",
            },
            {
              key: "dueDate",
              label: "DUE DATE",
              width: "15%",
            },
          ]}
          rows={[
            {
              salesPerson: invoice.salesPerson,
              job: invoice.jobDescription,
              paymentTerms: invoice.paymentTerms,
              dueDate: Formatter.formatDate(invoice.dueDate),
            },
          ]}
        />

        <Table
          headers={[
            {
              key: "quantity",
              label: "quantity",
              width: "15%",
            },
            {
              key: "description",
              label: "description",
              width: "50%",
            },
            {
              key: "unitPrice",
              label: "unit price",
              width: "15%",
            },
            {
              key: "total",
              label: "total",
              width: "20%",
            },
          ]}
          rows={invoice.lines.map((line) => ({
            quantity: line.quantity,
            description: items.find((item) => item.id === line.itemId)?.name,
            unitPrice: Formatter.formatCurrency(line.price),
            total: Formatter.formatCurrency(line.quantity * line.price),
          }))}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "30%",
              marginLeft: "auto",
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              SUBTOTAL:{" "}
              <Text>
                {Formatter.formatCurrency(
                  invoice.lines.reduce((acc, line) => {
                    return acc + line.quantity * line.price;
                  }, 0)
                )}
              </Text>{" "}
            </Text>

            <Text
              style={{
                fontSize: 16,
              }}
            >
              TAX:{" "}
              <Text>
                {Formatter.formatCurrency(
                  invoice.lines.reduce((acc, line) => {
                    return acc + line.quantity * line.price;
                  }, 0) * 0.13
                )}
              </Text>{" "}
            </Text>

            <Text
              style={{
                fontSize: 16,
              }}
            >
              TOTAL:{" "}
              <Text>
                {Formatter.formatCurrency(
                  invoice.lines.reduce((acc, line) => {
                    return acc + line.quantity * line.price;
                  }, 0) * 1.13
                )}
              </Text>{" "}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Text style={styles.footer}>
            Make all checks payable to UNION SERVICE #
          </Text>
        </View>
      </Page>
    </Document>
  );
};
