// src/hooks/useInvoiceForm.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Invoice, LineItem } from "@/types/invoice";

// -------------------- Default Invoice --------------------
const defaultInvoice: Invoice = {
  id: uuid(),
  ownerId: "",
  clientId: "",
  freelancerId: "",
  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  invoiceDate: new Date().toISOString(),
  number: `INV-${Date.now().toString().slice(-6)}`,
  date: new Date().toISOString(),
  dueDate: undefined,
  dueAfterDays: undefined,
  currency: "USD",
  status: "draft",
  template: "classic",
  billingModel: "fixed",
  client: {
    id: uuid(),
    name: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    taxId: "",
    logoUrl: null, // ← لوگو یہاں محفوظ ہوگا
  },
  freelancer: {
    id: uuid(),
    name: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    taxId: "",
    logoUrl: null,
  },
  items: [],
  subtotal: 0,
  discount: null,
  discounts: null,
  taxes: [],
  extraCharges: 0,
  total: 0,
  amountPaid: 0,
  balanceDue: 0,
  notes: "",
  terms: "",
  attachments: [],
  signature: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// -------------------- Context --------------------
type ContextType = {
  invoice: Invoice;
  setInvoice: (partial: Partial<Invoice>) => void;
  updateClientField: (field: string, value: any) => void; // ✅ نیا فنکشن
  updateItem: (item: Partial<LineItem> & { id: string }) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
};

const InvoiceContext = createContext<ContextType | null>(null);

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoice, setInvoiceState] = useState<Invoice>(defaultInvoice);

  const deepMerge = (target: any, source: any) => {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        target[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };

  const setInvoice = (partial: Partial<Invoice>) => {
    setInvoiceState((prev) => {
      const merged = deepMerge({ ...prev }, partial);
      const subtotal = calculateSubtotal(merged.items);
      const total = calculateTotal(subtotal, merged);
      const balanceDue =
        Math.round((total - (merged.amountPaid || 0)) * 100) / 100;
      return {
        ...merged,
        subtotal,
        total,
        balanceDue,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // ✅ نیا فنکشن: کلائنٹ کے کسی بھی فیلڈ کو اپڈیٹ کرنے کے لیے
  const updateClientField = (field: string, value: any) => {
    setInvoiceState((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateItem = (item: Partial<LineItem> & { id: string }) => {
    setInvoiceState((prev) => {
      const items = (prev.items ?? []).map((it) =>
        it.id === item.id
          ? {
            ...it,
            ...item,
            lineTotal:
              Math.round(
                ((item.quantity ?? it.quantity ?? 0) * (item.rate ?? it.rate ?? 0)) *
                100
              ) / 100,
          }
          : it
      );
      const subtotal = calculateSubtotal(items);
      const total = calculateTotal(subtotal, prev);
      const balanceDue =
        Math.round((total - (prev.amountPaid || 0)) * 100) / 100;
      return {
        ...prev,
        items,
        subtotal,
        total,
        balanceDue,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const addItem = () => {
    setInvoiceState((prev) => {
      const newItem: LineItem = {
        id: uuid(),
        name: "New item",
        quantity: 1,
        rate: 0,
        lineTotal: 0,
        type: "fixed",
      };
      const items = [...(prev.items ?? []), newItem];
      const subtotal = calculateSubtotal(items);
      return {
        ...prev,
        items,
        subtotal,
        total: calculateTotal(subtotal, prev),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const removeItem = (id: string) => {
    setInvoiceState((prev) => {
      const items = (prev.items ?? []).filter((i) => i.id !== id);
      const subtotal = calculateSubtotal(items);
      return {
        ...prev,
        items,
        subtotal,
        total: calculateTotal(subtotal, prev),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  return (
    <InvoiceContext.Provider
      value={{ invoice, setInvoice, updateClientField, updateItem, addItem, removeItem }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

// -------------------- Utils --------------------
function calculateSubtotal(items: LineItem[]) {
  return (
    Math.round(items.reduce((sum, item) => sum + (item.lineTotal || 0), 0) * 100) /
    100
  );
}

function calculateTotal(subtotal: number, inv: Invoice) {
  let total = subtotal;
  if (inv.discount) {
    total =
      inv.discount.type === "percentage"
        ? total * (1 - inv.discount.value / 100)
        : total - inv.discount.value;
  } else if (inv.discounts) {
    total =
      inv.discounts.type === "percentage" || inv.discounts.type === "percent"
        ? total * (1 - inv.discounts.value / 100)
        : total - inv.discounts.value;
  }
  if (inv.taxes && inv.taxes.length) {
    const taxSum = inv.taxes.reduce(
      (sum, tax) => sum + total * ((tax.percentage ?? tax.rate ?? 0) / 100),
      0
    );
    total += taxSum;
  }
  total += inv.extraCharges || 0;
  return Math.round(Math.max(0, total) * 100) / 100;
}

export const useInvoice = (): ContextType => {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error("useInvoice must be used inside InvoiceProvider");
  return ctx;
};