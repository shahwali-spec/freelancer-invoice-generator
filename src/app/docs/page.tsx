"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-blue-600">
                    📘 Documentation
                </h1>
                <p className="text-lg mb-10 text-gray-600">
                    Learn how to use Freelancer Invoice Generator step by step.
                </p>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">1. Getting Started</h2>
                    <p className="mb-4">
                        Follow these steps to quickly create your first invoice:
                    </p>
                    <ul className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Open the app and click <strong>“Get Started”</strong>.</li>
                        <li>Enter your name, business info, and client details.</li>
                        <li>Add your services, price, and currency.</li>
                        <li>Preview the invoice instantly.</li>
                        <li>Export to PDF or share a link with your client.</li>
                    </ul>
                    <p className="mt-4 italic text-gray-500">
                        💡 Tip: You can create unlimited invoices during your free trial.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">2. Managing Clients</h2>
                    <p>
                        You can save client details for reuse. Click <strong>“Add Client”</strong>,
                        fill in the info, and the system remembers it for your next invoice.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">3. Custom Branding</h2>
                    <p>
                        Upload your <strong>logo</strong>, choose colors, and add a signature or note
                        for a professional look.
                        Navigate to <strong>Settings → Branding</strong>.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">4. Export Options</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>PDF (recommended)</li>
                        <li>Printable View</li>
                        <li>Sharable Link (Copy & Send)</li>
                    </ul>
                </section>

                {/* Section 5 */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3">5. Support</h2>
                    <p>
                        Need help? Email us anytime at{" "}
                        <a
                            href="mailto:support@yourdomain.com"
                            className="text-blue-600 underline"
                        >
                            support@yourdomain.com
                        </a>{" "}
                        or visit our{" "}
                        <Link href="/faqs" className="text-blue-600 underline">
                            FAQs
                        </Link>{" "}
                        page.
                    </p>
                </section>

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
