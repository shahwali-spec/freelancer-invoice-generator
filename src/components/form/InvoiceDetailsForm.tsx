// src/components/form/InvoiceDetailsForm.tsx
"use client";
import React, { useMemo } from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";

const currencies = [
  { code: "USD", name: "US Dollar", country: "US" },
  { code: "EUR", name: "Euro", country: "EU" },
  { code: "PKR", name: "Pakistani Rupee", country: "PK" },
  { code: "GBP", name: "British Pound", country: "GB" },
  { code: "AUD", name: "Australian Dollar", country: "AU" },
  { code: "CAD", name: "Canadian Dollar", country: "CA" },
  { code: "INR", name: "Indian Rupee", country: "IN" },
  { code: "PHP", name: "Philippine Peso", country: "PH" },
  { code: "BRL", name: "Brazilian Real", country: "BR" },
  { code: "UAH", name: "Ukrainian Hryvnia", country: "UA" },
];

const dueOptions = [
  { label: "7 days", value: 7 },
  { label: "14 days", value: 14 },
  { label: "30 days", value: 30 },
];

export default function InvoiceDetailsForm() {
  const { invoice, setInvoice } = useInvoice();
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // utility: add days to date
  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  // Generic setter
  const handleChange = (key: keyof typeof invoice, value: any) => {
    if (key === "invoiceNumber" || key === "number") {
      setInvoice({ invoiceNumber: String(value), number: String(value) });
      return;
    }
    if (key === "invoiceDate" || key === "date") {
      setInvoice({ invoiceDate: String(value), date: String(value) });
      return;
    }
    setInvoice({ [key]: value } as Partial<typeof invoice>);
  };

  // manual due date change → reset dropdown
  const handleDueDateChange = (value: string) => {
    setInvoice({ dueDate: value, dueAfterDays: undefined });
  };

  // dropdown change → auto set due date
  const handleDueAfterChange = (days: number) => {
    const base = invoice.invoiceDate ?? invoice.date ?? todayISO;
    const newDueDate = addDays(base, days);
    setInvoice({ dueAfterDays: days, dueDate: newDueDate });
  };

  // invoice date change → recalc due date if dropdown active
  const handleInvoiceDateChange = (value: string) => {
    if (invoice.dueAfterDays) {
      const newDueDate = addDays(value, invoice.dueAfterDays);
      setInvoice({ invoiceDate: value, date: value, dueDate: newDueDate });
    } else {
      setInvoice({ invoiceDate: value, date: value });
    }
  };

  return (
    <form className="w-full">
      <Card className="rounded-xl shadow-lg border-neutral-200">
        <CardHeader className="p-6">
          <CardTitle className="text-lg md:text-xl font-semibold">
            Invoice Details
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Basic invoice metadata — reflected instantly in live preview.
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="invoice-number" className="text-sm">
                Invoice Number
              </Label>
              <Input
                id="invoice-number"
                value={invoice.invoiceNumber ?? invoice.number ?? ""}
                onChange={(e) => handleChange("invoiceNumber", e.target.value)}
                placeholder="e.g. INV-1001"
                className="mt-1 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="invoice-date" className="text-sm">
                Invoice Date
              </Label>
              <Input
                id="invoice-date"
                type="date"
                value={(invoice.invoiceDate ?? invoice.date ?? todayISO).slice(
                  0,
                  10
                )}
                onChange={(e) => handleInvoiceDateChange(e.target.value)}
                className="mt-1 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="invoice-due" className="text-sm">
                Due Date
              </Label>
              <Input
                id="invoice-due"
                type="date"
                value={invoice.dueDate ?? ""}
                onChange={(e) => handleDueDateChange(e.target.value)}
                placeholder="Optional"
                className="mt-1 rounded-lg"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="due-after" className="text-sm">
                Auto-calc Due Date
              </Label>
              <Select
                value={
                  invoice.dueAfterDays
                    ? invoice.dueAfterDays.toString()
                    : "none"
                }
                onValueChange={(val) => {
                  if (val === "none") {
                    setInvoice({ dueAfterDays: undefined, dueDate: undefined });
                  } else {
                    handleDueAfterChange(Number(val));
                  }
                }}
              >
                <SelectTrigger id="due-after" className="w-full">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {dueOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency" className="text-sm">
                Currency
              </Label>
              <Select
                value={invoice.currency ?? "USD"}
                onValueChange={(val) => handleChange("currency", val)}
              >
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <div className="flex items-center gap-2">
                        <ReactCountryFlag
                          countryCode={c.country}
                          svg
                          style={{
                            width: "1.2em",
                            height: "1.2em",
                            borderRadius: "3px",
                          }}
                        />
                        <span>
                          {c.code} — {c.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 text-xs text-muted-foreground">
          Live preview synced automatically
        </CardFooter>
      </Card>
    </form>
  );
}
