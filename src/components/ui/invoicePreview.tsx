"use client"
import * as React from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface InvoicePreviewProps {
    freelancer: {
        name: string
        email: string
        phone?: string
        address?: string
        logo?: string
    }
    client: {
        name: string
        email: string
        phone?: string
        address?: string
    }
    invoice: {
        number: string
        date: string
        dueDate?: string
        currency: string
        items: { description: string; quantity: number; price: number }[]
        notes?: string
        footer?: string
    }
    className?: string
    onDownloadPDF?: () => void
}

export function InvoicePreview({ freelancer, client, invoice, className, onDownloadPDF }: InvoicePreviewProps) {
    const total = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0)

    return (
        <div className={cn("w-full max-w-3xl mx-auto", className)}>
            <Card className="shadow-xl rounded-2xl border border-muted">
                {/* Header */}
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {freelancer.logo ? (
                            <img
                                src={freelancer.logo}
                                alt="Logo"
                                className="h-12 w-12 object-contain rounded-lg border bg-white"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold">
                                {freelancer.name?.[0]}
                            </div>
                        )}
                        <div>
                            <h2 className="font-semibold text-xl">{freelancer.name}</h2>
                            <p className="text-sm text-muted-foreground">{freelancer.email}</p>
                            {freelancer.phone && <p className="text-sm text-muted-foreground">{freelancer.phone}</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
                        <p className="text-sm text-muted-foreground">#{invoice.number}</p>
                        <p className="text-sm text-muted-foreground">Date: {invoice.date}</p>
                        {invoice.dueDate && <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>}
                    </div>
                </CardHeader>

                <Separator />

                {/* Content */}
                <CardContent className="py-6 space-y-6">
                    {/* Bill to & From */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Bill To:</h3>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                            {client.phone && <p className="text-sm text-muted-foreground">{client.phone}</p>}
                            {client.address && <p className="text-sm text-muted-foreground">{client.address}</p>}
                        </div>
                        <div className="text-right md:text-left">
                            <h3 className="text-sm font-semibold mb-1">From:</h3>
                            <p className="font-medium">{freelancer.name}</p>
                            {freelancer.address && <p className="text-sm text-muted-foreground">{freelancer.address}</p>}
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="py-2 text-left font-medium">Description</th>
                                    <th className="py-2 text-right font-medium">Qty</th>
                                    <th className="py-2 text-right font-medium">Price</th>
                                    <th className="py-2 text-right font-medium">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, idx) => (
                                    <tr key={idx} className="border-b last:border-0">
                                        <td className="py-2">{item.description}</td>
                                        <td className="py-2 text-right">{item.quantity}</td>
                                        <td className="py-2 text-right">
                                            {invoice.currency} {item.price.toFixed(2)}
                                        </td>
                                        <td className="py-2 text-right">
                                            {invoice.currency} {(item.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <p className="text-sm font-medium">
                                Total:{" "}
                                <span className="text-base font-bold">
                                    {invoice.currency} {total.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Notes:</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.notes}</p>
                        </div>
                    )}
                </CardContent>

                {/* Footer */}
                {invoice.footer && (
                    <>
                        <Separator />
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">{invoice.footer}</p>
                        </CardFooter>
                    </>
                )}

                {/* Download button */}
                <Separator />
                <CardFooter className="flex justify-end gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" onClick={onDownloadPDF}>
                                    Download PDF
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Export this invoice as PDF</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardFooter>
            </Card>
        </div>
    )
}