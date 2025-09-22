// src/components/preview/InvoiceClient.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AtSign,
  Globe,
  Phone,
  User2,
  MapPin,
  BadgePercent,
} from "lucide-react";
import { Invoice } from "@/types/invoice";

interface InvoiceClientProps {
  client: Invoice["client"];
  className?: string;
}

export default function InvoiceClient({ client, className }: InvoiceClientProps) {
  if (!client) return null;

  const websiteHref =
    client.website && /^(https?:)?\/\//i.test(client.website)
      ? client.website
      : client.website
        ? `https://${client.website}`
        : "";

  return (
    <div className={cn("w-full", className)}>
      <Card className="rounded-2xl border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          {/* بندے والا آئیکون */}
          <User2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-semibold tracking-tight">
            Bill To
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4 text-sm text-gray-700">
          <TooltipProvider>
            {/* لوگو */}
            {client.logoUrl && (
              <div className="flex justify-start">
                <img
                  src={client.logoUrl}
                  alt="Client Logo"
                  className="h-20 w-auto object-contain rounded-md border shadow-sm bg-white"
                />
              </div>
            )}

            {/* کلائنٹ کا نام */}
            <div className="font-bold text-lg text-gray-900">
              {client.name || "Client Name"}
            </div>

            {/* ای میل */}
            {client.email && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-gray-500" />
                    <a
                      href={`mailto:${client.email}`}
                      className="hover:underline break-all"
                    >
                      {client.email}
                    </a>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{client.email}</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* فون */}
            {client.phone && (
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href={`tel:${client.phone}`} className="hover:underline">
                  {client.phone}
                </a>
              </p>
            )}

            {/* ویب سائٹ */}
            {client.website && websiteHref && (
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline break-all"
                >
                  {client.website}
                </a>
              </p>
            )}

            {/* ٹیکس آئی ڈی */}
            {client.taxId && (
              <p className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-gray-500" />
                Tax ID: {client.taxId}
              </p>
            )}

            {/* ایڈریس */}
            {client.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="whitespace-pre-line">{client.address}</span>
              </div>
            )}
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}