"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Invoice } from "@/types/invoice"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InvoiceTotalsProps {
  invoice: Invoice
  className?: string
}

export default function InvoiceTotals({ invoice, className }: InvoiceTotalsProps) {
  const subtotal = invoice.subtotal || 0
  const discount = invoice.discounts
    ? invoice.discounts.type === "percent"
      ? (subtotal * (invoice.discounts.value || 0)) / 100
      : invoice.discounts.value || 0
    : 0

  const taxRate = invoice.taxes?.reduce((s, t) => s + (t.rate || 0), 0) || 0
  const taxAmount = (subtotal - discount) * (taxRate / 100)

  const total =
    subtotal - discount + taxAmount + (invoice.extraCharges || 0) - (invoice.amountPaid || 0)

  return (
    <div className={cn("mt-6 flex justify-end", className)}>
      <Card className="w-full md:w-1/3 shadow-md rounded-2xl border border-muted">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Discount</span>
              <span className="font-medium">- ${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">Taxes</span>
                </TooltipTrigger>
                <TooltipContent>
                  {(invoice.taxes?.length ?? 0) > 0 ? (
                    <ul className="text-xs space-y-1">
                      {invoice.taxes?.map((t, i) => (
                        <li key={i}>
                          {t.name ?? "Tax"} – {t.rate}%
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No taxes applied</span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-medium">+ ${taxAmount.toFixed(2)}</span>
          </div>

          {(invoice.extraCharges ?? 0) > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Extra Charges</span>
              <span className="font-medium">+ ${(invoice.extraCharges ?? 0).toFixed(2)}</span>
            </div>
          )}

          {(invoice.amountPaid ?? 0) > 0 && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Amount Paid</span>
              <span className="font-medium">- ${(invoice.amountPaid ?? 0).toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-base font-semibold">
            <span>Grand Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
