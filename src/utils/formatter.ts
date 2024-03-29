import { Address } from "../config/db";

export class Formatter {
  static formatCode(code: number) {
    return code.toString().padStart(6, "0");
  }
  static formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  static formatDate(date?: string) {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US").format(new Date(date));
  }

  static formatDateLong(date?: string) {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }
  static formatAddress(address?: Address) {
    if (!address) return "";
    return `${address.city || "N/A"}, ${address.street || "N/A"}, ${
      address.zipCode || "N/A"
    }`;
  }
}
