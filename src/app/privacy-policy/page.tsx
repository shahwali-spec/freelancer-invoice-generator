"use client";

import React from "react";
import Head from "next/head";
import LandingNavbar from "@/components/common/LandingNavbar";
import Footer from "@/components/common/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy | Freelancer Invoice Generator</title>
                <meta
                    name="description"
                    content="Privacy Policy of Freelancer Invoice Generator covering data collection, usage, and user rights."
                />
            </Head>

            <main className="bg-white text-gray-800">
                <LandingNavbar />

                <section className="max-w-5xl mx-auto px-4 py-20 space-y-8">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                    <p>
                        At Freelancer Invoice Generator, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Email address and account information you provide.</li>
                        <li>Usage data including features accessed and invoices created.</li>
                        <li>Cookies and analytics data to improve our services.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>To provide and maintain our services effectively.</li>
                        <li>To communicate important updates or support information.</li>
                        <li>To personalize your experience and improve functionality.</li>
                        <li>To analyze usage trends and enhance user experience.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar technologies to understand user behavior, remember preferences, and improve our services. You can manage cookies through your browser settings.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Data Sharing and Third Parties</h2>
                    <p>
                        We do not sell or rent your personal data to third parties. We may share data with trusted service providers who assist us in operating our platform, strictly under confidentiality agreements.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Access the data we hold about you.</li>
                        <li>Request corrections to inaccurate data.</li>
                        <li>Request deletion of your data where applicable.</li>
                        <li>Opt-out of marketing communications at any time.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, loss, or alteration. However, no system is completely secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Children's Privacy</h2>
                    <p>
                        Our services are not directed to children under 13 years of age. We do not knowingly collect personal data from children. If you believe we have collected such data, please contact us immediately.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
                    <p>
                        For any questions regarding this Privacy Policy, you can contact us at{" "}
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
