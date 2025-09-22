"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Globe, MapPin, Hash } from "lucide-react";
import { Invoice } from "@/types/invoice";

interface InvoiceSellerProps {
  seller: Invoice["freelancer"];
}

export default function InvoiceSeller({ seller }: InvoiceSellerProps) {
  if (!seller) return null;

  return (
    <Card className="rounded-2xl border shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        {/* Logo */}
        {seller.logoUrl && (
          <div className="flex justify-start">
            <img
              src={seller.logoUrl}
              alt="Freelancer Logo"
              className="h-20 w-auto object-contain rounded-md border shadow-sm"
            />
          </div>
        )}

        {/* Name / Company */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {seller.name || "Your Name / Company"}
          </h2>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-600 space-y-2">
          {seller.email && (
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" /> {seller.email}
            </p>
          )}
          {seller.phone && (
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" /> {seller.phone}
            </p>
          )}
          {seller.website && (
            <p className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" /> {seller.website}
            </p>
          )}
          {seller.taxId && (
            <p className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-500" /> Tax ID: {seller.taxId}
            </p>
          )}
        </div>

        {/* Address */}
        {seller.address && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <span>{seller.address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
