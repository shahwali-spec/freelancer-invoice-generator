"use client";

import React from "react";
import Head from "next/head";
import LandingNavbar from "@/components/common/LandingNavbar";
import Footer from "@/components/common/Footer";

export default function TermsAndConditions() {
    return (
        <>
            <Head>
                <title>Terms & Conditions | Freelancer Invoice Generator</title>
                <meta
                    name="description"
                    content="Terms and Conditions of Freelancer Invoice Generator including use of service, liabilities, and user responsibilities."
                />
            </Head>

            <main className="bg-white text-gray-800">
                <LandingNavbar />

                <section className="max-w-5xl mx-auto px-4 py-20 space-y-8">
                    <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

                    <p>
                        By accessing and using Freelancer Invoice Generator, you agree to be bound by these Terms & Conditions. Please read them carefully.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Use of Service</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>You must provide accurate information when creating an account.</li>
                        <li>Do not misuse our platform for illegal or unauthorized purposes.</li>
                        <li>Respect intellectual property rights when creating invoices or content.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Account Responsibility</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Fees & Payments</h2>
                    <p>
                        Currently, Freelancer Invoice Generator is free to use. Any future fees or subscriptions will be clearly communicated.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Prohibited Activities</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Reverse engineering, decompiling, or modifying our platform.</li>
                        <li>Uploading malicious or harmful content.</li>
                        <li>Attempting to disrupt or interfere with the service.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
                    <p>
                        The service is provided "as is". Freelancer Invoice Generator is not liable for any damages, losses, or errors that may occur while using the platform.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate accounts that violate these terms or engage in unlawful behavior.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Governing Law</h2>
                    <p>
                        These Terms & Conditions are governed by the laws applicable in your jurisdiction. Any disputes will be subject to the appropriate courts.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Changes to Terms</h2>
                    <p>
                        We may update these Terms & Conditions at any time. Continued use of the platform indicates acceptance of any changes.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
                    <p>
                        For any questions regarding these Terms & Conditions, contact us at{" "}
                        <a href="mailto:support@yourdomain.com" className="text-indigo-600 underline">
                            support@yourdomain.com
                        </a>.
                    </p>
                </section>

                <Footer />
            </main>
        </>
    );
}
