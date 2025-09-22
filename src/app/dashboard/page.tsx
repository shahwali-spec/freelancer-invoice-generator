// src/app/dashboard/page.tsx
"use client";
import React, { ReactElement } from "react";
import InvoiceForm from "@/components/form/InvoiceForm";
import InvoiceLivePreview from "@/components/preview/InvoiceLivePreview";
import { InvoiceProvider } from "@/hooks/useInvoiceForm";
import ProtectedClient from "@/components/auth/ProtectedClient";

export default function Dashboard(): ReactElement {
  return (
    <ProtectedClient>
      <InvoiceProvider>
        <main className="min-h-screen p-4 bg-background text-foreground transition-colors">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side: Invoice Form */}
            <section className="bg-card text-card-foreground p-4 rounded-2xl shadow-lg flex-1 overflow-auto max-h-[90vh] transition-colors">
              <InvoiceForm />
            </section>
            {/* Right Side: Live Preview */}
            <section className="bg-card text-card-foreground p-4 rounded-2xl shadow-lg flex-1 overflow-auto max-h-[90vh] transition-colors">
              <InvoiceLivePreview />
            </section>
          </div>
        </main>
      </InvoiceProvider>
    </ProtectedClient>
  );
}