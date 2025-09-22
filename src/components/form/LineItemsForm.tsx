// src/components/form/LineItemsForm.tsx
"use client";
import React from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import { LineItem as UILineItem } from "@/types/invoice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LineItemsForm() {
  const { invoice, updateItem, addItem, removeItem } = useInvoice();
  const items = invoice.items ?? [];

  function handleUpdate(id: string, patch: Partial<UILineItem>) {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    let lineTotal = 0;
    const type = patch.type ?? item.type;

    switch (type) {
      case "milestone":
        lineTotal = (patch.quantity ?? item.quantity ?? 0) * (patch.rate ?? item.rate ?? 0);
        break;
      case "fixed":
        lineTotal = patch.rate ?? item.rate ?? 0;
        break;
      case "hourly":
        lineTotal = (patch.hours ?? item.hours ?? 0) * (patch.rate ?? item.rate ?? 0);
        break;
    }

    updateItem({ id, ...patch, lineTotal });
  }

  return (
    <Card className="rounded-xl shadow-md border">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold">Line Items</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Add milestones, fixed-price, or hourly services. Totals update automatically.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 bg-white/50 rounded-md p-3 border"
            >
              {/* Type */}
              <div>
                <Label className="text-xs mb-1 block">Type</Label>
                <Select
                  value={item.type}
                  onValueChange={(val) => handleUpdate(item.id!, { type: val as any })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="milestone">Milestone</SelectItem>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  placeholder="e.g. Landing Page Development"
                  value={item.name}
                  onChange={(e) => handleUpdate(item.id!, { name: e.target.value })}
                />
              </div>

              {/* Conditional fields */}
              {item.type === "milestone" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Milestone #"
                    value={item.milestoneNumber ?? ""}
                    onChange={(e) =>
                      handleUpdate(item.id!, { milestoneNumber: e.target.value })
                    }
                  />
                  <Input
                    type="date"
                    value={item.dueDate ?? ""}
                    onChange={(e) => handleUpdate(item.id!, { dueDate: e.target.value })}
                  />
                  <Input
                    placeholder="Notes"
                    value={item.notes ?? ""}
                    onChange={(e) => handleUpdate(item.id!, { notes: e.target.value })}
                  />
                </div>
              )}

              {item.type === "fixed" && (
                <div>
                  <Label className="text-xs">Project Price</Label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleUpdate(item.id!, {
                        rate: Number(e.target.value) || 0,
                        quantity: 1,
                      })
                    }
                  />
                </div>
              )}

              {item.type === "hourly" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Hours</Label>
                    <Input
                      type="number"
                      value={item.hours ?? 0}
                      onChange={(e) =>
                        handleUpdate(item.id!, { hours: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Rate</Label>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleUpdate(item.id!, { rate: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Payment Status */}
              <div>
                <Label className="text-xs">Payment Status</Label>
                <Select
                  value={item.status ?? "unpaid"}
                  onValueChange={(val) => handleUpdate(item.id!, { status: val as UILineItem["status"] })}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row total */}
              <div className="text-right font-semibold text-sm">
                Total: ${item.lineTotal?.toFixed(2) ?? "0.00"}
              </div>

              {/* Row actions */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => item.id && removeItem(item.id)}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                  aria-label="Remove item"
                >
                  ✕
                </Button>
              </div>
            </div>
          ))}

          {/* Actions + Subtotal */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button onClick={addItem} size="sm" className="rounded-lg">
                + Add Item
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Separator className="my-1 sm:hidden" />
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="text-lg font-semibold">
                  ${(invoice.subtotal ?? 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}