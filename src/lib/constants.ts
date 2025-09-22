/**
 * src/lib/constants.ts
 * Modern, strongly-typed constants for the Freelancer Invoice Generator
 */

export const InvoiceStatus = {
    Draft: "draft",
    Sent: "sent",
    Paid: "paid",
    Overdue: "overdue",
} as const;
export type InvoiceStatusKey = keyof typeof InvoiceStatus;
export type InvoiceStatusValue = (typeof InvoiceStatus)[InvoiceStatusKey];

export const BillingModel = {
    Fixed: "fixed",
    Hourly: "hourly",
    Milestone: "milestone",
} as const;

export const ExportFormat = {
    PDF: "pdf",
    Image: "image",
    Word: "docx",
    Excel: "xlsx",
} as const;

export const InvoiceTemplate = {
    Classic: "classic",
    Minimal: "minimal",
    Modern: "modern",
    Dark: "dark",
} as const;

export const LanguageCode = {
    EN: "en",
    ES: "es",
    FR: "fr",
    DE: "de",
    IT: "it",
    PT: "pt",
    AR: "ar",
    UR: "ur",
    HI: "hi",
    ZH: "zh",
} as const;
export type LanguageCodeValue =
    (typeof LanguageCode)[keyof typeof LanguageCode];

export const ThemeMode = {
    Light: "light",
    Dark: "dark",
    System: "system",
} as const;

export interface Currency {
    readonly code: string;
    readonly symbol: string;
    readonly name: string;
    readonly decimals?: number;
}

export const SUPPORTED_CURRENCIES: readonly Currency[] = [
    { code: "USD", symbol: "$", name: "US Dollar", decimals: 2 },
    { code: "EUR", symbol: "€", name: "Euro", decimals: 2 },
    { code: "GBP", symbol: "£", name: "British Pound", decimals: 2 },
    { code: "PKR", symbol: "₨", name: "Pakistani Rupee", decimals: 2 },
    { code: "INR", symbol: "₹", name: "Indian Rupee", decimals: 2 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", decimals: 2 },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar", decimals: 2 },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", decimals: 2 },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimals: 2 },
    { code: "TRY", symbol: "₺", name: "Turkish Lira", decimals: 2 },
] as const;

export interface TaxOption {
    readonly id: string;
    readonly label: string;
    readonly percentage: number;
}

export const DEFAULT_TAX_OPTIONS: readonly TaxOption[] = [
    { id: "tax_5", label: "VAT 5%", percentage: 5 },
    { id: "tax_10", label: "VAT 10%", percentage: 10 },
    { id: "tax_15", label: "VAT 15%", percentage: 15 },
] as const;

export interface DiscountOption {
    readonly id: string;
    readonly label: string;
    readonly type: "percentage" | "fixed";
}

export const DISCOUNT_TYPES: readonly DiscountOption[] = [
    { id: "discount_percentage", label: "Percentage", type: "percentage" },
    { id: "discount_fixed", label: "Fixed Amount", type: "fixed" },
] as const;

export const FORM_VALIDATION = {
    freelancer: {
        name: { required: true, maxLength: 100 },
        email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
        phone: { required: true, maxLength: 20 },
        logo: { required: false },
        address: { required: false },
        website: { required: false },
        taxId: { required: false },
    },
    client: {
        name: { required: true, maxLength: 100 },
        email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
        phone: { required: true, maxLength: 20 },
        address: { required: false },
        taxId: { required: false },
    },
    invoice: {
        invoiceNumber: { required: true },
        invoiceDate: { required: true },
        dueDate: { required: false },
        currency: { required: true },
        status: { required: true },
    },
    item: {
        name: { required: true, maxLength: 200 },
        quantity: { required: true, min: 1 },
        rate: { required: true, min: 0 },
    },
} as const;

export const PDF_SETTINGS = {
    defaultFontSize: 12,
    headerFontSize: 18,
    subHeaderFontSize: 14,
    font: "Helvetica",
    lineHeight: 1.4,
    margin: { top: 40, right: 30, bottom: 40, left: 30 } as const,
    colors: {
        light: {
            primary: "#111827",
            secondary: "#374151",
            accent: "#2563EB",
        },
        dark: {
            primary: "#F9FAFB",
            secondary: "#D1D5DB",
            accent: "#3B82F6",
        },
    },
} as const;

export const STORAGE_KEYS = {
    authToken: "invoicegen_auth_token",
    userSettings: "invoicegen_user_settings",
    invoiceDraft: "invoicegen_invoice_draft",
    theme: "invoicegen_theme",
    language: "invoicegen_language",
} as const;

export const ROUTES = {
    home: "/",
    login: "/auth/login",
    signup: "/auth/signup",
    dashboard: "/dashboard",
    invoices: "/invoices",
    invoiceCreate: "/invoices/create",
    invoicePreview: (id: string) => `/invoices/preview/${id}`,
    settings: "/settings",
} as const;

export const FILE_UPLOADS = {
    allowedFileTypes: [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
    ] as const,
    maxFileSizeMB: 5,
} as const;

export const PAYMENT_OPTIONS = {
    gumroad: { enabled: true as const, label: "Pay Now (Gumroad)" },
    stripe: { enabled: false as const, label: "Stripe (Coming Soon)" },
} as const;

export const REPORT_OPTIONS = {
    revenueByClient: "revenue_by_client",
    revenueByProject: "revenue_by_project",
    paidVsUnpaid: "paid_vs_unpaid",
} as const;

/** Helper functions exported from constants for convenience */
export function getCurrencyByCode(code: string): Currency | undefined {
    return SUPPORTED_CURRENCIES.find((c) => c.code === code);
}

export function isSupportedCurrency(code: string): boolean {
    return SUPPORTED_CURRENCIES.some((c) => c.code === code);
}
