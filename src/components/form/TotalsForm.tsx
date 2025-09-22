"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TotalsForm() {
  const { invoice, setInvoice } = useInvoice();
  const [displaySubtotal, setDisplaySubtotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const isInternalUpdate = useRef(false);

  // ---- Calculate subtotal, discount, taxes, total ----
  const { subtotal, discountAmount, taxAmount, total } = useMemo(() => {
    const subtotal =
      invoice.items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

    // Discount
    let discountAmount = 0;
    if (invoice.discounts) {
      if (invoice.discounts.type === "percent") {
        discountAmount = (subtotal * (invoice.discounts.value || 0)) / 100;
      } else if (invoice.discounts.type === "fixed") {
        discountAmount = invoice.discounts.value || 0;
      }
    }

    // Taxes
    const taxRate =
      invoice.taxes?.reduce((s, t) => s + (t.rate || 0), 0) || 0;
    const taxAmount = (subtotal - discountAmount) * (taxRate / 100);

    // Final total
    const total =
      subtotal -
      discountAmount +
      taxAmount +
      (invoice.extraCharges || 0) -
      (invoice.amountPaid || 0);

    return { subtotal, discountAmount, taxAmount, total };
  }, [
    invoice.items,
    invoice.discounts,
    invoice.taxes,
    invoice.extraCharges,
    invoice.amountPaid,
  ]);

  // ---- Sync with global invoice ----
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    const next = { subtotal, total };
    if (invoice.subtotal !== next.subtotal || invoice.total !== next.total) {
      isInternalUpdate.current = true;
      setInvoice(next);
    }
    setDisplaySubtotal(subtotal);
    setDisplayTotal(total);
  }, [subtotal, total, invoice.subtotal, invoice.total, setInvoice]);

  const updateInvoice = (data: Partial<typeof invoice>) => {
    setInvoice({ ...invoice, ...data });
  };

  return (
    <Card className="rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Totals & Taxes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Discount */}
          <div>
            <Label htmlFor="discount">Discount</Label>
            <div className="flex gap-2">
              <Input
                id="discount"
                type="number"
                value={invoice.discounts?.value || ""}
                placeholder="0"
                onChange={(e) =>
                  updateInvoice({
                    discounts: {
                      type: invoice.discounts?.type || "fixed",
                      value: Number(e.target.value),
                    },
                  })
                }
              />
              <Select
                value={invoice.discounts?.type || "fixed"}
                onValueChange={(val) =>
                  updateInvoice({
                    discounts: {
                      type: val as "fixed" | "percent",
                      value: invoice.discounts?.value || 0,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="percent">%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Extra Charges */}
          <div>
            <Label htmlFor="extraCharges">Extra Charges</Label>
            <Input
              id="extraCharges"
              type="number"
              value={invoice.extraCharges || ""}
              placeholder="0"
              onChange={(e) =>
                updateInvoice({ extraCharges: Number(e.target.value) })
              }
            />
          </div>

          {/* Amount Paid */}
          <div>
            <Label htmlFor="amountPaid">Amount Paid</Label>
            <Input
              id="amountPaid"
              type="number"
              value={invoice.amountPaid || ""}
              placeholder="0"
              onChange={(e) =>
                updateInvoice({ amountPaid: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Totals Display */}
        <div className="mt-4 space-y-1">
          <div className="text-sm text-muted-foreground">
            Subtotal: ${displaySubtotal.toFixed(2)}
          </div>
          {discountAmount > 0 && (
            <div className="text-sm text-muted-foreground">
              Discount: -${discountAmount.toFixed(2)}
            </div>
          )}
          {taxAmount > 0 && (
            <div className="text-sm text-muted-foreground">
              Tax: +${taxAmount.toFixed(2)}
            </div>
          )}
          <div className="text-lg font-semibold">
            Grand Total: ${displayTotal.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
