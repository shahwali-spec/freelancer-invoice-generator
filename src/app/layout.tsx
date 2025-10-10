// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free Invoice Generator",
  description:
    "Generate professional invoices in minutes. Free, fast, and simple online invoice generator.",
  keywords:
    "free invoice generator, online invoice maker, billing tool, invoice PDF, invoice creator, free invoice template",
  authors: [{ name: "Freelancer Invoice Generator" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Free Invoice Generator",
    description:
      "Create, preview, and export professional invoices online. Free and easy to use.",
    url: "https://freelancerinvoicegenerator.com/",
    siteName: "Freelancer Invoice Generator",
    images: [
      {
        url: "https://freelancerinvoicegenerator.com/og-image.jpg", // placeholder
        width: 1200,
        height: 630,
        alt: "Free Invoice Generator Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator",
    description:
      "Quickly generate invoices for clients — no signup required. Free, simple, and professional.",
    site: "@YourBrandX",
    images: ["https://freelancerinvoicegenerator.com/og-image.jpg"], // placeholder
  },
  alternates: {
    canonical: "https://freelancerinvoicegenerator.com/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // JSON-LD: Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Invoice Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Generate professional invoices in minutes. Free, fast, and simple online invoice generator.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Freelancer Invoice Generator",
      url: "https://freelancerinvoicegenerator.com",
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "2d3ce0dd1a3f4b659333aaf0d644bc44"}'></script><!-- End Cloudflare Web Analytics -->
        {/* Structured Data: Software Application */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <ClerkProvider>
          {children}
          <Analytics />
          <Toaster position="top-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
