// src/app/dashboard/layout.tsx
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import AppNavbar from "@/components/common/AppNavbar";
import { InvoiceProvider } from "@/hooks/useInvoiceForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Freelancer Invoice Generator - Dashboard",
  description: "Manage and preview your invoices",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <InvoiceProvider>
      {/* Navbar for Dashboard */}
      <AppNavbar />

      {/* Main Content */}
      <main
        className={`min-h-screen ${inter.className} bg-gray-50 text-gray-900`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </InvoiceProvider>
  );
}