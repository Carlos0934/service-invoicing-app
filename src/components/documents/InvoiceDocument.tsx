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
    alignItems: "flex-end",

    padding: "0 10px",
    paddingTop: "5px",
    textAlign: "right",
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
  customerName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});

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
            }}
          >
            <Text style={styles.customerName}>{customer.name}</Text>

            <Text style={styles.labelValue}>
              {Formatter.formatAddress(customer.address)}
            </Text>

            <Text style={styles.labelValue}>{customer.phone}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
