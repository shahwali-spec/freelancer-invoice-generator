"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useInvoice } from "@/hooks/useInvoiceForm";

export default function InvoiceHeader() {
    const { invoice, setInvoice } = useInvoice();

    const invoiceNumberValue = invoice.invoiceNumber ?? invoice.number ?? "";
    const invoiceDateValue = (invoice.invoiceDate ?? invoice.date ?? "").slice(0, 10); // YYYY-MM-DD

    return (
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            {/* Left side → Freelancer Info */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                    {invoice.freelancer?.name || "Freelancer"}
                </h1>
                {invoice.freelancer?.email && (
                    <p className="text-sm text-muted-foreground">{invoice.freelancer.email}</p>
                )}
            </div>

            {/* Right side → Invoice Info */}
            <div className="text-right space-y-2 min-w-[220px]">
                <p className="text-sm text-muted-foreground">Invoice</p>

                {/* Invoice Number (editable) */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Input
                                type="text"
                                value={invoiceNumberValue}
                                onChange={(e) =>
                                    setInvoice({
                                        invoiceNumber: e.target.value,
                                        number: e.target.value,
                                    })
                                }
                                placeholder="INV-1001"
                                className={cn(
                                    "text-lg font-semibold text-right border-none border-b border-border/50 rounded-none shadow-none focus-visible:ring-0 focus:border-primary"
                                )}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit invoice number</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Invoice Date (show + editable if needed) */}
                <div className="space-y-0">
                    {invoiceDateValue ? (
                        <div className="text-sm text-muted-foreground">
                            Date:{" "}
                            <Input
                                type="date"
                                value={invoiceDateValue}
                                onChange={(e) =>
                                    setInvoice({
                                        invoiceDate: e.target.value,
                                        date: e.target.value,
                                    })
                                }
                                className="inline-block w-auto text-sm py-0 px-1 border-none bg-transparent focus-visible:ring-0"
                            />
                        </div>
                    ) : null}

                    {/* Due Date */}
                    {invoice.dueDate && (
                        <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                    )}

                    {/* Currency */}
                    {invoice.currency && (
                        <p className="text-sm font-medium">Currency: {invoice.currency}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
