// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Freelancer Invoice Generator",
  description: "Create, export, and manage professional invoices",
  icons: {
    icon: "/favicon.png", // یہ فائل public/ سے serve ہوگی
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* 🛠 Paddle Overlay Checkout script */}
        <Script
          src="https://cdn.paddle.com/paddle/paddle.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* ✅ ClerkProvider for app-wide authentication */}
        <ClerkProvider>
          {/* 🎨 Global providers like notifications or theming can be added here */}
          {children}
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
