// src/components/preview/InvoiceSignature.tsx
"use client";
import React from "react";

interface InvoiceSignatureProps {
  signatureUrl?: string | null;
  signerName?: string | null;
}

export default function InvoiceSignature({
  signatureUrl,
  signerName,
}: InvoiceSignatureProps) {
  if (!signatureUrl) return null;

  return (
    <div className="mt-12 text-right">
      <p className="text-sm text-muted-foreground mb-3">Authorized Signature</p>
      <div className="inline-flex flex-col items-center">
        <img
          src={signatureUrl}
          alt="Signature"
          className="h-16 object-contain border-b-2 border-gray-400 pb-1"
        />
        {signerName && (
          <span className="mt-1 text-xs text-muted-foreground italic">
            {signerName}
          </span>
        )}
      </div>
    </div>
  );
}
