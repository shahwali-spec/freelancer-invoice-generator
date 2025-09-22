// src/components/preview/InvoiceLineItems.tsx
"use client";
import * as React from "react";
import { LineItem } from "@/types/invoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function InvoiceLineItems({ items }: { items: LineItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-sm font-semibold">Description</TableHead>
            <TableHead className="text-sm font-semibold">Qty / Hours</TableHead>
            <TableHead className="text-sm font-semibold">Rate</TableHead>
            <TableHead className="text-sm font-semibold">Status</TableHead>
            <TableHead className="text-sm font-semibold text-right">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((it, idx) => (
            <TableRow
              key={it.id || idx}
              className={cn(
                "transition-colors hover:bg-muted/30",
                idx % 2 === 0 ? "bg-white" : "bg-muted/10"
              )}
            >
              {/* Description */}
              <TableCell className="py-3 text-sm">
                <div className="font-medium">
                  {it.name || it.description || "—"}
                </div>
                {it.type === "milestone" && (
                  <div className="text-xs text-muted-foreground">
                    Milestone {it.milestoneNumber ?? ""}{" "}
                    {it.dueDate && `• Due ${it.dueDate}`}
                    {it.notes && ` • ${it.notes}`}
                  </div>
                )}
                {it.type === "hourly" && (
                  <div className="text-xs text-muted-foreground">
                    Hourly work
                  </div>
                )}
                {it.type === "fixed" && (
                  <div className="text-xs text-muted-foreground">
                    Fixed price project
                  </div>
                )}
              </TableCell>

              {/* Qty / Hours */}
              <TableCell className="py-3 text-sm">
                {it.type === "hourly"
                  ? it.hours ?? 0
                  : it.quantity ?? (it.type === "fixed" ? 1 : 0)}
              </TableCell>

              {/* Rate */}
              <TableCell className="py-3 text-sm">
                ${Number(it.rate ?? 0).toFixed(2)}
              </TableCell>

              {/* Status */}
              <TableCell className="py-3 text-sm capitalize">
                {it.status ?? "unpaid"}
              </TableCell>

              {/* Line Total */}
              <TableCell className="py-3 text-sm text-right font-medium">
                ${Number(it.lineTotal ?? 0).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}

          {/* Empty State */}
          {items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-4 text-center text-muted-foreground"
              >
                No line items added
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
