// src/utils/invoiceHelpers.ts
import { Invoice, LineItem, Discount, Tax } from "@/types/invoice";

/**
 * Calculate subtotal of line items
 */
export function calculateSubtotal(items?: LineItem[]): number {
    if (!items || items.length === 0) return 0;

    return items.reduce((sum, item) => {
        const lineTotal = item.lineTotal ?? (item.quantity ?? 0) * (item.rate ?? 0);
        return sum + lineTotal;
    }, 0);
}

/**
 * Apply discount
 */
export function applyDiscount(subtotal: number, discount?: Discount): number {
    if (!discount) return subtotal;

    const value = discount.value ?? 0;

    switch (discount.type) {
        case "fixed":
            return Math.max(subtotal - value, 0);
        case "percentage":
        case "percent":
            return subtotal - (subtotal * value) / 100;
        default:
            return subtotal;
    }
}

/**
 * Apply taxes
 */
export function applyTaxes(amount: number, taxes?: Tax[]): number {
    if (!taxes || taxes.length === 0) return amount;

    return taxes.reduce((total, tax) => {
        const rate = tax.rate ?? tax.percentage ?? 0;
        return total + (total * rate) / 100;
    }, amount);
}

/**
 * Calculate total invoice
 */
export function calculateInvoiceTotals(invoice: Invoice): Invoice {
    const subtotal = calculateSubtotal(invoice.items);
    const discounted = applyDiscount(subtotal, invoice.discount ?? invoice.discounts ?? null);
    const taxed = applyTaxes(discounted, invoice.taxes);
    const extra = invoice.extraCharges ?? 0;
    const total = taxed + extra;
    const amountPaid = invoice.amountPaid ?? 0;
    const balanceDue = Math.max(total - amountPaid, 0);

    return {
        ...invoice,
        subtotal,
        total,
        balanceDue,
    };
}