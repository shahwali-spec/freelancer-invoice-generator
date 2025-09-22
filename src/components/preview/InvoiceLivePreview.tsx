// src/components/preview/InvoiceLivePreview.tsx
"use client";
import React, { useRef, useState } from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceClient from "./InvoiceClient";
import InvoiceSeller from "./InvoiceSeller";
import InvoiceLineItems from "./InvoiceLineItems";
import InvoiceTotals from "./InvoiceTotals";
import InvoiceSignature from "./InvoiceSignature";
import InvoiceFooter from "./InvoiceFooter";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { PDFDocument } from "pdf-lib";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { FileText, FileImage, FileType, Mail } from "lucide-react";
import type {
  TypedInvoiceHeaderProps,
  TypedInvoiceClientProps,
  TypedInvoiceSellerProps,
  TypedInvoiceLineItemsProps,
  TypedInvoiceTotalsProps,
  TypedInvoiceFooterProps,
  TypedInvoiceSignatureProps,
  PNGBytes,
  InvoiceImageOptions, // ✅ correct name
} from "@/types/invoice";

export default function InvoiceLivePreview() {
  const { invoice } = useInvoice();
  const ref = useRef<HTMLDivElement | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string>(
    invoice?.number || ""
  );
  const [showComingSoon, setShowComingSoon] = useState(false);

  const htmlToImageOptions = {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: true,
    useCORS: true,
  };

  const capturePngBytes = async (): Promise<PNGBytes & { dataUrl: string }> => {
    if (!ref.current) throw new Error("No preview element");
    const dataUrl = await htmlToImage.toPng(ref.current, htmlToImageOptions);
    const arr = await fetch(dataUrl).then((r) => r.arrayBuffer());
    return { data: new Uint8Array(arr), dataUrl, transformation: { width: 0, height: 0 } };
  };

  const onExportPDF = async () => {
    if (!ref.current) return;
    try {
      const { data: pngBytes, dataUrl } = await capturePngBytes();
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => (img.onload = res));

      const pageWidth = 595;
      const scale = pageWidth / img.width;
      const pageHeight = Math.ceil(img.height * scale);

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const pngImage = await pdfDoc.embedPng(pngBytes);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });

      const bytes = await pdfDoc.save(); // Uint8Array
      const blob = new Blob([new Uint8Array(bytes)], {
        type: "application/pdf",
      });

      saveAs(
        blob,
        formatFileName(invoiceNumber || invoice.number || "invoice", "pdf")
      ); toast.success("Invoice exported as PDF");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    }
  };

  // ✅ Add this helper somewhere in the same file
  function formatFileName(name: string, ext: string) {
    const safeName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    return `${safeName}.${ext}`;
  }


  const onExportWord = async () => {
    if (!ref.current) return;
    try {
      const { data: pngBytes, dataUrl } = await capturePngBytes();
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => (img.onload = res));

      const maxWidthPoints = 6 * 72;
      const scale = maxWidthPoints / img.width;
      const widthPoints = Math.ceil(img.width * scale);
      const heightPoints = Math.ceil(img.height * scale);

      const imageOptions: InvoiceImageOptions = {
        data: pngBytes,
        transformation: { width: widthPoints, height: heightPoints },
      };

      const doc = new Document({
        sections: [
          {
            properties: {
              page: { margin: { top: 72, bottom: 72, left: 72, right: 72 } },
            },
            children: [
              new Paragraph({
                alignment: "center",
                children: [new ImageRun(imageOptions as any)], // ✅ fixed
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${invoiceNumber || invoice.number || "invoice"}.docx`);
      toast.success("Invoice exported as Word");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export Word");
    }
  };


  const onExportImage = async () => {
    if (!ref.current) return;
    try {
      const { dataUrl } = await capturePngBytes();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${invoiceNumber || invoice.number}.png`;
      a.click();
      toast.success("Invoice exported as Image");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export Image");
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div
          ref={ref}
          className="max-w-4xl mx-auto rounded-2xl shadow-lg p-6 border border-gray-200 invoice-preview light"
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <InvoiceHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <InvoiceClient client={invoice.client} />
            <InvoiceSeller seller={invoice.freelancer} />
          </div>
          <InvoiceLineItems items={invoice.items || []} />
          <InvoiceTotals invoice={{ ...invoice, number: invoiceNumber }} />
          <InvoiceFooter notes={invoice.notes} footerText={invoice.terms} />
          <InvoiceSignature
            signatureUrl={invoice.signature}
            signerName={invoice.freelancer?.name}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={onExportPDF} variant="outline" size="sm">
            <FileType className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button onClick={onExportWord} variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" /> Word
          </Button>
          <Button onClick={onExportImage} variant="outline" size="sm">
            <FileImage className="mr-2 h-4 w-4" /> Image
          </Button>
          <div className="flex flex-col items-center">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setShowComingSoon(true);
                setTimeout(() => setShowComingSoon(false), 3000);
              }}
            >
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </Button>
            {showComingSoon && <p className="mt-2 text-sm font-semibold text-orange-600">Coming Soon</p>}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}