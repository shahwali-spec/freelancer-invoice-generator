"use client";
import React from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ExtraOptionsForm() {
  const { invoice, setInvoice } = useInvoice();

  return (
    <Card className="rounded-xl shadow-md border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Notes & Terms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional notes (e.g. thank you, reminders, instructions)..."
            value={invoice.notes ?? ""}
            onChange={(e) => setInvoice({ notes: e.target.value })}
            className="min-h-[100px] resize-y"
          />
          <p className="text-xs text-muted-foreground">
            These notes will be visible to the client at the bottom of the invoice.
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-2">
          <Label htmlFor="terms">Terms</Label>
          <Textarea
            id="terms"
            placeholder="Add payment terms, late fees, refund policies, etc..."
            value={invoice.terms ?? ""}
            onChange={(e) => setInvoice({ terms: e.target.value })}
            className="min-h-[100px] resize-y"
          />
          <p className="text-xs text-muted-foreground">
            Payment terms help set clear expectations and avoid disputes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
