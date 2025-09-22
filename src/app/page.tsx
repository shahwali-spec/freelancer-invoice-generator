// app/page.tsx
"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import LandingHero from "@/components/marketing/LandingHero";
import FeaturesSection from "@/components/marketing/FeatureSection";
import PricingTable from "@/components/marketing/PricingTable";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Freelancer Invoice Generator | Simple & Transparent</title>
        <meta
          name="description"
          content="Create, preview, and export professional invoices in minutes. Start your 7-day free trial today!"
        />
      </Head>

      <main className="bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
        {/* Hero Section */}
        <LandingHero />

        {/* Features */}
        <section id="features" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <FeaturesSection />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="text-center mb-12 px-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Simple & Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Enjoy a <span className="font-semibold">7-day free trial</span> with all features.
              Then only <span className="font-semibold">$5/month</span> or{" "}
              <span className="font-semibold">$50/year</span>.
            </p>
          </div>
          <div className="max-w-5xl mx-auto px-4">
            <PricingTable />
            <div className="mt-8 text-center">
              <Link href="/pricing">
                <Button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 
                             focus:ring-blue-200 text-white rounded-xl shadow transition-transform 
                             hover:scale-105"
                >
                  View Full Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Auth Section */}
        <section className="py-16 text-center px-4">
          <SignedOut>
            <div className="flex flex-wrap justify-center gap-4">
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 
                             text-white px-6 py-3 rounded-xl shadow transition-transform 
                             hover:scale-105"
                >
                  Get Started Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-xl hover:bg-gray-100 
                             focus:ring-4 focus:ring-gray-200 transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Freelancer Invoice Generator. All rights reserved.
        </footer>
      </main>
    </>
  );
}
