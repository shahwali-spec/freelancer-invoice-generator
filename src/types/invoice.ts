// src/types/invoice.ts

// -------------------- Line Items --------------------
export type LineItemType = "milestone" | "fixed" | "hourly";
export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface LineItem {
  description?: string;
  id?: string;

  // Shared
  name?: string;
  quantity?: number;
  rate?: number;
  lineTotal?: number;
  total?: number;

  // Extended
  type?: LineItemType;
  status?: PaymentStatus;
  notes?: string;

  // Milestone
  milestoneNumber?: string;
  dueDate?: string;

  // Hourly
  hours?: number;
}

// -------------------- Taxes --------------------
export interface Tax {
  id?: string;
  name?: string; // frontend label
  label?: string; // alternate label
  rate?: number;
  percentage?: number; // legacy
}

// -------------------- Parties --------------------
export interface Client {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  website?: string;
  logoUrl?: string | null;
}

export interface Freelancer {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  website?: string;
  logoUrl?: string | null;
}

// -------------------- Discounts --------------------
export type Discount =
  | { type: "percentage" | "fixed" | "percent"; value: number }
  | null;

// -------------------- Payment Methods --------------------
export interface PaymentMethodDetails {
  email?: string;
  accountId?: string;
  iban?: string;
  wallet?: string;
  cryptoType?: string;
}

export interface PaymentMethod {
  method: string; // PayPal, Stripe, Wise, etc.
  details: PaymentMethodDetails;
}

// -------------------- Invoice --------------------
export interface Invoice {
  id?: string;
  ownerId?: string;
  clientId?: string;
  freelancerId?: string;

  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  dueAfterDays?: number;
  currency?: string;

  // Legacy aliases
  number?: string;
  date?: string;

  status?: "draft" | "sent" | "paid" | "overdue";
  template?: "classic" | "minimal" | "modern" | "dark";
  billingModel?: "fixed" | "hourly" | "milestone";

  client?: Client | null;
  freelancer?: Freelancer | null;

  items?: LineItem[];
  subtotal?: number;

  discount?: Discount;
  discounts?: Discount;

  taxes?: Tax[];
  extraCharges?: number;

  total?: number;
  amountPaid?: number;
  balanceDue?: number;

  notes?: string | null;
  terms?: string | null;
  attachments?: string[];
  signature?: string | null;

  // ✅ New Payment Methods
  paymentMethods?: PaymentMethod[];

  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// -------------------- Preview Component Props --------------------
export interface InvoiceHeaderProps {
  invoice: Invoice;
  onNumberChange: (val: string) => void;
}

export interface InvoiceClientProps {
  client: Client | null | undefined;
}

export interface InvoiceSellerProps {
  seller: Freelancer | null | undefined;
}

export interface InvoiceLineItemsProps {
  items: LineItem[];
}

export interface InvoiceTotalsProps {
  invoice: Invoice;
}

export interface InvoiceFooterProps {
  notes?: string | null;
  footerText?: string | null;
}

export interface InvoiceSignatureProps {
  signatureUrl?: string | null;
  signerName?: string;
}

// -------------------- New Types for LivePreview Errors --------------------

// PNG bytes / Word export
export interface PNGBytes {
  data: Uint8Array; // Correct type
  transformation: {
    width: number;
    height: number;
  };
}

// ImageRun (docx) options with optional type/fallback
export interface InvoiceImageOptions {
  data: Uint8Array;
  transformation: {
    width: number;
    height: number;
  };
  type?: string;
  fallback?: string;
}

// -------------------- Typed Props for React Components --------------------
// These solve TS2322 / IntrinsicAttributes errors

export interface TypedInvoiceHeaderProps {
  invoice: Invoice;
  onNumberChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface TypedInvoiceClientProps {
  client: Client | null | undefined;
}

export interface TypedInvoiceSellerProps {
  seller: Freelancer | null | undefined;
}

export interface TypedInvoiceLineItemsProps {
  items: LineItem[];
}

export interface TypedInvoiceTotalsProps {
  invoice: Invoice;
}

export interface TypedInvoiceFooterProps {
  notes?: string | null;
  footerText?: string | null;
}

export interface TypedInvoiceSignatureProps {
  signatureUrl?: string | null;
  signerName?: string;
}

// -------------------- Optional Utility Types --------------------

// For formatting file names safely
export type FileExtension = "pdf" | "png" | "docx";

// For generic Blob creation
export interface BlobOptions {
  type: string;
}

// -------------------- Extra Safety Types --------------------

// HTML-to-image output
export interface HtmlToImageResult {
  dataUrl: string;
  arr: Uint8Array;
}
