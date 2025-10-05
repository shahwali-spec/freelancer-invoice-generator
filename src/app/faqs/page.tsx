"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      q: "Is it free to use?",
      a: "Yes! You can create unlimited invoices during the free plan. Premium unlocks extra features like branding and cloud save.",
    },
    {
      q: "Do I need to sign up?",
      a: "No signup required for basic use. However, logging in lets you save clients and invoice history.",
    },
    {
      q: "How do I download a PDF?",
      a: "Fill the invoice form and click “Export as PDF” — your file will download instantly.",
    },
    {
      q: "Can I use my own logo?",
      a: "Yes! Upload it under Settings → Branding and it will appear on all invoices.",
    },
    {
      q: "PDF isn’t downloading?",
      a: "Enable pop-ups or try refreshing. If it persists, contact support@yourdomain.com.",
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. All communication is encrypted. Your invoices are never stored without consent.",
    },
    {
      q: "How can I contact support?",
      a: "Email support@yourdomain.com or use the Help → Contact form.",
    },
    {
      q: "Can I invoice international clients?",
      a: "Yes, you can select currency, language, and tax format manually.",
    },
    {
      q: "Do you offer team accounts?",
      a: "Coming soon! Multi-user management is in development.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, there are no contracts or hidden fees.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">❓ FAQs</h1>
        <p className="text-lg mb-10 text-gray-600">
          Common questions about Freelancer Invoice Generator.
        </p>

        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.q}
              </h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/#help">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              ← Back to Help
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
