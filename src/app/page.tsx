"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Navbar & Footer
import LandingNavbar from "@/components/common/LandingNavbar";
import Footer from "@/components/common/Footer";

// Sections
import LandingHero from "@/components/marketing/LandingHero";
import FeaturesSection from "@/components/marketing/FeatureSection";
import AboutSection from "@/components/marketing/AboutSection";
import HelpSection from "@/components/marketing/HelpSection";

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  // JSON-LD Structured Data for SEO
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Invoice Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Generate professional invoices online in minutes for free. Easy-to-use invoice template and generator for freelancers and small businesses.",
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
    <>
      {/* SEO & Meta Tags */}
      <Head>
        <title>Free Invoice Generator | Free Online Invoice Template</title>
        <meta
          name="description"
          content="Generate professional invoices online for free. Easy-to-use invoice template and generator for freelancers and small businesses. No signup required."
        />
        <meta
          name="keywords"
          content="free invoice generator, free invoice template, online invoice maker, generate invoices online, freelancer invoice, invoice generator free"
        />
        <meta name="author" content="Freelancer Invoice Generator" />

        {/* Open Graph */}
        <meta property="og:title" content="Free Invoice Generator" />
        <meta
          property="og:description"
          content="Generate professional invoices online in minutes. Free, simple, and easy-to-use invoice template for freelancers."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://freelancerinvoicegenerator.com"
        />
        <meta
          property="og:image"
          content="https://freelancerinvoicegenerator.com/og-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Invoice Generator | Free Online Invoice Template"
        />
        <meta
          name="twitter:description"
          content="Generate invoices quickly and download instantly — free and easy online tool for freelancers."
        />
        <meta name="twitter:site" content="@YourBrandX" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://freelancerinvoicegenerator.com"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </Head>

      <main className="bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
        {/* Navbar */}
        <LandingNavbar />

        {/* Hero Section */}
        <LandingHero />

        {/* Features */}
        <section
          id="features"
          className="py-20"
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="features-heading" className="sr-only">
              Key Features
            </h2>
            <FeaturesSection />
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-20 bg-gray-50"
          aria-labelledby="about-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="about-heading" className="sr-only">
              About Freelancer Invoice Generator
            </h2>
            <AboutSection />
          </div>
        </section>

        {/* Help */}
        <section
          id="help"
          className="py-20"
          aria-labelledby="help-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="help-heading" className="sr-only">
              Help and Support
            </h2>
            <HelpSection />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}