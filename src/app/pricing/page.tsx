// src/app/pricing/page.tsx
import React from "react";
import Link from "next/link";
import PricingTable from "@/components/marketing/PricingTable";
import { JSX } from "react/jsx-runtime";

export const metadata = {
  title: "Pricing — Freelancer Invoice Generator",
  description:
    "Start your 7-day free trial — unlimited invoices, exports, signatures and multi-currency support.",
};

export default function PricingPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="pt-20 pb-12 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Simple, predictable pricing for freelancers
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Start with a 7-day free trial — all features enabled. Pay monthly or save on an annual plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* ⬇️ پہلے upgrade پر جا رہا تھا، اب dashboard پر لے جا رہے ہیں */}
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 text-white px-6 py-3 shadow hover:scale-105 transition"
            >
              Start Free 7-Day Trial
            </Link>
            <a
              href="#details"
              className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </header>

      {/* Pricing table / card */}
      <section id="details" className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <PricingTable />
        </div>
      </section>

      {/* Trust / short FAQ */}
      <section className="bg-white border-t py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Secure billing & support
          </h2>
          <p className="text-gray-600 mb-6">
            Payments processed through Paddle (PCI-compliant). Email support and reliable backups for invoices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="text-sm text-gray-500">✅ 7-day free trial</div>
            <div className="text-sm text-gray-500">✅ Cancel anytime</div>
            <div className="text-sm text-gray-500">✅ Email export & PDF/Word/Image</div>
          </div>
        </div>
      </section>
    </main>
  );
}