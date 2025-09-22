// src/app/dashboard/invoices/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Edit2, Trash2, Search } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: { name: string };
  status: string;
  total: number;
  invoiceDate: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // const fetchInvoices = async () => {
    //   try {
    //     const res = await fetch("/api/invoices");
    //     const data = await res.json();
    //     const safeData: Invoice[] = Array.isArray(data) ? data : data.invoices || [];
    //     setInvoices(safeData);
    //   } catch (err) {
    //     console.error("Error fetching invoices:", err);
    //     setInvoices([]);
    //   }
    // };
    // fetchInvoices();
  }, []);

  const filtered = (invoices || [])
    .filter(
      (inv) =>
        inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
        inv.client?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((inv) => (statusFilter === "all" ? true : inv.status === statusFilter))
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime();
      if (sortBy === "oldest")
        return new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime();
      if (sortBy === "highAmount") return b.total - a.total;
      if (sortBy === "lowAmount") return a.total - b.total;
      return 0;
    });

  const handleExport = (inv: Invoice, type: string) => {
    console.log(`Export ${inv.invoiceNumber} as ${type}`);
    // TODO: Export logic for PDF, Image, or Word
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Search size={18} />
          <Input
            placeholder="Search by number or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Date: Newest</SelectItem>
            <SelectItem value="oldest">Date: Oldest</SelectItem>
            <SelectItem value="highAmount">Amount: High → Low</SelectItem>
            <SelectItem value="lowAmount">Amount: Low → High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Invoice List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-4xl animate-pulse">
            🚀
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🚧 Coming Soon!
          </h2>
          <p className="text-gray-500 max-w-md">
            Invoice history isn’t available yet. This feature will be rolling out soon—stay tuned!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inv) => (
            <Card key={inv.id} className="shadow hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {inv.invoiceNumber}
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${inv.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : inv.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {inv.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">{inv.client?.name}</p>
                <p className="text-sm text-gray-500">Date: {inv.invoiceDate}</p>
                <p className="font-semibold mt-2">Total: ${inv.total}</p>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log("Preview", inv)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log("Edit", inv)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => console.log("Delete", inv.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExport(inv, "pdf")}
                    >
                      <Download size={16} /> PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExport(inv, "image")}
                    >
                      IMG
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExport(inv, "word")}
                    >
                      DOC
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}