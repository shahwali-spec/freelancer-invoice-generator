// src/components/preview/InvoiceFooter.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface InvoiceFooterProps {
  notes?: string | null;
  footerText?: string | null;
}

export default function InvoiceFooter({ notes, footerText }: InvoiceFooterProps) {
  if (!notes && !footerText) return null;

  return (
    <Card className="rounded-2xl border shadow-md mt-6">
      <CardContent className="p-4 text-sm text-gray-700 space-y-2">
        {notes && (
          <div>
            <h4 className="font-semibold mb-1">Notes</h4>
            <p className="whitespace-pre-line">{notes}</p>
          </div>
        )}
        {footerText && (
          <div>
            <h4 className="font-semibold mb-1">Footer</h4>
            <p className="whitespace-pre-line">{footerText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
